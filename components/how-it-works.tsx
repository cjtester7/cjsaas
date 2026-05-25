import { Settings, Plug, Rocket } from "lucide-react"

const steps = [
  {
    icon: Settings,
    step: "01",
    title: "We Build Your AI System",
    description: "Our team designs and configures AI agents tailored to your specific business needs and workflows.",
  },
  {
    icon: Plug,
    step: "02",
    title: "We Integrate It Into Your Business",
    description: "Seamless integration with your existing tools, CRM, and communication channels.",
  },
  {
    icon: Rocket,
    step: "03",
    title: "You Capture More Leads Automatically",
    description: "Watch as your AI employees work around the clock to engage leads and book appointments.",
  },
]

export function HowItWorks() {
  return (
    <section className="py-20 lg:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground">
            Get up and running with AI automation in three simple steps.
          </p>
        </div>
        
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-border -translate-y-1/2" />
          
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-card rounded-2xl border border-border p-8 text-center hover:shadow-lg transition-shadow">
                  {/* Step Number */}
                  <div className="relative inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full mb-6">
                    <span className="text-primary-foreground font-bold text-lg">{step.step}</span>
                  </div>
                  
                  {/* Icon */}
                  <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <step.icon className="w-7 h-7 text-primary" />
                  </div>
                  
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
