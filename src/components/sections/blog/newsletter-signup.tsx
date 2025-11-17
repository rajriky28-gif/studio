import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function NewsletterSignup() {
  return (
    <section className="bg-navy-gradient py-24 text-white">
      <div className="container mx-auto px-4 md:px-6 text-center max-w-2xl">
        <h2 className="text-5xl font-light mb-4">Stay Updated</h2>
        <p className="text-lg text-white/80 mb-10">
          Get the latest insights on AI, product updates, and company news delivered to your inbox.
        </p>
        <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
          <Input 
            type="email" 
            placeholder="Your email address" 
            className="h-14 text-base bg-white/90 text-charcoal border-none placeholder:text-gray-500 flex-grow"
          />
          <Button 
            type="submit" 
            size="lg"
            className="h-14 bg-cyan hover:bg-cyan/90 text-base font-semibold"
          >
            Subscribe
          </Button>
        </form>
        <p className="text-xs text-white/60 mt-4">We respect your privacy. Unsubscribe anytime.</p>
      </div>
    </section>
  );
}