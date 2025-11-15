
'use client';

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useFirebase } from "@/firebase";
import { GoogleAuthProvider, signInWithPopup, getAdditionalUserInfo } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { useState } from "react";
import { Loader2 } from "lucide-react";

export function GoogleButton() {
  const { auth, firestore } = useFirebase();
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = async () => {
    if (!auth || !firestore) return;
    setIsLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const additionalInfo = getAdditionalUserInfo(result);

      if (additionalInfo?.isNewUser) {
        const userDocRef = doc(firestore, "users", user.uid);
        await setDoc(userDocRef, {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            createdAt: serverTimestamp(),
        });
      }
    } catch (error) {
      console.error('Error during Google sign-in:', error);
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <Button
      variant="outline"
      className="h-14 w-full border-white/25 bg-white/10 text-base font-semibold text-white shadow-sm backdrop-blur-sm transition-all duration-300 hover:bg-white/20 hover:border-cyan/60 hover:-translate-y-px hover:shadow-lg hover:shadow-cyan/10"
      onClick={handleGoogleLogin}
      disabled={isLoading}
    >
      {isLoading ? (
        <>
            <Loader2 className="mr-3 h-5 w-5 animate-spin" />
            Connecting to Google...
        </>
      ) : (
        <>
            <Image src="/google-logo.svg" alt="Google" width={24} height={24} className="mr-3" />
            Continue with Google
        </>
      )}
    </Button>
  );
}
