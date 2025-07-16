import React from "react";

type CTASectionProps = {
  ctaText: string;
  buttonText: string;
};

const CTASection: React.FC<CTASectionProps> = ({ ctaText, buttonText }) => (
  <section className="w-full bg-primary text-white py-8 text-center rounded">
    <h2 className="text-2xl font-semibold mb-4">{ctaText}</h2>
    <button className="btn btn-secondary">{buttonText}</button>
  </section>
);

export default CTASection; 