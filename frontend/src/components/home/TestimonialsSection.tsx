import { Star } from "lucide-react";
import { BookingForm } from "@/components/home/BookingForm";

export function TestimonialsSection() {
  return (
    <section className="py-20 lg:py-28 bg-primary/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Testimonials */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                Parent Stories
              </h2>
              <p className="text-lg text-muted-foreground font-medium">
                See how Siraa Health has transformed the lives of children and
                families.
              </p>
            </div>

            <div className="space-y-6">
              {[
                {
                  text: "My 2-year-old wasn't speaking at all. After 6 months of therapy at Siraa, he's stringing sentences together. The therapists are incredibly patient.",
                  author: "Neha S., Mother of 2yr old",
                },
                {
                  text: "The autism support program here gave us so much clarity and hope. The structured approach and parent counseling sessions were exactly what we needed.",
                  author: "Vikram R., Father of 4yr old",
                },
                {
                  text: "Highly recommend for occupational therapy. The clinic is so child-friendly, my daughter actually looks forward to her sessions every week!",
                  author: "Pooja M., Mother of 5yr old",
                },
              ].map((review, i) => (
                <div
                  key={i}
                  className="bg-white p-6 rounded-2xl shadow-md shadow-black/5 relative"
                >
                  <div className="flex gap-1 text-secondary mb-3">
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                  </div>
                  <p className="text-foreground/80 italic font-medium mb-4">
                    "{review.text}"
                  </p>
                  <p className="font-bold font-display text-sm text-primary">
                    {review.author}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Custom Booking Form */}
          <div className="sticky top-24 scroll-mt-32" id="booking-form">
            <BookingForm />
          </div>
        </div>
      </div>
    </section>
  );
}
