import Link from 'next/link';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { Linkedin, Twitter } from 'lucide-react';
import { DiscordIcon } from '@/components/discord-icon';

export function Footer() {
  const socialLinks = [
    { name: 'Twitter', icon: Twitter, href: '#' },
    { name: 'LinkedIn', icon: Linkedin, href: '#' },
    { name: 'Discord', icon: DiscordIcon, href: '#' },
  ];

  const links = {
    Company: [
      { name: 'About', href: '#about' },
      { name: 'Vision', href: '#vision' },
      { name: 'Blog', href: '#' },
      { name: 'Contact', href: 'mailto:hello@lumivex.com' },
    ],
    "Stay Updated": [
      { name: 'Join Waitlist', href: '#waitlist' },
      { name: 'Subscribe to Newsletter', href: '#' },
    ],
  };

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-16 md:px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          <div className="space-y-4">
            <div className="text-white">
              <Logo isScrolled={false}/>
            </div>
            <p className="text-sm uppercase tracking-[2px] text-cyan">BUILD BEYOND</p>
            <p className="max-w-xs text-base text-white/70">
              Making AI creation as simple as conversation.
            </p>
            <div className="flex space-x-2 pt-2">
              {socialLinks.map((social) => (
                <Button key={social.name} variant="ghost" size="icon" asChild className="text-white/70 hover:bg-white/10 hover:text-cyan">
                  <a href={social.href} aria-label={social.name}>
                    <social.icon className="h-5 w-5" />
                  </a>
                </Button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-2">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Company</h3>
              <ul className="mt-4 space-y-3">
                {links.Company.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-base text-white/70 transition-colors hover:text-cyan">
                        {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Stay Updated</h3>
              <ul className="mt-4 space-y-3">
                {links["Stay Updated"].map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-base text-white/70 transition-colors hover:text-cyan">
                        {link.name}
                    </Link>
                  </li>
                ))}
                  <li>
                    <a href="mailto:hello@lumivex.com" className="text-base text-white/70 transition-colors hover:text-cyan">
                      hello@lumivex.com
                    </a>
                  </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-16 border-t border-white/10 pt-8 flex flex-col-reverse items-center justify-between gap-4 text-sm text-white/50 sm:flex-row">
          <p>© {new Date().getFullYear()} Lumivex. Coming Soon.</p>
          <div className="flex space-x-4">
            <Link href="#" className="transition-colors hover:text-cyan">Privacy</Link>
            <Link href="#" className="transition-colors hover:text-cyan">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
