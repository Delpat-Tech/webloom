import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Rocket, Settings, Zap, CheckCircle, Target, Users, TrendingUp, Lightbulb, ArrowRight } from 'lucide-react';
import Button from '@/components/ui/Button';
import Stepper, { Step } from '@/components/ui/Stepper';

// Quiz data and affinity logic
const quizSteps = [
  {
    id: 'mission',
    question: 'What is the core mission of this project?',
    options: [
      { id: 'create', text: 'Create something new: To launch a new product, app, or service from an idea.', icon: <Rocket className="w-5 h-5" />, affinity: { ankit: 3, priya: 0, karan: 0 } },
      { id: 'fix', text: 'Fix something broken: To replace or upgrade an inefficient internal spreadsheet or software.', icon: <Settings className="w-5 h-5" />, affinity: { ankit: 0, priya: 3, karan: 0 } },
      { id: 'automate', text: 'Automate a manual process: To eliminate a repetitive, time-consuming business task.', icon: <Zap className="w-5 h-5" />, affinity: { ankit: 1, priya: 2, karan: 0 } },
      { id: 'deliver', text: 'Deliver for a client: To build a solution as a white-label partner for an end-client.', icon: <Target className="w-5 h-5" />, affinity: { ankit: 0, priya: 0, karan: 3 } },
    ],
  },
  {
    id: 'user',
    question: 'Who is the primary end-user?',
    options: [
      { id: 'external', text: 'External Customers: The general public or paying users for a new business.', icon: <Users className="w-5 h-5" />, affinity: { ankit: 3, priya: 0, karan: 0 } },
      { id: 'internal', text: 'Our Internal Team: Our employees who need better tools to do their jobs.', icon: <Settings className="w-5 h-5" />, affinity: { ankit: 0, priya: 3, karan: 0 } },
      { id: 'b2b', text: 'A Specific Business or Partner: A dedicated B2B client using the tool.', icon: <Target className="w-5 h-5" />, affinity: { ankit: 0, priya: 1, karan: 2 } },
    ],
  },
  {
    id: 'pain',
    question: 'What is the single biggest pain point this project solves?',
    options: [
      { id: 'revenue', text: 'Missed Revenue Opportunity: "We are losing money or market share because we can\'t launch fast enough."', icon: <TrendingUp className="w-5 h-5" />, affinity: { ankit: 3, priya: 0, karan: 0 } },
      { id: 'chaos', text: 'Operational Chaos: "Our internal workflows are slow, error-prone, and hurting our efficiency."', icon: <Settings className="w-5 h-5" />, affinity: { ankit: 0, priya: 3, karan: 0 } },
      { id: 'resource', text: 'Resource Constraint: "We have the vision and the client, but not the in-house team to execute."', icon: <Lightbulb className="w-5 h-5" />, affinity: { ankit: 1, priya: 0, karan: 2 } },
    ],
  },
  {
    id: 'success',
    question: 'In 3 months, what does a successful outcome look like?',
    options: [
      { id: 'live-product', text: 'A live product with our first real users giving feedback.', icon: <Rocket className="w-5 h-5" />, engagement: 'Project-Based' },
      { id: 'team-saves-time', text: 'Our team is saving significant time using a new, efficient system.', icon: <Settings className="w-5 h-5" />, engagement: 'Monthly Retainer' },
      { id: 'fully-automated', text: 'A complex manual task is now 100% automated and reliable.', icon: <Zap className="w-5 h-5" />, engagement: 'Project-Based' },
      { id: 'client-happy', text: "We've delivered a flawless product that has made our own client happy.", icon: <Target className="w-5 h-5" />, engagement: 'Project-Based/Retainer' },
    ],
  },
];

const personaMap = {
  ankit: {
    name: 'Ankit (Founder)',
    service: 'MVP Engine',
    id: 'mvp-engine',
    icon: <Rocket className="w-8 h-8" />,
    gradient: 'from-primary to-accent',
    description: 'Go from idea to live product. Fixed timeline, zero surprises.',
  },
  priya: {
    name: 'Priya (Ops Leader)',
    service: 'Internal OS',
    id: 'internal-os',
    icon: <Settings className="w-8 h-8" />,
    gradient: 'from-secondary to-primary',
    description: 'Eliminate manual work. Connect your systems, automate chaos.',
  },
  karan: {
    name: 'Karan (Partner)',
    service: 'Custom Partnership',
    id: 'custom-partnership',
    icon: <Target className="w-8 h-8" />,
    gradient: 'from-accent to-secondary',
    description: 'Build as a white-label partner for your end-client.',
  },
  automation: {
    name: 'Automation MVP',
    service: 'Automation MVP',
    id: 'automation-mvp',
    icon: <Zap className="w-8 h-8" />,
    gradient: 'from-accent to-primary',
    description: 'Save time and resources with AI-powered workflows.',
  },
};

// Capitalize function
function capitalizeFirst(str: string) {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const ServiceRecommender: React.FC = () => {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [result, setResult] = useState<any>(null);

  // Handle answer selection
  const handleAnswer = (stepId: string, optionId: string) => {
    setAnswers((prev) => ({ ...prev, [stepId]: optionId }));
  };

  // Calculate persona affinity and recommendation
  const calculateResult = () => {
    let affinity = { ankit: 0, priya: 0, karan: 0 };
    let automateChosen = false;
    quizSteps.forEach((step) => {
      const answerId = answers[step.id];
      const option = step.options.find((o) => o.id === answerId);
      if (!option) return;
      if (step.id !== 'success') {
        affinity.ankit += option.affinity?.ankit || 0;
        affinity.priya += option.affinity?.priya || 0;
        affinity.karan += option.affinity?.karan || 0;
        if (step.id === 'mission' && answerId === 'automate') automateChosen = true;
      }
    });
    // Find top persona
    const maxScore = Math.max(affinity.ankit, affinity.priya, affinity.karan);
    const topPersonas = Object.entries(affinity).filter(([_, v]) => v === maxScore).map(([k]) => k);
    // Engagement model
    const engagementOption = quizSteps[3].options.find((o) => o.id === answers['success']);
    const engagement = engagementOption?.engagement || '';
    // Recommendation logic
    let personaKey = topPersonas[0];
    let showAutomation = automateChosen || (topPersonas.length > 1 && affinity.ankit === affinity.priya);
    let persona = personaMap[personaKey];
    if (showAutomation) persona = personaMap['automation'];
    // Dynamic reasoning
    const reasoning = getReasoning(answers, personaKey, engagement);
    setResult({ ...persona, engagement, reasoning });
    setShowResults(true);
  };

  // Dynamic reasoning generator
  function getReasoning(answers: Record<string, string>, personaKey: string, engagement: string) {
    const mission = quizSteps[0].options.find(o => o.id === answers['mission'])?.text;
    const user = quizSteps[1].options.find(o => o.id === answers['user'])?.text;
    const pain = quizSteps[2].options.find(o => o.id === answers['pain'])?.text;
    const success = quizSteps[3].options.find(o => o.id === answers['success'])?.text;
    let reasons = [];
    if (mission) reasons.push(`Because you need to ${mission.toLowerCase()}`);
    if (user) reasons.push(`for ${user.toLowerCase()}`);
    if (pain) reasons.push(`and your biggest pain is: ${pain.toLowerCase()}`);
    if (success) reasons.push(`your definition of success is: ${success.toLowerCase()}`);
    if (personaKey === 'ankit') reasons.push('The MVP Engine is your ideal starting point.');
    if (personaKey === 'priya') reasons.push('The Internal OS is your best fit.');
    if (personaKey === 'karan') reasons.push('A Custom Partnership is recommended.');
    if (personaKey === 'automation') reasons.push('Automation MVP is a strong potential fit.');
    return reasons;
  }

  const handleRestart = () => {
    setAnswers({});
    setShowResults(false);
    setResult(null);
  };

  if (showResults && result) {
    return (
      <section className="relative px-4 sm:px-6 md:px-12 lg:px-20 py-12 md:py-20">
        <div className="max-w-4xl mx-auto">
          <motion.div className="text-center mb-8 md:mb-16" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-foreground mb-4">
              Your <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Personalized Recommendation</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground">
              Based on your answers, here's the best fit for your needs
            </p>
          </motion.div>
          <motion.div className="space-y-4 sm:space-y-6 md:space-y-8" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="space-y-4 sm:space-y-6">
              <motion.div className="p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl border border-primary md:border-2 bg-gradient-to-br from-primary/10 via-accent/5 to-primary/5 overflow-hidden" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                  <div className={`p-2 sm:p-3 md:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-r ${result.gradient} text-white flex-shrink-0 self-center sm:self-auto`}>
                    {result.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 mb-4">
                      <h4 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground">{result.service}</h4>
                      <span className="px-2 py-1 sm:px-3 sm:py-1 bg-gradient-to-r from-primary to-accent text-white text-xs sm:text-sm font-semibold rounded-full">
                        Perfect Match
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm md:text-base text-muted-foreground mb-4">{result.description}</p>
                    <div className="p-3 sm:p-4 rounded-2xl bg-muted/30 mb-6">
                      <h5 className="font-semibold text-foreground mb-2 text-sm sm:text-base">Recommended Engagement</h5>
                      <div className="text-base sm:text-lg font-bold text-secondary">{result.engagement}</div>
                    </div>
                    <div className="mb-6">
                      <h5 className="font-semibold text-foreground mb-3 text-sm sm:text-base">Why This Works For You:</h5>
                      <div className="space-y-1 sm:space-y-2">
                        {result.reasoning?.map((reason: string, idx: number) => (
                          <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                            <CheckCircle className="w-4 h-4 text-accent" />
                            {capitalizeFirst(reason)}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
            <div className="text-center space-y-2 sm:space-y-4 mt-2 md:mt-4">
              <Button onClick={() => window.location.href = '/contact#contact-form'} variant="gradient-monotone" className="w-full sm:w-auto px-6 py-3 md:px-8 md:py-4 rounded-xl font-semibold flex items-center justify-center md:justify-start gap-3 mx-auto">
                Adopt Our Model
                <ArrowRight className="w-5 h-5" />
              </Button>
              <div>
                <Button onClick={handleRestart} variant="gradient-outline" className="w-full sm:w-auto px-8 py-3 border-primary text-primary hover:bg-primary hover:text-white">
                  Take Quiz Again
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  // Quiz UI
  return (
    <section className="relative px-4 sm:px-6 md:px-12 lg:px-20 py-12 md:py-20">
      <div className="max-w-4xl mx-auto">
        <motion.div className="text-center mb-12 lg:mb-24" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            Your <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Personalized Service Quiz</span>
          </h2>
          <p className="text-base sm:text-xl text-muted-foreground">
            Answer a few questions to get a tailored recommendation
          </p>
        </motion.div>
        <div className="flex justify-center">
          <div className="w-full max-w-7xl">
            <Stepper
              initialStep={1}
              onFinalStepCompleted={calculateResult}
              backButtonText="Previous"
              nextButtonText="Next"
              stepCircleContainerClassName="bg-card/80 backdrop-blur-sm border-border"
              contentClassName="py-3"
              className="min-h-[180px] sm:min-h-[250px] lg:min-h-[350px]"
            >
              {quizSteps.map((step) => (
                <Step key={step.id}>
                  <div className="space-y-4 sm:space-y-6">
                    <h3 className="text-lg sm:text-2xl font-bold text-foreground text-center mb-6 sm:mb-8">{step.question}</h3>
                    <div className="space-y-2 sm:space-y-4">
                      {step.options.map((option) => (
                        <motion.button
                          key={option.id}
                          onClick={() => handleAnswer(step.id, option.id)}
                          className={`w-full p-4 sm:p-6 rounded-2xl border-2 transition-all duration-300 text-left ${answers[step.id] === option.id ? 'border-primary bg-primary/10 text-primary' : 'border-border bg-card/50 text-foreground hover:border-primary/50 hover:bg-card/80'}`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="flex items-center gap-3 sm:gap-4">
                            <div className={`p-2 sm:p-3 rounded-xl ${answers[step.id] === option.id ? 'bg-gradient-to-r from-primary to-accent text-white' : 'bg-muted/50 text-muted-foreground'}`}>
                              {option.icon}
                            </div>
                            <span className="font-semibold text-sm sm:text-base">{option.text}</span>
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