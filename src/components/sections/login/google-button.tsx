
'use client';

import { Button } from "@/components/ui/button";
import { useFirebase } from "@/firebase";
import { GoogleAuthProvider, signInWithPopup, getAdditionalUserInfo } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { useState } from "react";
import { Loader2 } from "lucide-react";

function GoogleIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 48 48"
        width="24px"
        height="24px"
      >
        <path
          fill="#FFC107"
          d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
        />
        <path
          fill="#FF3D00"
          d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
        />
        <path
          fill="#4CAF50"
          d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.222,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
        />
        <path
          fill="#1976D2"
          d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.574l6.19,5.238C39.712,34.421,44,28.718,44,24C44,22.659,43.862,21.35,43.611,20.083z"
        />
      </svg>
    );
}
  

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
            <GoogleIcon className="mr-3" />
            Continue with Google
        </>
      )}
    </Button>
  );
}
