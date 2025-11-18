
import Link from "next/link";

export function TermsHero() {
  return (
    <section 
      className="pt-[140px] pb-[80px] bg-white"
    >
      <div className="container mx-auto px-4 md:px-6 text-center">
        <div className="mb-6 text-sm text-silver">
          <Link href="/" className="hover:text-ocean">Home</Link>
          <span className="mx-2">/</span>
          <span>Terms of Service</span>
        </div>
        <h1 className="text-navy font-light text-6xl sm:text-7xl !leading-tight tracking-tighter max-w-[900px] mx-auto mb-4">
          Terms of Service
        </h1>
        <p className="text-charcoal font-medium text-base sm:text-lg max-w-[740px] mx-auto mb-12">
          Last updated: November 17, 2025
        </p>
        <p className="text-charcoal font-light text-xl leading-relaxed max-w-[800px] mx-auto">
          These Terms of Service ("Terms") govern your access to and use of Lumivex's website, platform, and services. By using Lumivex, you agree to be bound by these Terms. Please read them carefully.
        </p>
      </div>
    </section>
  );
}
