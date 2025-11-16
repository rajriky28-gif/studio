'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Briefcase, Calendar, Check, ChevronDown, DollarSign, Globe, Heart, Laptop, MapPin, Rocket, Star, Target } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { formatDistanceToNow } from 'date-fns';

export interface Job {
  id: string;
  jobTitle: string;
  department: string;
  employmentType: string;
  location: string;
  experienceLevel: string;
  salaryRange?: string;
  fullDescription: string;
  responsibilities: string[];
  requirements: string[];
  niceToHave?: string[];
  linkedinUrl: string;
  postedDate: {
    toDate: () => Date;
  };
}

const benefits = [
    { icon: DollarSign, title: 'Competitive Compensation', description: "Salary + equity package that reflects your impact" },
    { icon: Globe, title: 'Remote First', description: "Work from anywhere, async collaboration" },
    { icon: Heart, title: 'Health & Wellness', description: "Comprehensive health, dental, vision insurance" },
    { icon: Rocket, title: 'Learning Budget', description: "$2,000/year for courses, conferences, books" },
    { icon: Laptop, title: 'Equipment', description: "Latest MacBook Pro + $1,000 home office setup" },
    { icon: Calendar, title: 'Unlimited PTO', description: "Take time when you need it, no questions asked" },
    { icon: Target, title: 'Equity', description: "Generous stock options with early-stage upside" },
    { icon: Star, title: 'Impact', description: "Work on products used by thousands, shape the roadmap" },
]

export default function JobCard({ job }: { job: Job }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="group w-full max-w-4xl mx-auto bg-white border border-stone-200 rounded-3xl p-10 md:p-12 transition-all duration-300 data-[state=open]:border-cyan data-[state=open]:shadow-2xl data-[state=open]:shadow-cyan/10 hover:border-cyan hover:-translate-y-1 hover:shadow-2xl hover:shadow-cyan/10"
    >
      <CollapsibleTrigger asChild className="cursor-pointer">
        <div className="w-full">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                <div>
                <h3 className="text-3xl font-semibold text-navy">{job.jobTitle}</h3>
                <p className="text-base text-charcoal/80 mt-2">
                    {job.department} &bull; {job.employmentType} &bull; {job.location}
                </p>
                </div>
                 <Button asChild size="lg" className="bg-navy-gradient font-semibold shrink-0">
                    <Link href={job.linkedinUrl} target="_blank" onClick={(e) => e.stopPropagation()}>
                    Apply on LinkedIn
                    </Link>
                </Button>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-10 mt-8 text-charcoal/90">
                <div className="flex items-center gap-2">
                    <Briefcase className="h-5 w-5 text-cyan"/>
                    <span>{job.experienceLevel}</span>
                </div>
                {job.salaryRange && (
                    <div className="flex items-center gap-2">
                        <DollarSign className="h-5 w-5 text-cyan"/>
                        <span>{job.salaryRange}</span>
                    </div>
                )}
                <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-cyan"/>
                    <span className="italic">Posted {formatDistanceToNow(job.postedDate.toDate(), { addSuffix: true })}</span>
                </div>
            </div>
            <div className="flex justify-center mt-6">
                <ChevronDown className={cn("h-6 w-6 text-cyan transition-transform", isOpen && "rotate-180")} />
            </div>
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="border-t border-stone-200 my-8"></div>

        <div>
            <h4 className="text-2xl font-semibold text-navy mb-4">About the Role</h4>
            <div className="prose prose-lg text-charcoal max-w-none" dangerouslySetInnerHTML={{ __html: job.fullDescription.replace(/\n/g, '<br />') }}/>
        </div>

        <div className="mt-8">
            <h4 className="text-2xl font-semibold text-navy mb-4">What You'll Do</h4>
            <ul className="space-y-3">
                {job.responsibilities.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-cyan mt-1 shrink-0"/>
                        <span className="text-charcoal/90 text-lg">{item}</span>
                    </li>
                ))}
            </ul>
        </div>
        
        <div className="mt-8">
            <h4 className="text-2xl font-semibold text-navy mb-4">What We're Looking For</h4>
            <ul className="space-y-3">
                {job.requirements.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-cyan mt-1 shrink-0"/>
                        <span className="text-charcoal/90 text-lg">{item}</span>
                    </li>
                ))}
            </ul>
        </div>

        {job.niceToHave && job.niceToHave.length > 0 && (
             <div className="mt-8">
                <h4 className="text-2xl font-semibold text-navy mb-4">Bonus Points For</h4>
                <ul className="space-y-3">
                    {job.niceToHave.map((item, index) => (
                        <li key={index} className="flex items-start gap-3">
                            <Star className="h-5 w-5 text-amber-500 mt-1 shrink-0"/>
                            <span className="text-charcoal/90 text-lg">{item}</span>
                        </li>
                    ))}
                </ul>
            </div>
        )}

        <div className="mt-12">
            <h4 className="text-2xl font-semibold text-navy mb-6 text-center">Why Join Lumivex</h4>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {benefits.map(benefit => (
                    <div key={benefit.title} className="bg-cream/50 rounded-xl p-6 flex items-start gap-4 border border-stone-200">
                        <div className="bg-ocean/10 p-3 rounded-full">
                           <benefit.icon className="h-6 w-6 text-ocean"/>
                        </div>
                        <div>
                            <h5 className="font-semibold text-navy">{benefit.title}</h5>
                            <p className="text-sm text-charcoal/80">{benefit.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        <div className="mt-12 text-center">
            <Button asChild size="lg" className="h-auto w-full max-w-md bg-navy-gradient px-12 py-5 text-lg font-semibold text-white shadow-lg shadow-ocean/30 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-ocean/50">
                <Link href={job.linkedinUrl} target="_blank" onClick={(e) => e.stopPropagation()}>
                    Apply on LinkedIn &rarr;
                </Link>
            </Button>
            <p className="text-sm text-silver mt-4">Applications are reviewed within 5 business days</p>
        </div>

      </CollapsibleContent>
    </Collapsible>
  );
}