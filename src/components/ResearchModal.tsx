import { type CSSProperties, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { ArrowUpRight, FileText, Calendar, Users, X } from 'lucide-react';
import { Publication } from '@/data/Publications';
import { useScrollColor } from '@/context/ScrollColorContext';

// Moldura SVG 2 com cantos chanfrados codificada com segurança
const getFrameSvgUri = (color: string) => {
  const safeColor = color.replace(/[^#(),.%a-zA-Z0-9 ]/g, "");
  const svg = `<svg width="300" height="300" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M35 299.928V300H0V265H0.0722656L35 299.928ZM300 205V260H299.916L260 299.917V300H40V299.916L0.0830078 260H0V205L5 200V256.333L43.667 295H256.333L295 256.333V200L300 205ZM260 0.0839844L299.917 40H300V95L295 100V43.667L256.333 5H43.667L5 43.667V100L0 95V40H0.0839844L40 0.0830078V0H260V0.0839844ZM300 26V35H299.928L265 0.0722656V0H274L300 26ZM300 21.0508L278.949 0H300V21.0508Z" fill="${safeColor}"/></svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
};

interface ResearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  pub: Publication | null;
}

const ResearchModal = ({ isOpen, onClose, pub }: ResearchModalProps) => {
  const { theme } = useScrollColor();
  const modalStyle = { "--accent": theme.accent } as CSSProperties;

  useEffect(() => {
    // Evita scroll no body quando o modal abre no mobile
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!pub) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        style={modalStyle}
        className="h-[85vh] min-h-[500px] w-[calc(100vw-24px)] max-w-4xl overflow-hidden border-0 bg-transparent p-0 shadow-none [&>button]:hidden"
      >
        <DialogTitle className="sr-only">{pub.title}</DialogTitle>
        <style>{`
          .cyber-modal-scroll::-webkit-scrollbar { width: 4px; }
          .cyber-modal-scroll { scrollbar-width: thin; scrollbar-color: color-mix(in srgb, var(--accent) 55%, transparent) transparent; }
          .cyber-modal-scroll::-webkit-scrollbar-track { background: rgba(255,255,255,.03); }
          .cyber-modal-scroll::-webkit-scrollbar-thumb { background: color-mix(in srgb, var(--accent) 55%, transparent); border-radius: 4px; }
          .cyber-modal-scroll::-webkit-scrollbar-thumb:hover { background: var(--accent); }
        `}</style>

        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="relative flex h-full flex-col overflow-hidden bg-[#0A0D18]/95 backdrop-blur-xl transition-colors duration-1000 shadow-[0_0_60px_rgba(0,0,0,.8)]"
          style={{
            borderStyle: "solid",
            borderWidth: "32px",
            borderImageSource: getFrameSvgUri(theme.accent),
            borderImageSlice: "38 fill", 
          }}
        >
          {/* Botão de Fechar */}
          <button
            type="button"
            onClick={onClose}
            className="absolute right-3 top-3 md:right-4 md:top-4 z-50 grid h-10 w-10 place-items-center rounded bg-[#07070B]/90 border backdrop-blur-md transition-all hover:scale-110"
            style={{ borderColor: 'color-mix(in srgb, var(--accent) 30%, transparent)', color: 'var(--accent)' }}
          >
            <X className="h-5 w-5" />
          </button>

          <div className="flex min-h-0 flex-1 flex-col overflow-hidden -m-[10px]">
            {/* Cabeçalho */}
            <div className="shrink-0 border-b p-5 md:p-8 bg-[#07070B]/50" style={{ borderColor: 'color-mix(in srgb, var(--accent) 15%, transparent)' }}>
              <h3 className="mb-4 font-syne text-xl sm:text-2xl font-extrabold uppercase leading-snug tracking-tight text-[#F4F7FF] pr-6">
                {pub.title}
              </h3>
              <div className="flex flex-wrap items-center gap-3 text-[10px] font-cyber uppercase tracking-widest text-[#94A3B8]">
                <span className="flex items-center gap-1.5 transition-colors duration-1000" style={{ color: 'var(--accent)' }}>
                  <FileText className="w-3.5 h-3.5" /> {pub.type}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" /> {pub.date}
                </span>
                <span className="flex items-center gap-2 border px-2 py-1 rounded bg-[#0A0D18]" style={{ borderColor: 'color-mix(in srgb, var(--accent) 20%, transparent)' }}>
                  {pub.conferenceLogo && (
                    <img src={pub.conferenceLogo} alt={pub.conference} className="h-3.5 w-auto object-contain opacity-80" />
                  )}
                  {pub.conference}
                </span>
              </div>
            </div>

            {/* Scroll do Resumo */}
            <div className="cyber-modal-scroll flex-1 p-5 md:p-8 overflow-y-auto bg-[#0A0D18]/30">
              <p className="text-[13px] sm:text-[15px] font-sans leading-relaxed text-[#94A3B8] whitespace-pre-line">
                {pub.abstract}
              </p>
            </div>

            {/* Rodapé e Botão */}
            <div className="shrink-0 border-t p-5 bg-[#07070B]/40 flex flex-col gap-4 sm:flex-row sm:items-center justify-between" style={{ borderColor: 'color-mix(in srgb, var(--accent) 15%, transparent)' }}>
              <div className="flex-1">
                <span className="flex items-center gap-1.5 font-cyber text-[9px] uppercase tracking-widest transition-colors duration-1000 mb-1.5" style={{ color: 'var(--accent)' }}>
                  <Users className="w-3.5 h-3.5" /> Equipe de Pesquisa
                </span>
                <p className="font-sans text-xs sm:text-sm text-[#F4F7FF] leading-tight font-bold">
                  {pub.authors}
                </p>
              </div>
              
              <a 
                href={pub.link} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex h-12 w-full sm:w-auto shrink-0 items-center justify-center gap-2 rounded font-cyber text-[11px] font-bold uppercase tracking-[0.1em] text-[#07070B] transition-all hover:brightness-110 px-8"
                style={{ backgroundColor: 'var(--accent)' }}
              >
                Acessar Arquivo <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default ResearchModal;