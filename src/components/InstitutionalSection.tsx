import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Lightbulb, Users, Cpu, ArrowUpRight, X } from 'lucide-react';
import team1 from '@/assets/team-1.jpg';
import team2 from '@/assets/team-2.jpg';
import team3 from '@/assets/team-3.jpg';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';

interface TeamPhoto {
  id: string;
  src: string;
  title: string;
  date: string;
  description: string;
}

const teamPhotos: TeamPhoto[] = [
  {
    id: 'photo-1',
    src: team1,
    title: 'Mini Curso de Desenvolvimento de Jogos 2D',
    date: 'Agosto de 2025',
    description: 'Aplicação prática do mini curso de desenvolvimento de jogos 2D ministrado por membros do laboratório para a comunidade acadêmica da UFMS.',
  },
  {
    id: 'photo-2',
    src: team2,
    title: 'Apresentação no Simpósio SBGames',
    date: 'Maio de 2025',
    description: 'Participação da equipe no simpósio SBGames apresentando os artigos científicos e pesquisas desenvolvidas no laboratório.',
  },
  {
    id: 'photo-3',
    src: team3,
    title: 'Equipe de Extensão e Desenvolvimento',
    date: 'Agosto de 2025',
    description: 'Integrantes do projeto LEDES Games reunidos no campus da FACOM/UFMS durante oficina de prototipagem e desenvolvimento.',
  }
];

const pillars = [
  {
    id: '01',
    icon: Lightbulb,
    title: 'Pesquisa & Desenvolvimento',
    description: 'Metodologias inovadoras em engenharia de software e game design aplicadas à criação de experiências digitais com fundamentação científica.',
  },
  {
    id: '02',
    icon: Users,
    title: 'Equipe Multidisciplinar',
    description: 'Integração de alunos e pesquisadores de programação, arte 2D/3D, modelagem, roteiro, sound design e acessibilidade.',
  },
  {
    id: '03',
    icon: Cpu,
    title: 'Engenharia & Ferramentas',
    description: 'Utilização de engines modernas (Unity, Godot, Unreal), pipelines ágeis e boas práticas para entregar jogos funcionais e memoráveis.',
  },
];

const InstitutionalSection = () => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [selectedPhoto, setSelectedPhoto] = useState<TeamPhoto | null>(null);

  const nextPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev + 1) % teamPhotos.length);
  };

  const prevPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev - 1 + teamPhotos.length) % teamPhotos.length);
  };

  const currentPhoto = teamPhotos[currentPhotoIndex];

  return (
    <section id="about" className="relative bg-[#08080A] text-white border-b border-white/10 overflow-hidden">
      
      {/* ========================================================================= */}
      {/* TOPO: BANNER                                                              */}
      {/* ========================================================================= */}
      <div className="relative w-full h-[380px] sm:h-[480px] lg:h-[560px] overflow-hidden bg-black">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPhoto.id}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0"
          >
            <img
              src={currentPhoto.src}
              alt={currentPhoto.title}
              className="w-full h-full object-cover filter brightness-75 contrast-105"
            />
          </motion.div>
        </AnimatePresence>

        {/* Dynamic Vignette and Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#08080A] via-[#08080A]/40 to-black/60 pointer-events-none" />

        {/* Top Header Information Overlay */}
        <div className="container mx-auto px-4 lg:px-8 relative z-10 h-full flex flex-col justify-between py-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-white/80">
              <span className="w-1.5 h-1.5 bg-[#0051ff]" />
              <span>INSTITUCIONAL // FACOM UFMS</span>
            </div>

            <span className="px-3 py-1 bg-black/70 border border-white/20 font-mono text-[10px] text-white/90 uppercase">
              FOTO 0{currentPhotoIndex + 1} DE 0{teamPhotos.length}
            </span>
          </div>

          {/* Bottom Caption Overlay */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="max-w-xl">
              <span className="font-mono text-xs text-[#0051ff] font-bold block mb-1">
                {currentPhoto.date}
              </span>
              <h3 className="font-display text-3xl sm:text-5xl text-white uppercase tracking-wide leading-tight">
                {currentPhoto.title}
              </h3>
              <p className="text-white/80 font-sans text-xs sm:text-sm mt-1 line-clamp-2">
                {currentPhoto.description}
              </p>
            </div>

            {/* Carousel Controls */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={prevPhoto}
                className="p-3 bg-black/70 border border-white/20 hover:border-[#0051ff] text-white transition-colors"
                aria-label="Foto anterior"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                onClick={nextPhoto}
                className="p-3 bg-black/70 border border-white/20 hover:border-[#0051ff] text-white transition-colors"
                aria-label="Próxima foto"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setSelectedPhoto(currentPhoto)}
                className="px-4 py-3 bg-[#0051ff] text-white font-cyber font-bold text-xs uppercase tracking-wider hover:bg-white hover:text-black transition-colors flex items-center gap-1.5"
              >
                <span>AMPLIAR</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* TEXTO INSTITUCIONAL E PILARES                                             */}
      {/* ========================================================================= */}
      <div className="container mx-auto px-4 lg:px-8 py-20 relative z-10 max-w-7xl">
        
        {/* Narrative Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-14 mb-20 items-start">
          <div className="lg:col-span-5 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/[0.03] border border-white/10 font-mono text-[10px] text-[#9999A5] uppercase tracking-wider">
              <span>MANIFESTO DO ESTÚDIO</span>
            </div>

            <h2 className="font-display text-4xl sm:text-6xl text-white uppercase tracking-wider leading-none">
              Onde Pesquisa Científica Gera <span className="text-[#0051ff]">Jogos Reais</span>
            </h2>
          </div>

          <div className="lg:col-span-7 space-y-4 text-[#9999A5] font-sans text-base sm:text-lg leading-relaxed">
            <p>
              O <strong className="text-white">LEDES Games</strong> é o laboratório e estúdio de desenvolvimento de jogos digitais sediado na Faculdade de Computação (FACOM) da Universidade Federal de Mato Grosso do Sul (UFMS).
            </p>
            <p>
              Trabalhamos na convergência entre o entretenimento eletrônico de alta qualidade e o rigor da pesquisa científica, desenvolvendo desde jogos educacionais até entretenimento e experiências experimentais.
            </p>
            <p>
              Nossa missão é qualificar novos talentos nas áreas de engenharia de software, arte e design, gerando propriedade intelectual e impacto positivo na sociedade.
            </p>
          </div>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10 border-t border-white/10">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative bg-[#0E0E12] border border-white/15 hover:border-[#0051ff] p-7 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 bg-white/[0.03] border border-white/10 group-hover:border-[#0051ff] group-hover:bg-[#0051ff]/10 flex items-center justify-center transition-colors">
                      <Icon className="w-6 h-6 text-[#0051ff]" />
                    </div>
                    <span className="font-mono text-xs font-bold text-white/30 group-hover:text-[#0051ff] transition-colors">
                      PILAR_{pillar.id}
                    </span>
                  </div>

                  <h4 className="font-display text-2xl uppercase tracking-wider text-white mb-3 group-hover:text-[#0051ff] transition-colors">
                    {pillar.title}
                  </h4>

                  <p className="font-sans text-sm text-[#9999A5] leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="pt-4 mt-6 border-t border-white/5 font-mono text-[9px] uppercase tracking-wider text-white/40">
                  LEDES // FACOM.UFMS
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>

      {/* Photo Zoom Modal */}
      <Dialog open={Boolean(selectedPhoto)} onOpenChange={(open) => !open && setSelectedPhoto(null)}>
        <DialogContent className="max-w-4xl bg-[#0E0E14] border border-white/20 p-0 overflow-hidden text-white [&>button]:hidden">
          <DialogTitle className="sr-only">{selectedPhoto?.title}</DialogTitle>
          {selectedPhoto && (
            <div className="flex flex-col overflow-hidden">
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#08080A]">
                <div className="flex items-center gap-2 font-mono text-xs text-[#9999A5]">
                  <span className="w-2 h-2 bg-[#0051ff]" />
                  <span className="text-white font-bold">{selectedPhoto.title}</span>
                  <span>({selectedPhoto.date})</span>
                </div>
                <button
                  onClick={() => setSelectedPhoto(null)}
                  className="p-1 border border-white/10 hover:border-white text-[#9999A5] hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="relative bg-black flex items-center justify-center p-4">
                <img
                  src={selectedPhoto.src}
                  alt={selectedPhoto.title}
                  className="max-h-[65vh] w-auto object-contain"
                />
              </div>

              <div className="p-6 bg-[#0E0E14] border-t border-white/10">
                <p className="font-sans text-sm text-[#D4D4D8] leading-relaxed">
                  {selectedPhoto.description}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

    </section>
  );
};

export default InstitutionalSection;