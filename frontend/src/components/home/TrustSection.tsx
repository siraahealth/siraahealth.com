import { Smile, Puzzle, Activity, Brain } from "lucide-react";

export function TrustSection() {
  return (
    <section id="about" className="py-12 bg-white border-y border-border/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm font-bold text-muted-foreground uppercase tracking-widest mb-8">
          Trusted by 1000+ parents in Gurgaon for
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-12 opacity-80">
          <div className="flex flex-col items-center justify-center gap-3 text-center group">
            <div className="w-16 h-16 rounded-2xl bg-accent flex items-center justify-center group-hover:scale-110 transition-transform group-hover:bg-primary group-hover:text-white text-primary">
              <Smile className="w-8 h-8" />
            </div>
            <span className="font-bold font-display">Speech Therapy</span>
          </div>
          <div className="flex flex-col items-center justify-center gap-3 text-center group">
            <div className="w-16 h-16 rounded-2xl bg-accent flex items-center justify-center group-hover:scale-110 transition-transform group-hover:bg-primary group-hover:text-white text-primary">
              <Puzzle className="w-8 h-8" />
            </div>
            <span className="font-bold font-display">Occupational Therapy</span>
          </div>
          <div className="flex flex-col items-center justify-center gap-3 text-center group">
            <div className="w-16 h-16 rounded-2xl bg-accent flex items-center justify-center group-hover:scale-110 transition-transform group-hover:bg-primary group-hover:text-white text-primary">
              <Activity className="w-8 h-8" />
            </div>
            <span className="font-bold font-display">
              Developmental Assessment
            </span>
          </div>
          <div className="flex flex-col items-center justify-center gap-3 text-center group">
            <div className="w-16 h-16 rounded-2xl bg-accent flex items-center justify-center group-hover:scale-110 transition-transform group-hover:bg-primary group-hover:text-white text-primary">
              <Brain className="w-8 h-8" />
            </div>
            <span className="font-bold font-display">Behavior Therapy</span>
          </div>
        </div>
      </div>
    </section>
  );
}
