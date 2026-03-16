import { BookingForm } from "@/components/home/BookingForm";
import ParentStories from "./ParentStories";

export function TestimonialsSection() {
  return (
    <section className="py-20 lg:py-28 bg-primary/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Parent Stories */}
          <ParentStories />

          {/* Custom Booking Form */}
          <BookingForm />
        </div>
      </div>
    </section>
  );
}
