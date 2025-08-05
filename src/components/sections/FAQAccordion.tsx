import { motion } from 'framer-motion';
import { HelpCircle, ChevronDown, MessageCircle } from 'react-feather';
import { Filter } from 'lucide-react';
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

        {/* Enhanced Category Filter */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {categories.map((category, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={() => setSelectedCategory(category)}
                className={`min-w-[180px] flex items-center justify-center px-4 py-3 rounded-xl text-sm font-medium border transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
                    : 'bg-card/50 text-muted-foreground hover:bg-card hover:text-foreground hover:border-primary/30 hover:shadow-md'
                }`}
                variant={selectedCategory === category ? 'primary' : 'tertiary'}
              >
                <Filter className="w-3 h-3 mr-2" />
                {category}
              </Button>
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced FAQ Accordion */}
        <div className="space-y-6">
          {filteredFAQs.map((section, sectionIndex) => (
            <motion.div
              key={sectionIndex}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: sectionIndex * 0.1 }}
            >
              {selectedCategory === 'All' && (
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-foreground flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-r from-primary to-secondary flex items-center justify-center shadow-lg">
                      <span className="text-white text-sm font-bold">{sectionIndex + 1}</span>
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
                      className="group"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: faqIndex * 0.05 }}
                      whileHover={{ y: -2 }}
                    >
                      <div className="rounded-2xl bg-card/80 backdrop-blur-sm border border-border/50 overflow-hidden hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10 transition-all duration-500">
                        <motion.button
                          onClick={() => setOpenFAQ(isOpen ? null : `${sectionIndex}-${faqIndex}`)}
                          className={`w-full p-6 text-left flex items-center justify-between transition-all duration-300 group-hover:bg-card/90 ${
                            isOpen ? 'bg-primary/10 border-b border-primary/20' : ''
                          }`}
                        >
                          <span className={`text-lg font-semibold pr-4 transition-colors duration-300 ${
                            isOpen ? 'text-primary' : 'text-foreground'
                          } group-hover:text-primary`}>
                            {faq.question}
                          </span>
                          <motion.div
                            animate={{ rotate: isOpen ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                            className={`flex-shrink-0 p-2 rounded-lg transition-all duration-300 ${
                              isOpen 
                                ? 'text-primary bg-primary/20' 
                                : 'text-muted-foreground group-hover:text-primary group-hover:bg-primary/10'
                            }`}
                          >
                            <ChevronDown className="w-5 h-5" />
                          </motion.div>
                        </motion.button>
                      
                        <motion.div
                          initial={false}
                          animate={{
                            height: isOpen ? 'auto' : 0,
                            opacity: isOpen ? 1 : 0
                          }}
                          transition={{ duration: 0.4, ease: 'easeInOut' }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-6 text-muted-foreground leading-relaxed">
                            <div className="pt-2 border-t border-border/30">
                              {faq.answer}
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Enhanced Contact CTA */}
        <motion.div
          className="mt-16 p-8 rounded-3xl bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 border border-primary/20 text-center relative overflow-hidden"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          whileHover={{ scale: 1.02 }}
        >
          {/* Background decorative elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-2xl" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-accent/20 to-primary/20 rounded-full blur-xl" />
          
          <div className="relative z-10">
            <motion.div
              className="mb-6"
              whileHover={{ scale: 1.1 }}
            >
              <MessageCircle className="w-12 h-12 mx-auto text-primary mb-4" />
            </motion.div>
            <h3 className="text-2xl font-bold text-foreground mb-2">
              Still Have Questions?
            </h3>
            <p className="text-muted-foreground mb-8">
              We&apos;re here to help you make the right decision for your project.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link 
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/25"
                >
                  <MessageCircle className="w-4 h-4" />
                  Schedule a Call
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link 
                  href="mailto:hello@delpat.com"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-card border border-border text-foreground rounded-xl font-semibold hover:bg-card/80 hover:border-primary/30 transition-colors"
                >
                  Send us an Email
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQAccordion; 