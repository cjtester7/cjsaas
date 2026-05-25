import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Owner, Sweet Delights Bakery",
    content: "The AI assistant has completely transformed how we handle cake orders. We used to miss calls during busy hours, but now every customer gets an instant response. Our booking rate has increased by 40%!",
    rating: 5,
    initials: "SJ",
  },
  {
    name: "Mike Thompson",
    role: "Owner, Thompson HVAC Services",
    content: "I was skeptical at first, but the results speak for themselves. The AI handles emergency calls at 3 AM better than I could. We&apos;ve captured leads we would have lost and our response time went from hours to seconds.",
    rating: 5,
    initials: "MT",
  },
  {
    name: "Dr. Lisa Chen",
    role: "Manager, ClearView Optical",
    content: "Patients love being able to book eye exams instantly without waiting on hold. The AI even handles insurance questions, which has freed up our staff to focus on patient care. Highly recommend!",
    rating: 5,
    initials: "LC",
  },
]

export function Testimonials() {
  return (
    <section className="py-20 lg:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
            What Our Clients Say
          </h2>
          <p className="text-lg text-muted-foreground">
            Real results from real businesses using AI automation.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-card rounded-2xl border border-border p-8 hover:shadow-lg transition-shadow"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              
              {/* Content */}
              <p className="text-foreground mb-6 leading-relaxed">
                &ldquo;{testimonial.content}&rdquo;
              </p>
              
              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-primary font-semibold">{testimonial.initials}</span>
                </div>
                <div>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
