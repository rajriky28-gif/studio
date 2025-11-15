
'use client';

import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Eye, EyeOff, Check, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormMessage, FormItem } from '@/components/ui/form';
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
    if (isLoading) return;
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
    <motion.div 
        className="w-full max-w-[580px] mx-auto rounded-[32px] border border-white/15 bg-white/10 p-12 shadow-2xl backdrop-blur-2xl"
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
    >
        <div className="text-center">
            <h2 className="text-4xl font-light text-white">{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
            <p className="mt-3 text-base text-cyan/70">{isLogin ? 'Enter your credentials to continue' : 'Join thousands building the future'}</p>
        </div>

        <div className="relative mt-10 p-1.5 flex items-center rounded-xl bg-white/10">
            <motion.div
                layoutId="pill"
                className="absolute h-[calc(100%-12px)] w-[calc(50%-6px)] bg-white/20 rounded-lg shadow-md backdrop-blur-sm"
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                style={{ left: isLogin ? '6px' : 'calc(50% + 3px)' }}
            />
            <Button 
                onClick={() => handleStateChange('login')} 
                variant="ghost" 
                className={cn(
                    "relative z-10 w-1/2 rounded-lg py-3 transition-colors duration-300",
                    isLogin ? "text-white" : "text-white/50 hover:text-white/70"
                )}
                disabled={isLogin}
            >
                Login
            </Button>
            <Button 
                onClick={() => handleStateChange('signup')} 
                variant="ghost" 
                className={cn(
                    "relative z-10 w-1/2 rounded-lg py-3 transition-colors duration-300",
                    !isLogin ? "text-white" : "text-white/50 hover:text-white/70"
                )}
                disabled={!isLogin}
            >
                Sign Up
            </Button>
        </div>

        <div className="mt-8">
            <GoogleButton />
        </div>

        <div className="my-6 flex items-center">
            <div className="flex-grow border-t border-white/10"></div>
            <span className="mx-4 flex-shrink text-xs font-medium text-white/50 uppercase">or</span>
            <div className="flex-grow border-t border-white/10"></div>
        </div>

        <AnimatePresence mode="wait">
        {error && (
            <motion.div
                key="error-message"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-4 flex items-center gap-3 rounded-lg border border-red-500/50 bg-red-500/10 p-3 text-sm text-red-300"
            >
                <AlertCircle className="h-5 w-5 flex-shrink-0" />
                <p>{error}</p>
            </motion.div>
        )}
      </AnimatePresence>

        <FormProvider {...form}>
            <form 
              onSubmit={form.handleSubmit(onSubmit as any)} 
              className="space-y-5"
            >
                <motion.div layout transition={{ type: 'spring', duration: 0.6, bounce: 0.2 }}>
                <AnimatePresence initial={false}>
                    {!isLogin && (
                    <motion.div
                        key="fullName"
                        className="overflow-hidden"
                        initial={{ height: 0, opacity: 0, y: -20 }}
                        animate={{ height: 'auto', opacity: 1, y: 0 }}
                        exit={{ height: 0, opacity: 0, y: -20 }}
                        transition={{ duration: 0.4, ease: 'easeInOut' }}
                    >
                        <div className="mb-5">
                           <FloatingLabelInput form={signupForm} name="fullName" label="Full Name" />
                        </div>
                    </motion.div>
                    )}
                </AnimatePresence>
                
                <div className="space-y-5">
                    <FloatingLabelInput form={form} name="email" label="Email Address" type="email" />
                    <FloatingLabelInput form={form} name="password" label="Password" type="password" />
                </div>

                {!isLogin && (
                    <PasswordStrength password={signupForm.watch('password')} />
                )}

                <AnimatePresence>
                    {!isLogin && (
                    <motion.div
                        key="confirmPassword"
                        className="overflow-hidden"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1, transition: { delay: 0.1 } }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: 'easeInOut' }}
                    >
                         <div className="mt-5">
                           <FloatingLabelInput form={signupForm} name="confirmPassword" label="Confirm Password" type="password" />
                         </div>
                    </motion.div>
                    )}
                </AnimatePresence>
                </motion.div>
                
                <motion.div layout>
                    <AnimatePresence>
                        {isLogin && (
                        <motion.div
                            key="forgotPassword"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1, transition: { delay: 0.3 } }}
                            exit={{ opacity: 0 }}
                            className="text-right pt-2"
                        >
                            <Link href="#" className="text-sm font-medium text-cyan/80 hover:text-cyan hover:underline">
                            Forgot Password?
                            </Link>
                        </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
                
                <AnimatePresence>
                    {!isLogin && (
                    <motion.div
                        key="terms"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1, transition: { delay: 0.4 } }}
                        exit={{ opacity: 0 }}
                        className="overflow-hidden pt-4"
                    >
                        <FormField
                        control={signupForm.control}
                        name="terms"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} id="terms" /></FormControl>
                            <div className="grid gap-1.5 leading-none">
                                <label htmlFor="terms" className="text-sm font-normal text-white/70 peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                I agree to the <Link href="#" className="text-cyan/80 hover:underline">Terms</Link> and <Link href="#" className="text-cyan/80 hover:underline">Privacy Policy</Link>
                                </label>
                                <FormMessage />
                            </div>
                            </FormItem>
                        )}
                        />
                    </motion.div>
                    )}
                </AnimatePresence>

                <div className="pt-6">
                <Button
                    type="submit"
                    className="w-full h-14 bg-gradient-to-r from-cyan to-blue-500 text-base font-semibold text-white shadow-lg shadow-cyan/20 transition-all duration-300 hover:shadow-xl hover:shadow-cyan/40 hover:-translate-y-px"
                    disabled={isLoading || (!isLogin && !signupForm.formState.isValid)}
                >
                    {isLoading ? <Loader2 className="mr-2 h-6 w-6 animate-spin" /> : (isLogin ? 'Login to Lumivex' : 'Create Account')}
                </Button>
                </div>

                <p className="pt-4 text-center text-sm text-white/60">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button type="button" onClick={() => handleStateChange(isLogin ? 'signup' : 'login')} className="font-semibold text-cyan/90 hover:text-cyan hover:underline">
                    {isLogin ? 'Sign up' : 'Login'}
                </button>
                </p>
            </form>
        </FormProvider>
        
        <div className="mt-12 text-center text-xs text-white/40 space-x-4">
            <span>🔒 Secure & Encrypted</span>
            <span>✓ GDPR Compliant</span>
       </div>
    </motion.div>
  );
}

// Floating Label Input Component
function FloatingLabelInput({ form, name, label, type = 'text' }: { form: any, name: string, label: string, type?: string }) {
    const [showPassword, setShowPassword] = useState(false);
    const value = form.watch(name);
  
    const handleTogglePassword = () => setShowPassword(prev => !prev);
    const inputType = type === 'password' ? (showPassword ? 'text' : 'password') : type;
  
    const { error } = form.getFieldState(name);
  
    return (
      <FormField
        control={form.control}
        name={name}
        render={({ field }) => (
            <div className="relative mb-5">
                <div 
                    className={cn(
                        "group relative rounded-xl border transition-all duration-300",
                        "border-white/10 bg-white/[.05]",
                        error ? "border-red-500/50" : "focus-within:border-cyan/80",
                        error ? "focus-within:shadow-[0_4px_6px_-1px_rgba(239,68,68,0.1)]" : "focus-within:shadow-[0_4px_6px_-1px_rgba(6,182,212,0.1)]",
                        "hover:border-white/20"
                    )}
                >
                    <label
                        htmlFor={name}
                        className={cn(
                            "absolute left-4 transition-all duration-300 pointer-events-none text-white/50",
                            "group-focus-within:top-2 group-focus-within:text-xs group-focus-within:text-cyan/90",
                            value ? "top-2 text-xs" : "top-1/2 -translate-y-1/2 text-base",
                            error ? "group-focus-within:text-red-400 text-red-400" : (value ? "text-cyan/90" : ""),
                            value && !error ? "text-cyan/90" : ""
                        )}
                    >
                        {label}
                    </label>
                    <Input
                        id={name}
                        type={inputType}
                        className={cn(
                            "h-14 w-full bg-transparent border-none p-0 px-4 pt-5 text-base text-white ring-offset-background",
                            "focus-visible:ring-0 focus-visible:ring-offset-0"
                        )}
                        {...field}
                    />
                    {type === 'password' && (
                        <button
                        type="button"
                        onClick={handleTogglePassword}
                        className="absolute inset-y-0 right-0 flex items-center pr-4 text-white/40 hover:text-white/70"
                        >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                    )}
                    {name === 'confirmPassword' && form.formState.dirtyFields.confirmPassword && form.getValues().password && (
                        <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                            {form.getValues().confirmPassword === form.getValues().password ? <Check className="h-5 w-5 text-green-400" /> : null}
                        </div>
                    )}
                </div>
                <FormMessage className="text-xs pt-1 text-red-400" />
            </div>
        )}
      />
    );
  }
