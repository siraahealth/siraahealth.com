import { Star } from "lucide-react";

const STORIES = [
  {
    author: "Priya M.",
    location: "DLF Phase 2, Gurgaon",
    child: "Mother of Aryan, 3 years",
    condition: "Speech Delay",
    story:
      "Aryan wasn't saying a single word at 2.5 years. Every relative had a different opinion and we were lost. A friend recommended Siraa and within the first assessment session, the therapist explained exactly what was happening and why. Six months later, Aryan is stringing 3-4 word sentences and asking questions non-stop. I actually cried the first time he said 'Mama, I hungry.' The team here gave us our son's voice.",
  },
  {
    author: "Vikram & Deepa R.",
    location: "Sushant Lok, Gurgaon",
    child: "Parents of Rehan, 4 years",
    condition: "Autism Spectrum Disorder",
    story:
      "After Rehan's diagnosis, we spent months in denial and confusion. We tried two other clinics before Siraa. What's different here is the parent counselling — we didn't just learn about our son's condition, we learned how to be his biggest support. His eye contact has improved dramatically, he now plays alongside other children, and he started at a mainstream school this year. We couldn't have imagined this 18 months ago.",
  },
  {
    author: "Sunita K.",
    location: "Sector 56, Gurgaon",
    child: "Mother of Meera, 5 years",
    condition: "ADHD",
    story:
      "Meera's teachers kept complaining she couldn't sit still or focus for even 5 minutes. I was worried she'd fall behind in school. The occupational therapy at Siraa has been a game changer — they worked on her sensory needs and attention in a way that felt like play to her. She actually looks forward to her sessions every week. Her concentration has improved so much that her class teacher called me last month just to say how proud she is of Meera's progress.",
  },
  {
    author: "Rahul S.",
    location: "Golf Course Road, Gurgaon",
    child: "Father of Kabir, 2.5 years",
    condition: "Global Developmental Delay",
    story:
      "Kabir was behind on almost every milestone — walking, talking, responding to his name. The developmental assessment at Siraa was the first time someone gave us a clear picture without making us feel hopeless. They built a structured plan and involved us every step of the way. In 8 months he started walking independently and is now attempting words. Small wins mean everything when you're on this journey.",
  },
  {
    author: "Anjali & Mohan T.",
    location: "Palam Vihar, Gurgaon",
    child: "Parents of Ishaan, 6 years",
    condition: "Learning Disorder",
    story:
      "Ishaan is bright and funny but struggled terribly with reading and writing. His school suggested he might need to repeat a year. The team at Siraa identified it was dyslexia and started a targeted programme. It took patience but within a year he was reading on grade level. He told me recently that he doesn't feel 'dumb' anymore. That sentence broke me in the best possible way. Thank you Siraa.",
  },
];

export default function ParentStories() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-2">
          Real families, real results
        </p>
        <h2 className="text-3xl md:text-4xl font-display font-bold mb-3">
          Parent stories
        </h2>
        <p className="text-lg text-muted-foreground font-medium max-w-2xl">
          Hundreds of Gurgaon families have walked this path with us. Here are a
          few of their stories.
        </p>
      </div>

      {/* Stories */}
      <div className="space-y-6">
        {STORIES.map((review, i) => (
          <div
            key={i}
            className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-border/50 relative"
          >
            {/* Stars */}
            <div className="flex gap-1 text-yellow-400 mb-4">
              {[...Array(5)].map((_, s) => (
                <Star key={s} className="w-4 h-4 fill-current" />
              ))}
            </div>

            {/* Condition badge */}
            <span className="inline-block text-[11px] font-bold uppercase tracking-widest text-primary bg-primary/8 px-3 py-1 rounded-full mb-4">
              {review.condition}
            </span>

            {/* Story */}
            <p className="text-foreground/80 text-[15px] leading-relaxed italic mb-6">
              "{review.story}"
            </p>

            {/* Author */}
            <div className="flex items-center gap-3 pt-4 border-t border-border/40">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <span className="text-primary font-bold text-[14px]">
                  {review.author.charAt(0)}
                </span>
              </div>
              <div>
                <p className="font-bold text-[14px] text-foreground">
                  {review.author}
                </p>
                <p className="text-[13px] text-muted-foreground">
                  {review.child} · {review.location}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
