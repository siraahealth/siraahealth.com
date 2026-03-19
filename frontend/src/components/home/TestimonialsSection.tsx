import { BookingForm } from "@/components/home/BookingForm";
import ParentStories from "./ParentStories";

export function TestimonialsSection() {
  return (
    <section className="py-12 lg:py-20 bg-primary/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start py-12 lg:py-20">
          {/* Parent Stories */}
          <ParentStories />

          {/* Custom Booking Form */}
          <div id="booking-form" className="scroll-mt-24">
            <BookingForm />
          </div>
        </div>
      </div>
    </section>
  );
}
