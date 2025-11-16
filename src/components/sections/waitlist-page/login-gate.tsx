'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowRight, Lock } from 'lucide-react';

export default function WaitlistLoginGate() {
  const router = useRouter();

  const handleLoginRedirect = () => {
    sessionStorage.setItem('returnUrl', '/waitlist');
    router.push('/login');
  };
  
  const scrollToBenefits = () => {
    document.getElementById('waitlist-benefits')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="py-20 md:py-32">
        <div className="container mx-auto px-4">
            <div className="max-w-xl mx-auto text-center bg-white border border-gray-200 rounded-3xl p-10 md:p-16 shadow-lg">
                <Lock className="h-16 w-16 text-navy mx-auto mb-6" />
                <h1 className="text-5xl font-light text-navy mb-4">
                    Login Required
                </h1>
                <p className="text-lg text-charcoal/80 leading-relaxed max-w-md mx-auto mb-10">
                    Please login or create an account to join our waitlist and get your exclusive referral code.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                        size="lg"
                        className="h-auto bg-navy-gradient px-12 py-5 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
                        onClick={handleLoginRedirect}
                    >
                        Login / Sign Up
                        <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                    <Button
                        size="lg"
                        variant="outline"
                         className="h-auto border-2 border-navy text-navy bg-transparent hover:bg-cream px-12 py-5 text-base font-semibold"
                        onClick={scrollToBenefits}
                    >
                        Learn More
                    </Button>
                </div>
                 <p className="mt-6 text-sm text-gray-500">Takes less than 2 minutes</p>
            </div>
        </div>
    </div>
  );
}
