import Link from "next/link";
import { Button } from "@/components/ui/button";

export function StillHaveQuestions() {
  return (
    <section className="bg-navy-gradient-deep py-28 text-white">
      <div className="container mx-auto px-4 md:px-6 text-center max-w-3xl">
        <h2 className="text-5xl sm:text-6xl font-light mb-6">
          Still Have Questions?
        </h2>
        <p className="text-xl text-white/80 font-light leading-relaxed mb-12">
          We're here to help. Choose the best contact method above or join our community to connect with our team and other early supporters.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button asChild size="lg" className="bg-cyan hover:bg-cyan/90 text-white font-semibold px-8 py-6 text-lg">
            <Link href="#contact-form">Send Message</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="bg-white/20 border-white/50 text-white hover:bg-white/30 hover:text-white font-semibold px-8 py-6 text-lg">
            <Link href="#">Join Discord</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}