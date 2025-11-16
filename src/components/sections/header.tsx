"use client";

import { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import { Menu, X, Copy, LogOut } from 'lucide-react';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { useUser } from '@/firebase';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from 'firebase/auth';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Vision', href: '/vision' },
  { name: 'Contact', href: '/contact' },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  const { user, auth, isUserLoading } = useUser();
  const [waitlistData, setWaitlistData] = useState<any>(null); // Simplified for this example

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    if (auth) {
      await signOut(auth);
    }
  };

  const getInitials = (name: string | null | undefined) => {
    if (!name) return '??';
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  const navLinkText = waitlistData ? 'Dashboard' : 'Waitlist';

  const headerBg = isScrolled ? 'bg-white/80 shadow-md backdrop-blur-sm' : 'bg-transparent';
  const linkColor = isScrolled ? 'text-navy' : (isHomePage ? 'text-white' : 'text-navy');
  
  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        headerBg
      )}
    >
      <div className={cn("flex items-center justify-between transition-all duration-300 h-20", "container mx-auto px-4 md:px-6")}>
          <Logo isScrolled={isScrolled} isHomePage={isHomePage} />

          {/* Desktop Navigation */}
          <nav className="hidden items-center space-x-8 md:flex h-full">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-ocean',
                  linkColor
                )}
              >
                {link.name}
              </Link>
            ))}
            <Link href="/waitlist" className={cn('text-sm font-medium transition-colors hover:text-ocean', linkColor)}>{navLinkText}</Link>
          </nav>
          
          <div className="hidden items-center space-x-2 md:flex h-full">
            {isUserLoading ? (
              <div className="h-10 w-24 bg-gray-200/50 animate-pulse rounded-md"></div>
            ) : user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user.photoURL || ''} alt={user.displayName || ''} />
                      <AvatarFallback className="bg-navy text-white">{getInitials(user.displayName)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-64" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.displayName}</p>
                      <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-red-500 focus:bg-red-50 focus:text-red-600">
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
                <>
                <Button asChild variant="ghost" className={cn('transition-colors hover:text-ocean hover:bg-transparent', linkColor)}>
                    <Link href="/login">Login</Link>
                </Button>
                <Button asChild className="bg-navy-gradient rounded-lg px-6 font-semibold">
                  <Link href="/waitlist">Join Waitlist</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center h-full">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className={cn('h-8 w-8', isScrolled ? 'text-black' : (isHomePage ? 'text-white' : 'text-black'))} />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full bg-white p-0">
                <div className="flex h-full flex-col">
                  <div className={cn("flex items-center justify-between border-b px-4 text-primary h-20")}>
                    <Logo isScrolled={true} isHomePage={false} />
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
                    <Link href="/waitlist" className="text-2xl font-medium text-primary transition-colors hover:text-ocean" onClick={() => setIsMobileMenuOpen(false)}>{navLinkText}</Link>
                    {!user && (
                         <Link
                            href="/login"
                            className="text-2xl font-medium text-primary transition-colors hover:text-ocean"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            Login
                          </Link>
                    )}
                  </nav>
                  <div className="p-4 border-t">
                    {user ? (
                        <Button onClick={handleLogout} className="w-full bg-red-500 hover:bg-red-600 rounded-lg py-6 text-lg font-semibold">
                            Logout
                        </Button>
                    ) : (
                        <Button asChild className="w-full bg-navy-gradient rounded-lg py-6 text-lg font-semibold">
                           <Link href="/waitlist" onClick={() => setIsMobileMenuOpen(false)}>Join Waitlist</Link>
                        </Button>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
    </header>
  );
}
