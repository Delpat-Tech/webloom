"use client";

import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { useState, useEffect } from "react";
import {
  MessageCircle,
  Phone,
  Mail,
  Calendar,
  Award,
  Target,
  Zap,
  Star,
  Shield,
  Timer,
  Lightbulb,
  ArrowRight,
  ChevronDown,
  FileText,
  Rocket,
  Settings,
  CheckSquare,
} from "lucide-react";
import ContactForm from "@/components/sections/ContactForm";
import { QuizAnswers } from "@/types";  
import CalendlyEmbed from "@/components/sections/CalendlyEmbed";

export default function ContactPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll();

  // Execution-themed parallax patterns
  const translateY = shouldReduceMotion
    ? 0
    : useTransform(scrollYProgress, [0, 1], [0, -150]);
  const opacity = shouldReduceMotion
    ? 1
    : useTransform(scrollYProgress, [0, 0.3, 0.8, 1], [1, 0.95, 0.85, 0.8]);
  const scale = shouldReduceMotion
    ? 1
    : useTransform(scrollYProgress, [0, 1], [1, 1.05]);
  const rotate = shouldReduceMotion
    ? 0
    : useTransform(scrollYProgress, [0, 1], [0, 1.5]);

  // state for quiz answers
  const [quizAnswers, setQuizAnswers] = useState<QuizAnswers>({
    founder: "",
    ops: "",
    budget: "",
  });

  // Handle quiz answer changes
  const handleQuizAnswer = (questionId: keyof QuizAnswers, value: string) => {
    setQuizAnswers((prev) => {
      console.log(`Selected ${questionId}: ${value}`); // Debug log
      const newAnswers = { ...prev, [questionId]: value };
      console.log("Updated Quiz Answers:", newAnswers); // Debug log
      return newAnswers;
    });
  };

  // Check if all questions are answered
  const allQuestionsAnswered =
    quizAnswers.founder && quizAnswers.ops && quizAnswers.budget;
  console.log("All Questions Answered:", allQuestionsAnswered, "Quiz Answers:", quizAnswers); // Debug log

  // Generate feedback message with only the recommendation
  const getFeedbackMessage = () => {
    const { founder, ops, budget } = quizAnswers;

    // Determine recommendation based on answers
    let recommendation = "";
    let isGoodFit = false;

    if (
      founder.includes("validated market demand") &&
      ops.includes("automation would save us 10+ hours/week") &&
      budget.includes("₹40k+ budget, 6-week timeline works")
    ) {
      isGoodFit = true;
      recommendation =
        "You’re a great fit! Your validated idea, need for automation, and budget align perfectly with our expertise. Book a free discovery call to discuss next steps.";
    } else if (
      founder.includes("strong concept but need validation") ||
      ops.includes("some manual processes to optimize") ||
      budget.includes("Yes to budget, need longer timeline") ||
      budget.includes("Smaller budget, but willing to discuss")
    ) {
      recommendation =
        "We see potential! Your project could benefit from our expertise, but we may need to refine your idea or adjust timelines. Let’s schedule a call to explore further.";
    } else {
      recommendation =
        "Thanks for answering! Your project might need more exploration or a different approach. Reach out via email or WhatsApp to discuss how we can assist.";
    }

    return (
      <motion.div
        className="mt-8 p-6 bg-card/80 backdrop-blur-sm border border-primary/30 rounded-2xl z-10"
        initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
        animate={shouldReduceMotion ? false : { opacity: 1, y: 0 }}
        transition={shouldReduceMotion ? undefined : { duration: 0.6 }}
      >
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <CheckSquare className="w-5 h-5 text-primary" />
          Your Quiz Summary
        </h3>
        <p className="text-foreground font-medium mb-4">{recommendation}</p>
        {isGoodFit && (
          <motion.a
            href="https://calendly.com/kaushikiagrawal283/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-all duration-300"
            whileHover={shouldReduceMotion ? undefined : { scale: 1.05, y: -2 }}
          >
            <Calendar className="w-5 h-5" />
            Book Discovery Call
          </motion.a>
        )}
      </motion.div>
    );
  };

  useEffect(() => {
    if (shouldReduceMotion) return;
    function handleMouseMove(e: MouseEvent) {
      setMousePosition({ x: e.clientX, y: e.clientY });
    }
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [shouldReduceMotion]);

  // Qualification questions data
  const qualificationQuestions = [
    {
      id: "founder",
      question: "Are you a founder with a validated idea needing an MVP?",
      description:
        "You have proof of concept, early users, or market validation",
      icon: <Lightbulb className="w-6 h-6" />,
      options: [
        "Yes, I have validated market demand",
        "I have a strong concept but need validation",
        "I'm still exploring the idea",
        "Not applicable",
      ],
    },
    {
      id: "ops",
      question: "Are you an ops leader drowning in manual processes?",
      description: "You spend hours on tasks that could be automated",
      icon: <Settings className="w-6 h-6" />,
      options: [
        "Yes, automation would save us 10+ hours/week",
        "We have some manual processes to optimize",
        "We're mostly automated already",
        "Not applicable",
      ],
    },
    {
      id: "budget",
      question: "Do you have a budget of ₹40k+ and need results in 6 weeks?",
      description: "We work with committed clients ready to move fast",
      icon: <Target className="w-6 h-6" />,
      options: [
        "Yes, ₹40k+ budget, 6-week timeline works",
        "Yes to budget, need longer timeline",
        "Smaller budget, but willing to discuss",
        "Just exploring options for now",
      ],
    },
  ];

  // Success stories
  const successStories = [
    {
      client: "SaaS Founder",
      problem: "Had validated idea, needed MVP in 8 weeks for investor demo",
      solution:
        "Built full-stack SaaS platform with user management & analytics",
      result: "₹2Cr seed round closed, 500+ early users onboarded",
      timeline: "6 weeks",
      budget: "₹85k",
    },
    {
      client: "Operations Director",
      problem: "Team spent 20 hours/week on manual inventory tracking",
      solution: "Custom inventory management system with automated alerts",
      result: "95% time savings, zero stockouts in 6 months",
      timeline: "4 weeks",
      budget: "₹65k",
    },
    {
      client: "Growing Agency",
      problem: "Client reporting took 2 days/month per client",
      solution: "Automated dashboard pulling data from 5+ sources",
      result: "Reporting now takes 30 minutes, landed 3 new clients",
      timeline: "5 weeks",
      budget: "₹75k",
    },
  ];

  // Contact methods
  const contactMethods = [
    {
      type: "Discovery Call",
      description: "Free 30-minute consultation to understand your needs",
      icon: <Calendar className="w-6 h-6" />,
      action: "Book Now",
      link: "https://calendly.com/kaushikiagrawal283/30min",
      primary: true,
    },
    {
      type: "WhatsApp",
      description: "Quick questions? Message us directly",
      icon: <MessageCircle className="w-6 h-6" />,
      action: "+91 98765 43210",
      link: "https://wa.me/919876543210",
    },
    {
      type: "Email",
      description: "Detailed project discussion",
      icon: <Mail className="w-6 h-6" />,
      action: "hello@delpat.in",
      link: "mailto:hello@delpat.in",
    },
    {
      type: "Phone",
      description: "Direct line for urgent matters",
      icon: <Phone className="w-6 h-6" />,
      action: "+91 98765 43210",
      link: "tel:+919876543210",
    },
  ];

  return (
    <main className="relative overflow-hidden">
      {/* Execution-themed Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-background" />

        {/* Execution gap bridge shapes */}
        <motion.div
          className="absolute top-1/6 left-1/12 w-96 h-96 bg-gradient-to-r from-primary/12 to-secondary/12 rounded-full blur-3xl"
          style={{ translateY, scale, rotate }}
        />
        <motion.div
          className="absolute top-1/2 right-1/8 w-80 h-80 bg-gradient-to-r from-accent/15 to-green-400/15 rounded-full blur-3xl"
          style={{
            opacity,
            scale: shouldReduceMotion
              ? 1
              : useTransform(scrollYProgress, [0, 1], [1.1, 0.9]),
          }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-gradient-to-r from-secondary/10 to-pink-400/10 rounded-full blur-3xl"
          style={{
            translateY: shouldReduceMotion
              ? 0
              : useTransform(scrollYProgress, [0, 1], [0, 80]),
            scale,
          }}
        />

        {/* Grid pattern for structure */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_4px_4px,rgba(var(--primary-rgb),0.04)_4px,transparent_0)] bg-[size:80px_80px]" />

        {/* Interactive execution cursor */}
        <motion.div
          className="absolute w-80 h-80 bg-gradient-to-r from-primary/10 to-accent/10 rounded-full blur-3xl pointer-events-none"
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  x: mousePosition.x - 160,
                  y: mousePosition.y - 160,
                  scale: [1, 1.15, 1],
                }
          }
          transition={
            shouldReduceMotion
              ? undefined
              : {
                  x: { type: "spring", stiffness: 25, damping: 30 },
                  y: { type: "spring", stiffness: 25, damping: 30 },
                  scale: {
                    repeat: Infinity,
                    duration: 4.5,
                    ease: "easeInOut",
                  },
                }
          }
        />
      </div>

      {/* PAGE HEADER */}
      <section className="relative px-6 md:px-12 lg:px-20 py-24 md:py-32 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto w-full">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 50 }}
            animate={shouldReduceMotion ? false : { opacity: 1, y: 0 }}
            transition={shouldReduceMotion ? undefined : { duration: 0.8 }}
            className="text-center max-w-6xl mx-auto"
          >
            {/* Floating execution icons */}
            <div className="relative mb-8">
              <motion.div
                className="absolute -top-20 -left-16 text-primary/40"
                animate={
                  shouldReduceMotion
                    ? undefined
                    : {
                        y: [0, -25, 0],
                        rotate: [0, 10, 0],
                        scale: [1, 1.1, 1],
                      }
                }
                transition={
                  shouldReduceMotion
                    ? undefined
                    : {
                        duration: 5.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }
                }
              >
                <Target className="w-20 h-20" />
              </motion.div>
              <motion.div
                className="absolute -top-16 -right-20 text-accent/40"
                animate={
                  shouldReduceMotion
                    ? undefined
                    : {
                        y: [0, -30, 0],
                        rotate: [0, -15, 0],
                        scale: [1.1, 1, 1.1],
                      }
                }
                transition={
                  shouldReduceMotion
                    ? undefined
                    : {
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 2,
                      }
                }
              >
                <Zap className="w-24 h-24" />
              </motion.div>
              <motion.div
                className="absolute -bottom-10 left-1/4 text-secondary/40"
                animate={
                  shouldReduceMotion
                    ? undefined
                    : {
                        y: [0, -20, 0],
                        rotate: [0, 18, 0],
                        scale: [1, 1.12, 1],
                      }
                }
                transition={
                  shouldReduceMotion
                    ? undefined
                    : {
                        duration: 5.8,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1,
                      }
                }
              >
                <Rocket className="w-18 h-18" />
              </motion.div>
            </div>

            {/* Main headline */}
            <motion.h1
              className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
              animate={shouldReduceMotion ? false : { opacity: 1, y: 0 }}
              transition={
                shouldReduceMotion ? undefined : { duration: 0.8, delay: 0.2 }
              }
            >
              <span className="block text-foreground">Ready to</span>
              <motion.span
                className="block bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent"
                initial={
                  shouldReduceMotion ? false : { opacity: 0, scale: 0.8 }
                }
                animate={shouldReduceMotion ? false : { opacity: 1, scale: 1 }}
                transition={
                  shouldReduceMotion ? undefined : { duration: 0.8, delay: 0.5 }
                }
              >
                Bridge Your
              </motion.span>
              <span className="block text-foreground text-4xl md:text-5xl lg:text-6xl">
                Execution Gap?
              </span>
            </motion.h1>

            {/* Execution gap description */}
            <motion.p
              className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-4xl mx-auto leading-relaxed"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              animate={shouldReduceMotion ? false : { opacity: 1, y: 0 }}
              transition={
                shouldReduceMotion ? undefined : { duration: 0.8, delay: 0.4 }
              }
            >
              Book a free, no-pressure discovery call to see if we&apos;re the
              right partner for your project. We turn your ideas into reality.
            </motion.p>

            {/* Quick qualification badges */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              animate={shouldReduceMotion ? false : { opacity: 1, y: 0 }}
              transition={
                shouldReduceMotion ? undefined : { duration: 0.8, delay: 0.6 }
              }
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-5xl mx-auto"
            >
              {[
                {
                  icon: <Lightbulb className="w-5 h-5" />,
                  text: "Validated Idea?",
                  subtext: "Need MVP fast",
                },
                {
                  icon: <Settings className="w-5 h-5" />,
                  text: "Manual Processes?",
                  subtext: "Ready to automate",
                },
                {
                  icon: <Target className="w-5 h-5" />,
                  text: "₹40k+ Budget?",
                  subtext: "6-week timeline",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="p-6 bg-card/70 backdrop-blur-sm border border-border rounded-2xl"
                  whileHover={
                    shouldReduceMotion ? undefined : { scale: 1.05, y: -4 }
                  }
                  transition={
                    shouldReduceMotion ? undefined : { duration: 0.3 }
                  }
                >
                  <div className="flex items-center justify-center gap-2 text-primary mb-2">
                    {item.icon}
                    <span className="font-semibold">{item.text}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {item.subtext}
                  </p>
                </motion.div>
              ))}
            </motion.div>

            {/* Primary CTA */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              animate={shouldReduceMotion ? false : { opacity: 1, y: 0 }}
              transition={
                shouldReduceMotion ? undefined : { duration: 0.8, delay: 0.8 }
              }
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
            >
              <motion.a
                href="https://calendly.com/kaushikiagrawal283/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-xl font-semibold text-lg hover:bg-primary/90 transition-all duration-300"
                whileHover={
                  shouldReduceMotion ? undefined : { scale: 1.05, y: -2 }
                }
              >
                <Calendar className="w-5 h-5" />
                Book Free Discovery Call
                <ArrowRight className="w-4 h-4" />
              </motion.a>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              animate={shouldReduceMotion ? false : { opacity: 1, y: 0 }}
              transition={
                shouldReduceMotion ? undefined : { duration: 0.8, delay: 1.0 }
              }
              className="flex flex-col items-center gap-6"
            >
              <div className="flex items-center gap-8 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-accent" />
                  <span>100% Confidential</span>
                </div>
                <div className="flex items-center gap-2">
                  <Timer className="w-4 h-4 text-primary" />
                  <span>24hr Response</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <span>5.0★ Client Rating</span>
                </div>
              </div>

              {/* Scroll indicator */}
              <motion.div
                className="flex flex-col items-center gap-2 text-muted-foreground"
                animate={shouldReduceMotion ? undefined : { y: [0, 12, 0] }}
                transition={
                  shouldReduceMotion
                    ? undefined
                    : { duration: 2.5, repeat: Infinity }
                }
              >
                <span className="text-sm">See if we&apos;re a good fit</span>
                <ChevronDown className="w-5 h-5" />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* SUCCESS STORIES SECTION */}
      <section className="relative px-6 md:px-12 lg:px-20 py-20">
        <div className="max-w-6xl mx-auto">
          {/* Section Title */}
          <motion.div
            className="text-center mb-16"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={shouldReduceMotion ? undefined : { duration: 0.8 }}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 bg-accent/20 text-accent-foreground rounded-full text-sm font-medium mb-6"
              initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.8 }}
              whileInView={
                shouldReduceMotion ? undefined : { opacity: 1, scale: 1 }
              }
              viewport={{ once: true }}
              transition={
                shouldReduceMotion ? undefined : { duration: 0.6, delay: 0.2 }
              }
            >
              <Award className="w-4 h-4" />
              Execution Success Stories
            </motion.div>

            <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Bridging the
              <span className="block bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                Execution Gap
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Real results from founders and ops leaders who trusted us with
              their execution.
            </p>
          </motion.div>

          {/* Success Stories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <motion.div
                key={index}
                className="group p-8 rounded-3xl bg-card/80 backdrop-blur-sm border border-border hover:border-primary/30 transition-all duration-300"
                initial={shouldReduceMotion ? false : { opacity: 0, y: 40 }}
                whileInView={
                  shouldReduceMotion ? undefined : { opacity: 1, y: 0 }
                }
                viewport={{ once: true }}
                transition={
                  shouldReduceMotion
                    ? undefined
                    : { duration: 0.6, delay: index * 0.2 }
                }
                whileHover={
                  shouldReduceMotion ? undefined : { scale: 1.02, y: -8 }
                }
              >
                {/* Client type */}
                <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                  {story.client}
                </div>

                {/* Problem */}
                <div className="mb-4">
                  <h4 className="font-semibold text-foreground mb-2">
                    Challenge:
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {story.problem}
                  </p>
                </div>

                {/* Solution */}
                <div className="mb-4">
                  <h4 className="font-semibold text-foreground mb-2">
                    Our Solution:
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {story.solution}
                  </p>
                </div>

                {/* Result */}
                <div className="mb-6">
                  <h4 className="font-semibold text-accent mb-2">Result:</h4>
                  <p className="text-sm text-foreground font-medium">
                    {story.result}
                  </p>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="text-center">
                    <div className="text-lg font-bold text-primary">
                      {story.timeline}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Timeline
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-primary">
                      {story.budget}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Investment
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* QUALIFICATION QUESTIONS SECTION */}
      <section className="relative px-6 md:px-12 lg:px-20 py-20 bg-gradient-to-br from-primary/5 via-accent/3 to-accent/5">
        <div className="max-w-4xl mx-auto">
          {/* Section Title */}
          <motion.div
            className="text-center mb-12"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={shouldReduceMotion ? undefined : { duration: 0.8 }}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/20 text-secondary rounded-full text-sm font-medium mb-6"
              initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.8 }}
              whileInView={
                shouldReduceMotion ? undefined : { opacity: 1, scale: 1 }
              }
              viewport={{ once: true }}
              transition={
                shouldReduceMotion ? undefined : { duration: 0.6, delay: 0.2 }
              }
            >
              <CheckSquare className="w-4 h-4" />
              Quick Qualification
            </motion.div>

            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Are We a
              <span className="block bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
                Good Fit?
              </span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Answer these 3 quick questions to see if we should talk.
            </p>
          </motion.div>

          {/* Qualification Questions */}
          <div className="space-y-8">
            {qualificationQuestions.map((q, index) => (
              <motion.div
                key={q.id}
                className="p-6 bg-card/80 backdrop-blur-sm border border-border rounded-2xl"
                initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
                whileInView={
                  shouldReduceMotion ? undefined : { opacity: 1, y: 0 }
                }
                viewport={{ once: true }}
                transition={
                  shouldReduceMotion
                    ? undefined
                    : { duration: 0.6, delay: index * 0.2 }
                }
              >
                {/* Question Header */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0 p-2 bg-primary/10 rounded-lg text-primary">
                    {q.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-foreground mb-1">
                      {q.question}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {q.description}
                    </p>
                  </div>
                </div>

                {/* Options */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {q.options.map((option, optionIndex) => (
                    <motion.label
                      key={optionIndex}
                      className="flex items-center gap-3 p-3 bg-background/50 border border-border rounded-lg cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-all duration-200"
                      whileHover={
                        shouldReduceMotion ? undefined : { scale: 1.02 }
                      }
                      whileTap={
                        shouldReduceMotion ? undefined : { scale: 0.98 }
                      }
                    >
                      <input
                        type="radio"
                        name={`qualification${index + 1}`}
                        value={option}
                        checked={quizAnswers[q.id as keyof QuizAnswers] === option}
                        onChange={() => handleQuizAnswer(q.id as keyof QuizAnswers, option)}
                        className="w-4 h-4 text-primary focus:ring-primary focus:ring-2"
                      />
                      <span className="text-sm text-foreground">{option}</span>
                    </motion.label>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Feedback Message */}
          {allQuestionsAnswered ? (
            getFeedbackMessage()
          ) : (
            <div className="mt-8 p-6 bg-yellow-100 text-yellow-800 rounded-2xl">
              Please answer all three questions to see your summary.
            </div>
          )}
        </div>
      </section>

      {/* CONTACT METHODS SECTION */}
      <section className="relative px-6 md:px-12 lg:px-20 py-20">
        <div className="max-w-6xl mx-auto">
          {/* Section Title */}
          <motion.div
            className="text-center mb-16"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={shouldReduceMotion ? undefined : { duration: 0.8 }}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary/20 text-primary rounded-full text-sm font-medium mb-6"
              initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.8 }}
              whileInView={
                shouldReduceMotion ? undefined : { opacity: 1, scale: 1 }
              }
              viewport={{ once: true }}
              transition={
                shouldReduceMotion ? undefined : { duration: 0.6, delay: 0.2 }
              }
            >
              <MessageCircle className="w-4 h-4" />
              Get In Touch
            </motion.div>

            <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Choose Your
              <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Preferred Method
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Whether you prefer a detailed discussion or a quick chat,
              we&apos;re here to help.
            </p>
          </motion.div>

          {/* Contact Methods Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactMethods.map((method, index) => (
              <motion.a
                key={index}
                href={method.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`group p-6 rounded-2xl border transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                  method.primary
                    ? "bg-primary text-primary-foreground border-primary hover:bg-primary/90"
                    : "bg-card/80 backdrop-blur-sm border-border hover:border-primary/50 hover:bg-card/60"
                }`}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 40 }}
                whileInView={
                  shouldReduceMotion ? undefined : { opacity: 1, y: 0 }
                }
                viewport={{ once: true }}
                transition={
                  shouldReduceMotion
                    ? undefined
                    : { duration: 0.6, delay: index * 0.1 }
                }
                whileHover={shouldReduceMotion ? undefined : { y: -8 }}
              >
                <div
                  className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4 ${
                    method.primary ? "bg-white/20" : "bg-primary/10"
                  }`}
                >
                  <div
                    className={method.primary ? "text-white" : "text-primary"}
                  >
                    {method.icon}
                  </div>
                </div>

                <h3
                  className={`text-lg font-bold mb-2 ${
                    method.primary ? "text-white" : "text-foreground"
                  }`}
                >
                  {method.type}
                </h3>

                <p
                  className={`text-sm mb-4 leading-relaxed ${
                    method.primary ? "text-white/80" : "text-muted-foreground"
                  }`}
                >
                  {method.description}
                </p>

                <div
                  className={`flex items-center gap-2 text-sm font-medium ${
                    method.primary ? "text-white" : "text-primary"
                  }`}
                >
                  <span>{method.action}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* DETAILED CONTACT FORM SECTION */}
      <section
        id="contact-form"
        className="relative px-6 md:px-12 lg:px-20 py-20 bg-gradient-to-br from-background via-accent/5 to-primary/5"
      >
        <div className="max-w-4xl mx-auto">
          {/* Section Title */}
          <motion.div
            className="text-center mb-12"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={shouldReduceMotion ? undefined : { duration: 0.8 }}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary/20 text-primary-foreground rounded-full text-sm font-medium mb-6"
              initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.8 }}
              whileInView={
                shouldReduceMotion ? undefined : { opacity: 1, scale: 1 }
              }
              viewport={{ once: true }}
              transition={
                shouldReduceMotion ? undefined : { duration: 0.6, delay: 0.2 }
              }
            >
              <FileText className="w-4 h-4" />
              Project Details
            </motion.div>

            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Tell Us About
              <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Your Project
              </span>
            </h2>
            <p className="text-xl text-muted-foreground">
              The more details you share, the better we can help you succeed.
            </p>
          </motion.div>
          {/* Contact Form */}
          <ContactForm />
        </div>
      </section>

      {/* FOOTER SECTION */}
      <footer className="relative px-6 md:px-12 lg:px-20 py-16 bg-gradient-to-br from-background to-accent/10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={shouldReduceMotion ? undefined : { duration: 0.8 }}
          >
            {/* Logo/Brand */}
            <motion.div
              className="flex items-center justify-center gap-2 mb-8"
              initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.8 }}
              whileInView={
                shouldReduceMotion ? undefined : { opacity: 1, scale: 1 }
              }
              viewport={{ once: true }}
              transition={
                shouldReduceMotion ? undefined : { duration: 0.6, delay: 0.2 }
              }
            >
              <div className="w-10 h-10 bg-gradient-to-r from-primary to-accent rounded-xl flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-foreground">Delpat</span>
            </motion.div>

            {/* Tagline */}
            <motion.p
              className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={
                shouldReduceMotion ? undefined : { opacity: 1, y: 0 }
              }
              viewport={{ once: true }}
              transition={
                shouldReduceMotion ? undefined : { duration: 0.6, delay: 0.4 }
              }
            >
              Bridging the execution gap between your ideas and reality.
            </motion.p>

            {/* Contact Links */}
            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-8"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={
                shouldReduceMotion ? undefined : { opacity: 1, y: 0 }
              }
              viewport={{ once: true }}
              transition={
                shouldReduceMotion ? undefined : { duration: 0.6, delay: 0.6 }
              }
            >
              <a
                href="mailto:hello@delpat.in"
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>hello@delpat.in</span>
              </a>
              <a
                href="tel:+919876543210"
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>+91 98765 43210</span>
              </a>
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-8 mb-8 text-sm text-muted-foreground"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={
                shouldReduceMotion ? undefined : { opacity: 1, y: 0 }
              }
              viewport={{ once: true }}
              transition={
                shouldReduceMotion ? undefined : { duration: 0.6, delay: 0.8 }
              }
            >
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-accent" />
                <span>100% Confidential</span>
              </div>
              <div className="flex items-center gap-2">
                <Timer className="w-4 h-4 text-primary" />
                <span>24hr Response Time</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-400" />
                <span>5.0★ Client Rating</span>
              </div>
            </motion.div>

            {/* Copyright */}
            <motion.div
              className="pt-8 border-t border-border text-center text-sm text-muted-foreground"
              initial={shouldReduceMotion ? false : { opacity: 0 }}
              whileInView={shouldReduceMotion ? undefined : { opacity: 1 }}
              viewport={{ once: true }}
              transition={
                shouldReduceMotion ? undefined : { duration: 0.6, delay: 1.0 }
              }
            >
              <p>
                © 2025 Delpat. Made with{" "}
                <span className="text-destructive">❤️</span> in India.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </footer>

      {/* Floating Action Button */}
      <motion.a
        href="https://calendly.com/kaushikiagrawal283/30min"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-50 flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full shadow-2xl hover:bg-primary/90 transition-all duration-300"
        initial={
          shouldReduceMotion ? false : { opacity: 0, scale: 0.8, y: 100 }
        }
        animate={
          shouldReduceMotion ? undefined : { opacity: 1, scale: 1, y: 0 }
        }
        transition={
          shouldReduceMotion ? undefined : { duration: 0.8, delay: 1.5 }
        }
        whileHover={shouldReduceMotion ? undefined : { scale: 1.05, y: -4 }}
        whileTap={shouldReduceMotion ? undefined : { scale: 0.95 }}
      >
        <Calendar className="w-5 h-5" />
        <span className="font-medium">Book Call</span>
      </motion.a>
    </main>
  );
}