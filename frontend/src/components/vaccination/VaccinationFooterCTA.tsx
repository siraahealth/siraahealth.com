"use client";

export function VaccinationFooterCTA() {
  return (
    <section className="py-20 lg:py-32 bg-blue-600 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-400/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-10 leading-tight max-w-4xl mx-auto">
          Keep Your Baby Protected with <br /> Timely Vaccination
        </h2>

        <div className="flex justify-center">
          <a
            href="#booking-form"
            className="px-10 py-5 rounded-full font-bold bg-yellow-400 text-black hover:bg-yellow-500 transition-all hover:scale-105 shadow-xl shadow-blue-900/20 text-xl"
            onClick={(e) => {
              e.preventDefault();
              document
                .querySelector("#booking-form")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Book Appointment
          </a>
        </div>
      </div>
    </section>
  );
}
