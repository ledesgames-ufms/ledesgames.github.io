import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Gamepad2 } from 'lucide-react';
import { games } from '@/data/Games';

const HeroSection = () => {
  const featuredGame = games.find(game => game.isFeatured) || games[0];

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-preto-espacial">
      
      <style>{`
        @keyframes scroll-scanlines {
          0% { background-position: 0 0; }
          100% { background-position: 0 40px; } 
        }

        .crt-scanlines {
          background: linear-gradient(
            rgba(18, 16, 16, 0) 50%, 
            rgba(0, 0, 0, 0.3) 50%
          );
          background-size: 100% 4px;
          animation: scroll-scanlines 12s linear infinite;
          pointer-events: none;
        }
        
        .crt-tube-vignette {
          background: radial-gradient(
            circle at center,
            transparent 50%,
            rgba(7, 7, 11, 0.6) 85%,
            rgba(0, 0, 0, 0.95) 100%
          );
          pointer-events: none;
        }
      `}</style>

      <div className="absolute inset-0 z-0">
        <img 
          src={featuredGame.image}
          alt={featuredGame.title}
          className="w-full h-full object-cover opacity-80"
        />
      </div>

      <div className="absolute inset-0 z-0 mix-blend-multiply bg-preto-espacial/50" />
      
      <div className="absolute inset-0 z-0 crt-tube-vignette" />

      <div className="absolute inset-0 z-0 crt-scanlines" />


      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 container mx-auto px-4 flex flex-col items-center text-center mt-16"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-azul-petroleo/80 backdrop-blur-sm border border-verde-agua/30 mb-6 rounded-md shadow-[0_0_15px_rgba(41,255,198,0.15)]">
          <div className="w-2 h-2 bg-verde-agua rounded-full animate-pulse shadow-[0_0_5px_rgba(41,255,198,0.8)]" />
          <span className="font-pixel text-base font-bold text-verde-agua tracking-widest uppercase mt-1">
            EM DESTAQUE
          </span>
        </div>

        <h1 className="font-syne text-5xl md:text-8xl font-extrabold mb-6 text-branco-soft tracking-tight drop-shadow-2xl">
          {featuredGame.title}
        </h1>

        <div className="flex flex-wrap justify-center items-center gap-3 mb-8">
          {featuredGame.tags.map(tag => (
            <span key={tag} className="font-pixel px-4 py-1.5 bg-roxo-atmosferico/30 backdrop-blur-md border border-magenta-holografico/40 text-magenta-holografico text-sm font-bold rounded-md mt-1">
              {tag}
            </span>
          ))}
        </div>

        <p className="font-sans text-xl md:text-2xl text-cinza-futurista mb-10 max-w-2xl font-medium drop-shadow-md">
          {featuredGame.description}
        </p>
        
        <Button size="lg" className="font-sans font-bold gap-3 text-lg px-10 py-6 bg-magenta-holografico text-branco-soft hover:bg-magenta-holografico/80 transition-colors shadow-[0_0_20px_rgba(217,70,239,0.4)]" asChild>
          <a href={featuredGame.playUrl || "#"} target="_blank" rel="noopener noreferrer">
            <Gamepad2 className="w-6 h-6" />
            Jogar Agora
          </a>
        </Button>
      </motion.div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-2 border-cinza-futurista/40 rounded-full flex items-start justify-center p-2 backdrop-blur-sm"
        >
          <div className="w-1 h-3 bg-verde-agua/70 rounded-full" />
        </motion.div>
      </div>
      
    </section>
  );
};

export default HeroSection;