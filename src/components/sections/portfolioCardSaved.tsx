
// Portfolio card component
  const PortfolioCard = ({ item }: { item: PortfolioItem }) => (
    <motion.div
      className="group relative bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 h-full flex flex-col"
      whileHover={{ y: -8, scale: 1.02 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {/* Featured Badge */}
      {item.meta.featured && (
        <div className="absolute top-4 left-4 z-10">
          <div className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-full text-xs font-medium shadow-lg">
            <Star className="w-3 h-3" />
            Featured
          </div>
        </div>
      )}

      {/* Image */}
      <div className="relative aspect-video overflow-hidden">
        <div className="w-full h-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
          <div className="text-primary/50 text-4xl font-bold">
            {(() => {
              const titleParts = item.cardTitle.split(': ');
              const mainTitle = titleParts[0];
              // Take first letter of each word, max 3 letters
              const shortForm = mainTitle.split(' ').slice(0, 3).map(word => word[0]).join('');
              return shortForm;
            })()}
          </div>
        </div>
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div>
            {(() => {
              const titleParts = item.cardTitle.split(': ');
              const mainTitle = titleParts[0];
              const subTitle = titleParts[1] || item.story.problem;
              
              return (
                <>
                  <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {mainTitle}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                    {subTitle}
                  </p>
                </>
              );
            })()}
          </div>
        </div>

        {/* Client Info */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs text-muted-foreground">
            {item.client.name}
            {item.client.location && ` • ${item.client.location}`}
          </span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {item.meta.tags && item.meta.tags.slice(0, 3).map((tag: string, index: number) => (
            <span
              key={index}
              className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md font-medium"
            >
              {tag}
            </span>
          ))}
          {item.meta.tags && item.meta.tags.length > 3 && (
            <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md font-medium">
              +{item.meta.tags.length - 3}
            </span>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 text-xs text-muted-foreground mb-4">
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3 text-primary" />
            <span className="font-medium">{item.meta.persona}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-3 h-3 text-primary" />
            <span className="font-medium">{item.meta.serviceTrack}</span>
          </div>
          <div className="flex items-center gap-1">
            <TrendingUp className="w-3 h-3 text-primary" />
            <span className="font-medium">{item.outcome.headlineMetric.value}</span>
          </div>
        </div>

        {/* Technologies */}
        <div className="flex flex-wrap gap-1 mb-6">
          {item.techStack.frontend && item.techStack.frontend.slice(0, 3).map((tech, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md font-medium"
            >
              {tech}
            </span>
          ))}
          {item.techStack.backend && item.techStack.backend.slice(0, 1).map((tech, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-md font-medium"
            >
              {tech}
            </span>
          ))}
          {((item.techStack.frontend && item.techStack.frontend.length > 3) || 
            (item.techStack.backend && item.techStack.backend.length > 1)) && (
            <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md font-medium">
              +{((item.techStack.frontend?.length || 0) + (item.techStack.backend?.length || 0)) - 4}
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 mt-auto">
          <Link href={`/portfolios/${item.id}`}>
            <Button variant="secondary" className="text-sm px-3 py-2 flex items-center gap-2">
              <Eye className="w-4 h-4" />
              View Details
            </Button>
          </Link>
          {item.meta.links.live && (
            <Link href={item.meta.links.live} target="_blank">
              <Button variant="gradient-outline" className="text-sm px-3 py-2 flex items-center gap-2">
                <ExternalLink className="w-4 h-4" />
                Live Demo
              </Button>
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );