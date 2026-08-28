import { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Terminal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import logoLedes from '@/assets/logo-ledes-games.png';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const navItems = [
    { id: 'hero', index: '01', label: 'Início' },
    { id: 'games', index: '02', label: 'Jogos' },
    { id: 'research', index: '03', label: 'Pesquisa' },
    { id: 'about', index: '04', label: 'Sobre o Lab' },
    { id: 'media', index: '05', label: 'Conexões' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#08080A]/90 backdrop-blur-md border-b border-white/10 shadow-2xl shadow-black/50'
          : 'bg-gradient-to-b from-[#08080A]/90 to-transparent border-b border-transparent'
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Studio Brand */}
          <div 
            onClick={() => scrollToSection('hero')}
            className="flex items-center gap-3 cursor-pointer select-none"
          >
            <div className="relative flex items-center justify-center w-10 h-10 bg-white/[0.03] border border-white/10">
              <img 
                src={logoLedes} 
                alt="LEDES Games Logo" 
                className="w-7 h-7 object-contain"
              />
              <span className="absolute -bottom-1 -right-1 w-1.5 h-1.5 bg-[#0051ff]" />
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-display text-xl tracking-wider text-white">
                  LEDES <span className="text-[#0051ff]">GAMES</span>
                </span>
              </div>
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#9999A5]">
                FACOM // UFMS STUDIO
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="group relative px-4 py-2 flex items-center gap-1.5 font-cyber text-xs uppercase tracking-wider text-[#9999A5] hover:text-white transition-colors"
              >
                <span className="font-mono text-[9px] text-[#0051ff] opacity-70 group-hover:opacity-100 transition-opacity">
                  {item.index}.
                </span>
                <span>{item.label}</span>
                <span className="absolute bottom-0 left-4 right-4 h-[2px] bg-[#0051ff] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </button>
            ))}
          </nav>

          {/* Right Action / Status Bar */}
          <div className="hidden sm:flex items-center gap-4">
            <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 border border-white/10 bg-white/[0.02] font-mono text-[10px] text-[#9999A5]">
              <span className="w-2 h-2 rounded-full bg-[#0051ff] animate-pulse" />
              <span className="text-white font-medium">LAB ONLINE</span>
              <span className="text-white/30">|</span>
              <span>2026.SYS</span>
            </div>

            <button
              onClick={() => scrollToSection('games')}
              className="group relative inline-flex items-center gap-2 px-5 py-2.5 bg-white text-black font-cyber font-bold text-xs uppercase tracking-wider hover:bg-[#0051ff] hover:text-white transition-all duration-300 tech-cut-sm"
            >
              <span>Explorar Catálogo</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex lg:hidden items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="text-white border border-white/10 hover:bg-white/[0.05] hover:border-[#0051ff] rounded-none w-10 h-10"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Abrir menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-6 border-t border-white/10 bg-[#08080A]/95 backdrop-blur-xl animate-in slide-in-from-top-4">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="flex items-center justify-between px-4 py-3 border-b border-white/5 font-cyber text-sm uppercase tracking-wider text-[#9999A5] hover:text-white hover:bg-white/[0.02] text-left transition-colors"
                >
                  <span className="flex items-center gap-3">
                    <span className="font-mono text-xs text-[#0051ff]">{item.index}</span>
                    <span className="text-white font-medium">{item.label}</span>
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-white/40" />
                </button>
              ))}

              <div className="pt-4 px-4 flex flex-col gap-3">
                <div className="flex items-center gap-2 font-mono text-[10px] text-[#9999A5]">
                  <span className="w-2 h-2 rounded-full bg-[#0051ff]" />
                  <span>LAB ONLINE // FACOM UFMS</span>
                </div>
                <button
                  onClick={() => scrollToSection('games')}
                  className="w-full py-3 bg-[#0051ff] text-white font-cyber font-bold text-xs uppercase tracking-wider text-center"
                >
                  Ver Jogos do Estúdio
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;