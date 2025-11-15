import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";

const faqItems = [
  {
    question: "When will I get access?",
    answer: "Beta invitations begin in Q1 2026. Waitlist members get access in waves based on signup order, referrals, and use case fit. Public launch follows in Q2 2026.",
  },
  {
    question: "Will joining the waitlist cost anything?",
    answer: "No. The waitlist is completely free. There's no credit card required, no commitment, and you can unsubscribe anytime.",
  },
  {
    question: "What is founder pricing?",
    answer: "Waitlist members get exclusive pricing up to 50% off our standard rates—and keep that pricing forever. It's our way of thanking early supporters.",
  },
  {
    question: "Can I invite team members?",
    answer: "Absolutely! Each person should join individually using your referral link so you get credit and they get their own spot.",
  },
  {
    question: "How often will you email me?",
    answer: "We send bi-weekly updates with development progress, feature previews, and launch news. You can adjust frequency or unsubscribe anytime.",
  },
  {
    question: "What if I change my email?",
    answer: <>No problem. Email <Link href="mailto:hello@lumivex.com" className="text-ocean hover:underline">hello@lumivex.com</Link> with your old and new email addresses and we'll update your spot on the waitlist.</>,
  },
  {
    question: "Can I join multiple times?",
    answer: "One email per person, please. Duplicate signups won't move you up the list and may delay your access.",
  },
  {
    question: "Is my data safe?",
    answer: <>Yes. We use industry-standard encryption and never share your information with third parties. Read our full <Link href="#" className="text-ocean hover:underline">Privacy Policy</Link>.</>,
  },
];

export function Faq() {
  return (
    <section className="bg-cream py-24 sm:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-normal text-navy sm:text-5xl lg:text-6xl tracking-tighter">
            Common Questions
          </h2>
        </div>
        <div className="mx-auto mt-12 max-w-3xl">
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-lg text-left font-medium text-navy hover:text-ocean">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-base text-charcoal/80 leading-relaxed">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
