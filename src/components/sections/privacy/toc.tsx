
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
  { id: 'info-collect', title: '1. Information We Collect' },
  { id: 'info-use', title: '2. How We Use Your Information' },
  { id: 'info-share', title: '3. How We Share Your Information' },
  { id: 'cookies', title: '4. Cookies and Tracking' },
  { id: 'data-security', title: '5. Data Security' },
  { id: 'privacy-rights', title: '6. Your Privacy Rights' },
  { id: 'children-privacy', title: '7. Children\'s Privacy' },
  { id: 'data-transfers', title: '8. International Data Transfers' },
  { id: 'third-party', title: '9. Third-Party Services' },
  { id: 'data-retention', title: '10. Data Retention' },
  { id: 'changes', title: '11. Changes to This Policy' },
  { id: 'contact', title: '12. Contact Us' },
];

export function PrivacyTOC() {
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
    // Update URL hash without causing a page jump
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
