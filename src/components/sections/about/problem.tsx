interface ProblemCardProps {
  number: string;
  title: string;
  description: string;
  impact: string;
}

const problems: ProblemCardProps[] = [
  {
    number: "01",
    title: "Building AI Requires Expertise",
    description: "Traditional AI development demands specialized knowledge in programming, machine learning, API integration, and system architecture. This excludes 99% of people with great ideas from building intelligent solutions.",
    impact: "→ Millions of valuable ideas never become reality"
  },
  {
    number: "02",
    title: "Development Takes Months",
    description: "Even with technical expertise, building custom AI solutions requires weeks or months of development, testing, and refinement. Small businesses and individuals simply can't afford the time or resources.",
    impact: "→ Innovation moves slower than it should"
  },
  {
    number: "03",
    title: "Systems Require Constant Maintenance",
    description: "Once built, AI systems need ongoing updates, debugging, and optimization. The maintenance burden often exceeds the initial development effort, making scaling prohibitively expensive.",
    impact: "→ Resources wasted on maintenance instead of innovation"
  }
];

const ProblemCard: React.FC<ProblemCardProps> = ({ number, title, description, impact }) => (
  <div className="bg-white border-l-4 border-ocean rounded-xl p-12 lg:p-16 shadow-lg">
    <p className="text-ocean font-semibold text-lg mb-2">{number}</p>
    <h3 className="text-navy text-3xl font-medium mb-4">{title}</h3>
    <p className="text-charcoal text-lg leading-relaxed mb-6">{description}</p>
    <p className="text-cyan font-medium text-base">{impact}</p>
  </div>
);

export function Problem() {
  return (
    <section className="bg-cream py-28">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-navy text-5xl sm:text-6xl font-normal mb-20">
            The Problem We're Solving
          </h2>
        </div>
        <div className="max-w-5xl mx-auto space-y-8">
          {problems.map((problem) => (
            <ProblemCard key={problem.number} {...problem} />
          ))}
        </div>
      </div>
    </section>
  );
}
