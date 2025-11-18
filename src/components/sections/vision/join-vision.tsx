'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useCallback } from 'react';

const contributions = [
  {
    number: "1.",
    title: "Join the Waitlist",
    description: "Be among the first to use Lumivex when we launch. Your early adoption validates the vision and provides crucial feedback.",
    cta: "Join Waitlist →",
    href: "/waitlist",
  },
  {
    number: "2.",
    title: "Spread the Word",
    description: "Share our vision with others who believe technology should serve everyone. Every conversation plants seeds for the future.",
    cta: "Share on X →",
    href: "https://x.com/LumivexAI",
    isShare: true,
  },
  {
    number: "3.",
    title: "Provide Input",
    description: "Tell us what you'd build with Lumivex. Your use cases shape our priorities and ensure we're building the right thing.",
    cta: "Share Your Ideas →",
    href: "/contact",
  }
];

export function JoinVision() {

  const handleShare = useCallback(() => {
    const text = "I'm excited about @LumivexAI's vision to make AI creation as simple as conversation. A world where every idea can become an intelligent system—instantly. Check it out:";
    const url = "https://lumivex.com/vision"; // Assuming this is the correct URL.
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
    window.open(twitterUrl, '_blank', 'width=550,height=420');
  }, [])

  return (
    <section className="bg-navy-gradient py-28 text-white">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <h2 className="text-5xl sm:text-6xl font-light mb-6">
          Help Us Build This Future
        </h2>
        <p className="text-xl text-white/80 font-light leading-relaxed max-w-3xl mx-auto mb-16">
          This vision becomes reality only with a community of believers, builders, and early supporters who share our conviction that AI creation should be universal.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {contributions.map((item) => (
            <div key={item.number} className="bg-white/10 border border-white/20 rounded-2xl p-8 backdrop-blur-lg flex flex-col text-left">
              <span className="text-3xl font-bold text-cyan mb-4">{item.number}</span>
              <h3 className="text-2xl font-medium text-white mb-3">{item.title}</h3>
              <p className="text-white/80 mb-6 flex-grow">{item.description}</p>
              {item.isShare ? (
                 <Button onClick={handleShare} variant="link" className="text-cyan font-semibold p-0 h-auto justify-start">
                    {item.cta}
                </Button>
              ) : (
                <Button asChild variant="link" className="text-cyan font-semibold p-0 h-auto justify-start">
                  <Link href={item.href}>{item.cta}</Link>
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
