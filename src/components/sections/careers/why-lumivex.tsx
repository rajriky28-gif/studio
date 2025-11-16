import { Rocket, BarChart, Target } from "lucide-react";

const values = [
  {
    icon: Target,
    title: 'Work on Something That Matters',
    description: "We're democratizing AI creation. Your work directly impacts thousands of entrepreneurs and creators building the future.",
  },
  {
    icon: Rocket,
    title: 'Own Your Work',
    description: "We hire smart people and trust them. You'll have significant autonomy, influence, and visibility into every part of the company.",
  },
  {
    icon: BarChart,
    title: 'Shape the Company',
    description: "Join while we're small. Your decisions, ideas, and contributions will define Lumivex for years to come.",
  },
];

export function WhyLumivex() {
  return (
    <section className="bg-cream py-24 sm:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-navy text-5xl font-normal mb-16">Why Work at Lumivex?</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((value) => (
            <div key={value.title} className="bg-white rounded-2xl p-10 text-center border border-stone-200">
              <div className="inline-block bg-ocean/10 p-5 rounded-2xl mb-6">
                <value.icon className="h-10 w-10 text-ocean"/>
              </div>
              <h3 className="text-2xl font-semibold text-navy mb-4">{value.title}</h3>
              <p className="text-charcoal/80 leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}