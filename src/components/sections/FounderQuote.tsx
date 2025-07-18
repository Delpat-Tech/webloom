import React from "react";

type FounderQuoteProps = {
  headline: string;
  quote: string;
  cta: string;
};

const FounderQuote: React.FC<FounderQuoteProps> = ({ headline, quote, cta }) => (
  <section className="text-center py-8">
    <h2 className="text-3xl sm:text-4xl font-heading font-extrabold section-title text-center mb-4">{headline}</h2>
    <blockquote className="italic text-xl sm:text-2xl text-[var(--foreground)] mb-6">
       “{quote}”
    </blockquote>
    <button className="btn btn-link">{cta}</button>
  </section>
);

export default FounderQuote; 