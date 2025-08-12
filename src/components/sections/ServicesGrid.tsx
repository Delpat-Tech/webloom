import React, { useEffect, useRef } from 'react';
import Image from "next/image";
import TiltedCard from '@/components/ui/Card';

const ServicesGrid = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = React.useState(false);

  const services = [
    {
      title: "MVP Engine",
      description: "Launch your MVP quickly with our full-stack solution engine. Built for speed and iteration.",
      delay: 0.1,
      iconBg: "from-primary/80 to-accent/80",
      icon: "/window.svg"
    },
    {
      title: "Internal OS",
      description: "Custom internal tools and dashboards that streamline your startup's day-to-day operations.",
      delay: 0.2,
      iconBg: "from-secondary/80 to-primary/80",
      icon: "/file.svg"
    },
    {
      title: "Automation MVP",
      description: "Ship faster with pre-built automation layers for business-critical workflows and triggers.",
      delay: 0.3,
      iconBg: "from-accent/80 to-secondary/80",
      icon: "/globe.svg"
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="py-24 px-4"
    >
      <div className="max-w-6xl mx-auto w-full">
        {/* Section Header */}
        <div className="text-center mb-16 relative z-10">
          <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6">
            <span className="text-foreground">Our</span>{" "}
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              MVP Solutions
            </span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto px-2">
            Accelerate your startup journey with our comprehensive suite of MVP development tools and services
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
          {services.map((service) => (
            <div
              key={service.title}
              className={`transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} group`}
              style={{ transitionDelay: isVisible ? `${service.delay}s` : '0s' }}
            >
              <div className="relative rounded-2xl bg-gradient-to-br from-card/80 to-background/60 border border-border shadow-2xl p-1 hover:scale-[1.03] hover:shadow-[0_8px_32px_rgba(16,185,129,0.15)] transition-transform duration-300">
                <TiltedCard
                  imageSrc={''} // Remove background image
                  altText={service.title}
                  captionText={service.title}
                  overlayContent={
                    <div className="flex flex-col items-center justify-center h-full p-6">
                      {/* Icon area */}
                      <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${service.iconBg} flex items-center justify-center mb-6 shadow-lg border border-border/20 backdrop-blur-sm`}>
            <Image src={service.icon} alt="" width={32} height={32} className="w-8 h-8 text-white" />
                      </div>
                      {/* Title */}
                      <h3 className="text-xl font-heading font-bold text-primary mb-2 text-center drop-shadow-sm">
                        {service.title}
                      </h3>
                      {/* Description */}
                      <p className="text-base text-muted-foreground leading-relaxed text-center mb-6 font-sans">
                        {service.description}
                      </p>
                      {/* Bottom Accent */}
                      <div className="flex items-center text-xs text-accent font-semibold gap-2">
                        <span className="w-2 h-2 bg-accent rounded-full inline-block" />
                        Ready to deploy
                      </div>
                    </div>
                  }
                  displayOverlayContent={true}
                  containerHeight="320px"
                  imageHeight="320px"
                  showMobileWarning={false}
                  showTooltip={true}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;