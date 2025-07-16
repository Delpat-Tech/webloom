import React from "react";

type FounderQuoteProps = {
  headline: string;
  quote: string;
  cta: string;
};

const FounderQuote: React.FC<FounderQuoteProps> = ({ headline, quote, cta }) => (
  <section className="text-center py-8">
    <h2 className="text-2xl font-semibold mb-2">{headline}</h2>
    <blockquote className="italic text-lg mb-4">“{quote}”</blockquote>
    <button className="btn btn-link">{cta}</button>
  </section>
);

export default FounderQuote; 