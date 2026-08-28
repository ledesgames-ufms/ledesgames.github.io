import { type CSSProperties } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Instagram, Youtube, Radio, ArrowUpRight } from 'lucide-react';
import { useScrollColor } from '@/context/ScrollColorContext';

const MediaSection = () => {
  const { theme } = useScrollColor();
  const sectionStyle = { "--accent": theme.accent } as CSSProperties;

  return (
    <section id="media" style={sectionStyle} className="relative py-20 lg:py-24 bg-[#07070B] transition-colors duration-1000 overflow-hidden">
      
      <div className="absolute top-0 left-0 w-full h-[1px] opacity-30 transition-colors duration-1000" style={{ background: `linear-gradient(to right, transparent, var(--accent), transparent)` }} />

      <div 
        className="absolute inset-0 z-0 pointer-events-none transition-colors duration-1000 opacity-[0.15]"
        style={{
          backgroundImage: `linear-gradient(to right, var(--accent) 1px, transparent 1px), linear-gradient(to bottom, var(--accent) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
          maskImage: 'linear-gradient(to bottom, transparent, black 50%, black 90%, transparent)'
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#07070B_80%)] z-0 pointer-events-none" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center mb-12 md:mb-16"
        >
          <div className="mb-3 flex items-center justify-center gap-2 font-cyber text-[10px] uppercase tracking-widest text-white/40">
            <Radio className="h-3.5 w-3.5 animate-pulse transition-colors duration-1000" style={{ color: 'var(--accent)' }} />
            CANAIS DE COMUNICAÇÃO
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-syne font-extrabold text-[#F4F7FF] uppercase tracking-wide mb-4">
            Conecte-se <span className="transition-colors duration-1000" style={{ color: 'var(--accent)' }}>Conosco</span>
          </h2>
          <p className="text-sm sm:text-base font-sans text-[#94A3B8] max-w-2xl mx-auto leading-relaxed">
            Encontre o laboratório no campus da UFMS ou acompanhe o desenvolvimento dos nossos projetos nas redes sociais.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-auto">
          
          {/* Endereço */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="group flex flex-col items-center text-center p-6 md:p-8 bg-[#0A0D18]/60 backdrop-blur-md rounded border transition-all duration-500 hover:-translate-y-1"
            style={{ 
              borderColor: 'color-mix(in srgb, var(--accent) 15%, transparent)',
            }}
          >
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-full border-2 mb-5 overflow-hidden flex items-center justify-center transition-all duration-500 group-hover:bg-[#07070B]" style={{ borderColor: 'color-mix(in srgb, var(--accent) 30%, transparent)' }}>
              <MapPin className="w-5 h-5 md:w-6 md:h-6 transition-all duration-500 group-hover:scale-110" style={{ color: 'var(--accent)' }} />
            </div>
            <h3 className="font-syne font-bold text-[#F4F7FF] uppercase tracking-wide mb-3 text-sm md:text-base">Visite-nos</h3>
            <p className="font-sans text-[11px] md:text-xs text-[#94A3B8] leading-relaxed">
              FACOM - UFMS<br />
              Cidade Universitária<br />
              Campo Grande - MS
            </p>
          </motion.div>

          {/* Email */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="group flex flex-col items-center text-center p-6 md:p-8 bg-[#0A0D18]/60 backdrop-blur-md rounded border transition-all duration-500 hover:-translate-y-1 hover:bg-[color-mix(in_srgb,var(--accent)_5%,transparent)]"
            style={{ 
              borderColor: 'color-mix(in srgb, var(--accent) 15%, transparent)',
            }}
          >
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-full border-2 mb-5 overflow-hidden flex items-center justify-center transition-all duration-500 group-hover:bg-[#07070B] group-hover:shadow-[0_0_15px_color-mix(in_srgb,var(--accent)_40%,transparent)]" style={{ borderColor: 'color-mix(in srgb, var(--accent) 30%, transparent)' }}>
              <Mail className="w-5 h-5 md:w-6 md:h-6 transition-all duration-500 group-hover:scale-110" style={{ color: 'var(--accent)' }} />
            </div>
            <h3 className="font-syne font-bold text-[#F4F7FF] uppercase tracking-wide mb-3 text-sm md:text-base">Email Direto</h3>
            <p className="font-sans text-[11px] md:text-xs text-[#94A3B8] mb-4">
              Fale com nossa equipe
            </p>
            <a 
              href="mailto:ledesgames.facom@ufms.br" 
              className="font-cyber text-[9px] md:text-[10px] uppercase tracking-widest transition-colors duration-500 hover:text-white"
              style={{ color: 'var(--accent)' }}
            >
              ledesgames.facom@ufms.br
            </a>
          </motion.div>

          {/* Instagram */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="group flex flex-col items-center text-center p-6 md:p-8 bg-[#0A0D18]/60 backdrop-blur-md rounded border transition-all duration-500 hover:-translate-y-1 hover:bg-[color-mix(in_srgb,var(--accent)_5%,transparent)]"
            style={{ 
              borderColor: 'color-mix(in srgb, var(--accent) 15%, transparent)',
            }}
          >
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-full border-2 mb-5 overflow-hidden flex items-center justify-center transition-all duration-500 group-hover:bg-[#07070B] group-hover:shadow-[0_0_15px_color-mix(in_srgb,var(--accent)_40%,transparent)]" style={{ borderColor: 'color-mix(in srgb, var(--accent) 30%, transparent)' }}>
              <Instagram className="w-5 h-5 md:w-6 md:h-6 transition-all duration-500 group-hover:scale-110" style={{ color: 'var(--accent)' }} />
            </div>
            <h3 className="font-syne font-bold text-[#F4F7FF] uppercase tracking-wide mb-3 text-sm md:text-base">Instagram</h3>
            <p className="font-sans text-[11px] md:text-xs text-[#94A3B8] mb-4">
              Acompanhe novidades e bastidores
            </p>
            <a 
              href="https://www.instagram.com/ledesfacom/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="font-cyber text-[10px] md:text-[11px] uppercase tracking-widest transition-colors duration-500 hover:text-white"
              style={{ color: 'var(--accent)' }}
            >
              @ledesfacom
            </a>
          </motion.div>

          {/* YouTube */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="group flex flex-col items-center text-center p-6 md:p-8 bg-[#0A0D18]/60 backdrop-blur-md rounded border transition-all duration-500 hover:-translate-y-1 hover:bg-[color-mix(in_srgb,var(--accent)_5%,transparent)]"
            style={{ 
              borderColor: 'color-mix(in srgb, var(--accent) 15%, transparent)',
            }}
          >
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-full border-2 mb-5 overflow-hidden flex items-center justify-center transition-all duration-500 group-hover:bg-[#07070B] group-hover:shadow-[0_0_15px_color-mix(in_srgb,var(--accent)_40%,transparent)]" style={{ borderColor: 'color-mix(in srgb, var(--accent) 30%, transparent)' }}>
              <Youtube className="w-5 h-5 md:w-6 md:h-6 transition-all duration-500 group-hover:scale-110" style={{ color: 'var(--accent)' }} />
            </div>
            <h3 className="font-syne font-bold text-[#F4F7FF] uppercase tracking-wide mb-3 text-sm md:text-base">YouTube</h3>
            <p className="font-sans text-[11px] md:text-xs text-[#94A3B8] mb-4">
              Assista nossos trailers e vídeos
            </p>
            <a 
              href="https://www.youtube.com/@ledesgames" 
              target="_blank" 
              rel="noopener noreferrer"
              className="font-cyber text-[10px] md:text-[11px] uppercase tracking-widest transition-colors duration-500 hover:text-white flex items-center gap-1"
              style={{ color: 'var(--accent)' }}
            >
              Inscreva-se <ArrowUpRight className="w-3 h-3" />
            </a>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default MediaSection;