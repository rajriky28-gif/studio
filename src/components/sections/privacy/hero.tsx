
import Link from "next/link";

export function PrivacyHero() {
  return (
    <section 
      className="pt-[140px] pb-[80px] bg-white"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-left mb-6">
          <p className="text-sm text-gray-500">
            <Link href="/" className="hover:text-ocean">Home</Link>
            <span className="mx-2">/</span>
            <span>Privacy Policy</span>
          </p>
        </div>
        <div className="text-center">
            <h1 className="text-navy font-light text-6xl sm:text-7xl !leading-tight tracking-tighter max-w-[900px] mx-auto mb-4">
            Privacy Policy
            </h1>
            <p className="text-charcoal font-medium text-base sm:text-lg max-w-[740px] mx-auto mb-12">
            Last updated: November 17, 2025
            </p>
            <p className="text-charcoal font-light text-xl leading-relaxed max-w-[800px] mx-auto">
            At Lumivex, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
            </p>
        </div>
      </div>
    </section>
  );
}
