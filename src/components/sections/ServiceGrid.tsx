import React from "react";
import { ArrowRight } from "lucide-react";
import { ServiceGridProps } from "@/types";
import Button from "@/components/ui/Button";

const ServiceGrid: React.FC<ServiceGridProps> = ({ services, isVisible, sectionId }) => (
  <section
    id={sectionId}
    className={`py-20 transition-all duration-1000 delay-200 ${isVisible[sectionId] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
  >
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
          Execution, Distilled into a Service
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          We solve the most common roadblocks that stall growth. Find your solution.
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <div key={index} className="bg-card rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-border">
            <div className="mb-6">{service.icon}</div>
            <h3 className="text-2xl font-bold text-foreground mb-4">{service.title}</h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">{service.description}</p>
            <Button className="text-primary font-semibold hover:text-secondary transition-colors duration-300 flex items-center gap-2">
              Learn More
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ServiceGrid;
