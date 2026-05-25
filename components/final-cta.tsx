import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function FinalCTA() {
  return (
    <section id="contact" className="py-20 lg:py-28 bg-gradient-to-b from-background to-primary/5">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
          Ready To Automate Your Business?
        </h2>
        <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
          Stop missing leads and start converting visitors into booked appointments automatically. Schedule a free demo to see how AI can transform your business.
        </p>
        
        <Button size="lg" asChild className="text-base px-8 h-14">
          <Link href="mailto:hello@automateai.com" className="inline-flex items-center gap-2">
            Schedule Your Free Demo
            <ArrowRight className="w-5 h-5" />
          </Link>
        </Button>
        
        <p className="text-sm text-muted-foreground mt-6">
          No credit card required. 15-minute call. See results in days.
        </p>
      </div>
    </section>
  )
}
