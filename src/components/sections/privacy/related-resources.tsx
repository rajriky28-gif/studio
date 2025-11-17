
import { FileText, Cookie, Shield } from "lucide-react";
import Link from 'next/link';

const resources = [
    {
        icon: FileText,
        title: "Terms of Service",
        description: "Read our terms and conditions",
        href: "#",
        cta: "View Terms →"
    },
    {
        icon: Cookie,
        title: "Cookie Policy",
        description: "Learn about our cookie usage",
        href: "#",
        cta: "View Policy →"
    },
    {
        icon: Shield,
        title: "Security",
        description: "How we protect your data",
        href: "#",
        cta: "Learn More →"
    }
]

export function RelatedResources() {
  return (
    <section className="mt-16 bg-cream rounded-2xl p-12">
        <h2 className="text-3xl font-medium text-navy text-center mb-10">Related Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {resources.map((resource) => (
                <Link href={resource.href} key={resource.title} className="group bg-white border border-slate-200 rounded-xl p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                    <resource.icon className="h-12 w-12 text-navy mb-4" />
                    <h3 className="text-xl font-semibold text-navy mb-2">{resource.title}</h3>
                    <p className="text-charcoal/80 mb-4">{resource.description}</p>
                    <span className="font-semibold text-ocean group-hover:underline">{resource.cta}</span>
                </Link>
            ))}
        </div>
    </section>
  );
}
