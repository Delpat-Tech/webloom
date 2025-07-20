import { motion } from 'framer-motion';
import { Target, Quote } from 'lucide-react';

const DelpatEthos = () => (
  <section className="relative px-6 md:px-12 lg:px-20 py-20">
    <div className="max-w-6xl mx-auto">
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 text-blue-600 rounded-full text-sm font-medium mb-6"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Target className="w-4 h-4" />
          The Delpat Ethos
        </motion.div>

        <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
          Our Mission: Bridge the 
          <span className="block bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            Execution Gap
          </span>
        </h2>
      </motion.div>

      {/* Mission narrative */}
      <motion.div
        className="max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <div className="relative p-12 rounded-3xl bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm border border-border">
          <Quote className="w-12 h-12 text-primary/30 absolute top-6 left-6" />
          <div className="pt-8 space-y-6">
            <p className="text-2xl md:text-3xl font-medium text-foreground leading-relaxed">
              Ideas are everywhere, but execution is rare.
            </p>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Delpat was founded on the conviction that a disciplined, transparent process can bridge 
              the gap between a brilliant idea and real-world impact. We&apos;ve seen too many great concepts 
              die in the &quot;execution valley&quot; – that treacherous space between conception and reality.
            </p>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Our mission is simple: <span className="text-foreground font-semibold">we are the bridge</span>. 
              We take your vision seriously, treat your resources respectfully, and deliver results that matter. 
              Not just code. Not just designs. <span className="text-foreground font-semibold">Real business impact</span>.
            </p>
          </div>
          {/* Decorative elements */}
          <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-xl" />
        </div>
      </motion.div>
    </div>
  </section>
);

export default DelpatEthos; 