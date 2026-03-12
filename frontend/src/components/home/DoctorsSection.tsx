import { Clock } from "lucide-react";
import type { Doctor } from "@/lib/doctors";

export function DoctorsSection({ doctors }: { doctors: Doctor[] }) {
  return (
    <section id="doctors" className="py-20 lg:py-28 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Meet Our Child Specialists
          </h2>
          <p className="text-lg text-muted-foreground font-medium max-w-2xl mx-auto">
            Gurgaon's top pediatric therapists dedicated to your child's growth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {doctors.slice(0, 3).map((doc, i) => (
            <div
              key={i}
              className="bg-accent/20 rounded-3xl overflow-hidden border border-border hover:border-primary/30 transition-all duration-300"
            >
              <div className="aspect-square w-full overflow-hidden">
                {doc.imageUrl && (
                  <img
                    src={doc.imageUrl}
                    alt={doc.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                )}
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold font-display mb-1">
                  {doc.name}
                </h3>
                <p className="text-primary font-semibold text-sm mb-3">
                  {doc.designation}
                </p>
                <div className="inline-flex items-center gap-1 bg-white px-3 py-1 rounded-full text-xs font-bold text-muted-foreground border border-border">
                  <Clock className="w-3 h-3" /> {doc.experience}+ Years
                  Experience
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
