import { type CSSProperties, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Database, FileText, Calendar, Users, Radio } from 'lucide-react';
import { publications, Publication } from '@/data/Publications';
import { useScrollColor } from '@/context/ScrollColorContext';
import ResearchModal from './ResearchModal';

const getFrameSvgUri = (color: string) => {
  const safeColor = color.replace(/[^#(),.%a-zA-Z0-9 ]/g, "");
  const svg = `<svg width="300" height="300" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M35 299.928V300H0V265H0.0722656L35 299.928ZM300 205V260H299.916L260 299.917V300H40V299.916L0.0830078 260H0V205L5 200V256.333L43.667 295H256.333L295 256.333V200L300 205ZM260 0.0839844L299.917 40H300V95L295 100V43.667L256.333 5H43.667L5 43.667V100L0 95V40H0.0839844L40 0.0830078V0H260V0.0839844ZM300 26V35H299.928L265 0.0722656V0H274L300 26ZM300 21.0508L278.949 0H300V21.0508Z" fill="${safeColor}"/></svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
};

const ResearchSection = () => {
  const [activeFilter, setActiveFilter] = useState<'todos' | 'artigo' | 'monografia'>('todos');
  const [selectedPubId, setSelectedPubId] = useState<number>(publications[0]?.id || 1);
  const [modalPub, setModalPub] = useState<Publication | null>(null);
  const { theme } = useScrollColor();

  const filteredPublications = publications.filter((pub) => {
    if (activeFilter === 'todos') return true;
    const lowerType = pub.type.toLowerCase();
    if (activeFilter === 'artigo') {
      return lowerType.includes('artigo') || lowerType.includes('paper') || lowerType.includes('resumo') || lowerType.includes('congresso');
    }
    if (activeFilter === 'monografia') {
      return lowerType.includes('tcc') || lowerType.includes('tese') || lowerType.includes('dissertação') || lowerType.includes('monografia');
    }
    return true;
  });

  const selectedPub = filteredPublications.find(p => p.id === selectedPubId) || filteredPublications[0];
  const sectionStyle = { "--accent": theme.accent } as CSSProperties;

  const handleCardClick = (pub: Publication) => {
    setSelectedPubId(pub.id);
    if (window.innerWidth < 1024) {
      setModalPub(pub);
    }
  };

  return (
    <>
      <section id="research" style={sectionStyle} className="relative min-h-[100svh] pt-20 md:pt-24 pb-16 bg-[#07070B] overflow-hidden flex flex-col transition-colors duration-1000">
        
        <style>{`
          .cyber-scroll::-webkit-scrollbar { width: 5px; }
          .cyber-scroll::-webkit-scrollbar-track { background: transparent; }
          .cyber-scroll::-webkit-scrollbar-thumb { background: color-mix(in srgb, var(--accent) 40%, transparent); border-radius: 4px; }
          .cyber-scroll::-webkit-scrollbar-thumb:hover { background: var(--accent); }
        `}</style>

        <div className="absolute top-0 left-0 w-full h-[1px] z-20 transition-colors duration-1000" style={{ background: `linear-gradient(to right, transparent, var(--accent), transparent)` }} />

        <div 
          className="absolute inset-0 z-0 pointer-events-none transition-colors duration-1000 opacity-20"
          style={{
            backgroundImage: `linear-gradient(to right, var(--accent) 1px, transparent 1px), linear-gradient(to bottom, var(--accent) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
            maskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)'
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#07070B_90%)] z-0 pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 relative z-10 flex flex-col min-h-0 flex-1">
          
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-6 md:mb-8 gap-5 border-b pb-4 transition-colors duration-1000" style={{ borderColor: 'color-mix(in srgb, var(--accent) 25%, transparent)' }}>
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <div className="mb-2 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.28em] text-white/45">
                <Radio className="h-3 w-3 animate-pulse transition-colors duration-1000" style={{ color: 'var(--accent)' }} />
                ACERVO CIENTÍFICO
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-syne font-extrabold uppercase text-[#F4F7FF] tracking-wide flex items-center gap-3">
                <Database className="w-8 h-8 lg:w-10 lg:h-10 hidden sm:block transition-colors duration-1000" style={{ color: 'var(--accent)' }} />
                Publicações
              </h2>
              <p className="mt-2 text-sm text-[#94A3B8] sm:text-base max-w-xl font-sans">
                Registro oficial de artigos, monografias e teses desenvolvidas pela nossa equipe de pesquisadores.
              </p>
            </motion.div>

            <div className="flex flex-wrap gap-x-4 md:gap-x-6 gap-y-3 w-full lg:w-auto pb-1">
              {(['todos', 'artigo', 'monografia'] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`relative pb-2 font-cyber text-[11px] sm:text-xs md:text-sm uppercase tracking-widest transition-colors duration-500 ${
                    activeFilter === filter ? "font-bold" : "text-[#94A3B8] hover:text-white"
                  }`}
                  style={{ color: activeFilter === filter ? 'var(--accent)' : '' }}
                >
                  {filter === 'todos' ? 'TODOS OS DADOS' : filter}
                  {activeFilter === filter && (
                    <motion.span layoutId="researchFilterIndicator" className="absolute bottom-[-16px] left-0 right-0 h-[3px] transition-colors duration-1000" style={{ backgroundColor: 'var(--accent)' }} />
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col lg:grid min-h-0 flex-1 gap-6 lg:grid-cols-[340px_minmax(0,1fr)] xl:grid-cols-[400px_minmax(0,1fr)] lg:h-[720px]">
            
            <aside className="flex min-h-[50vh] lg:h-auto lg:min-h-0 flex-col overflow-hidden rounded-xl border bg-[#0A0D18]/60 backdrop-blur-md transition-colors duration-1000 shrink-0 lg:shrink" style={{ borderColor: 'color-mix(in srgb, var(--accent) 20%, transparent)' }}>
              <div className="flex shrink-0 items-center justify-between border-b px-4 py-3" style={{ borderColor: 'color-mix(in srgb, var(--accent) 15%, transparent)' }}>
                <span className="font-syne text-[11px] sm:text-xs font-bold uppercase tracking-wide text-[#F4F7FF]">Índice Acadêmico</span>
                <span className="text-[10px] sm:text-[11px] font-cyber tracking-widest text-[#94A3B8]">{filteredPublications.length} ARQUIVOS</span>
              </div>

              <div className="cyber-scroll min-h-0 flex-1 space-y-2 overflow-y-auto p-2 md:p-3">
                <AnimatePresence>
                  {filteredPublications.map((pub) => {
                    const active = pub.id === selectedPubId;
                    return (
                      <button
                        key={pub.id}
                        onClick={() => handleCardClick(pub)}
                        className={`group relative flex w-full items-start gap-3 overflow-hidden rounded border p-2.5 sm:p-3 text-left transition-colors duration-500 ${
                          active
                            ? "bg-[color-mix(in_srgb,var(--accent)_10%,transparent)] lg:shadow-[0_0_15px_color-mix(in_srgb,var(--accent)_15%,transparent)]"
                            : "border-transparent hover:border-white/10 hover:bg-white/[.03]"
                        }`}
                        style={{ borderColor: active ? 'var(--accent)' : '' }}
                      >
                        {active && (
                          <span className="absolute bottom-1 left-0 top-1 w-[3px] rounded-full transition-colors duration-1000" style={{ backgroundColor: 'var(--accent)' }} />
                        )}
                        
                        <div 
                          className="relative shrink-0 w-[56px] h-[56px] md:w-[72px] md:h-[72px] rounded border border-white/5 bg-[#07070B]/50 flex items-center justify-center p-2 transition-colors duration-500"
                          style={{ borderColor: active ? 'color-mix(in srgb, var(--accent) 30%, transparent)' : '' }}
                        >
                          {pub.conferenceLogo ? (
                            <img src={pub.conferenceLogo} alt={pub.conference} className="w-full h-full object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-300" style={{ filter: active ? 'drop-shadow(0 0 8px color-mix(in srgb, var(--accent) 40%, transparent))' : '' }} />
                          ) : (
                            <FileText className="w-6 h-6 text-white/10" />
                          )}
                        </div>

                        <div className="flex flex-1 flex-col min-w-0 pt-0.5">
                          <div className="flex justify-between items-start w-full mb-1.5 gap-2">
                            <span className="font-cyber text-[8px] sm:text-[9px] border px-1.5 py-0.5 rounded uppercase tracking-wider transition-colors duration-500 shrink-0" style={{ color: active ? 'var(--accent)' : '#94A3B8', borderColor: active ? 'color-mix(in srgb, var(--accent) 40%, transparent)' : 'transparent', backgroundColor: active ? 'color-mix(in srgb, var(--accent) 5%, transparent)' : 'transparent' }}>
                              {pub.type}
                            </span>
                            <span className="font-cyber text-[8px] sm:text-[9px] text-[#94A3B8] shrink-0 text-right">
                              {pub.date}
                            </span>
                          </div>
                          <h4 className={`font-syne text-[12px] sm:text-sm font-bold leading-tight line-clamp-2 sm:line-clamp-3 transition-colors duration-500 ${active ? "text-[#F4F7FF]" : "text-[#B7C0CE] group-hover:text-white"}`} style={{ color: active ? 'var(--accent)' : '' }}>
                            {pub.title}
                          </h4>
                        </div>
                      </button>
                    );
                  })}
                </AnimatePresence>
              </div>
            </aside>

            <AnimatePresence mode="wait">
              {selectedPub && (
                <motion.article
                  key={selectedPub.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="hidden lg:flex min-h-0 flex-col overflow-hidden bg-[#0A0D18]/80 backdrop-blur-md transition-colors duration-1000 shrink-0"
                  style={{
                    borderStyle: "solid",
                    borderWidth: "32px",
                    borderImageSource: getFrameSvgUri(theme.accent),
                    borderImageSlice: "38 fill",
                  }}
                >
                  <div className="flex min-h-0 flex-1 flex-col overflow-hidden -m-[10px]">
                    
                    <div className="shrink-0 border-b p-6 md:p-8 bg-[#07070B]/50" style={{ borderColor: 'color-mix(in srgb, var(--accent) 15%, transparent)' }}>
                      <h3 className="mb-4 font-syne text-2xl md:text-3xl font-extrabold uppercase leading-snug tracking-tight text-[#F4F7FF]">
                        {selectedPub.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-4 text-[10px] font-cyber uppercase tracking-widest text-[#94A3B8]">
                        <span className="flex items-center gap-1.5 transition-colors duration-1000" style={{ color: 'var(--accent)' }}><FileText className="w-3.5 h-3.5" /> {selectedPub.type}</span>
                        <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {selectedPub.date}</span>
                        <span className="flex items-center gap-2 border px-2.5 py-1.5 rounded bg-[#0A0D18]" style={{ borderColor: 'color-mix(in srgb, var(--accent) 20%, transparent)' }}>
                          {selectedPub.conferenceLogo && <img src={selectedPub.conferenceLogo} alt={selectedPub.conference} className="h-4 w-auto object-contain opacity-80 transition-opacity hover:opacity-100" />}
                          {selectedPub.conference}
                        </span>
                      </div>
                    </div>

                    <div className="cyber-scroll flex-1 p-6 md:p-8 overflow-y-auto bg-[#0A0D18]/30">
                      <p className="text-[15px] font-sans leading-relaxed text-[#94A3B8] whitespace-pre-line">
                        {selectedPub.abstract}
                      </p>
                    </div>

                    <div className="shrink-0 border-t p-6 bg-[#07070B]/40 flex items-center justify-between gap-6" style={{ borderColor: 'color-mix(in srgb, var(--accent) 15%, transparent)' }}>
                      <div className="flex-1">
                        <span className="flex items-center gap-1.5 font-cyber text-[9px] uppercase tracking-widest transition-colors duration-1000 mb-1.5" style={{ color: 'var(--accent)' }}><Users className="w-3.5 h-3.5" /> Equipe de Pesquisa</span>
                        <p className="font-sans text-sm text-[#F4F7FF] leading-tight font-bold">{selectedPub.authors}</p>
                      </div>
                      <a href={selectedPub.link} target="_blank" rel="noopener noreferrer" className="flex h-12 shrink-0 items-center justify-center gap-2 rounded font-cyber text-[12px] font-bold uppercase tracking-[0.1em] text-[#07070B] transition-all hover:brightness-110 px-8" style={{ backgroundColor: 'var(--accent)' }}>
                        Acessar Arquivo <ArrowUpRight className="w-4 h-4" />
                      </a>
                    </div>

                  </div>
                </motion.article>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      <ResearchModal isOpen={!!modalPub} onClose={() => setModalPub(null)} pub={modalPub} />
    </>
  );
};

export default ResearchSection;