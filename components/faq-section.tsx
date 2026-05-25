"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "How fast can setup happen?",
    answer: "Most businesses are up and running within 7-14 days. We handle the entire setup process, including custom AI training, integrations, and testing. For simpler implementations, we can often launch in as little as 3-5 days.",
  },
  {
    question: "Can this work with my CRM?",
    answer: "Yes! We integrate with all major CRM platforms including HubSpot, Salesforce, Zoho, and many more. We also work with industry-specific tools. If you have a custom system, our team can build a custom integration.",
  },
  {
    question: "Does the AI answer phone calls?",
    answer: "Absolutely. Our AI voice agents can handle inbound calls with natural, human-like conversations. They can qualify leads, answer common questions, schedule appointments, and transfer to a human when needed.",
  },
  {
    question: "Can customers book appointments automatically?",
    answer: "Yes, the AI can access your calendar in real-time and book appointments directly. It handles availability checks, confirmation messages, and even sends reminders. No more back-and-forth scheduling.",
  },
  {
    question: "Is this customizable for my business?",
    answer: "Every AI system we build is customized specifically for your business. We train the AI on your services, pricing, FAQs, and brand voice. It will feel like a knowledgeable member of your team, not a generic bot.",
  },
]

export function FAQSection() {
  return (
    <section className="py-20 lg:py-28 bg-muted/30">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground">
            Got questions? We&apos;ve got answers.
          </p>
        </div>
        
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-card border border-border rounded-xl px-6 data-[state=open]:shadow-md transition-shadow"
            >
              <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline py-5">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
