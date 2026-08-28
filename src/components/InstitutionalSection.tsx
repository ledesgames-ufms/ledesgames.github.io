import { type CSSProperties, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb, Users, Wrench, Calendar, X, ImageIcon, Github, Linkedin, Mail } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { useScrollColor } from '@/context/ScrollColorContext';

import team1 from '@/assets/otimizadas/turma2026.webp';
import team2 from '@/assets/otimizadas/team-2.webp';
import team3 from '@/assets/otimizadas/team-3.webp';

const getFrameSvgUri = (color: string) => {
  const safeColor = color.replace(/[^#(),.%a-zA-Z0-9 ]/g, "");
  const svg = `<svg width="300" height="300" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M35 299.928V300H0V265H0.0722656L35 299.928ZM300 205V260H299.916L260 299.917V300H40V299.916L0.0830078 260H0V205L5 200V256.333L43.667 295H256.333L295 256.333V200L300 205ZM260 0.0839844L299.917 40H300V95L295 100V43.667L256.333 5H43.667L5 43.667V100L0 95V40H0.0839844L40 0.0830078V0H260V0.0839844ZM300 26V35H299.928L265 0.0722656V0H274L300 26ZM300 21.0508L278.949 0H300V21.0508Z" fill="${safeColor}"/></svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
};

interface TeamPhoto { id: string; src: string; title: string; date: string; description: string; }
const teamPhotos: TeamPhoto[] = [
  { id: 'photo-1', src: team1, title: 'Equipe Oficial LEDES Games', date: 'Maio de 2026', description: 'Nossa equipe multidisciplinar reunida. Desenvolvedores, artistas e pesquisadores da FACOM.' },
  { id: 'photo-2', src: team2, title: 'Evento da SBGames', date: 'Maio de 2025', description: 'Participação no evento da SBGames para apresentar o artigo publicado.' },
  { id: 'photo-3', src: team3, title: 'Mini Curso 2D', date: 'Agosto de 2025', description: 'Equipe do mini curso produzido pelo LEDES Games ensinando os fundamentos de desenvolvimento.' }
];

const pillars = [
  { id: 'pesquisa', icon: Lightbulb, title: 'Pesquisa', description: 'Metodologias aplicadas.' },
  { id: 'equipe', icon: Users, title: 'Equipe', description: 'Multidisciplinaridade.' },
  { id: 'criatividade', icon: Wrench, title: 'Criatividade', description: 'Ferramentas e design.' },
];

interface Member { id: string; name: string; role: string; github?: string; linkedin?: string; email?: string; }
const teamClasses = [
  {
    year: 'Turma 2026',
    members: [
      { id: 'm1', name: 'Nome do Membro', role: 'Desenvolvedor Unity', github: '#', linkedin: '#', email: 'email@ufms.br' },
      { id: 'm2', name: 'Nome do Membro', role: 'Game Designer', github: '#', linkedin: '#', email: 'email@ufms.br' },
      { id: 'm3', name: 'Nome do Membro', role: 'Pesquisador', github: '#', linkedin: '#', email: 'email@ufms.br' },
      { id: 'm4', name: 'Nome do Membro', role: 'Artista 3D', github: '#', linkedin: '#', email: 'email@ufms.br' },
    ]
  },
  {
    year: 'Turma 2025',
    members: [
      { id: 'm5', name: 'Ex-Membro', role: 'Tech Lead', github: '#', linkedin: '#' },
      { id: 'm6', name: 'Ex-Membro', role: 'Artista 2D', github: '#', linkedin: '#' },
    ]
  }
];

const toolsList = [
  { category: 'Game Engines', items: ['Unity 3D', 'Unreal Engine 5'] },
  { category: 'Arte & Modelagem', items: ['Blender', 'Aseprite', 'Photoshop'] },
  { category: 'Gerenciamento', items: ['GitHub', 'Jira', 'Notion'] },
];

// --- COMPONENTE PRINCIPAL ---
const InstitutionalSection = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<TeamPhoto | null>(null);
  
  // Estados dos Pilares
  const [activePillar, setActivePillar] = useState<string | null>(null); // Para Desktop (Side Slate)
  const [activeMobilePillar, setActiveMobilePillar] = useState<string | null>(null); // Para Mobile (Modal)
  
  const [activeClassTab, setActiveClassTab] = useState(teamClasses[0].year);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);

  const { theme } = useScrollColor();
  const sectionStyle = { "--accent": theme.accent } as CSSProperties;
  const backgroundPhoto = teamPhotos[0].src;

  useEffect(() => {
    if (selectedPhoto || selectedMember || activeMobilePillar) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedPhoto, selectedMember, activeMobilePillar]);

  const handlePillarClick = (pillarId: string) => {
    if (window.innerWidth < 1024) {
      setActiveMobilePillar(activeMobilePillar === pillarId ? null : pillarId);
      setActivePillar(null);
    } else {
      setActivePillar(activePillar === pillarId ? null : pillarId);
      setActiveMobilePillar(null);
    }
  };

  const renderPillarContent = (pillarId: string | null) => {
    switch (pillarId) {
      case 'pesquisa':
        return (
          <div className="space-y-4">
            <h3 className="font-syne text-lg sm:text-xl font-bold text-[#F4F7FF] uppercase mb-4">Investigação Tecnológica</h3>
            <p className="font-sans text-sm text-[#94A3B8] leading-relaxed">
              Buscamos estudar e analisar rigorosamente as metodologias criadas durante o processo de desenvolvimento de nossos jogos. 
            </p>
            <p className="font-sans text-sm text-[#94A3B8] leading-relaxed">
              Toda ferramenta, narrativa e código produzidos dentro do LEDES Games são potenciais objetos de estudo, culminando na criação de artigos científicos que contribuem para o avanço da academia e da indústria brasileira de jogos digitais.
            </p>
          </div>
        );
      case 'equipe': {
        const activeClass = teamClasses.find(c => c.year === activeClassTab);
        return (
          <div className="flex flex-col h-full">
            <div className="flex gap-4 mb-6 border-b border-white/10 pb-2">
              {teamClasses.map((tc) => (
                <button
                  key={tc.year}
                  onClick={() => setActiveClassTab(tc.year)}
                  className={`font-cyber text-[10px] sm:text-xs uppercase tracking-widest transition-colors pb-2 relative ${activeClassTab === tc.year ? 'text-[#F4F7FF]' : 'text-white/40 hover:text-white/70'}`}
                >
                  {tc.year}
                  {activeClassTab === tc.year && (
                    <motion.span layoutId="activeClass" className="absolute bottom-0 left-0 right-0 h-[2px]" style={{ backgroundColor: 'var(--accent)' }} />
                  )}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-3 overflow-y-auto cyber-scroll-y pr-2 pb-4">
              {activeClass?.members.map((member) => (
                <button
                  key={member.id}
                  onClick={() => setSelectedMember(member)}
                  className="flex flex-col items-center p-3 sm:p-4 rounded bg-[#0A0D18]/50 border border-white/5 hover:bg-white/5 transition-all text-center group"
                >
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-[#07070B] border-2 mb-3 overflow-hidden flex items-center justify-center" style={{ borderColor: 'color-mix(in srgb, var(--accent) 30%, transparent)' }}>
                    <Users className="w-6 h-6 sm:w-8 sm:h-8 opacity-20 group-hover:opacity-50 transition-opacity" style={{ color: 'var(--accent)' }} />
                  </div>
                  <span className="font-syne text-[10px] sm:text-[11px] font-bold text-[#F4F7FF] uppercase w-full truncate">{member.name}</span>
                  <span className="font-sans text-[9px] sm:text-[10px] text-[#94A3B8] w-full truncate mt-1">{member.role}</span>
                </button>
              ))}
            </div>
          </div>
        );
      }
      case 'criatividade':
        return (
          <div className="space-y-6">
            <h3 className="font-syne text-lg sm:text-xl font-bold text-[#F4F7FF] uppercase mb-2">Stack Tecnológico</h3>
            <p className="font-sans text-sm text-[#94A3B8] leading-relaxed mb-6">
              Para transformar pesquisa em experiências imersivas, utilizamos o padrão ouro da indústria na concepção dos nossos projetos.
            </p>
            <div className="space-y-5">
              {toolsList.map((toolGroup) => (
                <div key={toolGroup.category}>
                  <h4 className="font-cyber text-[9px] sm:text-[10px] text-white/50 uppercase tracking-widest mb-3 border-b border-white/10 pb-1">
                    {toolGroup.category}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {toolGroup.items.map((item) => (
                      <span key={item} className="font-sans text-[10px] sm:text-[11px] font-medium text-[#F4F7FF] bg-[#0A0D18] border px-2.5 py-1 rounded" style={{ borderColor: 'color-mix(in srgb, var(--accent) 20%, transparent)' }}>
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section id="about" style={sectionStyle} className="relative min-h-[100svh] flex flex-col justify-center bg-[#07070B] transition-colors duration-1000 overflow-hidden">
      
      <style>{`
        .cyber-scroll-y::-webkit-scrollbar { width: 4px; }
        .cyber-scroll-y::-webkit-scrollbar-track { background: transparent; }
        .cyber-scroll-y::-webkit-scrollbar-thumb { background: color-mix(in srgb, var(--accent) 40%, transparent); border-radius: 4px; }
        .cyber-scroll-y::-webkit-scrollbar-thumb:hover { background: var(--accent); }
      `}</style>

      {/* FUNDO FOTO DA EQUIPE */}
      <div className="absolute inset-0 z-0">
        <img
          src={backgroundPhoto}
          alt="LEDES Games Team"
          className="w-full h-full object-cover object-center opacity-40 transition-transform duration-[30s] ease-linear hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07070B] via-[#07070B]/80 to-[#07070B]/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#07070B]/90 via-[#07070B]/50 to-transparent" />
      </div>

      <div className="container relative z-10 mx-auto px-4 py-20 lg:py-24 lg:px-8">
        <div className="flex flex-col lg:flex-row items-start gap-6 lg:gap-8 justify-center">
          
          {/* O BLOCO PRINCIPAL */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-[650px] shrink-0 bg-[#0A0D18]/85 backdrop-blur-md transition-colors duration-1000 shadow-2xl z-20"
            style={{
              borderStyle: "solid",
              borderWidth: "32px",
              borderImageSource: getFrameSvgUri(theme.accent),
              borderImageSlice: "38 fill",
            }}
          >
            <div className="flex flex-col -m-[10px]">
              <div className="p-6 md:p-10 pb-0">
                <h2 className="font-syne font-extrabold uppercase tracking-tight mb-6 leading-[0.9]">
                  <span className="block text-4xl sm:text-5xl md:text-6xl text-[#F4F7FF]">QUEM</span>
                  <span className="block text-4xl sm:text-5xl md:text-6xl transition-colors duration-1000 drop-shadow-md" style={{ color: 'var(--accent)' }}>SOMOS</span>
                </h2>
                <div className="space-y-4 text-sm md:text-[15px] font-sans text-[#94A3B8] leading-relaxed max-w-xl">
                  <p>O laboratório de desenvolvimento de jogos digitais da Faculdade de Computação (FACOM) da Universidade Federal de Mato Grosso do Sul (UFMS).</p>
                  <p>Focamos na criação de experiências interativas que combinam entretenimento, educação e pesquisa acadêmica. Nossos projetos exploram desde games educacionais até experiências artísticas experimentais.</p>
                </div>
              </div>

              {/* Pilares Interativos */}
              <div className="px-6 md:px-10 mt-8 pt-8 border-t" style={{ borderColor: 'color-mix(in srgb, var(--accent) 15%, transparent)' }}>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {pillars.map((pillar) => {
                    const Icon = pillar.icon;
                    const isActive = activePillar === pillar.id || activeMobilePillar === pillar.id;
                    
                    return (
                      <button 
                        key={pillar.id}
                        onClick={() => handlePillarClick(pillar.id)}
                        className={`group flex flex-col gap-2 p-3 rounded transition-all duration-500 text-left border ${
                          isActive 
                            ? 'bg-[#0A0D18] shadow-[0_0_15px_color-mix(in_srgb,var(--accent)_20%,transparent)] border-[var(--accent)]' 
                            : 'border-transparent hover:border-[color-mix(in_srgb,var(--accent)_60%,transparent)] hover:bg-[color-mix(in_srgb,var(--accent)_5%,transparent)] hover:shadow-[0_0_15px_color-mix(in_srgb,var(--accent)_25%,transparent)]'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <Icon 
                            className={`w-4 h-4 transition-colors duration-500 shrink-0 ${isActive ? 'text-[var(--accent)]' : 'text-[#94A3B8] group-hover:text-[var(--accent)]'}`} 
                          />
                          <h4 className={`font-syne font-bold text-[12px] uppercase tracking-wide transition-colors duration-500 ${isActive ? 'text-[#F4F7FF]' : 'text-[#94A3B8] group-hover:text-[#F4F7FF]'}`}>
                            {pillar.title}
                          </h4>
                        </div>
                        <p className={`text-[10px] font-sans leading-snug transition-colors duration-500 ${isActive ? 'text-white/70' : 'text-white/40 group-hover:text-white/60'}`}>
                          {pillar.description}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Galeria */}
              <div className="px-6 md:px-10 mt-8 pt-8 pb-6 md:pb-10 border-t bg-[#07070B]/30" style={{ borderColor: 'color-mix(in srgb, var(--accent) 15%, transparent)' }}>
                <div className="flex items-center gap-2 mb-5">
                  <ImageIcon className="w-4 h-4" style={{ color: 'var(--accent)' }} />
                  <span className="font-cyber text-[10px] uppercase tracking-widest text-white/50">Galeria do Projeto</span>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4">
                  {teamPhotos.map((photo) => (
                    <button
                      key={photo.id}
                      onClick={() => setSelectedPhoto(photo)}
                      className="group relative w-full aspect-video overflow-hidden rounded bg-[#0A0D18] border transition-all duration-500 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0A0D18]"
                      style={{ borderColor: 'color-mix(in srgb, var(--accent) 40%, transparent)', outlineColor: 'var(--accent)' }}
                    >
                      <img src={photo.src} alt={photo.title} className="w-full h-full object-cover opacity-60 grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:opacity-100" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#07070B] via-transparent to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />
                      <div className="absolute bottom-2 left-2 right-2 text-left">
                        <span className="block font-syne text-[9px] sm:text-[11px] font-bold text-[#F4F7FF] leading-tight line-clamp-2">{photo.title}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* 3. PAINEL SECUNDÁRIO */}
          <AnimatePresence mode="wait">
            {activePillar && (
              <motion.div
                key={activePillar}
                initial={{ opacity: 0, x: 20, filter: 'blur(4px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, x: 10, filter: 'blur(4px)' }}
                transition={{ duration: 0.3 }}
                className="hidden lg:flex w-[400px] max-h-[750px] shrink-0 bg-[#0A0D18]/90 backdrop-blur-xl transition-colors duration-1000 shadow-2xl z-10 flex-col"
                style={{
                  borderStyle: "solid",
                  borderWidth: "32px",
                  borderImageSource: getFrameSvgUri(theme.accent),
                  borderImageSlice: "38 fill",
                }}
              >
                <div className="flex flex-col -m-[10px] h-full">
                  <div className="flex items-center justify-between border-b p-6 bg-[#07070B]/50" style={{ borderColor: 'color-mix(in srgb, var(--accent) 15%, transparent)' }}>
                    <span className="font-cyber text-[10px] uppercase tracking-widest text-white/50">Arquivo de Dados</span>
                    <button onClick={() => setActivePillar(null)} className="text-white/50 hover:text-white transition-colors">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="p-8 flex-1 overflow-y-auto cyber-scroll-y">
                    {renderPillarContent(activePillar)}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>

      {/* --- MODAIS DE SOBREPOSIÇÃO --- */}
      
      {/* Modal dos Pilares (Apenas Mobile) */}
      <AnimatePresence>
        {activeMobilePillar && (
          <Dialog open={!!activeMobilePillar} onOpenChange={(open) => !open && setActiveMobilePillar(null)}>
            <DialogContent 
              className="lg:hidden w-[calc(100vw-24px)] max-h-[85vh] overflow-hidden border-0 bg-[#0A0D18]/95 backdrop-blur-xl p-0 shadow-2xl [&>button]:hidden z-[100] flex flex-col"
              style={{ ...sectionStyle, borderStyle: "solid", borderWidth: "24px", borderImageSource: getFrameSvgUri(theme.accent), borderImageSlice: "38 fill" }}
            >
              <DialogTitle className="sr-only">Detalhes do Pilar</DialogTitle>
              <div className="relative flex flex-col h-full -m-[8px]">
                <div className="flex items-center justify-between border-b p-5 bg-[#07070B]/50" style={{ borderColor: 'color-mix(in srgb, var(--accent) 15%, transparent)' }}>
                  <span className="font-cyber text-[10px] uppercase tracking-widest text-white/50">Arquivo de Dados</span>
                  <button onClick={() => setActiveMobilePillar(null)} className="text-white/50 hover:text-white transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="p-5 overflow-y-auto cyber-scroll-y flex-1">
                  {renderPillarContent(activeMobilePillar)}
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>

      {/* Modal Galeria */}
      <AnimatePresence>
        {selectedPhoto && (
          <Dialog open={!!selectedPhoto} onOpenChange={(open) => !open && setSelectedPhoto(null)}>
            <DialogContent style={sectionStyle} className="h-[85vh] lg:h-[720px] w-[calc(100vw-24px)] max-w-5xl overflow-hidden border-0 bg-transparent p-0 shadow-none [&>button]:hidden flex flex-col transition-colors duration-1000 z-[100]">
              <DialogTitle className="sr-only">{selectedPhoto.title}</DialogTitle>
              <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="relative flex h-full flex-col overflow-hidden bg-[#0A0D18]/95 backdrop-blur-xl shadow-2xl" style={{ borderStyle: "solid", borderWidth: "32px", borderImageSource: getFrameSvgUri(theme.accent), borderImageSlice: "38 fill" }}>
                <button onClick={() => setSelectedPhoto(null)} className="absolute right-3 top-3 z-50 grid h-10 w-10 place-items-center rounded bg-[#07070B]/90 border backdrop-blur-md transition-all hover:scale-110" style={{ borderColor: 'color-mix(in srgb, var(--accent) 30%, transparent)', color: 'var(--accent)' }}>
                  <X className="h-5 w-5" />
                </button>
                <div className="flex flex-col lg:flex-row h-full overflow-hidden -m-[10px]">
                  <div className="relative flex-1 bg-[#07070B] min-h-[35vh] lg:h-full overflow-hidden border-b lg:border-b-0 lg:border-r border-white/10 flex items-center justify-center p-6">
                    <img src={selectedPhoto.src} alt={selectedPhoto.title} className="max-h-full max-w-full object-contain drop-shadow-2xl z-10" />
                  </div>
                  <div className="w-full lg:w-80 shrink-0 bg-[#0A0D18]/30 flex flex-col overflow-y-auto p-6 lg:p-8">
                    <div className="mb-4 flex items-center gap-1.5 font-cyber text-[10px] uppercase tracking-widest transition-colors" style={{ color: 'var(--accent)' }}>
                      <Calendar className="w-3.5 h-3.5" />{selectedPhoto.date}
                    </div>
                    <h3 className="text-2xl lg:text-3xl font-syne font-extrabold text-[#F4F7FF] uppercase tracking-tight mb-4 leading-snug">{selectedPhoto.title}</h3>
                    <p className="text-[14px] font-sans text-[#94A3B8] leading-relaxed whitespace-pre-line">{selectedPhoto.description}</p>
                  </div>
                </div>
              </motion.div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>

      {/* Modal Perfil do Membro */}
      <AnimatePresence>
        {selectedMember && (
          <Dialog open={!!selectedMember} onOpenChange={(open) => !open && setSelectedMember(null)}>
            <DialogContent 
              className="w-[calc(100vw-24px)] sm:w-[400px] overflow-hidden border-0 bg-[#0A0D18]/95 backdrop-blur-xl p-0 shadow-2xl [&>button]:hidden z-[110]" 
              style={{ ...sectionStyle, borderStyle: "solid", borderWidth: "16px", borderImageSource: getFrameSvgUri(theme.accent), borderImageSlice: "38 fill" }}
            >
              <DialogTitle className="sr-only">Perfil de {selectedMember.name}</DialogTitle>
              <div className="relative p-6 md:p-8 flex flex-col items-center text-center -m-[5px]">
                <button onClick={() => setSelectedMember(null)} className="absolute right-2 top-2 z-50 text-white/40 hover:text-white transition-colors">
                  <X className="h-5 w-5" />
                </button>
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#07070B] border-2 mb-4 overflow-hidden flex items-center justify-center" style={{ borderColor: 'color-mix(in srgb, var(--accent) 30%, transparent)' }}>
                  <Users className="w-8 h-8 sm:w-10 sm:h-10 opacity-30" style={{ color: 'var(--accent)' }} />
                </div>
                <h3 className="font-syne text-lg sm:text-xl font-bold text-[#F4F7FF] uppercase mb-1">{selectedMember.name}</h3>
                <span className="font-cyber text-[9px] sm:text-[10px] uppercase tracking-widest text-[#94A3B8] mb-6">{selectedMember.role}</span>
                <div className="flex gap-3 sm:gap-4">
                  {selectedMember.github && <a href={selectedMember.github} target="_blank" rel="noopener noreferrer" className="p-2.5 sm:p-3 rounded bg-white/5 hover:bg-white/10 transition-colors"><Github className="w-4 h-4 sm:w-5 sm:h-5 text-[#F4F7FF]" /></a>}
                  {selectedMember.linkedin && <a href={selectedMember.linkedin} target="_blank" rel="noopener noreferrer" className="p-2.5 sm:p-3 rounded bg-white/5 hover:bg-white/10 transition-colors" style={{ color: 'var(--accent)' }}><Linkedin className="w-4 h-4 sm:w-5 sm:h-5" /></a>}
                  {selectedMember.email && <a href={`mailto:${selectedMember.email}`} className="p-2.5 sm:p-3 rounded bg-white/5 hover:bg-white/10 transition-colors text-[#F4F7FF]"><Mail className="w-4 h-4 sm:w-5 sm:h-5" /></a>}
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>

    </section>
  );
};

export default InstitutionalSection;