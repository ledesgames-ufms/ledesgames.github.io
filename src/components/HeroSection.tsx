import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Gamepad2 } from 'lucide-react';
import { games } from '@/data/Games';

const HeroSection = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const featuredGame = games.find(game => game.isFeatured) || games[0];
  const gameLink = "https://itch.io/profile/ledesgames";

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <motion.div
        style={{ y }}
        className="absolute inset-0 z-0"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${featuredGame.image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background" />
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="relative z-10 container mx-auto px-4 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-card border border-primary/30 mb-6 rounded-full">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span className="text-sm font-medium text-muted-foreground">EM DESTAQUE</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            {featuredGame.title}
          </h1>

          <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
            {featuredGame.tags.map(tag => (
              <span key={tag} className="px-3 py-1 bg-primary/10 border border-primary/30 text-primary text-sm font-medium rounded-md">
                {tag}
              </span>
            ))}
          </div>

          <p className="text-xl md:text-2xl text-foreground/80 mb-8 max-w-2xl mx-auto">
            {featuredGame.description}
          </p>
          
          <Button size="lg" className="gap-3 text-lg px-8 shadow-lg shadow-primary/20" asChild>
            <a href={featuredGame.playUrl || "#"} target="_blank" rel="noopener noreferrer">
              <Gamepad2 className="w-6 h-6" />
              Jogar Agora
            </a>
          </Button>
        </motion.div>
      </motion.div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-2 border-foreground/30 rounded-full flex items-start justify-center p-2"
        >
          <div className="w-1 h-3 bg-foreground/30 rounded-full" />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;