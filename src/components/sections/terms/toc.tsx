
'use client';

import { useState, useEffect } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { cn } from '@/lib/utils';
import { Menu } from 'lucide-react';

const tableOfContents = [
  { id: 'acceptance', title: '1. Acceptance of Terms' },
  { id: 'eligibility', title: '2. Eligibility' },
  { id: 'account', title: '3. Account Registration' },
  { id: 'responsibilities', title: '4. User Responsibilities' },
  { id: 'waitlist', title: '5. Waitlist and Referral Program' },
  { id: 'usage', title: '6. Platform Access and Usage' },
  { id: 'ip', title: '7. Intellectual Property Rights' },
  { id: 'user-content', title: '8. User Content' },
  { id: 'prohibited', title: '9. Prohibited Activities' },
  { id: 'payment', title: '10. Payment and Subscriptions' },
  { id: 'beta', title: '11. Beta Testing and Pre-Launch' },
  { id: 'availability', title: '12. Service Availability' },
  { id: 'disclaimers', title: '13. Disclaimers and Warranties' },
  { id: 'liability', title: '14. Limitation of Liability' },
  { id: 'indemnification', title: '15. Indemnification' },
  { id: 'termination', title: '16. Termination' },
  { id: 'dispute', title: '17. Dispute Resolution' },
  { id: 'law', title: '18. Governing Law' },
  { id: 'changes', title: '19. Changes to Terms' },
  { id: 'contact', title: '20. Contact Information' },
];

export function TermsTOC() {
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const sections = tableOfContents.map(item => document.getElementById(item.id));
      let currentId = '';

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && window.scrollY + 120 >= section.offsetTop) {
          currentId = section.id;
          break;
        }
      }
      setActiveId(currentId);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); 
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    if(history.pushState) {
        history.pushState(null, '', `#${id}`);
    } else {
        window.location.hash = id;
    }
    setActiveId(id);
  };
  
  const tocLinks = (
    <ul className="space-y-1">
        {tableOfContents.map(item => (
            <li key={item.id}>
            <a
                href={`#${item.id}`}
                onClick={(e) => handleLinkClick(e, item.id)}
                className={cn(
                "block p-2 rounded-md text-charcoal transition-all duration-300 hover:text-ocean hover:translate-x-1 text-base font-normal",
                activeId === item.id ? 'font-bold text-ocean' : ''
                )}
            >
                {item.title}
            </a>
            </li>
        ))}
    </ul>
  );

  return (
    <>
      {/* Desktop TOC */}
      <div className="hidden lg:block bg-slate-50 border border-slate-200 rounded-2xl p-6">
        <h3 className="text-sm font-semibold text-navy uppercase tracking-wider mb-5">Quick Navigation</h3>
        {tocLinks}
      </div>

      {/* Mobile TOC */}
      <div className="lg:hidden mb-10">
        <Accordion type="single" collapsible className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4">
          <AccordionItem value="item-1">
            <AccordionTrigger className="font-semibold text-navy">
              <div className='flex items-center gap-2'>
                <Menu className='h-5 w-5' />
                Table of Contents
              </div>
            </AccordionTrigger>
            <AccordionContent className='pt-2'>
              {tocLinks}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </>
  );
}
