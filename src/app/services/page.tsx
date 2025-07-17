export default function Services() {
  return (
    <div>
      {/* Header + Overview Text */}
      <section className="mb-12">
        <h1 className="text-4xl font-bold mb-4">What We Do</h1>
        <p className="text-lg text-muted-foreground mb-6">Explore our productized service tracks designed to help you build, launch, and scale efficiently.</p>
      </section>

      {/* Service Cards */}
      <section className="mb-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>ServiceCard Placeholder – MVP Engine</div>
        <div>ServiceCard Placeholder – Internal OS</div>
        <div>ServiceCard Placeholder – Automation MVP</div>
      </section>

      {/* AddOnsList */}
      <section className="mb-12">
        <div>AddOnsList Placeholder – List of add-ons (AI integration, UI/UX, retainers)</div>
      </section>

      {/* CTASection */}
      <section>
        <div>CTASection Placeholder – “Let’s Discuss Your Software” (opens modal/contact form)</div>
      </section>
    </div>
  );
} 