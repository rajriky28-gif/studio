import { Button } from '@/components/ui/button';
import { Mail, Bell } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export function JoinUs() {
  return (
    <section className="bg-navy-gradient-deep py-28 text-white">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <h2 className="text-5xl sm:text-6xl font-light mb-6">
          Join Us on This Journey
        </h2>
        <p className="text-xl text-white/80 font-light leading-relaxed max-w-3xl mx-auto mb-16">
          We're building Lumivex in public, sharing our progress, challenges, and victories along the way. Be part of the story from the beginning.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Join Waitlist */}
          <div className="bg-white/10 border border-white/20 rounded-2xl p-8 backdrop-blur-lg transition-all duration-300 hover:bg-white/15 hover:-translate-y-1">
            <Mail className="h-14 w-14 text-cyan mx-auto mb-6" />
            <h3 className="text-2xl font-medium mb-2">Get Early Access</h3>
            <p className="text-white/80 mb-6">Be first to build when we launch. Exclusive early access and founder pricing for supporters.</p>
            <Button asChild className="bg-cyan hover:bg-cyan/90 text-white font-semibold">
              <Link href="#waitlist">Join Waitlist</Link>
            </Button>
          </div>
          {/* Follow Updates */}
          <div className="bg-white/10 border border-white/20 rounded-2xl p-8 backdrop-blur-lg transition-all duration-300 hover:bg-white/15 hover:-translate-y-1">
            <Bell className="h-14 w-14 text-cyan mx-auto mb-6" />
            <h3 className="text-2xl font-medium mb-2">Stay Informed</h3>
            <p className="text-white/80 mb-6">Follow our journey. Behind-the-scenes updates, progress reports, and launch announcements.</p>
            <Button asChild className="bg-white text-navy font-semibold hover:bg-white/90">
              <Link href="#">Follow on X</Link>
            </Button>
          </div>
          {/* Join Community */}
          <div className="bg-white/10 border border-white/20 rounded-2xl p-8 backdrop-blur-lg transition-all duration-300 hover:bg-white/15 hover:-translate-y-1">
            <div className="h-14 w-14 bg-cyan rounded-full flex items-center justify-center mx-auto mb-6">
                <Image src="/discord.png" alt="Discord" width={32} height={32} />
            </div>
            <h3 className="text-2xl font-medium mb-2">Join the Community</h3>
            <p className="text-white/80 mb-6">Connect with other early supporters. Share ideas, provide feedback, shape the future.</p>
            <Button asChild className="bg-white text-navy font-semibold hover:bg-white/90">
              <Link href="#">Join Discord</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
