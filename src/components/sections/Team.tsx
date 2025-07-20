import { motion } from 'framer-motion';
import { Users } from 'lucide-react';

const team = [
  {
    name: 'Alex Chen',
    role: 'Founder & Strategic Lead',
    bio: 'Former startup CTO turned execution specialist. Built and scaled 5 products from 0 to $1M+ ARR. Obsessed with bridging the gap between vision and reality.',
    avatar: '/api/placeholder/200/200',
    expertise: ['Product Strategy', 'Technical Architecture', 'Team Scaling'],
    background: '8 years building, 15+ products shipped'
  },
  {
    name: 'Maya Rodriguez',
    role: 'Lead Developer & Systems Architect',
    bio: 'Full-stack engineer with a design eye. Specializes in turning complex requirements into elegant, scalable solutions that users actually love.',
    avatar: '/api/placeholder/200/200',
    expertise: ['Full-Stack Development', 'System Design', 'Performance Optimization'],
    background: '6 years shipping, 50K+ users served'
  },
  {
    name: 'Jordan Kim',
    role: 'Client Success & Operations',
    bio: 'The bridge between client vision and technical execution. Ensures every project stays aligned, on-time, and exceeds expectations.',
    avatar: '/api/placeholder/200/200',
    expertise: ['Project Management', 'Client Relations', 'Process Optimization'],
    background: '5 years managing, 98% client satisfaction'
  }
];

const Team = () => (
  <section className="relative px-6 md:px-12 lg:px-20 py-20">
    <div className="max-w-6xl mx-auto">
      {/* Section Title */}
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--accent)]/20 text-[var(--accent)] rounded-full text-sm font-medium mb-6"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Users className="w-4 h-4" />
          Meet the Team
        </motion.div>

        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 font-heading leading-tight">
          The People Behind the 
          <span className="block bg-gradient-to-r from-[var(--accent)] to-[var(--primary)] bg-clip-text text-transparent whitespace-nowrap pb-1">
            Engine
          </span>
        </h2>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-sans">
          We are a lean team of strategists and builders obsessed with client alignment and delivery.
        </p>
      </motion.div>

      {/* Team Grid */}
      <div className="space-y-12">
        {team.map((member, index) => (
          <motion.div
            key={index}
            className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 lg:gap-12 items-center bg-card rounded-2xl border border-border p-6`}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
          >
            {/* Member Photo */}
            <div className="flex-shrink-0">
              <motion.div
                className="relative w-80 h-80 rounded-3xl overflow-hidden bg-gradient-to-br from-[var(--primary)]/10 to-[var(--accent)]/10"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                {/* Placeholder for actual photo */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center">
                    <span className="text-[var(--primary-foreground)] font-bold text-4xl font-heading">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </motion.div>
            </div>

            {/* Member Info */}
            <div className="flex-1 space-y-6">
              <div>
                <h3 className="text-3xl font-bold text-card-foreground mb-2 font-heading">{member.name}</h3>
                <p className="text-lg text-primary font-medium mb-4 font-sans">{member.role}</p>
                <p className="text-muted-foreground text-sm mb-4 font-sans">{member.background}</p>
                <p className="text-lg text-muted-foreground leading-relaxed font-sans">
                  {member.bio}
                </p>
              </div>

              {/* Expertise Tags */}
              <div className="flex flex-wrap gap-3">
                {member.expertise.map((skill, skillIndex) => (
                  <span
                    key={skillIndex}
                    className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium font-sans"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Team; 