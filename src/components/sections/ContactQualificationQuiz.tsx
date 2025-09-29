import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Rocket, 
  Settings, 
  Zap,
  Lightbulb
} from 'lucide-react';
import { ContactQualificationQuizProps } from '@/types';

const ContactQualificationQuiz: React.FC<ContactQualificationQuizProps> = ({ 
  onRecommendation
}) => {
  const question = {
    id: 'primary_goal',
    question: 'What is your primary goal?',
    options: [
      {
        id: 'mvp-validation',
        text: 'I need to build an MVP to validate my business idea',
        icon: <Rocket className="w-5 h-5" />,
        service: 'mvp'
      },
      {
        id: 'automate-processes',
        text: 'I want to automate manual processes to save time',
        icon: <Zap className="w-5 h-5" />,
        service: 'automation'
      },
      {
        id: 'streamline-operations',
        text: 'I need an internal tool to streamline operations',
        icon: <Settings className="w-5 h-5" />,
        service: 'internal'
      },
      {
        id: 'need-guidance',
        text: "I'm not sure yet, need guidance",
        icon: <Lightbulb className="w-5 h-5" />,
        service: 'mvp'
      }
    ]
  };

  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (optionId: string) => {
    setSelected(optionId);
    const selectedOption = question.options.find(opt => opt.id === optionId);
    if (selectedOption && onRecommendation) {
      // For "not sure", start lighter: validate tier; otherwise default to launch
      const tier = selectedOption.id === 'need-guidance' ? 'validate' : 'launch';
      onRecommendation(selectedOption.service, tier);
    }
    const choiceSection = document.getElementById('choose-method-section');
    if (choiceSection) {
      choiceSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="qualification" className="relative px-6 md:px-12 lg:px-20 py-20">
      <div className="max-w-4xl mx-auto">
        {/* Heading only */}
        <motion.div
          className="text-center mb-8 lg:mb-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Are We a <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Good Fit?</span>
          </h2>
        </motion.div>

        {/* Question placed closer to options */}
        <div className="max-w-2xl mx-auto mb-4">
          <p className="text-lg text-muted-foreground">{question.question}</p>
        </div>

        <div className="flex flex-col gap-4 items-center justify-center">
          {question.options.map(option => (
            <div key={option.id} className="w-full max-w-2xl">
              <motion.button
                onClick={() => handleSelect(option.id)}
                className={`w-full p-6 rounded-2xl border-2 transition-all duration-300 text-left flex items-center gap-4 text-lg font-semibold ${selected === option.id ? 'border-primary bg-primary/10 text-primary' : 'border-border bg-card/50 text-foreground hover:border-primary/50 hover:bg-card/80'}`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                aria-pressed={selected === option.id}
                type="button"
              >
                <span className={`p-3 rounded-xl ${selected === option.id ? 'bg-gradient-to-r from-primary to-accent text-white' : 'bg-muted/50 text-muted-foreground'}`}>{option.icon}</span>
                <span className="font-semibold">{option.text}</span>
              </motion.button>

              {/* Helper hint for Not Sure */}
              {selected === 'need-guidance' && option.id === 'need-guidance' && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className="mt-2 text-sm text-muted-foreground"
                >
                  Great—start relaxed. We’ll recommend the right path on a quick call or via the brief.
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactQualificationQuiz; 