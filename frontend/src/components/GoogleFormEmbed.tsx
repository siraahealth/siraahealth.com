"use client";
export function GoogleFormEmbed() {
  return (
    <div id="booking-form" className="bg-white rounded-3xl p-6 sm:p-10 shadow-2xl shadow-primary/10 border border-primary/5 relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -ml-32 -mb-32 pointer-events-none" />

      <div className="relative z-10">
        <div className="text-center mb-8">
          <h3 className="text-2xl sm:text-3xl font-display font-bold text-foreground">
            Book a Development Assessment
          </h3>
          <p className="text-muted-foreground mt-2 font-medium">
            Take the first step towards your child's brighter future.
          </p>
        </div>

        <div className="w-full h-[600px] sm:h-[700px]">
          <iframe
            src="https://forms.gle/hWLoBx9sAQkL1L2w5"
            width="100%"
            height="100%"
            frameBorder="0"
            marginHeight={0}
            marginWidth={0}
            className="rounded-xl"
          >
            Loading…
          </iframe>
        </div>
      </div>
    </div>
  );
}
