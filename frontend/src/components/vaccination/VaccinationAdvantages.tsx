"use client";

import { Shield, Heart, Users, CheckCircle } from "lucide-react";

export function VaccinationAdvantages() {
  const advantages = [
    {
      title: "Prevent Dangerous Diseases",
      description: "Vaccines protect children from diseases like measles, polio, and pneumonia.",
      icon: Shield,
      color: "blue",
    },
    {
      title: "Build Strong Immunity",
      description: "Vaccines train the immune system to fight infections early.",
      icon: Heart,
      color: "red",
    },
    {
      title: "Protect the Community",
      description: "Vaccination prevents outbreaks and protects other children.",
      icon: Users,
      color: "purple",
    },
    {
      title: "Safe & Well Tested",
      description: "Vaccines are carefully tested and monitored for safety.",
      icon: CheckCircle,
      color: "green",
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
            Why Vaccination Is Important for Your Child
          </h2>
          <div className="w-24 h-1.5 bg-yellow-400 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {advantages.map((adv, index) => (
            <div
              key={index}
              className="group bg-white rounded-3xl p-8 border border-border hover:border-blue-500/30 hover:shadow-2xl hover:shadow-blue-900/5 transition-all duration-500 animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`mb-6 p-4 rounded-2xl bg-blue-50 text-blue-500 group-hover:scale-110 transition-transform duration-500 w-fit`}>
                <adv.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold font-display mb-4 text-foreground">
                {adv.title}
              </h3>
              <p className="text-muted-foreground font-medium leading-relaxed">
                {adv.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
