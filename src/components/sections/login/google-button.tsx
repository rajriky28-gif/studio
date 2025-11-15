
'use client';

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useFirebase } from "@/firebase";
import { GoogleAuthProvider, signInWithPopup, getAdditionalUserInfo } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';

export function GoogleButton() {
  const { auth, firestore } = useFirebase();

  const handleGoogleLogin = async () => {
    if (!auth || !firestore) return;
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
      
      console.log('Successfully signed in with Google');
      // Redirect is handled by an auth state listener in a higher-order component
    } catch (error) {
      console.error('Error during Google sign-in:', error);
    }
  };

  return (
    <Button
      variant="outline"
      className="h-14 w-full border-stone-300 bg-white text-base font-semibold text-charcoal shadow-sm transition-all duration-200 hover:border-cyan hover:shadow-lg hover:shadow-cyan/10 hover:-translate-y-px"
      onClick={handleGoogleLogin}
    >
      <Image src="/google-logo.svg" alt="Google" width={24} height={24} className="mr-3" />
      Continue with Google
    </Button>
  );
}
