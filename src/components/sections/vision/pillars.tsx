import { Globe, BrainCircuit, Users } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface Pillar {
  icon: LucideIcon;
  title: string;
  visionStatement: string;
  reality: string;
  ourVision: string;
  whatThisMeans: string[];
  paradigmShift?: string;
  networkEffect?: string;
  impact: string;
}

const pillars: Pillar[] = [
  {
    icon: Globe,
    title: 'Universal Access to AI Creation',
    visionStatement: 'AI Creation Should Be Universal, Not Elite',
    reality: 'Building intelligent systems requires specialized knowledge: programming, machine learning, API integration, system architecture. This creates a technical elite who can build, and everyone else who must wait, pay, or compromise.',
    ourVision: "A world where anyone—entrepreneurs, educators, healthcare workers, artists, small business owners—can create sophisticated AI agents simply by describing what they need. No coding bootcamps. No technical degrees. No compromise.",
    whatThisMeans: [
      'A teacher creates an AI tutor personalized to each student\'s learning style',
      'A small business owner builds customer service automation without hiring developers',
      'A researcher creates data analysis agents without writing a single line of code',
      'An artist builds creative tools that amplify their unique vision'
    ],
    impact: "When 10 million people can build instead of 10 thousand, we unlock innovation at a scale humanity has never seen. The best solutions to tomorrow's problems won't come from Silicon Valley alone—they'll come from everywhere."
  },
  {
    icon: BrainCircuit,
    title: 'Intelligence That Builds Intelligence',
    visionStatement: 'AI Should Create AI, Humans Should Create Vision',
    reality: 'Building AI systems is manual, technical work. Humans spend time connecting APIs, configuring workflows, debugging integration errors—tasks that AI itself should handle. We\'re using human intelligence for machine work.',
    ourVision: 'AI that autonomously designs, builds, tests, and deploys other AI systems. Humans focus entirely on vision, goals, and creativity—the AI handles implementation. This isn\'t automation of simple tasks; it\'s automation of the entire creation process.',
    whatThisMeans: [
      'Describe your need in natural language—AI builds the complete solution',
      'No manual configuration, no drag-and-drop, no technical setup',
      'AI selects optimal components, configures integrations, handles edge cases',
      'Systems that continuously improve themselves without human intervention'
    ],
    paradigmShift: 'Just as compilers freed programmers from writing machine code, and frameworks freed them from reinventing common patterns, Lumivex frees everyone from technical implementation entirely. You describe the "what," AI handles the "how."',
    impact: 'When AI builds AI, human creativity is unleashed at unprecedented scale. Ideas flow directly into reality. Innovation cycles collapse from months to minutes. The bottleneck shifts from implementation to imagination—and human imagination is infinite.'
  },
  {
    icon: Users,
    title: 'Collaborative Intelligence Ecosystem',
    visionStatement: 'The Future Is Built Together, Not Alone',
    reality: 'AI development is fragmented. Companies build proprietary solutions. Developers reinvent the wheel. Knowledge remains siloed. Everyone builds in isolation, duplicating effort and missing opportunities for collective growth.',
    ourVision: "A thriving ecosystem where creators build reusable modules, users combine them into agents, and everyone benefits from collective intelligence. Where building on others' work is celebrated, and every contribution makes the entire platform more powerful.",
    whatThisMeans: [
        "Creators build modules once, earn revenue every time they're used",
        "Users access a growing library of 500+ components and counting",
        "Agents learn from community patterns and improve collectively",
        "Innovation compounds as each contribution enhances the whole"
    ],
    networkEffect: "As more creators build modules, users gain more capability. As more users build agents, creators gain more opportunities. As more agents operate, the platform learns more patterns. Growth becomes exponential, not linear.",
    impact: "The most powerful innovations emerge from collective intelligence, not individual genius. When thousands of creators contribute, millions benefit. The platform becomes smarter with every use, creating a rising tide that lifts all boats."
  },
];

export function Pillars() {
  return (
    <section className="bg-cream py-28">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-navy text-5xl sm:text-6xl font-normal mb-5">
            Three Pillars of Our Vision
          </h2>
          <p className="text-charcoal text-lg sm:text-xl font-light mb-20">
            Everything we build serves these three fundamental beliefs about the future of AI and human capability.
          </p>
        </div>
        <div className="space-y-20">
          {pillars.map((pillar, index) => (
            <div key={index} className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
              <div className={`text-center lg:text-left ${index % 2 !== 0 ? 'lg:order-last' : ''}`}>
                <div className="inline-block bg-white p-4 rounded-2xl shadow-md mb-6">
                  <pillar.icon className="h-20 w-20 text-cyan" />
                </div>
                <h3 className="text-ocean text-3xl font-light leading-snug mb-8">
                  {pillar.visionStatement}
                </h3>
                <h4 className="font-semibold text-navy mb-2">The Reality Today:</h4>
                <p className="text-charcoal leading-relaxed mb-6">{pillar.reality}</p>
                <h4 className="font-semibold text-navy mb-2">Our Vision:</h4>
                <p className="text-charcoal leading-relaxed">{pillar.ourVision}</p>
              </div>
              <div className="bg-white p-10 rounded-2xl shadow-lg">
                <h4 className="font-semibold text-navy mb-4">What This Means:</h4>
                <ul className="space-y-3 list-disc list-inside text-charcoal/90 mb-6">
                  {pillar.whatThisMeans.map((item) => <li key={item}>{item}</li>)}
                </ul>
                
                {pillar.paradigmShift && (
                  <>
                    <h4 className="font-semibold text-navy mb-2">The Paradigm Shift:</h4>
                    <p className="text-charcoal/90 mb-6">{pillar.paradigmShift}</p>
                  </>
                )}

                {pillar.networkEffect && (
                  <>
                    <h4 className="font-semibold text-navy mb-2">The Network Effect:</h4>
                    <p className="text-charcoal/90 mb-6">{pillar.networkEffect}</p>
                  </>
                )}
                
                <h4 className="font-semibold text-navy mb-2">Impact:</h4>
                <p className="text-charcoal/90 italic">"{pillar.impact}"</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
