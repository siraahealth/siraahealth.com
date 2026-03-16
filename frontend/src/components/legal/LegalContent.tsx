import React from "react";

interface LegalContentProps {
  children: React.ReactNode;
}

export function LegalContent({ children }: LegalContentProps) {
  return (
    <section className="py-6 sm:py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div
            className="prose prose-lg prose-slate max-w-none 
            prose-headings:font-display prose-headings:font-bold prose-headings:text-foreground
            prose-p:text-muted-foreground prose-p:leading-relaxed
            prose-li:text-muted-foreground prose-strong:text-foreground prose-strong:font-bold
            prose-h2:text-2xl prose-h2:sm:text-3xl prose-h2:mt-8 prose-h2:sm:mt-12 prose-h2:mb-4 prose-h2:sm:mb-6 prose-h2:pb-2 prose-h2:border-b prose-h2:border-border/50
            prose-h3:text-lg prose-h3:sm:text-xl prose-h3:mt-6 prose-h3:sm:mt-8 prose-h3:mb-4 prose-h3:sm:mb-6"
          >
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
