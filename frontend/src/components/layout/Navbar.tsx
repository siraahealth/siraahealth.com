import { formattedPhoneNumber, PHONE_NUMBER } from "@/utils/contant";

export default function Navbar() {
  return (
    <header className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-border/50 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <a href="/">
          <div className="flex items-center gap-2">
            <img
              src="/assets/siraa-logo.png"
              alt="Siraa Health"
              className="w-16 h-16 object-contain"
            />
            <span className="font-display font-black text-2xl tracking-tight text-foreground">
              Siraa <span className="text-primary">Health</span>
            </span>
          </div>
        </a>

        <div className="flex items-center gap-4">
          {PHONE_NUMBER && (
            <div className="hidden md:flex flex-col items-end mr-4">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                Call Us Today
              </span>
              <a
                href={`tel:${PHONE_NUMBER}`}
                className="font-display font-bold text-primary text-lg"
              >
                {formattedPhoneNumber}
              </a>
            </div>
          )}
          <a href="/vaccination">
            <div className="hidden md:flex flex-col items-end mr-4">
              Why Vaccinate
            </div>
          </a>
          <a
            href="#booking-form"
            className="px-5 py-2.5 rounded-full font-bold bg-secondary text-secondary-foreground hover:bg-yellow-400 transition-colors hidden sm:block"
          >
            Book Assessment
          </a>
        </div>
      </div>
    </header>
  );
}
