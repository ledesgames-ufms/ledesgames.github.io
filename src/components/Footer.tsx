import { Instagram, Youtube, ArrowUpRight } from 'lucide-react';
import logoUfms from '@/assets/logo-ufms.png';
import logoFacom from '@/assets/logo-facom.png';
import logoLedes from '@/assets/logo-ledes.png';
import logoLedesGames from '@/assets/logo-ledes-games.png';

const Footer = () => {
  return (
    <footer className="relative bg-[#050507] border-t border-white/15 text-white overflow-hidden">
      
      {/* Background Subtle Grid */}
      <div className="absolute inset-0 tech-grid opacity-10 pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8 py-16 relative z-10">
        
        {/* Top Partner Logos Strip */}
        <div className="mb-14 pb-12 border-b border-white/10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div>
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-[#9999A5] mb-2">
              <span className="w-1.5 h-1.5 bg-[#0051ff]" />
              <span>ECOSSISTEMA ACADÊMICO & INSTITUCIONAL</span>
            </div>
            <h3 className="font-display font-bold text-2xl uppercase tracking-tight text-white">
              Laboratório Vinculado à UFMS
            </h3>
          </div>

          {/* Partner Brand Logos */}
          <div className="flex items-center gap-6 sm:gap-8 flex-wrap">
            <a 
              href="https://www.ufms.br" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-3 bg-white/[0.02] border border-white/10 hover:border-[#0051ff] transition-all group"
              title="UFMS - Universidade Federal de Mato Grosso do Sul"
            >
              <img 
                src={logoUfms} 
                alt="Logo UFMS" 
                className="h-10 w-auto object-contain filter grayscale contrast-125 opacity-70 group-hover:opacity-100 group-hover:grayscale-0 transition-all" 
              />
            </a>

            <a 
              href="https://facom.ufms.br" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-3 bg-white/[0.02] border border-white/10 hover:border-[#0051ff] transition-all group"
              title="FACOM - Faculdade de Computação"
            >
              <img 
                src={logoFacom} 
                alt="Logo FACOM" 
                className="h-10 w-auto object-contain filter grayscale contrast-125 opacity-70 group-hover:opacity-100 group-hover:grayscale-0 transition-all" 
              />
            </a>

            <div 
              className="p-3 bg-white/[0.02] border border-white/10 hover:border-[#0051ff] transition-all group"
              title="LEDES - Laboratório de Engenharia de Software"
            >
              <img 
                src={logoLedes} 
                alt="Logo LEDES" 
                className="h-10 w-auto object-contain filter grayscale contrast-125 opacity-70 group-hover:opacity-100 group-hover:grayscale-0 transition-all" 
              />
            </div>

            <div 
              className="p-3 bg-white/[0.02] border border-white/10 hover:border-[#0051ff] transition-all group"
              title="LEDES Games"
            >
              <img 
                src={logoLedesGames} 
                alt="Logo LEDES Games" 
                className="h-10 w-auto object-contain filter contrast-125 opacity-90 group-hover:opacity-100 transition-all" 
              />
            </div>
          </div>
        </div>

        {/* Main Footer Link Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
          
          {/* Studio Brand Intro */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-display font-black text-xl tracking-tight text-white">
                LEDES <span className="text-[#0051ff]">GAMES</span>
              </span>
            </div>

            <p className="font-sans text-xs text-[#9999A5] leading-relaxed">
              Laboratório de desenvolvimento de jogos digitais e pesquisa aplicada em engenharia de software da FACOM/UFMS.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                href="https://www.instagram.com/ledesfacom/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-white/[0.03] border border-white/15 hover:border-[#0051ff] hover:bg-[#0051ff] hover:text-white flex items-center justify-center transition-all text-[#9999A5]"
                title="Instagram @ledesfacom"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://www.youtube.com/@ledesgames"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-white/[0.03] border border-white/15 hover:border-[#0051ff] hover:bg-[#0051ff] hover:text-white flex items-center justify-center transition-all text-[#9999A5]"
                title="YouTube @ledesgames"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Navigation Column */}
          <div>
            <h4 className="font-mono text-xs font-bold text-white uppercase tracking-widest mb-4 flex items-center gap-1.5">
              <span className="text-[#0051ff]">[01]</span> NAVEGAÇÃO
            </h4>
            <ul className="space-y-2.5 font-cyber text-xs">
              <li>
                <a href="#hero" className="text-[#9999A5] hover:text-white transition-colors flex items-center gap-1">
                  <span>Início do Estúdio</span>
                </a>
              </li>
              <li>
                <a href="#games" className="text-[#9999A5] hover:text-white transition-colors flex items-center gap-1">
                  <span>Catálogo de Jogos</span>
                </a>
              </li>
              <li>
                <a href="#research" className="text-[#9999A5] hover:text-white transition-colors flex items-center gap-1">
                  <span>Artigos & Pesquisa</span>
                </a>
              </li>
              <li>
                <a href="#about" className="text-[#9999A5] hover:text-white transition-colors flex items-center gap-1">
                  <span>Sobre o Laboratório</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Research & Game Resources */}
          <div>
            <h4 className="font-mono text-xs font-bold text-white uppercase tracking-widest mb-4 flex items-center gap-1.5">
              <span className="text-[#0051ff]">[02]</span> RECURSOS
            </h4>
            <ul className="space-y-2.5 font-cyber text-xs">
              <li>
                <a href="https://ledesgames.itch.io" target="_blank" rel="noopener noreferrer" className="text-[#9999A5] hover:text-white transition-colors flex items-center gap-1">
                  <span>Página no Itch.io</span>
                  <ArrowUpRight className="w-3 h-3 text-[#0051ff]" />
                </a>
              </li>
              <li>
                <a href="#research" className="text-[#9999A5] hover:text-white transition-colors flex items-center gap-1">
                  <span>Publicações SBGames</span>
                </a>
              </li>
              <li>
                <a href="#about" className="text-[#9999A5] hover:text-white transition-colors flex items-center gap-1">
                  <span>Oficinas & Cursos 2D</span>
                </a>
              </li>
              <li>
                <a href="#media" className="text-[#9999A5] hover:text-white transition-colors flex items-center gap-1">
                  <span>Canais de Atendimento</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Institutional Links */}
          <div>
            <h4 className="font-mono text-xs font-bold text-white uppercase tracking-widest mb-4 flex items-center gap-1.5">
              <span className="text-[#0051ff]">[03]</span> INSTITUCIONAL
            </h4>
            <ul className="space-y-2.5 font-cyber text-xs">
              <li>
                <a href="https://www.ufms.br" target="_blank" rel="noopener noreferrer" className="text-[#9999A5] hover:text-white transition-colors flex items-center gap-1">
                  <span>Portal UFMS</span>
                  <ArrowUpRight className="w-3 h-3 text-white/40" />
                </a>
              </li>
              <li>
                <a href="https://facom.ufms.br" target="_blank" rel="noopener noreferrer" className="text-[#9999A5] hover:text-white transition-colors flex items-center gap-1">
                  <span>Faculdade de Computação</span>
                  <ArrowUpRight className="w-3 h-3 text-white/40" />
                </a>
              </li>
              <li>
                <a href="mailto:ledesgames.facom@ufms.br" className="text-[#9999A5] hover:text-[#0051ff] transition-colors font-mono text-[11px]">
                  ledesgames.facom@ufms.br
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-[#9999A5]">
          <div>
            © {new Date().getFullYear()} LEDES GAMES // FACOM - UNIVERSIDADE FEDERAL DE MATO GROSSO DO SUL.
          </div>

          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#0051ff]" />
            <span>SISTEMA ATIVO // CAMPO GRANDE, MS</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;