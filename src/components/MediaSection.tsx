import { motion } from 'framer-motion';
import { Mail, MapPin, Instagram, Youtube, ArrowUpRight, Radio } from 'lucide-react';

const mediaCards = [
  {
    id: '01',
    label: 'LOCALIZAÇÃO',
    icon: MapPin,
    title: 'Visite Nosso Lab',
    desc: 'FACOM // UFMS\nCidade Universitária\nCampo Grande - MS',
    actionText: 'Ver no Campus',
    link: 'https://facom.ufms.br',
    isExternal: true,
  },
  {
    id: '02',
    label: 'COMUNICAÇÃO',
    icon: Mail,
    title: 'Contato Direto',
    desc: 'Fale com nossos pesquisadores e coordenadores de projetos.',
    actionText: 'ledesgames.facom@ufms.br',
    link: 'mailto:ledesgames.facom@ufms.br',
    isExternal: false,
  },
  {
    id: '03',
    label: 'SOCIAL // UPDATES',
    icon: Instagram,
    title: 'Instagram do Lab',
    desc: 'Acompanhe novidades, bastidores e lançamentos em tempo real.',
    actionText: '@ledesfacom',
    link: 'https://www.instagram.com/ledesfacom/',
    isExternal: true,
  },
  {
    id: '04',
    label: 'VÍDEO // TRAILERS',
    icon: Youtube,
    title: 'Canal Oficial',
    desc: 'Assista aos trailers oficiais, gameplays e palestras do estúdio.',
    actionText: 'youtube.com/@ledesgames',
    link: 'https://www.youtube.com/@ledesgames',
    isExternal: true,
  }
];

const MediaSection = () => {
  return (
    <section id="media" className="relative py-28 bg-[#0051ff] text-white overflow-hidden">
      
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-white/80 mb-2">
            <Radio className="w-3.5 h-3.5 text-white animate-pulse" />
            <span>CANAIS & CONEXÕES // LEDES GAMES</span>
          </div>

          <h2 className="font-display text-4xl sm:text-6xl uppercase tracking-wider text-white leading-none">
            Conecte-se com o Estúdio
          </h2>
          <p className="text-white/90 font-sans text-base mt-3 leading-relaxed">
            Encontre-nos no campus da FACOM/UFMS, envie propostas de pesquisa ou acompanhe nossas produções nas redes.
          </p>
        </motion.div>

        {/* 4 Connection Cards */}
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
                <div className="flex items-center justify-between font-mono text-[9px] text-[#9999A5] mb-5">
                  <span className="text-[#0051ff] font-bold">[{item.id}]</span>
                  <span>{item.label}</span>
                </div>

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