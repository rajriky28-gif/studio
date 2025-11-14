'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { ArrowRight, CheckCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import Link from 'next/link';

const formSchema = z.object({
  fullName: z.string().min(1, { message: "Full name is required." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  subject: z.string().min(1, { message: "Subject is required." }),
  category: z.string().min(1, { message: "Please select a category." }),
  message: z.string().min(20, { message: "Message must be at least 20 characters." }),
});

export function ContactFormSection() {
  const [submissionState, setSubmissionState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      subject: "",
      category: "",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setSubmissionState('submitting');
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log(values);
    setSubmissionState('success');
  }

  if (submissionState === 'success') {
    return (
      <section id="contact-form" className="bg-cream py-24 sm:py-32">
        <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center rounded-lg bg-green-50 p-12 text-center text-green-800 border border-green-200">
              <CheckCircle className="h-16 w-16 text-green-500" />
              <h3 className="mt-6 text-3xl font-semibold">Message Sent Successfully!</h3>
              <p className="mt-4 max-w-md">
                Thank you for reaching out. We've received your message and will get back to you within 24-48 hours.
              </p>
              <p className="mt-2 text-sm text-green-600">Expected response: Within 48 hours</p>
            </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact-form" className="bg-cream py-24 sm:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-normal text-navy sm:text-5xl lg:text-6xl tracking-tighter">
            Send Us a Message
          </h2>
          <p className="mt-4 text-lg text-charcoal sm:text-xl">
            Prefer to use a form? Fill out the details below and we'll get back to you as soon as possible.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-3xl">
          <div className="rounded-2xl bg-white p-8 shadow-lg sm:p-12">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your full name" {...field} />
                        </FormControl>
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
                        <FormControl>
                          <Input type="email" placeholder="your.email@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subject</FormLabel>
                      <FormControl>
                        <Input placeholder="What is this about?" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="General Inquiry">General Inquiry</SelectItem>
                          <SelectItem value="Partnership">Partnership</SelectItem>
                          <SelectItem value="Media/Press">Media/Press</SelectItem>
                          <SelectItem value="Careers">Careers</SelectItem>
                          <SelectItem value="Technical Question">Technical Question</SelectItem>
                          <SelectItem value="Feedback">Feedback</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Tell us more about your inquiry..." rows={6} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full h-12 bg-navy-gradient text-md font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-ocean/20"
                  disabled={submissionState === 'submitting'}
                >
                  {submissionState === 'submitting' ? (
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  ) : (
                    <>
                      Send Message <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
                <p className="text-center text-xs text-silver">
                  We respect your privacy. Your information will never be shared with third parties. Read our <Link href="#" className="underline hover:text-ocean">Privacy Policy</Link>.
                </p>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
}