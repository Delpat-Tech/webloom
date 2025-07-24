import { motion } from 'framer-motion';
import { HelpCircle, Filter, ChevronDown, MessageCircle, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import Button from '@/components/ui/Button';
import { FAQAccordionProps } from '@/types';

const FAQAccordion: React.FC<FAQAccordionProps> = ({ faqData, categories, selectedCategory, setSelectedCategory, openFAQ, setOpenFAQ }) => {
  const filteredFAQs = selectedCategory === 'All' 
    ? faqData 
    : faqData.filter(section => section.category === selectedCategory);

  return (
    <section id="faq" className="relative px-6 md:px-12 lg:px-20 py-20">
      <div className="max-w-4xl mx-auto">
        {/* Section Title */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary/20 text-primary rounded-full text-sm font-medium mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <HelpCircle className="w-4 h-4" />
            FAQ
          </motion.div>

          <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Your Questions,
            <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Answered
            </span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Everything you need to know about working with Delpat.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {categories.map((category, index) => (
            <Button
              key={index}
              onClick={() => setSelectedCategory(category)}
              className={`min-w-[180px] flex items-center justify-center px-4 py-2 rounded-full text-sm font-medium border border-border transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-card/50 text-muted-foreground hover:bg-card hover:text-foreground'
              }`}
              variant={selectedCategory === category ? 'primary' : 'tertiary'}
            >
              <Filter className="w-3 h-3 mr-1" />
              {category}
            </Button>
          ))}
        </motion.div>

        {/* FAQ Accordion */}
        <div className="space-y-8">
          {filteredFAQs.map((section, sectionIndex) => (
            <motion.div
              key={sectionIndex}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: sectionIndex * 0.1 }}
            >
              {selectedCategory === 'All' && (
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-foreground flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                      <span className="text-primary text-sm font-bold">{sectionIndex + 1}</span>
                    </div>
                    {section.category}
                  </h3>
                </div>
              )}

              <div className="space-y-4">
                {section.questions.map((faq, faqIndex) => {
                  const isOpen = openFAQ === `${sectionIndex}-${faqIndex}`;
                  return (
                    <motion.div
                      key={faqIndex}
                      className="rounded-2xl bg-card/80 backdrop-blur-sm border border-border overflow-hidden"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: faqIndex * 0.05 }}
                    >
                       <Button
                          onClick={() => setOpenFAQ(isOpen ? null : `${sectionIndex}-${faqIndex}`)}
                          className={`w-full p-6 text-left flex items-center justify-between transition-colors group ${isOpen ? 'bg-primary/10' : 'bg-card/80'} border-0`}
                          variant="tertiary"
                        >
                          <span className={`text-lg font-semibold pr-4 transition-colors ${isOpen ? 'text-primary' : 'text-foreground'} group-hover:text-primary`}>
                            {faq.question}
                          </span>
                          <motion.div
                            animate={{ rotate: isOpen ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                            className={`flex-shrink-0 transition-colors ${isOpen ? 'text-primary' : 'text-muted-foreground'} group-hover:text-primary`}
                          >
                            <ChevronDown className="w-5 h-5" />
                          </motion.div>
                        </Button>
                      
                      <motion.div
                        initial={false}
                        animate={{
                          height: isOpen ? 'auto' : 0,
                          opacity: isOpen ? 1 : 0
                        }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 text-muted-foreground leading-relaxed">
                          {faq.answer}
                        </div>
                      </motion.div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Contact CTA */}
        <motion.div
          className="mt-16 p-8 rounded-3xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="mb-6">
            <MessageCircle className="w-12 h-12 mx-auto text-primary mb-4" />
            <h3 className="text-2xl font-bold text-foreground mb-2">
              Still Have Questions?
            </h3>
            <p className="text-muted-foreground">
              We&apos;re here to help you make the right decision for your project.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              Schedule a Call
            </Link>
            <Link 
              href="mailto:hello@delpat.com"
              className="inline-flex items-center gap-2 px-6 py-3 bg-card border border-border text-foreground rounded-xl font-semibold hover:bg-card/80 transition-colors"
            >
              Send us an Email
              <ExternalLink className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQAccordion; 