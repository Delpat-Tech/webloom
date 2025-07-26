import React, { useState } from 'react';
import { Sparkles, Palette, Clock, ArrowRight, Zap } from 'lucide-react';
import Button from "@/components/ui/Button";
import { motion } from 'framer-motion';

const AddOnsList = ({ addons = defaultAddons }) => {
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mb-4">
          Premium Add-Ons
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Enhance your project with our carefully curated selection of premium services and integrations
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {addons.map((addon, index) => (
          <div
            key={index}
            className={`relative group bg-card rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-border overflow-hidden ${
              hoveredItem === index ? 'ring-2 ring-primary/20' : ''
            }`}
            onMouseEnter={() => setHoveredItem(index)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Header with icon */}
            <div className="relative p-6 pb-4">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-r from-primary to-secondary shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                  <addon.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ArrowRight className="w-5 h-5 text-primary" />
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                {addon.title}
              </h3>
              
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                {addon.description}
              </p>
            </div>

            {/* Features */}
            <div className="px-6 pb-4">
              <div className="flex flex-wrap gap-2 mb-4">
                {addon.features?.map((feature, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-muted text-muted-foreground rounded-full text-xs font-medium group-hover:bg-primary/10 group-hover:text-primary transition-colors duration-300"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>

            {/* Price */}
            <div className="px-6 pb-6">
              <div className="bg-gradient-to-r from-card to-muted rounded-xl p-4 group-hover:from-primary/5 group-hover:to-secondary/5 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                      {addon.priceRange}
                    </span>
                    <span className="text-muted-foreground text-sm ml-2">
                      {addon.priceNote}
                    </span>
                  </div>
                  <Zap className="w-5 h-5 text-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
            </div>

            {/* Hover effect border */}
            <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-gradient-to-r group-hover:from-primary/20 group-hover:via-secondary/20 group-hover:to-accent/20 transition-all duration-300 pointer-events-none" />
          </div>
        ))}
      </div>

      {/* Call to action */}
      <div className="text-center mt-12">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative group inline-block"
        >
          <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-accent rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-300" />
          <Button className="relative bg-gradient-to-r from-primary to-secondary text-primary-foreground px-8 py-3 rounded-xl font-semibold hover:from-primary hover:to-accent transition-all duration-300 shadow-lg">
            Get Started Today
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

// Default add-ons data
const defaultAddons = [
  {
    title: "AI Integration",
    description: "Seamlessly integrate cutting-edge AI capabilities into your application with custom chatbots, content generation, and intelligent automation features.",
    priceRange: "₹10,000 - ₹40,000+",
    priceNote: "per integration",
    icon: Sparkles,
    features: ["Custom ChatGPT", "Content AI", "Smart Analytics", "API Setup"]
  },
  {
    title: "UI/UX Design",
    description: "Transform your user experience with modern, intuitive design systems that captivate users and drive engagement across all devices.",
    priceRange: "₹15,000+",
    priceNote: "per project",
    icon: Palette,
    features: ["Design System", "Prototyping", "User Testing", "Responsive Design"]
  },
  {
    title: "Monthly Retainers",
    description: "Ongoing support and maintenance to keep your application running smoothly with regular updates, monitoring, and feature enhancements.",
    priceRange: "₹8,000/month",
    priceNote: "starting",
    icon: Clock,
    features: ["24/7 Support", "Regular Updates", "Performance Monitoring", "Priority Access"]
  }
];

export default AddOnsList;
