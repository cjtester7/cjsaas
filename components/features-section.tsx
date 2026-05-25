import { 
  Mic, 
  MessageCircle, 
  Calendar, 
  PhoneCall, 
  Users, 
  CheckCircle, 
  Star, 
  Send 
} from "lucide-react"

const features = [
  {
    icon: Mic,
    title: "AI Voice Agents",
    description: "Human-like voice conversations that handle calls, qualify leads, and book appointments automatically.",
  },
  {
    icon: MessageCircle,
    title: "Conversational Website Chatbots",
    description: "Smart chat assistants that engage visitors, answer questions, and capture contact information 24/7.",
  },
  {
    icon: Calendar,
    title: "Automated Appointment Booking",
    description: "Seamless scheduling that syncs with your calendar and confirms appointments instantly.",
  },
  {
    icon: PhoneCall,
    title: "Missed Call Text Back",
    description: "Never lose a lead again with instant text responses to missed calls.",
  },
  {
    icon: Users,
    title: "CRM & Pipeline Automation",
    description: "Automatically organize leads, track interactions, and move prospects through your sales pipeline.",
  },
  {
    icon: CheckCircle,
    title: "Lead Qualification",
    description: "AI-powered screening that identifies and prioritizes your best potential customers.",
  },
  {
    icon: Star,
    title: "Review & Reputation Management",
    description: "Automated review requests and monitoring to build and protect your online reputation.",
  },
  {
    icon: Send,
    title: "Automated Follow-Up Campaigns",
    description: "Nurture leads with personalized email and SMS sequences that convert.",
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 lg:py-28 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
            Everything You Need To Automate Your Business
          </h2>
          <p className="text-lg text-muted-foreground">
            A complete suite of AI tools designed to help local businesses capture more leads and close more deals.
          </p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-card rounded-xl border border-border p-6 hover:shadow-lg hover:border-primary/20 transition-all duration-300"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
