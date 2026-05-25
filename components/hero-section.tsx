import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Clock, 
  Zap, 
  Calendar,
  MessageSquare,
  Headphones,
  Bot
} from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/30" />
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-primary/5 rounded-full blur-2xl" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <Badge variant="secondary" className="px-4 py-2 text-sm font-medium">
              AI Automation For Local Businesses
            </Badge>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight text-balance">
              Turn Your Business Into A 24/7 Revenue Machine With AI Employees
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
              AI voice agents, conversational chatbots, automated follow-up systems, and appointment booking designed to increase conversions and reduce missed opportunities.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild className="text-base px-8">
                <Link href="#contact">Book Free Demo</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="text-base px-8">
                <Link href="#examples">Watch Examples</Link>
              </Button>
            </div>
            
            {/* Trust Indicators */}
            <div className="flex flex-wrap gap-6 pt-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-5 h-5 text-primary" />
                <span>24/7 AI Support</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Zap className="w-5 h-5 text-primary" />
                <span>Instant Lead Response</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="w-5 h-5 text-primary" />
                <span>Automated Booking</span>
              </div>
            </div>
          </div>
          
          {/* Right Content - AI Dashboard Mockup */}
          <div className="relative">
            <div className="relative bg-card rounded-2xl shadow-2xl border border-border p-6 lg:p-8">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                    <Bot className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">AI Assistant</p>
                    <p className="text-xs text-green-500 flex items-center gap-1">
                      <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      Online
                    </p>
                  </div>
                </div>
                <Badge variant="secondary">Live Chat</Badge>
              </div>
              
              {/* Chat Messages */}
              <div className="space-y-4 mb-6">
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center shrink-0">
                    <span className="text-xs font-medium">JD</span>
                  </div>
                  <div className="bg-muted rounded-2xl rounded-tl-none px-4 py-3 max-w-[80%]">
                    <p className="text-sm text-foreground">Hi, I need to schedule an HVAC inspection for next week.</p>
                  </div>
                </div>
                
                <div className="flex gap-3 justify-end">
                  <div className="bg-primary text-primary-foreground rounded-2xl rounded-tr-none px-4 py-3 max-w-[80%]">
                    <p className="text-sm">{"I'd be happy to help you schedule that! I have availability on Tuesday at 10 AM or Thursday at 2 PM. Which works better for you?"}</p>
                  </div>
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4 text-primary-foreground" />
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center shrink-0">
                    <span className="text-xs font-medium">JD</span>
                  </div>
                  <div className="bg-muted rounded-2xl rounded-tl-none px-4 py-3 max-w-[80%]">
                    <p className="text-sm text-foreground">Tuesday at 10 AM works great!</p>
                  </div>
                </div>
              </div>
              
              {/* Input Area */}
              <div className="flex items-center gap-3 bg-muted rounded-xl px-4 py-3">
                <MessageSquare className="w-5 h-5 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Type your message...</span>
                <Headphones className="w-5 h-5 text-muted-foreground ml-auto" />
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-border">
                <div className="text-center">
                  <p className="text-2xl font-bold text-foreground">98%</p>
                  <p className="text-xs text-muted-foreground">Response Rate</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-foreground">{"< 3s"}</p>
                  <p className="text-xs text-muted-foreground">Avg Response</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-foreground">24/7</p>
                  <p className="text-xs text-muted-foreground">Availability</p>
                </div>
              </div>
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-primary/20 rounded-full blur-xl" />
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-primary/10 rounded-full blur-lg" />
          </div>
        </div>
      </div>
    </section>
  )
}
