import { motion } from "framer-motion";
import Link from "next/link";
import {
  Rocket,
  Settings,
  TrendingUp,
  Eye,
  ArrowRight,
  ExternalLink,
  Globe,
  Smartphone,
  Palette,
  Database,
  Briefcase,
} from "lucide-react";
import { getFeaturedCaseStudies } from "@/data/case-studies";

const CaseStudyGrid: React.FC = () => {
  const caseStudies = getFeaturedCaseStudies().slice(0, 3);
  return (
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
            From Problem to <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Outcome</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Deep dive into our process, challenges faced, and measurable results
            achieved.
          </p>
        </motion.div>

                {/* Case Study Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {caseStudies.map((caseStudy, index) => (
            <motion.div
              key={caseStudy.id}
              className="group relative"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <Link href={`/case-studies/${caseStudy.id}`}>
                <div className="relative bg-card rounded-2xl border border-border overflow-hidden hover:border-primary/50 transition-all duration-300 h-full">
                  {/* Background Image */}
                  <div className="aspect-video bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center relative">
                    <div className="text-primary/50 text-6xl font-bold">
                      {caseStudy.title.split(' ').map(word => word[0]).join('')}
                    </div>
                    {/* Case Study Badge */}
                    <div className="absolute top-4 right-4 px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                      Case Study
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-6 space-y-4">
                    {/* Category Icon */}
                    <div className="flex items-center gap-2">
                      {(() => {
                        switch (caseStudy.category) {
                          case 'web-apps': return <Globe className="w-4 h-4 text-primary" />;
                          case 'mobile-apps': return <Smartphone className="w-4 h-4 text-primary" />;
                          case 'ui-ux': return <Palette className="w-4 h-4 text-primary" />;
                          case 'automation': return <Settings className="w-4 h-4 text-primary" />;
                          case 'data': return <Database className="w-4 h-4 text-primary" />;
                          default: return <Briefcase className="w-4 h-4 text-primary" />;
                        }
                      })()}
                      <span className="text-sm text-muted-foreground capitalize">
                        {caseStudy.category.replace('-', ' ')}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                      {caseStudy.title}
                    </h3>
                    
                    <p className="text-muted-foreground text-sm">
                      {caseStudy.subtitle}
                    </p>

                    {/* Challenge Preview */}
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-destructive/20 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Settings className="w-4 h-4 text-destructive" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground text-sm">
                            The Challenge
                          </h4>
                          <p className="text-xs text-muted-foreground">
                            {caseStudy.challenge.substring(0, 80)}...
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Settings className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground text-sm">
                            Our Solution
                          </h4>
                          <p className="text-xs text-muted-foreground">
                            {caseStudy.solution.substring(0, 80)}...
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-accent/20 rounded-lg flex items-center justify-center flex-shrink-0">
                          <TrendingUp className="w-4 h-4 text-accent" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground text-sm">
                            The Outcome
                          </h4>
                          <p className="text-xs text-muted-foreground">
                            {caseStudy.results[0]}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* View Case Study Button */}
                    <div className="pt-4 border-t border-border">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Eye className="w-4 h-4" />
                          <span>Full walkthrough</span>
                        </div>
                        <div className="flex items-center gap-2 text-primary group-hover:gap-3 transition-all">
                          <span className="text-sm font-medium">View Case</span>
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View All Cases CTA */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Link href="/case-studies">
            <motion.button
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary to-accent text-white rounded-2xl font-medium hover:shadow-lg hover:shadow-primary/25 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>View All Case Studies</span>
              <ExternalLink className="w-5 h-5" />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default CaseStudyGrid;
