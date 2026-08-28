import { type CSSProperties } from 'react';
import { Instagram, Youtube } from 'lucide-react';
import { useScrollColor } from '@/context/ScrollColorContext';
import logoUfms from '@/assets/logo-ufms.png';
import logoFacom from '@/assets/logo-facom.png';
import logoLedes from '@/assets/logo-ledes.png';
import logoLedesGames from '@/assets/logo_ledesgames.png';

const Footer = () => {
  const { theme } = useScrollColor();
  const sectionStyle = { "--accent": theme.accent } as CSSProperties;

  return (
    <footer style={{ ...sectionStyle, borderColor: 'color-mix(in srgb, var(--accent) 15%, transparent)' }} className="relative bg-[#07070B] pt-16 pb-8 transition-colors duration-1000 border-t overflow-hidden">
      
      {/* --- DIVISÓRIA LASER TOP --- */}
      <div className="absolute top-0 left-0 w-full h-[1px] opacity-50 transition-colors duration-1000" style={{ background: `linear-gradient(to right, transparent, var(--accent), transparent)` }} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          
          {/* LADO ESQUERDO: Logos e Descrição */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <div className="flex items-center gap-5 sm:gap-6 flex-wrap bg-[#0A0D18]/30 p-4 rounded border border-white/5">
              <img 
                src={logoUfms} 
                alt="Logo UFMS" 
                className="h-10 sm:h-12 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity duration-300" 
              />
              <img 
                src={logoFacom} 
                alt="Logo FACOM" 
                className="h-10 sm:h-12 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity duration-300" 
              />
              <div className="w-[1px] h-8 bg-white/10 hidden sm:block" />
              <img 
                src={logoLedes} 
                alt="Logo LEDES" 
                className="h-10 sm:h-12 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity duration-300" 
              />
              <img 
                src={logoLedesGames} 
                alt="Logo LEDES Games" 
                className="h-10 sm:h-12 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity duration-300 drop-shadow-[0_0_8px_rgba(255,255,255,0.1)]" 
              />
            </div>
            <p className="font-sans text-sm text-[#94A3B8] leading-relaxed max-w-md">
              Laboratório de Desenvolvimento de Jogos Digitais da Faculdade de Computação (FACOM) da Universidade Federal de Mato Grosso do Sul (UFMS).
            </p>
          </div>

          {/* LADO DIREITO: Links de Navegação */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            
            {/* Coluna 1 */}
            <div>
              <h4 className="font-cyber text-[10px] md:text-[11px] mb-5 uppercase tracking-widest text-white/50">Navegação</h4>
              <ul className="space-y-3">
                <li>
                  <a href="#hero" className="font-sans text-[13px] md:text-sm text-[#94A3B8] transition-colors duration-300 hover:text-[var(--accent)]">
                    Início
                  </a>
                </li>
                <li>
                  <a href="#games" className="font-sans text-[13px] md:text-sm text-[#94A3B8] transition-colors duration-300 hover:text-[var(--accent)]">
                    Catálogo de Games
                  </a>
                </li>
                <li>
                  <a href="#about" className="font-sans text-[13px] md:text-sm text-[#94A3B8] transition-colors duration-300 hover:text-[var(--accent)]">
                    Quem Somos
                  </a>
                </li>
              </ul>
            </div>

            {/* Coluna 2 */}
            <div>
              <h4 className="font-cyber text-[10px] md:text-[11px] mb-5 uppercase tracking-widest text-white/50">Recursos</h4>
              <ul className="space-y-3">
                <li>
                  <a href="#research" className="font-sans text-[13px] md:text-sm text-[#94A3B8] transition-colors duration-300 hover:text-[var(--accent)]">
                    Acervo de Publicações
                  </a>
                </li>
                <li>
                  <a href="#" className="font-sans text-[13px] md:text-sm text-[#94A3B8] transition-colors duration-300 hover:text-[var(--accent)]">
                    Documentação
                  </a>
                </li>
                <li>
                  <a href="#media" className="font-sans text-[13px] md:text-sm text-[#94A3B8] transition-colors duration-300 hover:text-[var(--accent)]">
                    Comunicação
                  </a>
                </li>
              </ul>
            </div>

            {/* Coluna 3 */}
            <div>
              <h4 className="font-cyber text-[10px] md:text-[11px] mb-5 uppercase tracking-widest text-white/50">Institucional</h4>
              <ul className="space-y-3">
                <li>
                  <a href="https://www.ufms.br" target="_blank" rel="noopener noreferrer" className="font-sans text-[13px] md:text-sm text-[#94A3B8] transition-colors duration-300 hover:text-[var(--accent)] flex items-center gap-2">
                    Portal UFMS
                  </a>
                </li>
                <li>
                  <a href="https://facom.ufms.br" target="_blank" rel="noopener noreferrer" className="font-sans text-[13px] md:text-sm text-[#94A3B8] transition-colors duration-300 hover:text-[var(--accent)] flex items-center gap-2">
                    Site FACOM
                  </a>
                </li>
                <li>
                  <a href="#" className="font-sans text-[13px] md:text-sm text-[#94A3B8] transition-colors duration-300 hover:text-[var(--accent)] flex items-center gap-2">
                    Projeto LEDES
                  </a>
                </li>
              </ul>
            </div>

          </div>
        </div>

        {/* --- BARRA INFERIOR: Direitos e Redes Sociais --- */}
        <div className="pt-6 border-t flex flex-col-reverse md:flex-row items-center justify-between gap-6 transition-colors duration-1000" style={{ borderColor: 'color-mix(in srgb, var(--accent) 15%, transparent)' }}>
          
          <p className="font-cyber text-[9px] sm:text-[10px] text-white/40 uppercase tracking-widest text-center md:text-left">
            © {new Date().getFullYear()} LEDES Games - FACOM / UFMS. <span className="hidden sm:inline">Todos os direitos reservados.</span>
          </p>

          <div className="flex gap-3">
            <a
              href="https://www.instagram.com/ledesfacom/"
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 border border-white/10 flex items-center justify-center transition-all duration-300 rounded hover:border-[var(--accent)] hover:bg-[color-mix(in_srgb,var(--accent)_10%,transparent)] group"
              title="Instagram"
            >
              <Instagram className="w-4 h-4 text-[#94A3B8] group-hover:text-[var(--accent)] transition-colors duration-300" />
            </a>
            <a
              href="https://www.youtube.com/@ledesgames"
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 border border-white/10 flex items-center justify-center transition-all duration-300 rounded hover:border-[var(--accent)] hover:bg-[color-mix(in_srgb,var(--accent)_10%,transparent)] group"
              title="YouTube"
            >
              <Youtube className="w-4 h-4 text-[#94A3B8] group-hover:text-[var(--accent)] transition-colors duration-300" />
            </a>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;