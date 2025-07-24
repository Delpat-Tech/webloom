import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { TestimonialsProps, Testimonial } from '@/types';
import SimpleCard from '@/components/ui/SimpleCard';

const defaultTestimonials: Testimonial[] = [
  {
    quote: "Delpat delivered our MVP in 5 weeks when our internal team estimated 4 months. Game changer.",
    author: "Sarah Chen",
    role: "CEO, TechFlow",
    avatar: "SC"
  },
  {
    quote: "Finally, developers who think like founders. They built exactly what we needed, not what we asked for.",
    author: "Marcus Rodriguez",
    role: "Founder, DataLens",
    avatar: "MR"
  },
  {
    quote: "Our internal dashboard went from chaos to clarity in 3 weeks. ROI was immediate.",
    author: "Priya Sharma",
    role: "Operations Lead, GrowthCo",
    avatar: "PS"
  }
];

const Testimonials: React.FC<TestimonialsProps> = ({
  testimonials = defaultTestimonials,
  title = 'What Founders Are Saying'
}) => (
  <section className="relative px-6 md:px-12 lg:px-20 py-20 bg-gradient-to-r from-muted/30 via-background to-muted/30">
    <div className="max-w-6xl mx-auto">
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="section-title">{title}</span>
        </h2>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <SimpleCard
            key={index}
            className="group relative p-6 rounded-2xl border border-border/50 bg-background/50 backdrop-blur-sm hover:shadow-xl transition-all duration-500"
          >
            <div className="flex items-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-accent fill-current" />
              ))}
            </div>
            <blockquote className="text-muted-foreground mb-6 leading-relaxed">
              &quot;{testimonial.quote}&quot;
            </blockquote>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm">
                {testimonial.avatar}
              </div>
              <div>
                <div className="font-medium text-foreground">{testimonial.author}</div>
                <div className="text-sm text-muted-foreground">{testimonial.role}</div>
              </div>
            </div>
          </SimpleCard>
        ))}
      </div>
    </div>
  </section>
);

export default Testimonials;
