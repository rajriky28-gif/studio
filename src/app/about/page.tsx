import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { AboutHero } from "@/components/sections/about/hero";
import { Mission } from "@/components/sections/about/mission";
import { Vision } from "@/components/sections/about/vision";
import { Problem } from "@/components/sections/about/problem";
import { Solution } from "@/components/sections/about/solution";
import { Values } from "@/components/sections/about/values";
import { Journey } from "@/components/sections/about/journey";
import { Team } from "@/components/sections/about/team";
import { Impact } from "@/components/sections/about/impact";
import { JoinUs } from "@/components/sections/about/join-us";
import { FinalCta } from "@/components/sections/final-cta";


export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-grow">
        <AboutHero />
        <Mission />
        <Vision />
        <Problem />
        <Solution />
        <Values />
        <Journey />
        <Team />
        <Impact />
        <JoinUs />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}