import { type CSSProperties } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Instagram, Youtube, ArrowUpRight } from 'lucide-react';
import { THEME } from '@/constants/theme';

const mediaCards = [
  {
    id: '01',
    label: 'LOCALIZAÇÃO',
    icon: MapPin,
    title: 'Visite Nosso Lab',
    desc: 'FACOM - UFMS\nCidade Universitária\nCampo Grande - MS',
    actionText: 'Ver no Maps',
    link: 'https://maps.app.goo.gl/8boLtonvQZzuK2La9',
    isExternal: true,
  },
  {
    id: '02',
    label: 'COMUNICAÇÃO',
    icon: Mail,
    title: 'Contato Direto',
    desc: 'Fale com nossos pesquisadores.',
    actionText: 'ledesgames.facom@ufms.br',
    link: 'mailto:ledesgames.facom@ufms.br',
    isExternal: false,
  },
  {
    id: '03',
    label: 'SOCIAL',
    icon: Instagram,
    title: 'Instagram',
    desc: 'Acompanhe novidades, bastidores e lançamentos em tempo real.',
    actionText: '@ledesfacom',
    link: 'https://www.instagram.com/ledesfacom/',
    isExternal: true,
  },
  {
    id: '04',
    label: 'VÍDEO',
    icon: Youtube,
    title: 'YouTube',
    desc: 'Assista aos trailers oficiais, gameplays e palestras do estúdio.',
    actionText: 'youtube.com/@ledesgames',
    link: 'https://www.youtube.com/@ledesgames',
    isExternal: true,
  }
];

const MediaSection = () => {
  const theme = THEME.sections.media;
  const sectionStyle = {
    "--accent": theme.accent,
    backgroundColor: theme.bg,
  } as CSSProperties;

  return (
    <section id="media" style={sectionStyle} className="relative py-20 lg:py-24 transition-colors duration-1000 overflow-hidden">
      
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
          <h2 className="font-display text-4xl sm:text-6xl uppercase tracking-wider text-white leading-none">
            Conecte-se conosco
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mediaCards.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative bg-[#08080A] border border-white/20 hover:border-white p-6 transition-all duration-300 flex flex-col justify-between shadow-2xl"
              >
                {/* Top Corner Mark */}

                {/* Icon & Title */}
                <div className="space-y-4 mb-6">
                  <div className="w-12 h-12 bg-white/[0.04] border border-white/15 group-hover:border-[#0051ff] group-hover:bg-[#0051ff]/10 flex items-center justify-center transition-colors">
                    <Icon className="w-6 h-6 text-[#0051ff]" />
                  </div>

                  <h3 className="font-display text-2xl uppercase tracking-wider text-white group-hover:text-[#0051ff] transition-colors leading-tight">
                    {item.title}
                  </h3>

                  <p className="font-sans text-xs text-[#9999A5] leading-relaxed whitespace-pre-line">
                    {item.desc}
                  </p>
                </div>

                {/* Bottom Action Link */}
                <div className="pt-4 border-t border-white/10">
                  <a
                    href={item.link}
                    target={item.isExternal ? "_blank" : undefined}
                    rel={item.isExternal ? "noopener noreferrer" : undefined}
                    className="inline-flex items-center gap-1.5 font-mono text-xs text-white hover:text-[#0051ff] font-bold transition-colors"
                  >
                    <span>{item.actionText}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#0051ff] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default MediaSection;