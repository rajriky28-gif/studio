import { Lightbulb, Search, DraftingCompass, Code, Rocket, Globe } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface Milestone {
  date: string;
  status: 'Complete' | 'In Progress' | 'Upcoming' | 'Planned';
  icon: LucideIcon;
  title: string;
  content: string;
  progress?: string;
  target?: string;
}

const milestones: Milestone[] = [
  { date: 'Q3 2024', status: 'Complete', icon: Lightbulb, title: 'Conception', content: "The idea for Lumivex was born from frustration. Watching talented entrepreneurs unable to bring their automation ideas to life because of technical barriers. We knew there had to be a better way." },
  { date: 'Q4 2024', status: 'Complete', icon: Search, title: 'Research & Planning', content: "Deep research into AI orchestration, natural language processing, and autonomous system design. Interviewed 200+ potential users to understand real needs and pain points." },
  { date: 'Q1 2025', status: 'Complete', icon: DraftingCompass, title: 'Architecture Design', content: "Designed the 6-layer architecture that powers Lumivex. Prototyped the reasoning engine, built the module library foundation, and validated the autonomous assembly approach." },
  { date: 'Q2 2025', status: 'In Progress', icon: Code, title: 'Platform Development', content: "Currently building the platform. Developing the reasoning layer, assembly automation, and user interface. Early internal testing showing promising results.", progress: "~65% complete" },
  { date: 'Q3 2025', status: 'Upcoming', icon: Rocket, title: 'Beta Launch', content: "Invitation-only beta for waitlist members. Limited access to validate the platform, gather feedback, and refine before public launch.", target: "Summer 2025" },
  { date: 'Q4 2025', status: 'Planned', icon: Globe, title: 'Public Launch', content: "Full public launch with complete feature set, documentation, and support infrastructure. Opening Lumivex to everyone ready to build intelligent agents.", target: "Fall 2025" },
];

const statusStyles = {
  Complete: "bg-green-500",
  "In Progress": "bg-yellow-500",
  Upcoming: "bg-blue-500",
  Planned: "bg-gray-500",
};

export function Journey() {
  return (
    <section className="bg-navy-gradient-deep py-28 text-white">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-center text-5xl sm:text-6xl font-normal mb-16">
          Our Journey
        </h2>
        <div className="relative max-w-3xl mx-auto">
          <div className="absolute left-4 sm:left-1/2 -ml-px w-0.5 h-full bg-cyan/30" aria-hidden="true"></div>
          {milestones.map((item, index) => (
            <div key={item.title} className="relative flex items-start group">
              <div className="absolute left-4 sm:left-1/2 -ml-[1.3rem] mt-2.5 w-10 h-10 rounded-full bg-navy-gradient-deep border-2 border-cyan flex items-center justify-center">
                <item.icon className="h-5 w-5 text-cyan" />
              </div>
              <div className="pl-16 sm:pl-0 sm:w-1/2 sm:pr-8 sm:text-right group-odd:sm:w-1/2 group-odd:sm:pr-0 group-odd:sm:pl-8 group-odd:sm:text-left">
                <div className={`p-4 rounded-xl mb-8 w-full ${index % 2 === 0 ? 'sm:ml-auto' : 'sm:mr-auto'}`}>
                    <div className="flex items-center gap-4 mb-2 justify-start sm:justify-end group-odd:sm:justify-start">
                        <span className="text-sm font-semibold text-cyan uppercase tracking-wider">{item.date}</span>
                        <span className={`px-2 py-0.5 text-xs rounded-full text-white ${statusStyles[item.status]}`}>{item.status}</span>
                    </div>
                    <h3 className="text-2xl font-medium mb-2">{item.title}</h3>
                    <p className="text-white/80 leading-relaxed">{item.content}</p>
                    {item.progress && <p className="text-cyan text-sm mt-2">{item.progress}</p>}
                    {item.target && <p className="text-cyan text-sm mt-2">{item.target}</p>}
                </div>
              </div>
              <div className="hidden sm:block w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
