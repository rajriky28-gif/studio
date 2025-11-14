import { Mail, Mic, Briefcase } from 'lucide-react';
import Link from 'next/link';

const contactMethods = [
  {
    icon: Mail,
    title: 'General Inquiries',
    email: 'hello@lumivex.com',
    bestFor: [
      'General questions about Lumivex',
      'Partnership opportunities',
      'Feedback and suggestions',
      'Just wanting to say hi'
    ],
    responseTime: 'Within 48 hours'
  },
  {
    icon: Mic,
    title: 'Media & Press',
    email: 'press@lumivex.com',
    bestFor: [
      'Media inquiries and interviews',
      'Press releases and announcements',
      'Content collaborations',
      'Speaking opportunities'
    ],
    responseTime: 'Within 24 hours'
  },
  {
    icon: Briefcase,
    title: 'Careers & Opportunities',
    email: 'careers@lumivex.com',
    bestFor: [
      'Job opportunities and applications',
      'Internship inquiries',
      'Contractor/freelance work',
      'Joining our mission'
    ],
    responseTime: 'Within 1 week'
  }
];

export function ContactOptions() {
  return (
    <section className="bg-white py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-navy text-5xl font-normal mb-4">How Can We Help?</h2>
          <p className="text-charcoal text-lg">
            Choose the best way to reach us based on your needs. We typically respond within 24-48 hours.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {contactMethods.map((method) => (
            <div key={method.title} className="bg-cream/50 rounded-2xl p-8 border border-stone-200 hover:shadow-lg transition-shadow">
              <method.icon className="h-10 w-10 text-cyan mb-6" />
              <h3 className="text-navy text-xl font-medium mb-2">{method.title}</h3>
              <Link href={`mailto:${method.email}`} className="text-ocean text-lg font-semibold hover:underline">
                {method.email}
              </Link>
              <div className="mt-6 border-t border-stone-300 pt-6">
                <p className="font-semibold text-charcoal mb-3 text-sm">Best For:</p>
                <ul className="space-y-2 text-charcoal/80 text-sm list-disc list-inside">
                  {method.bestFor.map(item => <li key={item}>{item}</li>)}
                </ul>
                <div className="mt-4 text-xs text-silver">
                  <strong>Response Time:</strong> {method.responseTime}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}