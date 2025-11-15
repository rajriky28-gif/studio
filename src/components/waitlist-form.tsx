'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { ArrowRight, CheckCircle, Loader2, Copy, Twitter, Linkedin, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useFirebase, initiateAnonymousSignIn } from '@/firebase';
import { collection, serverTimestamp, doc, setDoc } from 'firebase/firestore';

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  fullName: z.string().min(2, { message: "Please enter your full name." }),
  useCase: z.string().optional(),
  referralSource: z.string().optional(),
  country: z.string().optional(),
  company: z.string().optional(),
  role: z.string().optional(),
  updates: z.boolean().default(false),
  beta: z.boolean().default(false),
  partnership: z.boolean().default(false),
  terms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms.",
  }),
});

export function WaitlistForm() {
  const [submissionState, setSubmissionState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [referralLink, setReferralLink] = useState('');
  const [copied, setCopied] = useState(false);
  const { auth, firestore, user, isUserLoading } = useFirebase();

  useEffect(() => {
    if (!isUserLoading && !user) {
      initiateAnonymousSignIn(auth);
    }
  }, [user, isUserLoading, auth]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      fullName: "",
      useCase: "",
      referralSource: "",
      country: "",
      company: "",
      role: "",
      updates: true,
      beta: true,
      partnership: false,
      terms: true,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setSubmissionState('submitting');
    setErrorMessage('');

    if (!user || !firestore) {
      setErrorMessage('Authentication not ready. Please try again in a moment.');
      setSubmissionState('error');
      return;
    }

    try {
      const waitlistRef = collection(firestore, 'waitlistEntries');
      const newEntryRef = doc(waitlistRef);
      const referralCode = newEntryRef.id.substring(0, 8);

      const newEntry = {
        id: newEntryRef.id,
        email: values.email,
        fullName: values.fullName,
        useCase: values.useCase,
        referralSource: values.referralSource,
        country: values.country,
        company: values.company,
        role: values.role,
        emailPreferences: {
          updates: values.updates,
          beta: values.beta,
          partnership: values.partnership,
        },
        verified: false,
        referralCode: referralCode,
        referredBy: null, // This would be set based on URL params
        referralCount: 0,
        position: 2848, // Initial position
        timestamp: serverTimestamp(),
      };

      setDoc(newEntryRef, newEntry).catch(err => {
        console.error("Error writing to Firestore: ", err);
        setErrorMessage('Failed to submit. Please check your connection or security rules.');
        setSubmissionState('error');
      });

      setReferralLink(`https://lumivex.com/waitlist?ref=${referralCode}`);
      setSubmissionState('success');
      // Don't reset form, we need the email for the success message

    } catch (error) {
      console.error('Waitlist Error:', error);
      setErrorMessage('An unexpected error occurred. Please try again.');
      setSubmissionState('error');
    }
  }
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (submissionState === 'success') {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg bg-green-50 p-8 text-center text-green-800 border border-green-200">
        <CheckCircle className="h-16 w-16 text-green-500" />
        <h3 className="mt-6 text-3xl font-semibold">You're on the list!</h3>
        <p className="mt-2 max-w-md">
          Welcome to the Lumivex community! We've sent a confirmation email to <span className="font-semibold text-green-900">{form.getValues('email')}</span>.
        </p>

        <div className="mt-8 w-full border-t border-green-200 pt-8">
            <h4 className="font-semibold text-lg text-green-900">Help Us Spread the Word</h4>
            <p className="text-sm mt-1">Share your unique referral link and move up in the waitlist.</p>

            <div className="mt-4 flex flex-col sm:flex-row gap-2">
                <Input value={referralLink} readOnly className="bg-white text-green-900"/>
                <Button onClick={copyToClipboard} variant="outline" className="text-green-800 border-green-300 hover:bg-green-100">
                    <Copy className="h-4 w-4 mr-2"/>
                    {copied ? 'Copied!' : 'Copy'}
                </Button>
            </div>
             <div className="mt-4 flex justify-center gap-2">
                <Button variant="outline" size="icon" className="text-green-800 border-green-300 hover:bg-green-100"><Twitter className="h-4 w-4"/></Button>
                <Button variant="outline" size="icon" className="text-green-800 border-green-300 hover:bg-green-100"><Linkedin className="h-4 w-4"/></Button>
                <Button variant="outline" size="icon" className="text-green-800 border-green-300 hover:bg-green-100"><Mail className="h-4 w-4"/></Button>
            </div>

            <div className="mt-6 text-sm flex justify-center gap-6">
                <div>
                    <p className="font-bold text-lg">0</p>
                    <p className="text-xs">People Referred</p>
                </div>
                 <div>
                    <p className="font-bold text-lg">#2,848</p>
                    <p className="text-xs">Your Position</p>
                </div>
            </div>
        </div>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl><Input placeholder="Your full name" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl><Input type="email" placeholder="your.email@example.com" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
            control={form.control}
            name="useCase"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Use Case (Optional)</FormLabel>
                <FormControl><Textarea placeholder="e.g., Automate customer support for my e-commerce store" {...field} /></FormControl>
              </FormItem>
            )}
          />
        <FormField
            control={form.control}
            name="referralSource"
            render={({ field }) => (
                <FormItem>
                <FormLabel>How did you hear about us? (Optional)</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                    <SelectTrigger><SelectValue placeholder="Select one..." /></SelectTrigger>
                    </FormControl>
                    <SelectContent>
                        <SelectItem value="twitter">Social Media (Twitter/X)</SelectItem>
                        <SelectItem value="linkedin">Social Media (LinkedIn)</SelectItem>
                        <SelectItem value="search">Search Engine</SelectItem>
                        <SelectItem value="friend">Friend/Colleague</SelectItem>
                        <SelectItem value="blog">Blog/Article</SelectItem>
                        <SelectItem value="newsletter">Newsletter</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                </Select>
                </FormItem>
            )}
        />
        
        <div className="space-y-2 border-t pt-6">
            <FormLabel>Email Preferences</FormLabel>
            <div className="space-y-2">
                 <FormField
                    control={form.control}
                    name="updates"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                            <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                            <FormLabel className="font-normal text-sm">I want to receive product updates and exclusive content (Recommended)</FormLabel>
                        </FormItem>
                    )}
                 />
                <FormField
                    control={form.control}
                    name="beta"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                            <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                            <FormLabel className="font-normal text-sm">I'm interested in beta testing opportunities</FormLabel>
                        </FormItem>
                    )}
                 />
                 <FormField
                    control={form.control}
                    name="partnership"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                            <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                            <FormLabel className="font-normal text-sm">I'd like to hear about partnership opportunities</FormLabel>
                        </FormItem>
                    )}
                 />
            </div>
        </div>

         <FormField
            control={form.control}
            name="terms"
            render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 pt-4">
                    <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                    <div className="space-y-1 leading-none">
                        <FormLabel>I agree to the <a href="#" className="text-ocean hover:underline">Privacy Policy</a> and <a href="#" className="text-ocean hover:underline">Terms of Service</a></FormLabel>
                        <FormMessage />
                    </div>
                </FormItem>
            )}
            />

        <Button
          type="submit"
          className="w-full h-14 bg-navy-gradient text-lg font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-ocean/20"
          disabled={submissionState === 'submitting' || isUserLoading}
        >
          {submissionState === 'submitting' || isUserLoading ? (
            <><Loader2 className="mr-2 h-6 w-6 animate-spin" /> Joining...</>
          ) : (
            <>Join the Waitlist <ArrowRight className="ml-2 h-5 w-5" /></>
          )}
        </Button>
        {errorMessage && <p className="text-center text-sm text-red-500">{errorMessage}</p>}
        <p className="text-center text-xs text-silver">
          🔒 We respect your privacy. Unsubscribe anytime.
        </p>
      </form>
    </Form>
  );
}
