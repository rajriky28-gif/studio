import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqItems = [
  {
    question: "When will Lumivex launch?",
    answer: "We're currently in active development with a planned beta launch in Q1 2026 and public launch in Q2 2026. Join our waitlist to be among the first to access the platform."
  },
  {
    question: "How can I join the waitlist?",
    answer: "Simply visit our homepage and enter your email in the waitlist form. You'll receive updates about our progress and early access opportunities."
  },
  {
    question: "Are you hiring?",
    answer: "We're a small, focused team right now, but we're always open to connecting with talented individuals who share our mission. Send your information to careers@lumivex.com."
  },
  {
    question: "Can I become a beta tester?",
    answer: "Yes! Everyone on our waitlist will be considered for beta access starting Q1 2026. Waitlist members will receive invitations in waves based on signup order and use case fit."
  },
  {
    question: "Do you offer partnership opportunities?",
    answer: "We're open to strategic partnerships that align with our mission. If you're interested, please email hello@lumivex.com with details about your organization and proposed collaboration."
  },
  {
    question: "Can I invest in Lumivex?",
    answer: "We're not currently raising capital, but we appreciate your interest. If you're an investor interested in future opportunities, please email hello@lumivex.com and we'll keep you informed."
  },
];


export function Faq() {
  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-normal text-navy sm:text-5xl lg:text-6xl tracking-tighter">
            Quick Answers
          </h2>
          <p className="mt-4 text-lg text-charcoal sm:text-xl">
            Before reaching out, see if we've already answered your question below.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-3xl">
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