import { motion } from "framer-motion";
import Link from "next/link";
import {
  Rocket,
  Settings,
  TrendingUp,
  Eye,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import { getFeaturedProjects } from "@/data/portfolio";
import TiltedCard from '@/components/ui/Card';

const CaseStudyGrid: React.FC = () => {
  const projects = getFeaturedProjects().slice(0, 3);
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
          {projects.slice(0, 3).map((project, index) => (
            <motion.div
              key={project.id}
              className="group relative"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <Link href={`/portfolios/${project.id}`}>
                <TiltedCard
                  containerHeight="100%"
                  containerWidth="100%"
                  imageHeight="auto"
                  imageWidth="100%"
                  displayOverlayContent={true}
                  overlayContent={
                    <div className="space-y-4 p-8">
                      {/* Case Study Badge */}
                      <div className="absolute top-4 right-4 px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                        Case Study
                      </div>
                      {/* Project Icon */}
                      <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl flex items-center justify-center mb-6">
                        <Rocket className="w-8 h-8 text-primary" />
                      </div>
                      {/* Content */}
                      <div className="space-y-4">
                        <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-muted-foreground">
                          {project.description}
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
                                Complex {project.category} development needed...
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
                                Custom {project.technologies[0]} application with...
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
                                {project.results[0]}
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
                  }
                />
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
