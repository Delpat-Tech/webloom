import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Rocket, 
  Settings, 
  Zap,
  CheckCircle,
  Target,
  Star,
  Clock,
  TrendingUp,
  Lightbulb,
  Building,
  Timer,
  Users,
  BarChart3
} from 'lucide-react';
import Button from '@/components/ui/Button';
import Stepper, { Step } from '@/components/ui/Stepper';
import { QuizQuestion } from '@/types';

interface ContactQualificationQuizProps {
  onRecommendation?: (serviceType: string, tier: string) => void;
  selectedGoal?: string; // For when user comes from pricing page
}

const ContactQualificationQuiz: React.FC<ContactQualificationQuizProps> = ({ 
  onRecommendation,
  selectedGoal
}) => {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [recommendation, setRecommendation] = useState<{
    serviceType: string;
    tier: string;
    description: string;
    features: string[];
  } | null>(null);

  // General qualification questions (for normal contact page visits)
  const generalQualificationQuestions: QuizQuestion[] = [
    {
      id: 'primary_goal',
      question: 'What\'s your primary goal?',
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
          text: 'I\'m not sure yet, need guidance',
          icon: <Lightbulb className="w-5 h-5" />,
          service: 'mvp'
        }
      ]
    },
    {
      id: 'current_stage',
      question: 'What stage are you currently in?',
      options: [
        {
          id: 'validated-idea',
          text: 'I have a validated idea with early users/customers',
          icon: <Star className="w-5 h-5" />,
          service: 'mvp'
        },
        {
          id: 'strong-concept',
          text: 'I have a strong concept but need to build and test',
          icon: <Target className="w-5 h-5" />,
          service: 'mvp'
        },
        {
          id: 'exploring',
          text: 'I\'m still exploring and need help defining the solution',
          icon: <Lightbulb className="w-5 h-5" />,
          service: 'mvp'
        },
        {
          id: 'existing-business',
          text: 'I have an existing business with operational challenges',
          icon: <Building className="w-5 h-5" />,
          service: 'internal'
        }
      ]
    },
    {
      id: 'timeline_budget',
      question: 'What\'s your timeline and budget?',
      options: [
        {
          id: 'urgent-40k',
          text: '₹40k+ budget, need results in 4-6 weeks (urgent)',
          icon: <Clock className="w-5 h-5" />,
          service: 'mvp'
        },
        {
          id: 'standard-40k',
          text: '₹40k+ budget, 6-8 weeks timeline works fine',
          icon: <Timer className="w-5 h-5" />,
          service: 'mvp'
        },
        {
          id: 'flexible-quality',
          text: 'Flexible budget, quality over speed',
          icon: <TrendingUp className="w-5 h-5" />,
          service: 'internal'
        },
        {
          id: 'exploring-options',
          text: 'Just exploring options, need to understand costs first',
          icon: <Lightbulb className="w-5 h-5" />,
          service: 'mvp'
        }
      ]
    }
  ];

  // Goal-specific qualification questions
  const goalSpecificQuestions: Record<string, QuizQuestion[]> = {
    mvp: [
      {
        id: 'validation',
        question: 'What stage is your idea in?',
        options: [
          {
            id: 'validated-users',
            text: 'I have a validated idea with early users',
            icon: <Star className="w-5 h-5" />,
            service: 'mvp'
          },
          {
            id: 'strong-concept',
            text: 'I have a strong concept but need validation',
            icon: <Target className="w-5 h-5" />,
            service: 'mvp'
          },
          {
            id: 'exploring-idea',
            text: 'I\'m still exploring the idea',
            icon: <Lightbulb className="w-5 h-5" />,
            service: 'mvp'
          },
          {
            id: 'working-prototype',
            text: 'I have a working prototype',
            icon: <Rocket className="w-5 h-5" />,
            service: 'mvp'
          }
        ]
      },
      {
        id: 'features',
        question: 'How many core features do you need?',
        options: [
          {
            id: '1-3-features',
            text: '1-3 core features (basic MVP)',
            icon: <Rocket className="w-5 h-5" />,
            service: 'mvp'
          },
          {
            id: '4-6-features',
            text: '4-6 core features (standard MVP)',
            icon: <Target className="w-5 h-5" />,
            service: 'mvp'
          },
          {
            id: '7-plus-features',
            text: '7+ features with advanced integrations',
            icon: <Star className="w-5 h-5" />,
            service: 'mvp'
          },
          {
            id: 'not-sure',
            text: 'I\'m not sure yet',
            icon: <Lightbulb className="w-5 h-5" />,
            service: 'mvp'
          }
        ]
      },
      {
        id: 'timeline',
        question: 'What\'s your timeline for launch?',
        options: [
          {
            id: 'asap-4-6-weeks',
            text: 'ASAP - Need it in 4-6 weeks',
            icon: <Clock className="w-5 h-5" />,
            service: 'mvp'
          },
          {
            id: 'standard-6-8-weeks',
            text: 'Standard timeline - 6-8 weeks works',
            icon: <Timer className="w-5 h-5" />,
            service: 'mvp'
          },
          {
            id: 'flexible-quality',
            text: 'Flexible - Quality over speed',
            icon: <TrendingUp className="w-5 h-5" />,
            service: 'mvp'
          },
          {
            id: 'specific-deadline',
            text: 'I have a specific deadline',
            icon: <Target className="w-5 h-5" />,
            service: 'mvp'
          }
        ]
      }
    ],
    internal: [
      {
        id: 'processes',
        question: 'How many manual processes do you want to automate?',
        options: [
          {
            id: '1-2-processes',
            text: '1-2 key processes',
            icon: <Settings className="w-5 h-5" />,
            service: 'internal'
          },
          {
            id: '3-5-processes',
            text: '3-5 related processes',
            icon: <Target className="w-5 h-5" />,
            service: 'internal'
          },
          {
            id: 'multiple-departments',
            text: 'Multiple departments/teams',
            icon: <Building className="w-5 h-5" />,
            service: 'internal'
          },
          {
            id: 'company-wide',
            text: 'Company-wide transformation',
            icon: <Star className="w-5 h-5" />,
            service: 'internal'
          }
        ]
      },
      {
        id: 'users',
        question: 'How many users will use this tool?',
        options: [
          {
            id: '5-10-users',
            text: '5-10 users (small team)',
            icon: <Users className="w-5 h-5" />,
            service: 'internal'
          },
          {
            id: '10-25-users',
            text: '10-25 users (department)',
            icon: <Target className="w-5 h-5" />,
            service: 'internal'
          },
          {
            id: '25-plus-users',
            text: '25+ users (multiple teams)',
            icon: <Building className="w-5 h-5" />,
            service: 'internal'
          },
          {
            id: '100-plus-users',
            text: '100+ users (company-wide)',
            icon: <Star className="w-5 h-5" />,
            service: 'internal'
          }
        ]
      },
      {
        id: 'integration',
        question: 'Do you need integration with existing tools?',
        options: [
          {
            id: 'no-integrations',
            text: 'No integrations needed',
            icon: <Settings className="w-5 h-5" />,
            service: 'internal'
          },
          {
            id: '1-2-integrations',
            text: '1-2 basic integrations',
            icon: <Target className="w-5 h-5" />,
            service: 'internal'
          },
          {
            id: 'multiple-integrations',
            text: 'Multiple complex integrations',
            icon: <Star className="w-5 h-5" />,
            service: 'internal'
          },
          {
            id: 'not-sure-integrations',
            text: 'I\'m not sure what integrations I need',
            icon: <Lightbulb className="w-5 h-5" />,
            service: 'internal'
          }
        ]
      }
    ],
    automation: [
      {
        id: 'automation_scope',
        question: 'What type of automation do you need?',
        options: [
          {
            id: 'simple-automation',
            text: 'Simple rule-based automation',
            icon: <Zap className="w-5 h-5" />,
            service: 'automation'
          },
          {
            id: 'complex-workflows',
            text: 'Complex multi-step workflows',
            icon: <Target className="w-5 h-5" />,
            service: 'automation'
          },
          {
            id: 'ai-automation',
            text: 'AI-powered intelligent automation',
            icon: <Star className="w-5 h-5" />,
            service: 'automation'
          },
          {
            id: 'not-sure-automation',
            text: 'I\'m not sure yet',
            icon: <Lightbulb className="w-5 h-5" />,
            service: 'automation'
          }
        ]
      },
      {
        id: 'data_volume',
        question: 'How much data do you process?',
        options: [
          {
            id: 'low-volume',
            text: 'Low volume (hundreds of records)',
            icon: <BarChart3 className="w-5 h-5" />,
            service: 'automation'
          },
          {
            id: 'medium-volume',
            text: 'Medium volume (thousands of records)',
            icon: <Target className="w-5 h-5" />,
            service: 'automation'
          },
          {
            id: 'high-volume',
            text: 'High volume (millions of records)',
            icon: <Star className="w-5 h-5" />,
            service: 'automation'
          },
          {
            id: 'not-sure-volume',
            text: 'I don\'t know the volume yet',
            icon: <Lightbulb className="w-5 h-5" />,
            service: 'automation'
          }
        ]
      },
      {
        id: 'real_time',
        question: 'Do you need real-time processing?',
        options: [
          {
            id: 'batch-processing',
            text: 'Batch processing is fine',
            icon: <Clock className="w-5 h-5" />,
            service: 'automation'
          },
          {
            id: 'near-real-time',
            text: 'Near real-time (minutes)',
            icon: <Timer className="w-5 h-5" />,
            service: 'automation'
          },
          {
            id: 'real-time',
            text: 'Real-time (seconds)',
            icon: <Star className="w-5 h-5" />,
            service: 'automation'
          },
          {
            id: 'not-sure-timing',
            text: 'I\'m not sure about timing',
            icon: <Lightbulb className="w-5 h-5" />,
            service: 'automation'
          }
        ]
      }
    ]
  };

  const handleAnswer = (questionId: string, optionId: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: optionId }));
  };

  // Determine which questions to use
  const currentQuestions = selectedGoal ? goalSpecificQuestions[selectedGoal] : generalQualificationQuestions;

  const calculateRecommendation = () => {
    if (Object.keys(answers).length < currentQuestions.length) {
      return;
    }

    let serviceType = selectedGoal || 'mvp';
    let tier = 'full';
    let description = '';
    let features: string[] = [];

    // If no selectedGoal, determine service type from general questions
    if (!selectedGoal && answers.primary_goal) {
      if (answers.primary_goal === 'mvp-validation' || answers.primary_goal === 'need-guidance') {
        serviceType = 'mvp';
      } else if (answers.primary_goal === 'automate-processes') {
        serviceType = 'automation';
      } else if (answers.primary_goal === 'streamline-operations') {
        serviceType = 'internal';
      }
    }

    // Calculate tier based on answers
    let score = 0;
    const totalQuestions = currentQuestions.length;

    currentQuestions.forEach(question => {
      const answer = answers[question.id];
      const selectedOption = question.options.find(opt => opt.id === answer);
      
      if (selectedOption) {
        // Score based on complexity/urgency of the answer
        if (selectedOption.id.includes('urgent') || selectedOption.id.includes('validated') || 
            selectedOption.id.includes('plus') || selectedOption.id.includes('ai') ||
            selectedOption.id.includes('real-time') || selectedOption.id.includes('company-wide') ||
            selectedOption.id.includes('high-volume') || selectedOption.id.includes('multiple')) {
          score += 3;
        } else if (selectedOption.id.includes('standard') || selectedOption.id.includes('strong') ||
                   selectedOption.id.includes('medium') || selectedOption.id.includes('near-real-time') ||
                   selectedOption.id.includes('25-plus') || selectedOption.id.includes('3-5')) {
          score += 2;
        } else {
          score += 1;
        }
      }
    });

    const averageScore = score / totalQuestions;

    if (averageScore >= 2.5) {
      tier = 'scalable';
    } else if (averageScore >= 1.5) {
      tier = 'full';
    } else {
      tier = 'lite';
    }

    // Set description and features
    if (serviceType === 'mvp') {
      description = 'Perfect for validating your business idea quickly';
      features = [
        'Complete MVP development',
        'User authentication system',
        'Database design & setup',
        'API development',
        'Basic UI/UX design',
        'Deployment & hosting setup'
      ];
    } else if (serviceType === 'internal') {
      description = 'Great for streamlining your operations';
      features = [
        'Custom internal dashboards',
        'Workflow automation',
        'API integrations',
        'User role management',
        'Data synchronization',
        'Reporting & analytics'
      ];
    } else if (serviceType === 'automation') {
      description = 'Ideal for saving time on manual processes';
      features = [
        'AI agents for data processing',
        'Complex n8n/Make.com pipelines',
        'Error handling and monitoring',
        'Custom integrations',
        'Automated reporting',
        '24/7 operation'
      ];
    }

    const recommendation = {
      serviceType,
      tier,
      description,
      features
    };

    setRecommendation(recommendation);
    setShowResults(true);

    if (onRecommendation) {
      onRecommendation(serviceType, tier);
    }
  };

  const handleRestart = () => {
    setAnswers({});
    setShowResults(false);
    setRecommendation(null);
  };

  const handleStepChange = () => {
    // Optional: Handle step changes
  };

  const handleFinalStepCompleted = () => {
    calculateRecommendation();
  };

  if (showResults && recommendation) {
    return (
      <section className="relative px-6 md:px-12 lg:px-20 py-20">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Based on your answers, we recommend:
            </h2>
            <p className="text-xl text-muted-foreground">
              This plan best matches your requirements and goals
            </p>
          </motion.div>

          <motion.div
            className="bg-gradient-to-br from-primary/5 via-accent/5 to-primary/10 border-2 border-primary/20 rounded-3xl overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Header Section */}
            <div className="p-8 text-center border-b border-primary/10 bg-gradient-to-r from-primary/10 to-accent/10">
              <Star className="w-16 h-16 text-primary mx-auto mb-6" />
              
              <div className="mb-6">
                <div className="text-3xl font-bold text-accent mb-3">
                  {recommendation.serviceType === 'mvp' ? 'MVP Development' : 
                   recommendation.serviceType === 'automation' ? 'Process Automation' : 
                   recommendation.serviceType === 'internal' ? 'Internal Tool Development' : 'Our Services'}
                </div>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  {recommendation.description}
                </p>
              </div>
              
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-primary to-accent text-white rounded-full text-2xl font-bold">
                {recommendation.tier === 'lite' ? 'Lite Plan' : 
                 recommendation.tier === 'full' ? 'Full Plan' : 'Scalable Plan'}
              </div>
            </div>

            {/* Features Section */}
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {recommendation.features.slice(0, 6).map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-4 rounded-xl bg-card/50 border border-border/50">
                    <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground leading-relaxed">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => {
                    const url = `/contact?goal=${recommendation.serviceType}&tier=${recommendation.tier}#contact-form`;
                    window.location.href = url;
                  }}
                  variant="gradient-monotone"
                  className="px-8 py-4 text-lg font-semibold"
                >
                  Get Quote for This Plan
                </Button>
                <Button
                  onClick={handleRestart}
                  variant="gradient-outline"
                  className="px-8 py-4 text-lg font-semibold border-primary text-primary hover:bg-primary hover:text-white"
                >
                  Try Different Answers
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative px-6 md:px-12 lg:px-20 py-20">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-16 lg:mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Are We a <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Good Fit?</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Answer these quick questions to see if we should talk.
          </p>
        </motion.div>

        <div className="flex justify-center">
          <div className="w-full max-w-7xl">
                         <Stepper
               initialStep={1}
               onStepChange={handleStepChange}
               onFinalStepCompleted={handleFinalStepCompleted}
               backButtonText="Previous"
               nextButtonText="Next"
               stepCircleContainerClassName="bg-card/80 backdrop-blur-sm border-border"
               contentClassName="py-3"
               className="min-h-[250px] lg:min-h-[350px]"
             >
               {currentQuestions.map((question) => (
                 <Step key={question.id}>
                   <div className="space-y-6">
                     <h3 className="text-2xl font-bold text-foreground text-center mb-8">
                       {question.question}
                     </h3>
                     <div className="space-y-4">
                       {question.options.map((option) => (
                         <motion.button
                           key={option.id}
                           onClick={() => handleAnswer(question.id, option.id)}
                           className={`w-full p-6 rounded-2xl border-2 transition-all duration-300 text-left ${
                             answers[question.id] === option.id
                               ? 'border-primary bg-primary/10 text-primary'
                               : 'border-border bg-card/50 text-foreground hover:border-primary/50 hover:bg-card/80'
                           }`}
                           whileHover={{ scale: 1.02 }}
                           whileTap={{ scale: 0.98 }}
                         >
                           <div className="flex items-center gap-4">
                             <div className={`p-3 rounded-xl ${
                               answers[question.id] === option.id
                                 ? 'bg-gradient-to-r from-primary to-accent text-white'
                                 : 'bg-muted/50 text-muted-foreground'
                             }`}>
                               {option.icon}
                             </div>
                             <span className="font-semibold">{option.text}</span>
                           </div>
                         </motion.button>
                       ))}
                     </div>
                   </div>
                 </Step>
               ))}
             </Stepper>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactQualificationQuiz; 