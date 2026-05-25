import { Play } from "lucide-react"

const examples = [
  {
    title: "Bakery AI Assistant",
    description: "Answers customer questions, takes cake orders, and books catering inquiries automatically.",
    thumbnail: "/api/placeholder/640/360",
  },
  {
    title: "HVAC AI Receptionist",
    description: "Handles emergency service inquiries, appointment scheduling, and lead qualification 24/7.",
    thumbnail: "/api/placeholder/640/360",
  },
  {
    title: "Optical Shop AI Agent",
    description: "Books eye exams, answers insurance questions, and manages customer support.",
    thumbnail: "/api/placeholder/640/360",
  },
]

export function ExamplesSection() {
  return (
    <section id="examples" className="py-20 lg:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
            See AI Employees In Action
          </h2>
          <p className="text-lg text-muted-foreground">
            Real-world conversational AI examples built for local businesses.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {examples.map((example, index) => (
            <div
              key={index}
              className="group bg-card rounded-2xl border border-border overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              {/* Video Placeholder */}
              <div className="relative aspect-video bg-gradient-to-br from-muted to-muted/50 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-primary/90 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform cursor-pointer">
                    <Play className="w-6 h-6 text-primary-foreground ml-1" />
                  </div>
                </div>
                {/* Placeholder Grid Pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:20px_20px]" />
              </div>
              
              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {example.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {example.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
