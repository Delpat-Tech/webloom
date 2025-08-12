import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, User, MessageCircle } from 'react-feather';
import {FounderQuoteProps} from '@/types';
import Button from '@/components/ui/Button';

const FounderQuote: React.FC<FounderQuoteProps> = ({
  quote = "The world has enough ideas. We're here to execute them. When no-code fails, devs are out of reach, or time is running out — that's where we shine.",
  buttonText = 'Read Our Ethos',
}) => (
  <section className="relative px-6 md:px-12 lg:px-20 py-20 bg-gradient-to-r from-background via-muted/50 to-background">
    <div className="max-w-4xl mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-600 rounded-full text-sm font-medium mb-8"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <User className="w-4 h-4" />
          From Our Founder
        </motion.div>

        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <MessageCircle className="w-12 h-12 md:w-16 md:h-16 text-primary/30 mx-auto mb-6" />
          <blockquote className="text-xl sm:text-2xl md:text-3xl font-medium text-foreground mb-8 leading-relaxed px-2">
            &quot;{quote}&quot;
          </blockquote>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="inline-block"
          >
            <Button
              href="/about"
              className="inline-flex items-center gap-2 px-6 py-3 border border-primary text-primary font-medium rounded-xl hover:bg-primary hover:text-white transition-colors"
            >
              {buttonText}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  </section>
);

export default FounderQuote; 