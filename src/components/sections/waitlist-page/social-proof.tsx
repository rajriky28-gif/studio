'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const testimonials = [
  {
    quote: "I've been waiting for something like this. The ability to build AI agents without coding will be a game-changer for my business.",
    name: 'David Chen',
    title: 'Founder, TechStart Solutions',
    image: '/avatars/david.jpg',
  },
  {
    quote: "Finally, a platform that speaks my language instead of forcing me to learn theirs. Can't wait to get my hands on Lumivex.",
    name: 'Sarah Mitchell',
    title: 'Marketing Director, GrowthCo',
    image: '/avatars/sarah.jpg',
  },
  {
    quote: "As someone who's tried every automation tool out there, Lumivex's approach is exactly what the market needs. Revolutionary concept.",
    name: 'Marcus Johnson',
    title: 'Operations Consultant',
    image: '/avatars/marcus.jpg',
  },
];

const recentSignups = [
  "Sarah from United States",
  "Ahmed from UAE",
  "Maria from Brazil",
  "James from UK",
  "Yuki from Japan",
  "Chloe from France",
  "Ravi from India",
  "Fatima from Nigeria",
];

export function SocialProof() {
  const [currentSignup, setCurrentSignup] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSignup((prev) => (prev + 1) % recentSignups.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  
  return (
    <section className="bg-white py-28">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-navy text-5xl font-normal mb-4">Join Thousands Building the Future</h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.name} className="bg-cream/60 p-8 rounded-xl border border-stone-200">
              <p className="text-charcoal leading-relaxed mb-6">"{testimonial.quote}"</p>
              <div className="flex items-center gap-4">
                <Image src={testimonial.image} alt={testimonial.name} width={48} height={48} className="rounded-full" />
                <div>
                  <p className="font-semibold text-navy">{testimonial.name}</p>
                  <p className="text-sm text-charcoal/80">{testimonial.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-16 text-center">
            <div className="inline-block bg-white p-4 rounded-lg shadow-md border">
                <p className="text-charcoal">
                    {recentSignups[currentSignup]} joined {Math.floor(Math.random() * 18) + 2} minutes ago
                </p>
            </div>
        </div>
      </div>
    </section>
  );
}
