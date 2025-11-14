import { BrainCircuit, Headset, Newspaper, Target } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface UseCase {
  icon: LucideIcon;
  title: string;
  description: string;
  example: string;
}

const useCases: UseCase[] = [
  {
    icon: Newspaper,
    title: 'Content That Writes Itself',
    description: 'Create AI agents that research trending topics, write engaging content, optimize for your audience, and distribute across all your channels—automatically maintaining your voice and brand.',
    example: 'Create an agent that monitors tech news, identifies trends, and writes LinkedIn posts in my voice',
  },
  {
    icon: Target,
    title: 'Sales on Autopilot',
    description: 'Build agents that find qualified leads, validate contact information, personalize outreach at scale, track engagement, and organize everything in your CRM—while you focus on closing deals.',
    example: 'Find B2B companies in fintech, get decision-maker emails, and send personalized cold emails',
  },
  {
    icon: Headset,
    title: 'Support That Never Sleeps',
    description: 'Deploy intelligent support agents that understand context, resolve common issues instantly, escalate complex problems with full context, and continuously learn from every interaction.',
    example: 'Monitor support inbox, categorize tickets by urgency, draft responses based on our knowledge base',
  },
  {
    icon: BrainCircuit,
    title: 'Insights, Automatically',
    description: 'Create agents that gather data from multiple sources, identify patterns and trends, generate comprehensive reports, and deliver actionable insights exactly when you need them.',
    example: 'Pull data from Google Sheets and Salesforce, analyze trends, email weekly reports to my team',
  },
];

export function UseCases() {
  return (
    <section className="w-full bg-white py-24 sm:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-normal text-navy sm:text-5xl lg:text-6xl tracking-tighter">
            What Will You Build?
          </h2>
          <p className="mt-4 text-lg text-charcoal sm:text-xl">
            From content creation to customer support, data analysis to lead generation—Lumivex makes any automation possible.
          </p>
        </div>
        <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-2">
          {useCases.map((useCase) => (
            <div
              key={useCase.title}
              className="group rounded-3xl border border-stone-200 bg-white p-10 transition-all duration-300 hover:-translate-y-2 hover:border-cyan hover:shadow-2xl hover:shadow-cyan/10"
            >
              <useCase.icon className="h-16 w-16 text-cyan" />
              <h3 className="mt-6 text-3xl font-medium text-navy">{useCase.title}</h3>
              <p className="mt-4 text-lg text-charcoal/80">{useCase.description}</p>
              <p className="mt-6 text-sm italic text-silver">
                "{useCase.example}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
