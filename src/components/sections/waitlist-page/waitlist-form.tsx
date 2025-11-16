'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { ArrowRight, Check, Loader2, Gift, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useUser, useFirebase, errorEmitter, FirestorePermissionError } from '@/firebase';
import { collection, doc, getDoc, writeBatch, serverTimestamp, runTransaction, increment } from 'firebase/firestore';

const formSchema = z.object({
  useCase: z.string().min(20, { message: "Please describe your use case (minimum 20 characters)" }).max(300, { message: "Use case cannot exceed 300 characters." }),
  referralCode: z.string().optional(),
  referralSource: z.string().optional(),
  productUpdates: z.boolean().default(true),
  betaTesting: z.boolean().default(false),
  partnerships: z.boolean().default(false),
});

type ReferralStatus = 'idle' | 'checking' | 'valid' | 'invalid' | 'self';

export default function WaitlistForm() {
  const { user } = useUser();
  const { firestore } = useFirebase();
  const [submissionState, setSubmissionState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [referralStatus, setReferralStatus] = useState<ReferralStatus>('idle');
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      useCase: "",
      referralCode: "",
      referralSource: "",
      productUpdates: true,
      betaTesting: false,
      partnerships: false,
    },
    mode: 'onTouched'
  });

  const useCaseValue = form.watch('useCase');
  const referralCodeValue = form.watch('referralCode');

  const debouncedValidateReferral = useCallback(
    (code: string) => {
      if (!code) {
        setReferralStatus('idle');
        return;
      }
      
      const upperCaseCode = code.toUpperCase();
      if (!/^LMX[0-9A-Z]{1,7}$/.test(upperCaseCode)) {
        setReferralStatus('invalid');
        return;
      }

      setReferralStatus('checking');

      setTimeout(async () => {
        if (!firestore || form.getValues('referralCode')?.toUpperCase() !== upperCaseCode) return;
        
        try {
          const codeRef = doc(firestore, 'referralCodes', upperCaseCode);
          const codeSnap = await getDoc(codeRef);

          if (codeSnap.exists()) {
            if (codeSnap.data().userId === user?.uid) {
              setReferralStatus('self');
            } else {
              setReferralStatus('valid');
            }
          } else {
            setReferralStatus('invalid');
          }
        } catch (error) {
          setReferralStatus('invalid');
        }
      }, 1000);
    },
    [firestore, user, form]
  );
  
  useEffect(() => {
    const handler = setTimeout(() => {
      debouncedValidateReferral(referralCodeValue || '');
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [referralCodeValue, debouncedValidateReferral]);


  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!user || !firestore) {
        setErrorMessage('Authentication error. Please refresh and try again.');
        setSubmissionState('error');
        return;
    }
    setSubmissionState('submitting');
    setErrorMessage('');

    try {
      await runTransaction(firestore, async (transaction) => {
        const statsRef = doc(firestore, 'stats', 'global');
        const statsSnap = await transaction.get(statsRef);
        
        const enteredCode = values.referralCode?.toUpperCase();
        let referrerData: { userId: string } | null = null;

        if (enteredCode && referralStatus === 'valid') {
            const referrerCodeRef = doc(firestore, 'referralCodes', enteredCode);
            const referrerCodeSnap = await transaction.get(referrerCodeRef);
            if (referrerCodeSnap.exists()) {
                referrerData = referrerCodeSnap.data() as { userId: string };
            }
        }

        let newPosition = 1;
        if (statsSnap.exists()) {
            newPosition = (statsSnap.data().totalMembers || 0) + 1;
        }

        if (referrerData) {
            const referrerWaitlistRef = doc(firestore, 'waitlist', referrerData.userId);
            const referrerWaitlistSnap = await transaction.get(referrerWaitlistRef);
            if (referrerWaitlistSnap.exists()) {
                const currentReferrerData = referrerWaitlistSnap.data();
                const newReferralCount = (currentReferrerData.referralCount || 0) + 1;
                let newTier = currentReferrerData.referralTier;

                if (newReferralCount >= 25) newTier = 'ambassador';
                else if (newReferralCount >= 10) newTier = 'champion';
                else if (newReferralCount >= 3) newTier = 'advocate';

                transaction.update(referrerWaitlistRef, {
                    referralCount: increment(1),
                    bonusPositions: increment(10),
                    currentPosition: increment(-10),
                    referralTier: newTier,
                });
                
                const referralRecordRef = doc(collection(firestore, 'referrals'));
                transaction.set(referralRecordRef, {
                  referralCode: enteredCode,
                  referrerUserId: referrerData.userId,
                  newUserId: user.uid,
                  usedAt: serverTimestamp(),
                  bonusApplied: true,
                });
            }
        }
        
        const newReferralCode = `LMX${newPosition}`;
        const waitlistRef = doc(firestore, 'waitlist', user.uid);
        const referralCodeRef = doc(firestore, 'referralCodes', newReferralCode);
        const userRef = doc(firestore, 'users', user.uid);

        transaction.set(waitlistRef, {
            userId: user.uid,
            email: user.email,
            name: user.displayName,
            joinedAt: serverTimestamp(),
            useCase: values.useCase,
            enteredReferralCode: enteredCode || null,
            referralSource: values.referralSource || null,
            referralCode: newReferralCode,
            referralCount: 0,
            referralTier: 'none',
            basePosition: newPosition,
            bonusPositions: 0,
            currentPosition: newPosition,
            status: 'waiting',
            betaInvitedAt: null,
            emailPreferences: {
                productUpdates: values.productUpdates,
                betaTesting: values.betaTesting,
                partnerships: values.partnerships,
            }
        });

        transaction.set(referralCodeRef, {
            code: newReferralCode,
            userId: user.uid,
            createdAt: serverTimestamp(),
            isActive: true,
        });

        transaction.update(userRef, { 
            onWaitlist: true,
            waitlistJoinedAt: serverTimestamp() 
        });

        transaction.update(statsRef, { 
            totalMembers: increment(1),
            lastUpdated: serverTimestamp()
        });
      });

      setSubmissionState('success');

    } catch (error) {
      setSubmissionState('error');
      setErrorMessage('An error occurred while joining the waitlist. Please try again.');
      
      const permissionError = new FirestorePermissionError({
        path: `Transaction to join waitlist for user ${user.uid}`,
        operation: 'write',
        requestResourceData: {
           useCase: values.useCase,
           enteredReferralCode: values.referralCode,
           referralSource: values.referralSource,
           emailPreferences: {
                productUpdates: values.productUpdates,
                betaTesting: values.betaTesting,
                partnerships: values.partnerships,
            }
        }
      });
      errorEmitter.emit('permission-error', permissionError);
    }
  }

  const referralStatusUI = useMemo(() => {
    switch(referralStatus) {
      case 'checking':
        return <Loader2 className="h-5 w-5 text-gray-400 animate-spin absolute right-3 top-1/2 -translate-y-1/2" />;
      case 'valid':
        return <Check className="h-5 w-5 text-green-500 absolute right-3 top-1/2 -translate-y-1/2" />;
      case 'invalid':
        return <X className="h-5 w-5 text-red-500 absolute right-3 top-1/2 -translate-y-1/2" />;
      case 'self':
        return <X className="h-5 w-5 text-red-500 absolute right-3 top-1/2 -translate-y-1/2" />;
      default:
        return null;
    }
  }, [referralStatus]);

  if (submissionState === 'success') {
    return null;
  }
  
  return (
    <div className="py-16">
        <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
                 <h1 className="text-5xl font-light text-navy mb-4">
                    Reserve Your Spot
                </h1>
                <p className="text-lg text-charcoal/80 leading-relaxed max-w-2xl mx-auto mb-12">
                   You're logged in as <span className="font-bold text-ocean">{user?.email}</span>. Complete the form below to join the waitlist.
                </p>
            </div>

            <div className="max-w-2xl mx-auto bg-white border border-gray-200 rounded-3xl p-8 md:p-12 shadow-xl shadow-slate-200/50">
                <h2 className="text-3xl font-medium text-navy mb-8">Tell Us About Yourself</h2>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="useCase"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-base font-medium text-charcoal">What will you build with Lumivex?</FormLabel>
                                <FormControl>
                                <Textarea
                                    placeholder="e.g., Automate customer support for my e-commerce store"
                                    className="min-h-[120px] text-base p-4"
                                    {...field}
                                />
                                </FormControl>
                                <div className="text-right text-xs text-gray-500 pr-1">
                                    {300 - useCaseValue.length} characters remaining
                                </div>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="referralCode"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-base font-medium text-charcoal">Have a Referral Code? (Optional)</FormLabel>
                                <div className="flex items-center gap-2 text-sm text-ocean italic">
                                   <Gift className="h-4 w-4" />
                                    <span>Enter a friend's code and you both move up 10 positions!</span>
                                </div>
                                <div className="relative">
                                    <FormControl>
                                    <Input
                                        placeholder="Enter code (e.g., LMX1523)"
                                        className="h-14 bg-cream border-2 border-amber-400 text-lg font-semibold uppercase text-navy focus:bg-amber-50"
                                        {...field}
                                        onChange={e => field.onChange(e.target.value.toUpperCase())}
                                    />
                                    </FormControl>
                                    {referralStatusUI}
                                </div>
                                {referralStatus === 'invalid' && <p className="text-sm text-red-500">Invalid format or code not found.</p>}
                                {referralStatus === 'self' && <p className="text-sm text-red-500">You can't use your own code.</p>}
                                {referralStatus === 'valid' && <p className="text-sm text-green-500">✓ Valid code! You and your friend will both move up.</p>}
                            </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="referralSource"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel className="text-base font-medium text-charcoal">How did you hear about us?</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                    <SelectTrigger className="h-14 text-base">
                                        <SelectValue placeholder="Select one..." />
                                    </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="twitter">Social Media (Twitter/X)</SelectItem>
                                        <SelectItem value="linkedin">Social Media (LinkedIn)</SelectItem>
                                        <SelectItem value="search">Search Engine</SelectItem>
                                        <SelectItem value="friend">Friend or Colleague</SelectItem>
                                        <SelectItem value="blog">Blog or Article</SelectItem>
                                        <SelectItem value="youtube">YouTube</SelectItem>
                                        <SelectItem value="other">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                                </FormItem>
                            )}
                        />
                        <div className="space-y-2 pt-4">
                            <FormLabel className="text-base font-medium text-charcoal">Email Preferences</FormLabel>
                             <FormField control={form.control} name="productUpdates" render={({ field }) => (
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} className="h-5 w-5"/></FormControl>
                                    <FormLabel className="font-normal text-charcoal">Send me product updates and news (Recommended)</FormLabel>
                                </FormItem>
                            )}/>
                            <FormField control={form.control} name="betaTesting" render={({ field }) => (
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} className="h-5 w-5"/></FormControl>
                                    <FormLabel className="font-normal text-charcoal">Notify me about beta testing opportunities</FormLabel>
                                </FormItem>
                            )}/>
                            <FormField control={form.control} name="partnerships" render={({ field }) => (
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} className="h-5 w-5"/></FormControl>
                                    <FormLabel className="font-normal text-charcoal">I'm interested in partnership opportunities</FormLabel>
                                </FormItem>
                            )}/>
                        </div>
                        <Button
                          type="submit"
                          className="w-full h-14 bg-navy-gradient text-lg font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-ocean/30 disabled:bg-gray-400"
                          disabled={submissionState === 'submitting' || referralStatus === 'self' || referralStatus === 'checking'}
                        >
                          {submissionState === 'submitting' ? (
                            <><Loader2 className="mr-2 h-6 w-6 animate-spin" /> Joining...</>
                          ) : (
                            <>Join Waitlist <ArrowRight className="ml-2 h-5 w-5" /></>
                          )}
                        </Button>
                        {errorMessage && <p className="text-center text-sm text-red-500">{errorMessage}</p>}
                        <p className="text-center text-xs text-silver">
                            🔒 We respect your privacy. Your email will never be shared. Unsubscribe anytime.
                        </p>
                    </form>
                </Form>
            </div>
        </div>
    </div>
  );
}
