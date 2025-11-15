'use client';

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useFirebase } from "@/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export function GoogleButton() {
  const { auth } = useFirebase();

  const handleGoogleLogin = async () => {
    if (!auth) return;
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      // After successful login, you might want to redirect the user
      // For now, Firebase's onAuthStateChanged will handle the user state update.
      console.log('Successfully signed in with Google');
      // window.location.href = '/dashboard'; // Example redirect
    } catch (error) {
      console.error('Error during Google sign-in:', error);
    }
  };

  return (
    <Button
      variant="outline"
      className="h-14 w-full border-2 border-stone-200 text-base font-semibold text-charcoal hover:border-cyan hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200"
      onClick={handleGoogleLogin}
    >
      <Image src="/google-logo.svg" alt="Google" width={24} height={24} className="mr-3" />
      Continue with Google
    </Button>
  );
}
