import { Mail, Mic, Briefcase } from 'lucide-react';
import Link from 'next/link';

export function Contact() {
  return (
    <section className="bg-white py-24">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <h2 className="text-navy text-5xl font-normal mb-12">Get in Touch</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
          <div>
            <Mail className="h-12 w-12 text-cyan mx-auto mb-4" />
            <h3 className="text-navy text-xl font-medium mb-2">General Inquiries</h3>
            <Link href="mailto:hello@lumivex.com" className="text-charcoal text-lg hover:text-ocean">
              hello@lumivex.com
            </Link>
            <p className="text-silver text-sm italic mt-2">Questions, partnerships, or just want to say hi</p>
          </div>
          <div>
            <Mic className="h-12 w-12 text-cyan mx-auto mb-4" />
            <h3 className="text-navy text-xl font-medium mb-2">Media & Press</h3>
            <Link href="mailto:press@lumivex.com" className="text-charcoal text-lg hover:text-ocean">
              press@lumivex.com
            </Link>
            <p className="text-silver text-sm italic mt-2">Media inquiries, interviews, press releases</p>
          </div>
          <div>
            <Briefcase className="h-12 w-12 text-cyan mx-auto mb-4" />
            <h3 className="text-navy text-xl font-medium mb-2">Careers</h3>
            <Link href="mailto:careers@lumivex.com" className="text-charcoal text-lg hover:text-ocean">
              careers@lumivex.com
            </Link>
            <p className="text-silver text-sm italic mt-2">Join our mission to democratize AI</p>
          </div>
        </div>
      </div>
    </section>
  );
}
