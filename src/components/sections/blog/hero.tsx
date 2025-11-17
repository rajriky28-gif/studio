import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import Link from "next/link";

export function BlogHero() {
  return (
    <section 
      className="pt-[140px] pb-[80px]"
      style={{
        background: 'linear-gradient(to bottom, white, #FFFBEB)',
      }}
    >
      <div className="container mx-auto px-4 md:px-6 text-center">
        <div className="mb-6 text-sm text-silver">
          <Link href="/" className="hover:text-ocean">Home</Link>
          <span className="mx-2">/</span>
          <span>Blog</span>
        </div>
        <p className="mb-5 text-ocean text-xs uppercase tracking-[3px] font-semibold">
          INSIGHTS & UPDATES
        </p>
        <h1 className="text-navy font-light text-6xl sm:text-7xl !leading-tight tracking-[-2px] max-w-[900px] mx-auto">
          The Lumivex Blog
        </h1>
        <p className="text-charcoal font-light text-xl leading-relaxed max-w-[700px] mx-auto mt-8 mb-10">
          Thoughts on AI, automation, product updates, and building the future of intelligent systems.
        </p>
        <div className="relative max-w-lg mx-auto">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input 
                placeholder="Search articles..."
                className="h-14 w-full rounded-full border-2 border-stone-200 bg-white pl-14 pr-6 text-base focus-visible:ring-ocean focus-visible:border-ocean shadow-sm"
            />
        </div>
      </div>
    </section>
  );
}