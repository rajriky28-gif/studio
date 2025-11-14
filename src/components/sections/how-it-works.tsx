import { MessageSquare, Rocket, Sparkles } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface Step {
  num: string;
  icon: LucideIcon;
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    num: '01',
    icon: MessageSquare,
    title: 'Describe Your Vision',
    description: 'Tell Lumivex what you need in natural language. No technical jargon. No complex specifications. Just a simple conversation about your goal.',
  },
  {
    num: '02',
    icon: Sparkles,
    title: 'AI Builds Automatically',
    description: "Lumivex's reasoning engine analyzes your request, selects optimal modules, assembles workflows, and creates your agent—all autonomously in minutes.",
  },
  {
    num: '03',
    icon: Rocket,
    title: 'Deploy Instantly',
    description: 'Your agent is tested, validated, and ready to work. Monitor performance, adjust settings, and scale on demand through an elegant interface.',
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="w-full bg-cream py-24 sm:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-normal text-navy sm:text-5xl lg:text-6xl tracking-tighter">
            One Prompt. Complete Agent.
          </h2>
          <p className="mt-4 text-lg text-charcoal sm:text-xl">
            Describe what you need. Lumivex does the rest—understanding, building, testing, and deploying your AI agent autonomously.
          </p>
        </div>
        <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {steps.map((step) => (
            <div
              key={step.num}
              className="group rounded-3xl border border-stone-200 bg-white p-10 text-center transition-all duration-300 hover:-translate-y-2 hover:border-cyan hover:shadow-2xl hover:shadow-cyan/10"
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border-2 border-cyan bg-cream">
                <span className="text-2xl font-semibold text-navy">{step.num}</span>
              </div>
              <step.icon className="mx-auto mt-8 h-16 w-16 text-cyan" />
              <h3 className="mt-6 text-3xl font-medium text-navy">{step.title}</h3>
              <p className="mt-4 text-base text-charcoal/80 sm:text-lg">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
