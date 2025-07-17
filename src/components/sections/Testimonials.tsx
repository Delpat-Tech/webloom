import React from "react";

type Testimonial = { quote: string; author: string };
type TestimonialsProps = {
  testimonials: Testimonial[];
};

const Testimonials: React.FC<TestimonialsProps> = ({ testimonials }) => (
  <section className="text-center py-8">
    <h2 className="text-2xl font-semibold mb-4">Testimonials</h2>
    <div className="flex flex-col sm:flex-row gap-6 justify-center">
      {testimonials.map((t, idx) => (
        <div key={idx} className="bg-white shadow p-4 rounded max-w-xs mx-auto">
          <blockquote className="italic mb-2">“{t.quote}”</blockquote>
          <div className="text-sm text-gray-600">— {t.author}</div>
        </div>
      ))}
    </div>
  </section>
);

export default Testimonials; 