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
  Users,
  TrendingUp,
  Lightbulb,
  Building,
  Search,
  ArrowRight,
  Calendar
} from 'lucide-react';
import Button from '@/components/ui/Button';
import Stepper, { Step } from '@/components/ui/Stepper';
import { ServiceRecommendation, QuizQuestion } from '@/types';


const ServiceRecommender: React.FC = () => {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [recommendations, setRecommendations] = useState<ServiceRecommendation[]>([]);

  const quizQuestions: QuizQuestion[] = [
    {
      id: 'project-goal',
      question: 'What is your primary goal right now?',
      options: [
        {
          id: 'validate-idea',
          text: 'Validate my idea quickly',
          icon: <Rocket className="w-5 h-5" />,
          service: 'mvp',
          engagement: 'project-based'
        },
        {
          id: 'scale-operations',
          text: 'Scale my operations efficiently',
          icon: <Target className="w-5 h-5" />,
          service: 'internal',
          engagement: 'monthly-retainer'
        },
        {
          id: 'automate-processes',
          text: 'Automate repetitive tasks',
          icon: <TrendingUp className="w-5 h-5" />,
          service: 'automation',
          engagement: 'hourly-consulting'
        }
      ]
    },
    {
      id: 'team-situation',
      question: 'What best describes your current team situation?',
      options: [
        {
          id: 'no-tech-team',
          text: 'No technical team yet',
          icon: <Users className="w-5 h-5" />,
          service: 'mvp',
          engagement: 'project-based'
        },
        {
          id: 'small-team',
          text: 'Small team, need support',
          icon: <Settings className="w-5 h-5" />,
          service: 'internal',
          engagement: 'monthly-retainer'
        },
        {
          id: 'established-team',
          text: 'Established team, need expertise',
          icon: <Lightbulb className="w-5 h-5" />,
          service: 'automation',
          engagement: 'hourly-consulting'
        }
      ]
    },
    {
      id: 'timeline-pressure',
      question: 'How urgent is your timeline?',
      options: [
        {
          id: 'very-urgent',
          text: 'Very urgent - need it fast',
          icon: <Clock className="w-5 h-5" />,
          service: 'mvp',
          engagement: 'project-based'
        },
        {
          id: 'moderate-urgent',
          text: 'Moderate - steady progress',
          icon: <Target className="w-5 h-5" />,
          service: 'internal',
          engagement: 'monthly-retainer'
        },
        {
          id: 'flexible',
          text: 'Flexible - quality over speed',
          icon: <TrendingUp className="w-5 h-5" />,
          service: 'automation',
          engagement: 'dedicated-team'
        }
      ]
    },
    {
      id: 'project-complexity',
      question: 'How complex is your project?',
      options: [
        {
          id: 'simple-mvp',
          text: 'Simple MVP or prototype',
          icon: <Rocket className="w-5 h-5" />,
          service: 'mvp',
          engagement: 'project-based'
        },
        {
          id: 'medium-complexity',
          text: 'Medium complexity system',
          icon: <Search className="w-5 h-5" />,
          service: 'internal',
          engagement: 'monthly-retainer'
        },
        {
          id: 'complex-enterprise',
          text: 'Complex enterprise solution',
          icon: <Zap className="w-5 h-5" />,
          service: 'automation',
          engagement: 'dedicated-team'
        }
      ]
    },
    {
      id: 'ongoing-needs',
      question: 'What are your ongoing needs?',
      options: [
        {
          id: 'one-time-project',
          text: 'One-time project',
          icon: <Target className="w-5 h-5" />,
          service: 'mvp',
          engagement: 'project-based'
        },
        {
          id: 'continuous-support',
          text: 'Continuous support & updates',
          icon: <Calendar className="w-5 h-5" />,
          service: 'internal',
          engagement: 'monthly-retainer'
        },
        {
          id: 'full-team',
          text: 'Full dedicated team',
          icon: <Users className="w-5 h-5" />,
          service: 'automation',
          engagement: 'dedicated-team'
        }
      ]
    }
  ];

  const serviceOptions = {
    mvp: {
      id: 'mvp-engine',
      title: 'The MVP Engine',
      description: 'Go from idea to live product in 6 weeks. Fixed timeline, zero surprises.',
      icon: <Rocket className="w-8 h-8" />,
      gradient: 'from-primary to-accent',
      startingPrice: '$10,000',
      timeline: '6 weeks',
      engagementModel: 'Project-Based',
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
      startingPrice: '$8,000',
      timeline: '4-5 weeks',
      engagementModel: 'Monthly Retainer',
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
      description: 'Save time and resources with AI-powered workflows that work 24/7.',
      icon: <Zap className="w-8 h-8" />,
      gradient: 'from-accent to-secondary',
      startingPrice: '$5,000',
      timeline: '2-3 weeks',
      engagementModel: 'Hourly Consulting',
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
    const engagementScores: Record<string, number> = {
      'project-based': 0,
      'monthly-retainer': 0,
      'dedicated-team': 0,
      'hourly-consulting': 0
    };

    // Calculate scores based on answers
    Object.entries(answers).forEach(([questionId, answerId]) => {
      const question = quizQuestions.find(q => q.id === questionId);
      const selectedOption = question?.options.find(opt => opt.id === answerId);
      if (selectedOption) {
        serviceScores[selectedOption.service] += 1;
        if (selectedOption.engagement) {
          engagementScores[selectedOption.engagement] += 1;
        }
      }
    });

    // Get top service and engagement model
    const topService = Object.entries(serviceScores).sort((a, b) => b[1] - a[1])[0][0];
    const topEngagement = Object.entries(engagementScores).sort((a, b) => b[1] - a[1])[0][0];

    // Create personalized recommendation
    const service = serviceOptions[topService as keyof typeof serviceOptions];
    const engagementModel = getEngagementModel(topEngagement);
    
    const recommendation = {
      ...service,
      startingPrice: service.startingPrice,
      engagementModel: engagementModel.title,
      engagementDescription: engagementModel.description,
      matchScore: (serviceScores[topService] / Object.keys(answers).length) * 100,
      reasoning: getReasoning(answers, topService, topEngagement)
    };

    setRecommendations([recommendation]);
    setShowResults(true);
  };

  const getEngagementModel = (engagementId: string) => {
    const models = {
      'project-based': {
        title: 'Project-Based',
        description: 'Fixed scope, timeline, and deliverables'
      },
      'monthly-retainer': {
        title: 'Monthly Retainer',
        description: 'Ongoing partnership with predictable costs'
      },
      'dedicated-team': {
        title: 'Dedicated Team',
        description: 'Your own development team'
      },
      'hourly-consulting': {
        title: 'Hourly Consulting',
        description: 'Pay only for what you use'
      }
    };
    return models[engagementId as keyof typeof models];
  };

  const getReasoning = (answers: Record<string, string>, service: string, engagement: string) => {
    const reasons = [];
    
    if (service === 'mvp') {
      reasons.push('You need to validate your idea quickly');
    } else if (service === 'internal') {
      reasons.push('You need to scale your operations efficiently');
    } else if (service === 'automation') {
      reasons.push('You need to automate repetitive tasks');
    }

    if (engagement === 'project-based') {
      reasons.push('You have a well-defined scope and timeline');
    } else if (engagement === 'monthly-retainer') {
      reasons.push('You need ongoing support and flexibility');
    } else if (engagement === 'dedicated-team') {
      reasons.push('You need full control and dedicated resources');
    } else if (engagement === 'hourly-consulting') {
      reasons.push('You need expert guidance on-demand');
    }

    return reasons;
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
      <section className="relative px-6 md:px-12 lg:px-20 py-12 md:py-20">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center mb-8 md:mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
                         <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
               Your <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Personalized Recommendation</span>
             </h2>
             <p className="text-base md:text-xl text-muted-foreground">
               Based on your answers, here's the perfect service and engagement model for your needs
             </p>
          </motion.div>

          <motion.div
            className="space-y-6 md:space-y-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
                         {/* Personalized Recommendation */}
             <div className="space-y-6">
               {recommendations.map((recommendation, index) => (
                 <motion.div
                   key={recommendation.id}
                   className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-primary md:border-2 bg-gradient-to-br from-primary/10 via-accent/5 to-primary/5 overflow-hidden"
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ duration: 0.5, delay: index * 0.1 }}
                 >
                   <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                     <div className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-r ${recommendation.gradient} text-white flex-shrink-0 self-center sm:self-auto`}>
                       {recommendation.icon}
                     </div>
                     <div className="flex-1">
                       <div className="flex items-center gap-3 mb-4">
                         <h4 className="text-xl sm:text-2xl font-bold text-foreground">{recommendation.title}</h4>
                         <span className="px-3 py-1 bg-gradient-to-r from-primary to-accent text-white text-sm font-semibold rounded-full">
                           Perfect Match
                         </span>
                       </div>
                       <p className="text-sm sm:text-base text-muted-foreground mb-4">{recommendation.description}</p>
                       
                       {/* Service + Engagement Model Combination */}
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                         <div className="p-4 rounded-2xl bg-muted/30">
                           <h5 className="font-semibold text-foreground mb-2">Recommended Service</h5>
                           <div className="text-lg font-bold text-accent">{recommendation.title}</div>
                           <div className="text-sm text-muted-foreground">{recommendation.timeline}</div>
                         </div>
                         <div className="p-4 rounded-2xl bg-muted/30">
                           <h5 className="font-semibold text-foreground mb-2">Recommended Engagement</h5>
                           <div className="text-lg font-bold text-secondary">{recommendation.engagementModel}</div>
                           <div className="text-sm text-muted-foreground">{recommendation.engagementDescription}</div>
                         </div>
                       </div>

                       {/* Why This Recommendation */}
                       <div className="mb-6">
                         <h5 className="font-semibold text-foreground mb-3">Why This Works For You:</h5>
                         <div className="space-y-2">
                           {recommendation.reasoning?.map((reason, idx) => (
                             <div key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                               <CheckCircle className="w-4 h-4 text-accent" />
                               {reason}
                             </div>
                           ))}
                         </div>
                       </div>

                       {/* Key Features */}
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-6">
                         {recommendation.features.slice(0, 4).map((feature, idx) => (
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

            {/* Action Buttons */}
            <div className="text-center space-y-4 mt-2 md:mt-4">
                             <Button
                 onClick={() => window.location.href = '/contact#contact-form'}
                 variant="gradient-monotone"
                 className="w-full sm:w-auto px-6 py-3 md:px-8 md:py-4 rounded-xl font-semibold flex items-center justify-center md:justify-start gap-3 mx-auto"
               >
                 Adopt Our Model
                 <ArrowRight className="w-5 h-5" />
               </Button>
              <div>
                <Button
                  onClick={handleRestart}
                  variant="gradient-outline"
                  className="w-full sm:w-auto px-8 py-3 border-primary text-primary hover:bg-primary hover:text-white"
                >
                  Take Quiz Again
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
            Your <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Personalized Recommendations</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Answer a few questions to get personalized service and engagement model recommendations
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

export default ServiceRecommender; 