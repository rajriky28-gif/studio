import { Header } from "@/components/sections/header";
import { Hero } from "@/components/sections/hero";
import { HowItWorks } from "@/components/sections/how-it-works";
import { UseCases } from "@/components/sections/use-cases";
import { Features } from "@/components/sections/features";
import { Waitlist } from "@/components/sections/waitlist";
import { FoundersNote } from "@/components/sections/founders-note";
import { SocialProof } from "@/components/sections/social-proof";
import { FinalCta } from "@/components/sections/final-cta";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <Hero />
        <HowItWorks />
        <UseCases />
        <Features />
        <Waitlist />
        <FoundersNote />
        <SocialProof />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
