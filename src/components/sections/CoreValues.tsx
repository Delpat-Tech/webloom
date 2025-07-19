import { motion } from 'framer-motion';
import { Target, Compass, Clock, Heart, Users, Shield } from 'lucide-react';
import TiltedCard from '../ui/Card';

const iconMap = {
  Target,
  Compass,
  Clock,
  Heart,
  Users,
  Shield,
};

const colorVars = [
  '--primary',
  '--secondary',
  '--accent',
  '--chart-1',
  '--chart-2',
  '--chart-3',
];

const coreValues = [
  {
    title: 'Client-Aligned Execution',
    description: 'Every line of code, every design decision, every strategic choice is filtered through one question: does this serve our client\'s success?',
    icon: 'Target',
    colorVar: colorVars[0],
  },
  {
    title: 'Precision Scoping, Creative Freedom',
    description: 'We define the what with surgical precision, then give our team complete creative freedom in the how. Structure enables creativity.',
    icon: 'Compass',
    colorVar: colorVars[1],
  },
  {
    title: 'Time and Energy Discipline',
    description: 'Your time is finite. Your energy is precious. We treat both with the respect they deserve through ruthless prioritization.',
    icon: 'Clock',
    colorVar: colorVars[2],
  },
  {
    title: 'Relationship-Weighted Negotiation',
    description: 'We optimize for long-term partnerships over short-term gains. Every decision considers the relationship impact.',
    icon: 'Heart',
    colorVar: colorVars[3],
  },
  {
    title: 'The Team is the Brand',
    description: 'Our reputation is built person by person, project by project. Every team member is an ambassador of our standards.',
    icon: 'Users',
    colorVar: colorVars[4],
  },
  {
    title: 'Transparent Execution',
    description: 'No black boxes. No surprises. You see exactly what we\'re building, why we\'re building it, and how it\'s progressing.',
    icon: 'Shield',
    colorVar: colorVars[5],
  }
];

const CoreValues = () => (
  <section className="relative px-6 md:px-12 lg:px-20 py-20">
    <div className="max-w-7xl mx-auto">
      {/* Section Title */}
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
          Our <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">Core Values</span>
        </h2>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          The principles that guide every decision, every line of code, and every client interaction.
        </p>
      </motion.div>

      {/* Values Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {coreValues.map((value, index) => {
          const Icon = iconMap[value.icon as keyof typeof iconMap];
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="relative"
            >
              <TiltedCard
                imageSrc={undefined}
                displayOverlayContent={true}
                overlayContent={
                  <div className="flex flex-col items-center justify-center h-full w-full rounded-2xl p-6 relative bg-[var(--card)]" style={{ backgroundColor: 'var(--card)', color: 'var(--card-foreground)' }}>
                    {/* Background Icon */}
                    <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
                      <Icon className="w-28 h-28 opacity-20" style={{ color: `var(${value.colorVar})` }} />
                    </div>
                    {/* Foreground Content */}
                    <div className="flex flex-col items-center justify-center h-full w-full relative z-10">
                      <div className="mb-4">
                        <Icon className="w-8 h-8" style={{ color: `var(${value.colorVar})` }} />
                      </div>
                      <h3 className="text-xl font-bold mb-2 text-center text-[var(--card-foreground)]">{value.title}</h3>
                      <p className="text-center text-[var(--card-foreground)]">{value.description}</p>
                    </div>
                  </div>
                }
                containerHeight="320px"
                imageHeight="320px"
                imageWidth="100%"
                showMobileWarning={false}
                showTooltip={false}
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
);

export default CoreValues; 