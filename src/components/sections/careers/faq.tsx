import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqItems = [
  {
    question: "What's the interview process?",
    answer: "Our process typically includes: (1) Initial call with hiring manager, (2) Technical assessment or case study, (3) Team interviews, (4) Final conversation with founders. Total time: 1-2 weeks."
  },
  {
    question: "Do you sponsor visas?",
    answer: "We're currently unable to sponsor work visas, but we're building a global remote team and welcome applications from anywhere."
  },
  {
    question: "What's the work environment like?",
    answer: "We're remote-first with async communication. Most team members overlap 4 hours per day for collaboration. We value deep work, clear communication, and work-life balance."
  },
  {
    question: "How do you approach diversity & inclusion?",
    answer: "We're committed to building a diverse team and inclusive culture. We evaluate candidates solely on merit and actively work to reduce bias in our hiring process."
  },
  {
    question: "When will I hear back?",
    answer: "We review applications within 5 business days and respond to everyone, even if it's not a fit right now."
  },
];


export function Faq() {
  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-normal text-navy sm:text-5xl lg:text-6xl tracking-tighter">
            Frequently Asked Questions
          </h2>
        </div>
        <div className="mx-auto mt-16 max-w-3xl">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="bg-cream/50 border border-stone-200 rounded-xl px-6">
                <AccordionTrigger className="text-lg text-left font-medium text-navy hover:text-ocean no-underline">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-base text-charcoal/80 leading-relaxed pt-2">
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