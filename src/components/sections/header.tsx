"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Vision', href: '#vision' },
  { name: 'Contact', href: 'mailto:hello@lumivex.com' },
  { name: 'Waitlist', href: '#waitlist' },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled ? 'bg-white/80 shadow-md backdrop-blur-sm' : 'bg-transparent'
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className={cn("flex items-center justify-between transition-all duration-300 h-20")}>
          <Logo isScrolled={isScrolled} />

          {/* Desktop Navigation */}
          <nav className="hidden items-center space-x-8 md:flex h-full">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-ocean',
                  isScrolled ? 'text-primary' : 'text-white'
                )}
              >
                {link.name}
              </Link>
            ))}
          </nav>
          
          <div className="hidden items-center space-x-4 md:flex h-full">
            <Button asChild className="bg-navy-gradient rounded-lg px-6 font-semibold">
              <Link href="#waitlist">Join Waitlist</Link>
            </Button>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center h-full">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className={cn('h-8 w-8', isScrolled ? 'text-primary' : 'text-white')} />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full bg-white p-0">
                <div className="flex h-full flex-col">
                  <div className={cn("flex items-center justify-between border-b px-4 text-primary h-20")}>
                    <Logo isScrolled={true} />
                    <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                      <X className="h-8 w-8 text-primary" />
                      <span className="sr-only">Close menu</span>
                    </Button>
                  </div>
                  <nav className="flex flex-1 flex-col items-center justify-center space-y-8">
                    {navLinks.map((link) => (
                      <Link
                        key={link.name}
                        href={link.href}
                        className="text-2xl font-medium text-primary transition-colors hover:text-ocean"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {link.name}
                      </Link>
                    ))}
                  </nav>
                  <div className="p-4 border-t">
                    <Button asChild className="w-full bg-navy-gradient rounded-lg py-6 text-lg font-semibold">
                       <Link href="#waitlist" onClick={() => setIsMobileMenuOpen(false)}>Join Waitlist</Link>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
