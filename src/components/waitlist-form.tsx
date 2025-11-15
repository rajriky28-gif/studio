"use client";

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { ArrowRight, CheckCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { useFirebase, initiateAnonymousSignIn, addDocumentNonBlocking } from '@/firebase';
import { collection, serverTimestamp, doc, setDoc } from 'firebase/firestore';

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
});

export function WaitlistForm() {
  const [submissionState, setSubmissionState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const { auth, firestore, user, isUserLoading } = useFirebase();

  useEffect(() => {
    if (!isUserLoading && !user) {
      initiateAnonymousSignIn(auth);
    }
  }, [user, isUserLoading, auth]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "" },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setSubmissionState('submitting');
    setErrorMessage('');

    if (!user) {
      setErrorMessage('Authentication not ready. Please try again in a moment.');
      setSubmissionState('error');
      return;
    }

    try {
      const waitlistRef = collection(firestore, 'waitlistEntries');
      const newEntryRef = doc(waitlistRef);
      const newEntry = {
        id: newEntryRef.id,
        email: values.email,
        timestamp: serverTimestamp(),
        // You can add more fields here, like a referrer
      };

      // Use non-blocking write
      setDoc(newEntryRef, newEntry).catch(err => {
        console.error("Error writing to Firestore: ", err);
        setErrorMessage('Failed to submit. Please check your connection or security rules.');
        setSubmissionState('error');
      });

      // Optimistically move to success state
      setSubmissionState('success');
      form.reset();

    } catch (error) {
      console.error('Waitlist Error:', error);
      // This catch block might not be hit for security rule errors with non-blocking writes,
      // but it's good practice to keep it for other potential errors.
      setErrorMessage('An unexpected error occurred. Please try again.');
      setSubmissionState('error');
    }
  }

  if (submissionState === 'success') {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg bg-green-50 p-8 text-center text-green-700">
        <CheckCircle className="h-12 w-12" />
        <h3 className="mt-4 text-2xl font-semibold">You're on the list!</h3>
        <p className="mt-2">Check your email for a confirmation. We'll be in touch soon.</p>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  className="h-14 rounded-lg px-6 text-base focus-visible:ring-cyan"
                  disabled={submissionState === 'submitting' || isUserLoading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full h-14 bg-navy-gradient text-lg font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-ocean/20"
          disabled={submissionState === 'submitting' || isUserLoading}
        >
          {submissionState === 'submitting' || isUserLoading ? (
            <Loader2 className="mr-2 h-6 w-6 animate-spin" />
          ) : (
            <>
              Join the Waitlist <ArrowRight className="ml-2 h-5 w-5" />
            </>
          )}
        </Button>
        {submissionState === 'error' && (
            <p className="text-center text-sm text-red-500">{errorMessage}</p>
        )}
        <p className="text-center text-xs text-silver">
          We respect your privacy. Unsubscribe anytime. No spam, ever.
        </p>
      </form>
    </Form>
  );
}
