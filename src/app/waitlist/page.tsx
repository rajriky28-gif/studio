import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { WaitlistHero } from "@/components/sections/waitlist-page/hero";
import { WhyJoin } from "@/components/sections/waitlist-page/why-join";
import { Stats } from "@/components/sections/waitlist-page/stats";
import { SignupFormSection } from "@/components/sections/waitlist-page/signup-form-section";
import { ReferralProgram } from "@/components/sections/waitlist-page/referral-program";
import { Community } from "@/components/sections/waitlist-page/community";
import { Timeline } from "@/components/sections/waitlist-page/timeline";
import { Faq } from "@/components/sections/waitlist-page/faq";
import { SocialProof } from "@/components/sections/waitlist-page/social-proof";
import { FinalCta } from "@/components/sections/waitlist-page/final-cta";


export default function WaitlistPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-grow">
        <WaitlistHero />
        <WhyJoin />
        <Stats />
        <SignupFormSection />
        <ReferralProgram />
        <Community />
        <Timeline />
        <Faq />
        <SocialProof />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
