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
import {
  ServicesSwiper,
  type ServiceSwiperItem,
} from "@/components/swipers/ServicesSwiper";

export function ServicesSection() {
  const iconMap = {
    Smile,
    Puzzle,
    Brain,
    Users,
    Activity,
    HeartHandshake,
  };

  const services: ServiceSwiperItem[] = [
    {
      title: "Speech & Language Therapy",
      desc: "Helping children articulate, communicate, and express themselves confidently.",
      icon: "Smile",
      color: "bg-blue-100",
      iconColor: "text-blue-500",
    },
    {
      title: "Occupational Therapy",
      desc: "Improving fine motor skills, sensory processing, and daily living activities.",
      icon: "Puzzle",
      color: "bg-orange-100",
      iconColor: "text-orange-500",
    },
    {
      title: "Autism Support Program",
      desc: "Evidence-based early intervention for children on the autism spectrum.",
      icon: "Brain",
      color: "bg-purple-100",
      iconColor: "text-purple-500",
    },
    {
      title: "Behavioral Therapy",
      desc: "Guiding positive behavior, emotional regulation, and social interactions.",
      icon: "Users",
      color: "bg-green-100",
      iconColor: "text-green-500",
    },
    {
      title: "Developmental Assessments",
      desc: "Standardized testing to evaluate cognitive and physical milestones.",
      icon: "Activity",
      color: "bg-rose-100",
      iconColor: "text-rose-500",
    },
    {
      title: "Parent Counseling",
      desc: "Equipping parents with tools and strategies to support development at home.",
      icon: "HeartHandshake",
      color: "bg-teal-100",
      iconColor: "text-teal-500",
    },
  ];

  return (
    <section
      id="services"
      className="py-12 lg:py-20 bg-accent/30 overflow-hidden"
    >
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

        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, i) => {
            const Icon = iconMap[service.icon];
            return (
              <div
                key={i}
                className="bg-white rounded-3xl p-8 shadow-lg shadow-black/5 hover:shadow-xl hover:shadow-primary/10 border border-border/50 hover:-translate-y-1 transition-all duration-300 flex flex-col h-full"
              >
                <div
                  className={`w-16 h-16 ${service.color} rounded-2xl flex items-center justify-center mb-6`}
                >
                  <Icon className={`w-8 h-8 ${service.iconColor}`} />
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
            );
          })}
        </div>
        <ServicesSwiper services={services} className="md:hidden" />
      </div>
    </section>
  );
}
