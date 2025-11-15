
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Eye, EyeOff, Check, X, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import Link from 'next/link';
import { GoogleButton } from './google-button';
import { PasswordStrength } from './password-strength';

const signupSchema = z.object({
  fullName: z.string().min(2, { message: "Full name is required." }),
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
  confirmPassword: z.string(),
  terms: z.boolean().refine(val => val === true, { message: "You must accept the terms and conditions." }),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match.",
  path: ["confirmPassword"],
});

export function SignupTab() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: { fullName: "", email: "", password: "", confirmPassword: "", terms: false },
    mode: 'onTouched'
  });

  const passwordValue = form.watch('password');
  const confirmPasswordValue = form.watch('confirmPassword');

  async function onSubmit(values: z.infer<typeof signupSchema>) {
    setIsLoading(true);
    setError('');
    // Simulate signup
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log("Signup submitted", values);
    // Add Firebase signup logic here
    setIsLoading(false);
  }

  return (
    <div>
      <div className="text-center">
        <h2 className="text-3xl font-semibold text-navy">Create Your Account</h2>
        <p className="mt-2 text-base text-charcoal/80">Join thousands building the future with AI</p>
      </div>

      <div className="mt-8">
        <GoogleButton />
      </div>

      <div className="my-6 flex items-center">
        <div className="flex-grow border-t border-stone-200"></div>
        <span className="mx-4 flex-shrink text-sm font-medium text-charcoal/60">OR</span>
        <div className="flex-grow border-t border-stone-200"></div>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl><Input placeholder="John Doe" {...field} /></FormControl>
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
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <div className="relative">
                  <FormControl>
                    <Input type={showPassword ? "text" : "password"} placeholder="Create a password" {...field} />
                  </FormControl>
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500">
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                <PasswordStrength password={passwordValue} />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <div className="relative">
                  <FormControl>
                    <Input type={showConfirmPassword ? "text" : "password"} placeholder="Confirm your password" {...field} />
                  </FormControl>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    {field.value && (passwordValue === confirmPasswordValue ? <Check className="h-5 w-5 text-green-500" /> : <X className="h-5 w-5 text-red-500" />)}
                  </div>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="terms"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 pt-2">
                <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} id="terms" /></FormControl>
                <div className="grid gap-1.5 leading-none">
                  <label htmlFor="terms" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    I agree to the <Link href="#" className="text-ocean hover:underline">Terms of Service</Link> and <Link href="#" className="text-ocean hover:underline">Privacy Policy</Link>
                  </label>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full h-14 bg-navy-gradient text-lg font-semibold"
            disabled={isLoading || !form.formState.isValid}
          >
            {isLoading ? <Loader2 className="mr-2 h-6 w-6 animate-spin" /> : 'Create Account'}
          </Button>
          {error && <p className="text-center text-sm text-red-500">{error}</p>}
        </form>
      </Form>
    </div>
  );
}
