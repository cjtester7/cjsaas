import { Building2, Stethoscope, Home, Cake, Eye, Building } from "lucide-react"

const logos = [
  { name: "HVAC Company", icon: Home },
  { name: "Dental Clinic", icon: Stethoscope },
  { name: "Roofing Company", icon: Building2 },
  { name: "Bakery", icon: Cake },
  { name: "Optical Shop", icon: Eye },
  { name: "Real Estate Agency", icon: Building },
]

export function SocialProof() {
  return (
    <section className="py-16 bg-muted/30 border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm font-medium text-muted-foreground mb-10">
          Trusted By Local Businesses Across The USA
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {logos.map((logo) => (
            <div
              key={logo.name}
              className="flex flex-col items-center justify-center gap-3 p-4 bg-card rounded-xl border border-border hover:shadow-md transition-shadow"
            >
              <logo.icon className="w-8 h-8 text-muted-foreground" />
              <span className="text-sm font-medium text-muted-foreground text-center">
                {logo.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
