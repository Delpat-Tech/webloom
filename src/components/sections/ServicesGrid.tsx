interface ServicesGridProps {
  headline?: string;
  description?: string;
}

export default function ServicesGrid({ headline, description }: ServicesGridProps) {
  return (
    <section>
      {headline && <h2>{headline}</h2>}
      {description && <p>{description}</p>}
      Services Grid Section
    </section>
  );
} 