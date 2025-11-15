import { DollarSign, Heart, Lightbulb } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface Ripple {
  icon: LucideIcon;
  category: string;
  points: { title: string; description: string }[];
  estimates: string[];
}

const ripples: Ripple[] = [
  {
    icon: DollarSign,
    category: 'Economic Impact',
    points: [
      { title: 'Entrepreneurship Explosion', description: "Millions of people with business ideas but no technical cofounders can now build their vision. The barrier to entrepreneurship drops from tens of thousands of dollars to tens of dollars." },
      { title: 'New Career Paths', description: '"AI Agent Creator" becomes a viable profession. People earn income building and selling reusable modules. The gig economy expands into the intelligence economy.' },
      { title: 'Small Business Empowerment', description: "Local businesses access enterprise-level automation previously available only to corporations. The playing field levels. Competition shifts to service quality, not technical sophistication." },
    ],
    estimates: [
      '1 million+ new businesses enabled by 2030',
      '100,000+ creators earning income from modules by 2028',
      '$10 billion+ in small business value created by 2032',
    ]
  },
  {
    icon: Heart,
    category: 'Social Impact',
    points: [
      { title: 'Education Transformation', description: "Teachers create personalized AI tutors for each student. Education adapts to individual learning styles. Knowledge becomes accessible regardless of geography or income." },
      { title: 'Healthcare Accessibility', description: "Small clinics build patient management systems. Community health workers create outreach automation. Healthcare quality improves in underserved areas." },
      { title: 'Nonprofit Effectiveness', description: "Charities build donor management, program tracking, and impact measurement without expensive consultants. More funds go to mission, less to overhead." },
    ],
    estimates: [
      '50 million+ students benefit from personalized AI tutors by 2030',
      '10,000+ small clinics gain enterprise automation by 2029',
      '100,000+ nonprofits save millions in overhead costs by 2031',
    ]
  },
  {
    icon: Lightbulb,
    category: 'Innovation Impact',
    points: [
      { title: 'Faster Problem-Solving', description: 'When anyone can build intelligent solutions, problems get solved faster. Ideas flow from identification to implementation in days, not years.' },
      { title: 'Diverse Solutions', description: 'Solutions come from people who understand problems firsthand, not just technical experts. More diverse perspectives lead to better, more inclusive solutions.' },
      { title: 'Experimentation Culture', description: 'Low cost and fast deployment enable rapid experimentation. Failed ideas cost hours, not months. Innovation becomes iterative, not all-or-nothing.' },
    ],
    estimates: [
      '10x increase in automation solutions deployed by 2030',
      '1 million+ use cases we haven\'t imagined yet by 2032',
      'Solutions from 150+ countries, not just tech hubs',
    ]
  }
];

export function RippleEffects() {
  return (
    <section className="bg-navy-gradient-deep py-28 text-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-5xl sm:text-6xl font-light mb-5">
            The Ripple Effects
          </h2>
          <p className="text-xl text-white/80 font-light leading-relaxed mb-20">
            Democratizing AI creation doesn't just change how we build technology—it transforms society, economy, and human potential.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {ripples.map((ripple, index) => (
            <div key={index} className="bg-white/10 border border-white/20 rounded-2xl p-8 backdrop-blur-lg">
              <ripple.icon className="h-14 w-14 text-cyan mb-6" />
              <h3 className="text-2xl font-medium mb-6">{ripple.category}</h3>
              <div className="space-y-4 mb-6">
                {ripple.points.map(point => (
                  <div key={point.title}>
                    <h4 className="font-semibold text-white">{point.title}</h4>
                    <p className="text-white/70 text-sm leading-relaxed">{point.description}</p>
                  </div>
                ))}
              </div>
              <div className="border-t border-cyan/30 pt-4">
                <p className="font-semibold text-sm text-cyan mb-2">Estimated Impact:</p>
                <ul className="space-y-1 text-white/80 text-sm">
                  {ripple.estimates.map(estimate => <li key={estimate}>→ {estimate}</li>)}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
