import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

const plans = [
  {
    name: "Starter",
    price: "$497",
    period: "/mo",
    description: "Perfect for small businesses just getting started with AI automation.",
    features: [
      "AI Chatbot",
      "Lead Capture",
      "CRM Integration",
      "Email Support",
    ],
    featured: false,
  },
  {
    name: "Growth",
    price: "$997",
    period: "/mo",
    description: "For growing businesses that want full automation capabilities.",
    features: [
      "AI Voice Agent",
      "Appointment Booking",
      "Automation Workflows",
      "Follow-Up Campaigns",
      "Priority Support",
      "Custom Training",
    ],
    featured: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: " Pricing",
    description: "Tailored solutions for multi-location businesses and franchises.",
    features: [
      "Multi-location Support",
      "Custom AI Workflows",
      "Dedicated Account Manager",
      "API Access",
      "White-label Options",
      "SLA Guarantee",
    ],
    featured: false,
  },
]

export function PricingSection() {
  return (
    <section id="pricing" className="py-20 lg:py-28 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
            Simple Pricing
          </h2>
          <p className="text-lg text-muted-foreground">
            Choose the plan that fits your business needs. No hidden fees.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-card rounded-2xl border p-8 flex flex-col ${
                plan.featured
                  ? "border-primary shadow-xl scale-105 lg:scale-110"
                  : "border-border hover:shadow-lg"
              } transition-all duration-300`}
            >
              {plan.featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {plan.name}
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {plan.description}
                </p>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
              </div>
              
              <ul className="space-y-3 mb-8 flex-grow">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-primary shrink-0" />
                    <span className="text-sm text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button
                asChild
                variant={plan.featured ? "default" : "outline"}
                className="w-full"
              >
                <Link href="#contact">Get Started</Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
