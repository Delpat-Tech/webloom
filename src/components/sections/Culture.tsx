import { motion } from 'framer-motion';
import { MessageCircle, Calendar, Clock, Star, MapPin } from 'react-feather';

const features = [
  {
    icon: <Star className="w-6 h-6" />,
    title: 'Deep Work Blocks',
    description: '4-hour focused sessions for complex problem-solving'
  },
  {
    icon: <MessageCircle className="w-6 h-6" />,
    title: 'Async Communication',
    description: 'Thoughtful written updates over reactive meetings'
  },
  {
    icon: <Calendar className="w-6 h-6" />,
    title: 'Meeting-Light Days',
    description: 'Maximum 2 hours of meetings per day, ever'
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: 'Global Timezone Respect',
    description: 'Work when you\'re most productive, communicate clearly'
  }
];

const Culture = () => (
  <section className="relative px-6 md:px-12 lg:px-20 py-20">
    <div className="max-w-6xl mx-auto">
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {/* Culture Content */}
        <div className="space-y-8">
          <div>
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--secondary)]/20 text-[var(--secondary)] rounded-full text-sm font-medium mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <MapPin className="w-4 h-4" />
              Our Culture
            </motion.div>

            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 font-heading">
              Our Remote,
              <span className="block bg-gradient-to-r from-[var(--secondary)] to-[var(--accent)] bg-clip-text text-transparent">
                Async-First OS
              </span>
            </h2>

            <p className="text-xl text-muted-foreground leading-relaxed mb-8 font-sans">
              We believe deep work requires focus. Our async-first culture minimizes 
              unnecessary meetings, maximizing the time we spend building your product.
            </p>
          </div>

          {/* Culture Features */}
          <div className="space-y-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="flex items-start gap-4"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)]">
                  {feature.icon}
                </div>
                <div>
                  <h4 className="font-semibold text-card-foreground mb-1 font-heading">{feature.title}</h4>
                  <p className="text-muted-foreground font-sans">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Culture Illustration */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="relative w-full h-96 rounded-3xl bg-gradient-to-br from-[var(--primary)]/10 via-[var(--secondary)]/10 to-[var(--accent)]/10 overflow-hidden">
            {/* Abstract geometric illustration representing remote work */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="grid grid-cols-3 gap-4 p-8">
                {[...Array(9)].map((_, i) => (
                  <motion.div
                    key={i}
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${
                      i % 3 === 0 ? 'from-[var(--primary)] to-[var(--secondary)]' :
                      i % 3 === 1 ? 'from-[var(--accent)] to-[var(--primary)]' :
                      'from-[var(--secondary)] to-[var(--accent)]'
                    }`}
                    animate={{
                      y: [0, -10, 0],
                      rotate: [0, 5, 0]
                    }}
                    transition={{
                      duration: 2 + (i * 0.2),
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.1
                    }}
                  />
                ))}
              </div>
            </div>
            
            {/* Floating elements */}
            <motion.div
              className="absolute top-4 right-4 text-[var(--secondary)]/30"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Star className="w-8 h-8" />
            </motion.div>
            <motion.div
              className="absolute bottom-4 left-4 text-[var(--primary)]/30"
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <MapPin className="w-10 h-10" />
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  </section>
);

export default Culture; 