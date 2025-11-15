'use client';

import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Eye, EyeOff, Check, X, Loader2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormMessage } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import Link from 'next/link';
import { GoogleButton } from './google-button';
import { PasswordStrength } from './password-strength';
import { useFirebase } from '@/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(1, { message: "Password is required." }),
});

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

type FormState = 'login' | 'signup';

export function ModernForm() {
  const [formState, setFormState] = useState<FormState>('login');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { auth, firestore } = useFirebase();

  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const signupForm = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: { fullName: "", email: "", password: "", confirmPassword: "", terms: false },
    mode: 'onTouched'
  });

  const handleStateChange = (newState: FormState) => {
    setError('');
    setFormState(newState);
    loginForm.reset();
    signupForm.reset();
  };

  const onLoginSubmit = async (values: z.infer<typeof loginSchema>) => {
    if (!auth) return;
    setIsLoading(true);
    setError('');
    try {
      await signInWithEmailAndPassword(auth, values.email, values.password);
      // Successful login will be handled by the auth state listener
    } catch (err: any) {
      setError(err.code === 'auth/invalid-credential' ? 'Invalid email or password.' : 'An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const onSignupSubmit = async (values: z.infer<typeof signupSchema>) => {
    if (!auth || !firestore) return;
    setIsLoading(true);
    setError('');
    
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
      const user = userCredential.user;

      await updateProfile(user, { displayName: values.fullName });

      const userDocRef = doc(firestore, 'users', user.uid);
      await setDoc(userDocRef, {
        uid: user.uid,
        email: user.email,
        displayName: values.fullName,
        photoURL: user.photoURL,
        createdAt: serverTimestamp()
      });
      // Successful signup will be handled by the auth state listener
    } catch (err: any) {
      if (err.code === 'auth/email-already-in-use') {
        setError('This email is already registered. Please login instead.');
      } else {
        setError(err.message || "Failed to create account. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const isLogin = formState === 'login';
  const form = isLogin ? loginForm : signupForm;
  const onSubmit = isLogin ? onLoginSubmit : onSignupSubmit;

  return (
    <>
      <div className="flex w-full justify-center">
        <div className="relative flex items-center rounded-full bg-slate-100 p-1">
          <motion.div
            layoutId="pill"
            className="absolute h-full w-1/2 bg-white rounded-lg shadow-sm"
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          />
          <Button onClick={() => handleStateChange('login')} variant="ghost" className="relative z-10 w-24 rounded-lg">Login</Button>
          <Button onClick={() => handleStateChange('signup')} variant="ghost" className="relative z-10 w-24 rounded-lg">Sign Up</Button>
        </div>
      </div>
      
      <AnimatePresence mode="wait">
        {error && (
            <motion.div
                key="error-message"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-6 flex items-center gap-3 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700"
            >
                <AlertCircle className="h-5 w-5 flex-shrink-0" />
                <p>{error}</p>
            </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-8">
        <GoogleButton />
      </div>

      <div className="my-8 flex items-center">
        <div className="flex-grow border-t border-stone-200"></div>
        <span className="mx-4 flex-shrink text-xs font-medium text-charcoal/60 uppercase">or continue with email</span>
        <div className="flex-grow border-t border-stone-200"></div>
      </div>
      
      <FormProvider {...form}>
        <motion.form 
          layout
          onSubmit={form.handleSubmit(onSubmit as any)} 
          className="space-y-6"
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        >
          <AnimatePresence>
            {!isLogin && (
              <motion.div
                key="fullName"
                layout="position"
                initial={{ opacity: 0, y: -20, height: 0 }}
                animate={{ opacity: 1, y: 0, height: 'auto' }}
                exit={{ opacity: 0, y: -20, height: 0 }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                className="overflow-hidden"
              >
                <FloatingLabelInput form={signupForm} name="fullName" label="Full Name" />
              </motion.div>
            )}
          </AnimatePresence>

          <FloatingLabelInput form={form} name="email" label="Email Address" type="email" />
          <FloatingLabelInput form={form} name="password" label="Password" type="password" />

          {!isLogin && (
            <PasswordStrength password={signupForm.watch('password')} />
          )}
          
          <AnimatePresence>
            {!isLogin && (
              <motion.div
                key="confirmPassword"
                layout="position"
                initial={{ opacity: 0, y: -20, height: 0 }}
                animate={{ opacity: 1, y: 0, height: 'auto' }}
                exit={{ opacity: 0, y: -20, height: 0 }}
                transition={{ type: 'spring', stiffness: 400, damping: 30, delay: 0.1 }}
                className="overflow-hidden"
              >
                <FloatingLabelInput form={signupForm} name="confirmPassword" label="Confirm Password" type="password" showValidationIcon={true} />
              </motion.div>
            )}
          </AnimatePresence>
          
          <AnimatePresence>
            {isLogin && (
              <motion.div
                key="forgotPassword"
                layout="position"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.2 } }}
                exit={{ opacity: 0 }}
                className="text-right"
              >
                <Link href="#" className="text-sm font-medium text-ocean hover:underline">
                  Forgot Password?
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
          
          <AnimatePresence>
            {!isLogin && (
              <motion.div
                key="terms"
                layout="position"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.2 } }}
                exit={{ opacity: 0 }}
              >
                <FormField
                  control={signupForm.control}
                  name="terms"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 pt-2">
                      <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} id="terms" /></FormControl>
                      <div className="grid gap-1.5 leading-none">
                        <label htmlFor="terms" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          I agree to the <Link href="#" className="text-ocean hover:underline">Terms</Link> and <Link href="#" className="text-ocean hover:underline">Privacy Policy</Link>
                        </label>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
              </motion.div>
            )}
          </AnimatePresence>

          <Button
            type="submit"
            className="w-full h-14 bg-navy-gradient text-lg font-semibold"
            disabled={isLoading || (!isLogin && !signupForm.formState.isValid)}
          >
            {isLoading ? <Loader2 className="mr-2 h-6 w-6 animate-spin" /> : (isLogin ? 'Login to Lumivex' : 'Create Account')}
          </Button>

          <p className="text-center text-sm text-charcoal/80">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button type="button" onClick={() => handleStateChange(isLogin ? 'signup' : 'login')} className="font-semibold text-ocean hover:underline">
              {isLogin ? 'Sign up' : 'Login'}
            </button>
          </p>
        </motion.form>
      </FormProvider>

       <div className="mt-12 text-center text-xs text-silver space-x-4">
            <span>🔒 Secure & Encrypted</span>
            <span>✓ GDPR Compliant</span>
       </div>
    </>
  );
}

// Floating Label Input Component
function FloatingLabelInput({ form, name, label, type = 'text', showValidationIcon = false }: { form: any, name: string, label: string, type?: string, showValidationIcon?: boolean }) {
  const [showPassword, setShowPassword] = useState(false);
  const value = form.watch(name);
  const passwordValue = type === 'password' && name === 'confirmPassword' ? form.watch('password') : null;
  const isDirty = form.formState.dirtyFields[name];

  const handleTogglePassword = () => {
    setShowPassword(prev => !prev);
  }

  const inputType = type === 'password' ? (showPassword ? 'text' : 'password') : type;

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <div className="relative">
          <Input
            type={inputType}
            className={cn(
              "peer h-14 w-full border-0 border-b-2 border-stone-200 bg-transparent p-0 text-base ring-offset-background placeholder-transparent focus:border-cyan focus:ring-0",
              error ? "border-red-500 focus:border-red-500" : ""
            )}
            placeholder=" " // Use a space for the placeholder to enable the :placeholder-shown pseudo-class
            {...field}
          />
          <label
            htmlFor={name}
            className={cn(
              "absolute left-0 -top-3.5 text-xs text-charcoal/80 transition-all",
              "peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400",
              "peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-cyan",
              error ? "text-red-500 peer-focus:text-red-500" : ""
            )}
          >
            {label}
          </label>
          {type === 'password' && name !== 'confirmPassword' && (
            <button
              type="button"
              onClick={handleTogglePassword}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-navy"
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          )}
          {showValidationIcon && isDirty && value && (
             <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                {value === passwordValue ? <Check className="h-5 w-5 text-green-500" /> : <X className="h-5 w-5 text-red-500" />}
            </div>
          )}
           <FormMessage className="text-xs pt-1" />
        </div>
      )}
    />
  );
}
