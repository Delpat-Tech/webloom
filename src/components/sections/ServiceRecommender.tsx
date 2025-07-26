import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Rocket, 
  Settings, 
  Zap, 
  ArrowRight,
  CheckCircle,
  Target,
  Star,
  Clock,
  Users,
  TrendingUp,
  Lightbulb,
  Building
} from 'lucide-react';
import Button from '@/components/ui/Button';
import Stepper, { Step } from '@/components/ui/Stepper';

interface QuizQuestion {
  id: string;
  question: string;
  options: {
    id: string;
    text: string;
    icon: React.ReactNode;
    service: 'mvp' | 'internal' | 'automation';
  }[];
}

interface ServiceRecommendation {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
  startingPrice: string;
  timeline: string;
  features: string[];
  matchScore: number;
}

const ServiceRecommender: React.FC = () => {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [recommendations, setRecommendations] = useState<ServiceRecommendation[]>([]);

  const quizQuestions: QuizQuestion[] = [
    {
      id: 'goal',
      question: 'What is your primary goal?',
      options: [
        {
          id: 'launch-product',
          text: 'Launch a new product or service',
          icon: <Rocket className="w-5 h-5" />,
          service: 'mvp'
        },
        {
          id: 'streamline-operations',
          text: 'Streamline internal operations',
          icon: <Settings className="w-5 h-5" />,
          service: 'internal'
        },
        {
          id: 'automate-processes',
          text: 'Automate repetitive tasks',
          icon: <Zap className="w-5 h-5" />,
          service: 'automation'
        }
      ]
    },
    {
      id: 'timeline',
      question: 'What is your timeline?',
      options: [
        {
          id: 'urgent',
          text: 'ASAP - Need it yesterday',
          icon: <Clock className="w-5 h-5" />,
          service: 'mvp'
        },
        {
          id: 'moderate',
          text: '2-3 months is fine',
          icon: <Target className="w-5 h-5" />,
          service: 'internal'
        },
        {
          id: 'flexible',
          text: 'Flexible timeline',
          icon: <TrendingUp className="w-5 h-5" />,
          service: 'automation'
        }
      ]
    },
    {
      id: 'budget',
      question: 'What is your budget range?',
      options: [
        {
          id: 'premium',
          text: 'Premium - Quality over cost',
          icon: <Star className="w-5 h-5" />,
          service: 'mvp'
        },
        {
          id: 'moderate-budget',
          text: 'Moderate - Good value',
          icon: <CheckCircle className="w-5 h-5" />,
          service: 'internal'
        },
        {
          id: 'cost-effective',
          text: 'Cost-effective solution',
          icon: <Lightbulb className="w-5 h-5" />,
          service: 'automation'
        }
      ]
    },
    {
      id: 'team-size',
      question: 'How many people will use this?',
      options: [
        {
          id: 'small-team',
          text: '1-5 people',
          icon: <Users className="w-4 h-4" />,
          service: 'mvp'
        },
        {
          id: 'medium-team',
          text: '5-20 people',
          icon: <Users className="w-5 h-5" />,
          service: 'internal'
        },
        {
          id: 'large-team',
          text: '20+ people',
          icon: <Building className="w-5 h-5" />,
          service: 'automation'
        }
      ]
    }
  ];

  const serviceOptions = {
    mvp: {
      id: 'mvp-engine',
      title: 'The MVP Engine',
      description: 'Go from idea to live product in 6 weeks. Fixed timeline, fixed cost, zero surprises.',
      icon: <Rocket className="w-8 h-8" />,
      gradient: 'from-primary to-accent',
      startingPrice: '₹40,000',
      timeline: '6 weeks',
      features: [
        'Complete MVP development',
        'User authentication system',
        'Database design & setup',
        'API development',
        'Basic UI/UX design',
        'Deployment & hosting setup',
        'Testing & QA',
        '4 weeks post-launch support'
      ]
    },
    internal: {
      id: 'internal-os',
      title: 'The Internal OS',
      description: 'Eliminate 20+ hours of manual work per week. Connect your systems, automate chaos.',
      icon: <Settings className="w-8 h-8" />,
      gradient: 'from-secondary to-primary',
      startingPrice: '₹20,000',
      timeline: '4-5 weeks',
      features: [
        'Custom internal dashboards',
        'Workflow automation',
        'API integrations',
        'User role management',
        'Data synchronization',
        'Reporting & analytics',
        'Training & documentation',
        '6 weeks ongoing support'
      ]
    },
    automation: {
      id: 'automation-mvp',
      title: 'The Automation MVP',
      description: 'Save $5k+ monthly in operational costs. AI-powered workflows that work 24/7.',
      icon: <Zap className="w-8 h-8" />,
      gradient: 'from-accent to-primary',
      startingPrice: '₹8,000',
      timeline: '2-3 weeks',
      features: [
        'AI agents for data processing',
        'Complex n8n/Make.com pipelines',
        'Error handling and monitoring',
        'Custom integrations',
        'Automated reporting',
        '24/7 operation',
        'Scalable architecture',
        'Ongoing optimization'
      ]
    }
  };

  const handleAnswer = (questionId: string, optionId: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: optionId }));
  };

  const calculateRecommendations = () => {
    const serviceScores: Record<string, number> = {
      mvp: 0,
      internal: 0,
      automation: 0
    };

    // Calculate scores based on answers
    Object.entries(answers).forEach(([questionId, answerId]) => {
      const question = quizQuestions.find(q => q.id === questionId);
      const selectedOption = question?.options.find(opt => opt.id === answerId);
      if (selectedOption) {
        serviceScores[selectedOption.service] += 1;
      }
    });

    // Convert to recommendations
    const recommendations = Object.entries(serviceScores)
      .map(([service, score]) => ({
        ...serviceOptions[service as keyof typeof serviceOptions],
        matchScore: (score / Object.keys(answers).length) * 100
      }))
      .sort((a, b) => b.matchScore - a.matchScore);

    setRecommendations(recommendations);
    setShowResults(true);
  };

  const handleRestart = () => {
    setAnswers({});
    setShowResults(false);
    setRecommendations([]);
  };

  const handleStepChange = (step: number) => {
    // Optional: Handle step changes
  };

  const handleFinalStepCompleted = () => {
    calculateRecommendations();
  };

  if (showResults) {
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
              Your <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Personalized Recommendations</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Based on your answers, here are the services that best match your needs
            </p>
          </motion.div>

          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Recommendations */}
            <div className="space-y-6">
              {recommendations.map((service, index) => (
                <motion.div
                  key={service.id}
                  className={`p-6 rounded-3xl border-2 transition-all duration-300 ${
                    index === 0
                      ? 'border-primary bg-gradient-to-br from-primary/10 to-primary/5'
                      : 'border-border bg-card/50'
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="flex items-start gap-6">
                    <div className={`p-4 rounded-2xl bg-gradient-to-r ${service.gradient} text-white`}>
                      {service.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h4 className="text-2xl font-bold text-foreground">{service.title}</h4>
                        {index === 0 && (
                          <span className="px-3 py-1 bg-primary text-white text-sm font-semibold rounded-full">
                            Best Match
                          </span>
                        )}
                      </div>
                      <p className="text-muted-foreground mb-4">{service.description}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div className="text-center p-4 rounded-2xl bg-card/50">
                          <div className="text-2xl font-bold text-primary">{service.startingPrice}</div>
                          <div className="text-sm text-muted-foreground">Starting Price</div>
                        </div>
                        <div className="text-center p-4 rounded-2xl bg-card/50">
                          <div className="text-2xl font-bold text-accent">{service.timeline}</div>
                          <div className="text-sm text-muted-foreground">Timeline</div>
                        </div>
                        <div className="text-center p-4 rounded-2xl bg-card/50">
                          <div className="text-2xl font-bold text-secondary">{service.matchScore.toFixed(0)}%</div>
                          <div className="text-sm text-muted-foreground">Match Score</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-6">
                        {service.features.slice(0, 6).map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <CheckCircle className="w-4 h-4 text-accent" />
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Restart Button */}
            <div className="text-center">
              <Button
                onClick={handleRestart}
                variant="tertiary"
                className="px-8 py-3"
              >
                Take Quiz Again
              </Button>
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
            Find Your <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Perfect Service</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Answer a few questions to get personalized service recommendations
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
              {quizQuestions.map((question) => (
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
                                ? 'bg-primary text-white'
                                : 'bg-card/50 text-muted-foreground'
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

export default ServiceRecommender; 