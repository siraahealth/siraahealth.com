import { Activity, Stethoscope, HeartHandshake, CheckCircle2 } from "lucide-react";

export function CareJourneySection() {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Our Simple 4-Step Care Journey
          </h2>
          <p className="text-lg text-muted-foreground font-medium max-w-2xl mx-auto">
            We make it easy for parents to understand and participate in their
            child's developmental progress.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          {/* Connecting line for desktop */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-accent -translate-y-1/2 rounded-full z-0"></div>

          {[
            {
              step: "1",
              title: "Development Screening",
              desc: "Initial clinical evaluation to identify specific needs.",
              icon: <Activity className="w-8 h-8" />,
            },
            {
              step: "2",
              title: "Specialist Assessment",
              desc: "Detailed diagnosis by our pediatric experts.",
              icon: <Stethoscope className="w-8 h-8" />,
            },
            {
              step: "3",
              title: "Personalized Plan",
              desc: "Customized therapy tailored for your child.",
              icon: <HeartHandshake className="w-8 h-8" />,
            },
            {
              step: "4",
              title: "Progress Tracking",
              desc: "Regular milestones reviews and parent updates.",
              icon: <CheckCircle2 className="w-8 h-8" />,
            },
          ].map((item, i) => (
            <div
              key={i}
              className="relative z-10 flex flex-col items-center text-center group"
            >
              <div className="w-20 h-20 bg-white rounded-2xl shadow-xl shadow-primary/10 border-2 border-primary/20 flex items-center justify-center text-primary group-hover:-translate-y-2 group-hover:bg-primary group-hover:text-white transition-all duration-300 mb-6">
                {item.icon}
              </div>
              <div className="bg-accent/50 text-primary font-black w-8 h-8 rounded-full flex items-center justify-center mb-3 text-sm">
                {item.step}
              </div>
              <h3 className="text-xl font-bold font-display mb-2">
                {item.title}
              </h3>
              <p className="text-muted-foreground font-medium text-sm px-4">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
