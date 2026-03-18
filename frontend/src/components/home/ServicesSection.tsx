import {
  Smile,
  Puzzle,
  Brain,
  Users,
  Activity,
  HeartHandshake,
  ArrowRight,
} from "lucide-react";
import { ScrollButton } from "@/components/core/ScrollButton";

export function ServicesSection() {
  return (
    <section id="services" className="py-12 lg:py-20 bg-accent/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Specialized Pediatric Therapies
          </h2>
          <p className="text-lg text-muted-foreground font-medium max-w-2xl mx-auto">
            Comprehensive care under one roof. Our multidisciplinary team works
            together for holistic development.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: "Speech & Language Therapy",
              desc: "Helping children articulate, communicate, and express themselves confidently.",
              icon: <Smile className="text-blue-500 w-8 h-8" />,
              color: "bg-blue-100",
            },
            {
              title: "Occupational Therapy",
              desc: "Improving fine motor skills, sensory processing, and daily living activities.",
              icon: <Puzzle className="text-orange-500 w-8 h-8" />,
              color: "bg-orange-100",
            },
            {
              title: "Autism Support Program",
              desc: "Evidence-based early intervention for children on the autism spectrum.",
              icon: <Brain className="text-purple-500 w-8 h-8" />,
              color: "bg-purple-100",
            },
            {
              title: "Behavioral Therapy",
              desc: "Guiding positive behavior, emotional regulation, and social interactions.",
              icon: <Users className="text-green-500 w-8 h-8" />,
              color: "bg-green-100",
            },
            {
              title: "Developmental Assessments",
              desc: "Standardized testing to evaluate cognitive and physical milestones.",
              icon: <Activity className="text-rose-500 w-8 h-8" />,
              color: "bg-rose-100",
            },
            {
              title: "Parent Counseling",
              desc: "Equipping parents with tools and strategies to support development at home.",
              icon: <HeartHandshake className="text-teal-500 w-8 h-8" />,
              color: "bg-teal-100",
            },
          ].map((service, i) => (
            <div
              key={i}
              className="bg-white rounded-3xl p-8 shadow-lg shadow-black/5 hover:shadow-xl hover:shadow-primary/10 border border-border/50 hover:-translate-y-1 transition-all duration-300 flex flex-col h-full"
            >
              <div
                className={`w-16 h-16 ${service.color} rounded-2xl flex items-center justify-center mb-6`}
              >
                {service.icon}
              </div>
              <h3 className="text-xl font-bold font-display mb-3">
                {service.title}
              </h3>
              <p className="text-muted-foreground font-medium mb-6 flex-grow">
                {service.desc}
              </p>
              <ScrollButton
                sectionId="booking-form"
                className="text-primary font-bold inline-flex items-center gap-2 hover:gap-3 transition-all"
              >
                Book Consultation <ArrowRight className="w-4 h-4" />
              </ScrollButton>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
