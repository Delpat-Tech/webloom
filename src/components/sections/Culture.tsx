import { motion } from 'framer-motion';
import {
  Globe,
  Target,
  MessageCircle,
  Calendar,
  Clock,
  UserCheck,
  FileText,
  Coffee,
  Users,
  Tool,
} from 'react-feather';

// Expanded list of all 9 cultural principles
const culturePrinciples = [
  {
    icon: <Target className="w-8 h-8" />,
    title: 'Deep Work Blocks',
    description: '4-hour focused sessions for complex problem-solving.',
  },
  {
    icon: <MessageCircle className="w-8 h-8" />,
    title: 'Async Communication',
    description: 'Thoughtful written updates over reactive meetings.',
  },
  {
    icon: <Calendar className="w-8 h-8" />,
    title: 'Meeting-Light Days',
    description: 'Maximum 2 hours of meetings per day, ever.',
  },
  {
    icon: <Globe className="w-8 h-8" />,
    title: 'Global Timezone Respect',
    description: "Work when you're most productive, communicate clearly.",
  },
  {
    icon: <UserCheck className="w-8 h-8" />,
    title: 'Clear Ownership & Accountability',
    description: 'Every task has a clear owner. Autonomy is empowered by clarity.',
  },
  {
    icon: <FileText className="w-8 h-8" />,
    title: 'Documentation by Default',
    description: 'We document decisions, not just code, ensuring alignment.',
  },
  {
    icon: <Coffee className="w-8 h-8" />,
    title: 'Flexible Work Routines',
    description: 'We value outcomes over hours and support work-life integration.',
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: 'Intentional Collaboration',
    description: 'Pre-set windows make synchronous moments efficient.',
  },
  {
    icon: <Tool className="w-8 h-8" />,
    title: 'Tool-Driven Transparency',
    description: 'We leverage async tools to keep everyone aligned without interruptions.',
  },
];

const Culture = () => (
  <section className="relative px-6 md:px-12 lg:px-20 py-20 overflow-hidden">
    <div className="max-w-6xl mx-auto">
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {/* Culture Content */}
        <div className="space-y-6">
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--secondary)]/20 text-[var(--secondary)] rounded-full text-sm font-medium"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Globe className="w-4 h-4" />
            Our Culture
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold text-foreground font-heading">
            Our Remote,
            <span className="block bg-gradient-to-r from-[var(--secondary)] to-[var(--accent)] bg-clip-text text-transparent">
              Async-First OS
            </span>
          </h2>

          <p className="text-xl text-muted-foreground leading-relaxed font-sans">
            We believe deep work requires focus. Our async-first culture minimizes
            unnecessary meetings, maximizing the time we spend building and creating.
          </p>
        </div>

        {/* Interactive Culture Grid */}
        <div className="grid grid-cols-3 grid-rows-3 gap-4">
          {culturePrinciples.map((principle, i) => (
            <motion.div
  key={principle.title}
  className="relative aspect-square rounded-2xl cursor-pointer overflow-hidden"
  initial={{ opacity: 0, scale: 0.5 }}
  animate={{
    opacity: 1,
    scale: 1,
    y: [0, -10, 0],
  }}
  transition={{
    duration: 0.5,
    delay: 0.3 + i * 0.05,
    y: {
      duration: 2 + i * 0.2,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  }}
  whileHover="hover" // parent hover triggers variant
  variants={{
    hover: {}, // parent hover, children use this
  }}
>
  {/* Gradient Background */}
  <div
    className={`absolute inset-0 w-full h-full rounded-2xl bg-gradient-to-br ${
      i % 3 === 0
        ? 'from-[var(--primary)]/80 to-[var(--secondary)]/80'
        : i % 3 === 1
        ? 'from-[var(--accent)]/80 to-[var(--primary)]/80'
        : 'from-[var(--secondary)]/80 to-[var(--accent)]/80'
    }`}
  />

  {/* Overlay Text */}
  <motion.div
    className="absolute inset-0 flex flex-col items-center justify-center p-3 text-center bg-black/80 text-white rounded-2xl"
    initial={{ opacity: 0 }}
    variants={{
      hover: { opacity: 1 }, // fade in on parent hover
    }}
    transition={{ duration: 0.2 }}
  >
    <h4 className="font-bold text-sm mb-1">{principle.title}</h4>
    <p className="text-xs">{principle.description}</p>
  </motion.div>

  {/* Icon */}
  <motion.div
    className="absolute inset-0 flex items-center justify-center text-white"
    initial={{ opacity: 1 }}
    variants={{
      hover: { opacity: 0 }, // fade out on hover
    }}
    transition={{ duration: 0.2 }}
  >
    {principle.icon}
  </motion.div>
</motion.div>

          ))}
        </div>
      </motion.div>
    </div>
  </section>
);

export default Culture;
