import dynamic from "next/dynamic";
import ParentStories from "./ParentStories";

// Dynamically imported so the yup/react-hook-form validation code only
// ships to routes that actually render this booking form, instead of
// Next bundling it into every route's shared chunk.
const BookingForm = dynamic(() =>
  import("@/components/home/BookingForm").then((m) => m.BookingForm),
);

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
