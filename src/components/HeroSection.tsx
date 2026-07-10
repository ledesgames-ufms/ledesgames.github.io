import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Gamepad2 } from 'lucide-react';
import { games } from '@/data/Games';
import { FrameHudCiberpunk } from '@/components/ui/framehud-cyberpunk';
import { GridBarrel } from '@/components/ui/grid-barrel'; 

const HeroSection = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const featuredGame = games.find(game => game.isFeatured) || games[0];
  const gameLink = "https://itch.io/profile/ledesgames";

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-preto-espacial">
      
      <GridBarrel y={y} />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[800px] md:h-[800px] bg-verde-agua rounded-full blur-[200px] opacity-[0.05] pointer-events-none z-0" />

      <motion.div
        style={{ opacity }}
        className="relative z-10 container mx-auto px-4 py-20 flex flex-col lg:flex-row items-center gap-12 lg:gap-8"
      >
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full lg:w-1/2 text-left"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-azul-petroleo border border-verde-agua/30 mb-6 rounded-md shadow-[0_0_10px_rgba(41,255,198,0.1)]">
            <div className="w-2 h-2 bg-verde-agua rounded-full animate-pulse shadow-[0_0_5px_rgba(41,255,198,0.8)]" />
            <span className="text-sm font-bold text-verde-agua tracking-widest uppercase">
              EM DESTAQUE
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold mb-4 text-branco-soft tracking-tight">
            {featuredGame.title}
          </h1>

          <div className="flex flex-wrap items-center gap-3 mb-6">
            {featuredGame.tags.map(tag => (
              <span key={tag} className="px-3 py-1 bg-roxo-atmosferico/20 border border-magenta-holografico/30 text-magenta-holografico text-sm font-medium rounded-md">
                {tag}
              </span>
            ))}
          </div>

          <p className="text-xl md:text-2xl text-cinza-futurista mb-8 max-w-xl">
            {featuredGame.description}
          </p>
          
          <Button size="lg" className="gap-3 text-lg px-8 bg-magenta-holografico text-branco-soft hover:bg-magenta-holografico/80 transition-colors shadow-[0_0_15px_rgba(217,70,239,0.4)]" asChild>
            <a href={featuredGame.playUrl || "#"} target="_blank" rel="noopener noreferrer">
              <Gamepad2 className="w-6 h-6" />
              Jogar Agora
            </a>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full lg:w-1/2 relative group"
        >
          <FrameHudCiberpunk>
            <img 
              src={featuredGame.image} 
              alt={featuredGame.title}
              className="w-full h-auto aspect-video object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-branco-soft/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-10" />
          </FrameHudCiberpunk>
        </motion.div>
      </motion.div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-2 border-cinza-futurista/30 rounded-full flex items-start justify-center p-2"
        >
          <div className="w-1 h-3 bg-verde-agua/50 rounded-full" />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
