
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import Link from 'next/link';
import { GoogleButton } from './google-button';

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(1, { message: "Password is required." }),
});

export function LoginTab() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    setIsLoading(true);
    setError('');
    // Simulate login
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log("Login submitted", values);
    // Add Firebase login logic here
    setIsLoading(false);
  }

  return (
    <div>
      <div className="text-center">
        <h2 className="text-3xl font-semibold text-navy">Welcome Back</h2>
        <p className="mt-2 text-base text-charcoal/80">Login to access your Lumivex account</p>
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
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <div className="relative">
                  <FormControl>
                    <Input type={showPassword ? "text" : "password"} placeholder="Enter your password" {...field} />
                  </FormControl>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="text-right">
            <Link href="#" className="text-sm font-medium text-ocean hover:underline">
              Forgot Password?
            </Link>
          </div>
          <Button
            type="submit"
            className="w-full h-14 bg-navy-gradient text-lg font-semibold"
            disabled={isLoading}
          >
            {isLoading ? <Loader2 className="mr-2 h-6 w-6 animate-spin" /> : 'Login'}
          </Button>
          {error && <p className="text-center text-sm text-red-500">{error}</p>}
        </form>
      </Form>
    </div>
  );
}
