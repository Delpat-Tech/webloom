import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpCircle } from 'react-feather';
import { CTASectionProps } from '@/types';
import Button from '@/components/ui/Button';

const CTASection: React.FC<CTASectionProps> = ({
  title = 'Ready to Execute Your Vision?',
  subtitle = "Stop planning. Start building. Let's turn your ideas into powerful tools that drive growth.",
  buttonText = 'Get Your Free Execution Roadmap',
  href = '/contact',
}) => (
  <section className="relative px-6 md:px-12 lg:px-20 py-20 bg-gradient-to-r from-primary via-secondary to-accent">
    <div className="max-w-4xl mx-auto text-center text-primary-foreground">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 text-primary-foreground">
          {title}
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-primary-foreground/80 mb-10 max-w-2xl mx-auto">
          {subtitle}
        </p>
        <motion.div
          whileHover={{ scale: 1.05, y: -3 }}
          whileTap={{ scale: 0.95 }}
          className="inline-block"
        >
          <Button
            href={href}
            variant="primary"
            className="inline-flex items-center gap-3 px-6 sm:px-8 md:px-10 py-4 sm:py-5 text-base sm:text-lg md:text-xl font-semibold rounded-2xl shadow-2xl hover:shadow-primary-foreground/20 transition-all duration-300"
          >
            <ArrowUpCircle className="w-5 h-5 sm:w-6 sm:h-6" />
            {buttonText}
            <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </Button>
        </motion.div>
      </motion.div>
    </div>
  </section>
);

export default CTASection; 