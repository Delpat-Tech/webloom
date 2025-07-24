import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, ArrowRight } from 'lucide-react';
import {CTASectionProps} from '@/types';

const CTASection: React.FC<CTASectionProps> = ({
  title = 'Ready to Execute Your Vision?',
  subtitle = "Stop planning. Start building. Let's turn your ideas into powerful tools that drive growth.",
  buttonText = 'Get Your Free Execution Roadmap',
  onButtonClick
}) => (
  <section className="relative px-6 md:px-12 lg:px-20 py-20 bg-gradient-to-r from-primary via-secondary to-accent">
    <div className="max-w-4xl mx-auto text-center text-white">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white">
          <span className="font-heading text-white" style={{color: 'white', background: 'none', WebkitBackgroundClip: 'initial', WebkitTextFillColor: 'initial'}}>{title}</span>
        </h2>
        <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
          {subtitle}
        </p>
        <motion.button
          className="inline-flex items-center gap-3 px-10 py-5 bg-white text-primary text-xl font-semibold rounded-2xl shadow-2xl hover:shadow-white/20 transition-all duration-300"
          whileHover={{ scale: 1.05, y: -3 }}
          whileTap={{ scale: 0.95 }}
          onClick={onButtonClick}
        >
          <Rocket className="w-6 h-6" />
          {buttonText}
          <ArrowRight className="w-6 h-6" />
        </motion.button>
      </motion.div>
    </div>
  </section>
);

export default CTASection; 