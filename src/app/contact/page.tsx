import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import { ContactHero } from "@/components/sections/contact/hero";
import { ContactOptions } from "@/components/sections/contact/contact-options";
import { ContactFormSection } from "@/components/sections/contact/contact-form-section";
import { ConnectWithUs } from "@/components/sections/contact/connect-with-us";
import { Location } from "@/components/sections/contact/location";
import { Faq } from "@/components/sections/contact/faq";
import { StillHaveQuestions } from "@/components/sections/contact/still-have-questions";
import { ContactFinalCta } from "@/components/sections/contact/final-cta";

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-grow">
        <ContactHero />
        <ContactOptions />
        <ContactFormSection />
        <ConnectWithUs />
        <Location />
        <Faq />
        <StillHaveQuestions />
        <ContactFinalCta />
      </main>
      <Footer />
    </div>
  );
}