import React from "react";

type SocialProofProps = {
  logos: string[];
  caption: string;
};

const SocialProofSection: React.FC<SocialProofProps> = ({ logos, caption }) => (
  <section className="text-center py-8">
    <div className="flex flex-wrap justify-center gap-6 mb-4">
      {logos.map((logo, idx) => (
        <img key={idx} src={logo} alt={`Client logo ${idx + 1}`} className="h-10" />
      ))}
    </div>
    <p className="text-sm text-gray-500">{caption}</p>
  </section>
);

export default SocialProofSection;