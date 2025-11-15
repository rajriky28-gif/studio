
import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { VisionHero } from "@/components/sections/vision/hero";
import { FutureWeSee } from "@/components/sections/vision/future-we-see";
import { Pillars } from "@/components/sections/vision/pillars";
import { WorldWeBuild } from "@/components/sections/vision/world-we-build";
import { RippleEffects } from "@/components/sections/vision/ripple-effects";
import { Roadmap } from "@/components/sections/vision/timeline";
import { WhyNow } from "@/components/sections/vision/why-now";
import { Commitment } from "@/components/sections/vision/commitment";
import { JoinVision } from "@/components/sections/vision/join-vision";
import { StayConnected } from "@/components/sections/vision/stay-connected";

export default function VisionPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-grow">
        <VisionHero />
        <FutureWeSee />
        <Pillars />
        <WorldWeBuild />
        <RippleEffects />
        <Roadmap />
        <WhyNow />
        <Commitment />
        <JoinVision />
        <StayConnected />
      </main>
      <Footer />
    </div>
  );
}
