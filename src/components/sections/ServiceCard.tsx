import React from 'react';
import { motion } from 'framer-motion';
import { DollarSign, CheckCircle, ArrowRight } from 'lucide-react';
import Button from '@/components/ui/Button';

interface ServiceTrack {
  id: string;
  title: string;
  description: string;
  startingPrice: string;
  benefits: string[];
  icon: React.ReactNode;
  gradient: string;
  features: string[];
  timeline: string;
  outcome: string;
}

interface ServiceCardProps {
  serviceTracks: ServiceTrack[];
  onLearnMore: (service: ServiceTrack) => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ serviceTracks, onLearnMore }) => (
  <div className="grid lg:grid-cols-3 gap-8">
    {serviceTracks.map((service, index) => (
      <motion.div
        key={service.id}
        className="group relative"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: index * 0.2 }}
      >
        <div className="relative h-full p-8 rounded-3xl bg-card/80 backdrop-blur-sm border border-border hover:border-primary/50 transition-all duration-300 group-hover:shadow-2xl">
          {/* Gradient overlay on hover */}
          <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
          {/* Service icon */}
          <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${service.gradient} text-white mb-6`}>
            {service.icon}
          </div>
          {/* Service info */}
          <div className="relative z-10">
            <h3 className="text-2xl font-bold text-foreground mb-3">
              {service.title}
            </h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              {service.description}
            </p>
            {/* Starting price */}
            <div className="flex items-center gap-2 mb-6">
              <DollarSign className="w-5 h-5 text-green-500" />
              <span className="text-lg font-semibold text-foreground">
                Starting at {service.startingPrice}
              </span>
            </div>
            {/* Key benefits */}
            <div className="space-y-3 mb-8">
              {service.benefits.map((benefit, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground text-sm">
                    {benefit}
                  </span>
                </div>
              ))}
            </div>
            {/* Action buttons */}
            <div className="flex gap-3">
              <Button
                onClick={() => onLearnMore(service)}
                variant="gradient-monotone"
                className="flex-1 py-3 px-6 rounded-xl font-semibold flex items-center justify-center gap-2"
              >
                Learn More
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    ))}
  </div>
);

export default ServiceCard;