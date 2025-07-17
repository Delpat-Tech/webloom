import React, { useState } from 'react';
import Button from '@/components/ui/Button';

type ServiceCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  tags?: string[];
  price: string;
  featured?: boolean;
  onSelect?: () => void;
  className?: string;
};

export default function ServiceCard({
  icon,
  title,
  description,
  tags = [],
  price,
  featured = false,
  onSelect = () => {},
  className = ""
}: ServiceCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      
      <div
        className={`relative group cursor-pointer overflow-hidden transition-all duration-400 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] ${className} ${isHovered ? 'scale-[1.02] -translate-y-3' : ''}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onSelect}
      >
        {/* Main Card Container */}
        <div className={`
          relative p-8 rounded-xl border-2 transition-all duration-500
          font-heading bg-card text-foreground border-border
          ${featured
            ? 'border-primary bg-gradient-to-br from-primary/10 to-accent/10'
            : 'hover:border-primary'
          }
          ${isHovered ? 'shadow-2xl shadow-primary/25' : 'shadow-lg shadow-black/25'}
        `}>
          
          
          {/* Featured Badge */}
          {featured && (
            <div className="absolute -top-3 -right-3 bg-gradient-to-r from-primary to-accent text-primary-foreground text-xs font-bold px-3 py-1 rounded-full shadow-lg">
              POPULAR
            </div>
          )}
          
          {/* Icon Section */}
          <div className="flex items-center justify-center mb-6">
            <div className={`
              p-4 rounded-xl transition-all duration-300
              ${isHovered
                ? 'bg-gradient-to-br from-primary to-accent scale-110 rotate-3'
                : 'bg-gradient-to-br from-primary/30 to-accent/30'
              }
            `}>
              <div className="text-4xl text-primary-foreground">
                {icon}
              </div>
            </div>
          </div>
          
          {/* Content Section */}
          <div className="text-center mb-6">
            <h3 className={`
              text-2xl font-bold mb-3 transition-all duration-300 font-heading
              ${isHovered
                ? 'text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent'
                : 'text-foreground'
              }
            `}>
              {title}
            </h3>
            
            <p className="text-muted-foreground leading-relaxed mb-4 group-hover:text-foreground transition-colors">
              {description}
            </p>
            
            {/* Tags */}
            <div className="flex flex-wrap gap-2 justify-center mb-4">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className={`
                    px-3 py-1 rounded-full text-xs font-medium transition-all duration-300
                    ${isHovered
                      ? 'bg-gradient-to-r from-primary/30 to-accent/30 text-primary-foreground border border-primary/50'
                      : 'bg-muted text-muted-foreground border border-border'
                    }
                  `}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          
          {/* Price Section */}
          <div className="text-center mb-6">
            <div className={`
              text-3xl font-black transition-all duration-300 font-heading
              ${featured
                ? 'text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent'
                : isHovered
                  ? 'text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent'
                  : 'text-foreground'
              }
            `}>
              {price}
            </div>
            <p className="text-muted-foreground text-sm mt-1">Starting from</p>
          </div>
          
          {/* CTA Button */}
          <Button
            className={`w-full py-3 px-6 rounded-xl font-bold transition-all duration-300 relative overflow-hidden
              ${featured
                ? 'bg-gradient-to-r from-primary to-accent text-primary-foreground hover:from-primary/80 hover:to-accent/80'
                : 'bg-gradient-to-r from-primary to-accent text-primary-foreground hover:from-primary/80 hover:to-accent/80'
              }
              ${isHovered ? 'scale-105 shadow-lg' : ''}
            `}
          >
            <span className="relative z-10">
              {featured ? 'Get Started Now' : 'Learn More'}
            </span>
            {isHovered && (
              <div className="absolute inset-0 bg-white/20" />
            )}
          </Button>
          
          {/* Decorative Elements */}
          <div className="absolute top-4 right-4 w-8 h-8 border-2 border-border rounded-full opacity-20 group-hover:opacity-40 transition-opacity" />
          <div className="absolute bottom-4 left-4 w-6 h-6 bg-gradient-to-br from-primary to-accent rounded-full opacity-20 group-hover:opacity-40 transition-opacity" />
        </div>
      </div>
    </>
  );
}

// Example usage with sample data
export function ServiceCardExamples() {
  const services = [
    {
      icon: '🚀',
      title: 'MVP Engine',
      description: 'Transform your idea into a market-ready product with our rapid development approach. Perfect for startups needing to validate quickly.',
      tags: ['React', 'Node.js', 'AI Integration', 'Mobile-First'],
      price: '$2,499',
      featured: true
    },
    {
      icon: '⚙️',
      title: 'Internal OS',
      description: 'Streamline your operations with custom internal tools and workflows. Boost productivity and eliminate manual processes.',
      tags: ['Automation', 'Dashboard', 'CRM', 'Analytics'],
      price: '$1,899',
      featured: false
    },
    {
      icon: '🤖',
      title: 'Automation MVP',
      description: 'Eliminate manual tasks with intelligent automation solutions. Save time and reduce errors with smart workflows.',
      tags: ['AI/ML', 'Workflow', 'API Integration', 'Scalable'],
      price: '$1,299',
      featured: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-white text-center mb-12">
          Choose Your Service
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              tags={service.tags}
              price={service.price}
              featured={service.featured}
              onSelect={() => console.log(`Selected: ${service.title}`)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}