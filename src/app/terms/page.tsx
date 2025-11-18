
import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { TermsHero } from "@/components/sections/terms/hero";
import { TermsContent } from "@/components/sections/terms/content";
import { TermsTOC } from "@/components/sections/terms/toc";
import { RelatedResources } from "@/components/sections/terms/related-resources";

export default function TermsOfServicePage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-grow">
        <TermsHero />
        <div className="container mx-auto px-4 md:px-6 py-16">
          <div className="flex flex-col lg:flex-row gap-16">
            <aside className="w-full lg:w-[25%] lg:sticky lg:top-[100px] self-start">
              <TermsTOC />
            </aside>
            <div className="w-full lg:w-[75%]">
              <TermsContent />
              <RelatedResources />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
