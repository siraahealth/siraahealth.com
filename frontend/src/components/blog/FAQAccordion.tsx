"use client";
import { useState } from "react";

interface FAQ {
  question: string;
  answer: string;
}

export default function FAQAccordion({ content }: { content: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  
  const faqMatches = [...content.matchAll(/(?:###\s*)?Q:\s*([^\n]+)\n+(?:\*\*A:\*\*|A:)\s*([^\n]+(?:\n(?!(?:###\s*)?Q:)[^\n]+)*)/g)];
  
  if (faqMatches.length === 0) return null;
  
  const faqs = faqMatches.map(m => ({
    question: m[1].trim(),
    answer: m[2].trim()
  }));

  return (
    <div className="mb-10">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
      <div className="space-y-3">
        {faqs.map((faq, i) => (
          <div key={i} className="border border-gray-200 rounded-xl overflow-hidden">
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full flex items-center justify-between px-6 py-4 text-left bg-white hover:bg-gray-50 transition-colors"
            >
              <span className="font-semibold text-gray-900 pr-4">{faq.question}</span>
              <span className="text-2xl text-teal-600 flex-shrink-0">
                {openIndex === i ? "\u2212" : "+"}
              </span>
            </button>
            {openIndex === i && (
              <div className="px-6 py-4 bg-teal-50 border-t border-gray-100">
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}