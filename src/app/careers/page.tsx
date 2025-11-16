import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { CareersHero } from "@/components/sections/careers/hero";
import { JobListings } from "@/components/sections/careers/job-listings";
import { WhyLumivex } from "@/components/sections/careers/why-lumivex";
import { Faq } from "@/components/sections/careers/faq";
import { FinalCta } from "@/components/sections/careers/final-cta";

export default function CareersPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-grow">
        <CareersHero />
        <JobListings />
        <WhyLumivex />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}