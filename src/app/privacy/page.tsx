
import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { PrivacyHero } from "@/components/sections/privacy/hero";
import { PrivacyContent } from "@/components/sections/privacy/content";
import { PrivacyTOC } from "@/components/sections/privacy/toc";
import { RelatedResources } from "@/components/sections/privacy/related-resources";

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-grow">
        <PrivacyHero />
        <div className="container mx-auto px-4 md:px-6 py-16">
          <div className="flex flex-col lg:flex-row gap-16">
            <aside className="w-full lg:w-[25%] lg:sticky lg:top-[100px] self-start">
              <PrivacyTOC />
            </aside>
            <div className="w-full lg:w-[75%]">
              <PrivacyContent />
              <RelatedResources />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
