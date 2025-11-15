
'use client';

import { Button } from "@/components/ui/button";
import Image from "next/image";

export function GoogleButton() {
  const handleGoogleLogin = () => {
    // Firebase Google Auth logic goes here
    console.log('Continuing with Google');
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
