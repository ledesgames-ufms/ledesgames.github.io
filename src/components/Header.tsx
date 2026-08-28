import { type CSSProperties, useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useScrollColor } from '@/context/ScrollColorContext';
import logoLedes from '@/assets/otimizadas/logo_ledesgames.webp';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme } = useScrollColor();

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

  const headerStyle = {
    "--accent": theme.accent,
    borderColor: isScrolled ? 'color-mix(in srgb, var(--accent) 25%, transparent)' : 'transparent'
  } as CSSProperties;

  const navLinks = [
    { id: 'hero', label: 'Início' },
    { id: 'games', label: 'Games' },
    { id: 'research', label: 'Pesquisa' },
    { id: 'about', label: 'Sobre' },
    { id: 'media', label: 'Redes' },
  ];

  return (
    <header
      style={headerStyle}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
        isScrolled 
          ? 'bg-[#07070B]/90 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.8)] py-2' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12 md:h-14">
          
          {/* --- ÁREA DA LOGO --- */}
          <div className="flex items-center gap-3 justify-start">
            <img 
              src={logoLedes} 
              alt="LEDES Games Logo" 
              className="w-9 h-9 md:w-10 md:h-10 object-contain drop-shadow-[0_0_8px_rgba(255,255,255,0.15)]"
            />
            <span className="text-xl md:text-2xl font-syne font-extrabold tracking-wide text-[#F4F7FF]">
              LEDES <span className="transition-colors duration-1000" style={{ color: 'var(--accent)' }}>GAMES</span>
            </span>
          </div>

          {/* --- NAVEGAÇÃO DESKTOP --- */}
          <nav className="hidden md:flex items-center justify-center gap-8 lg:gap-10">
            {navLinks.map((link) => (
              <button 
                key={link.id}
                onClick={() => scrollToSection(link.id)} 
                className="group relative font-cyber text-[10px] lg:text-[11px] uppercase tracking-widest text-[#94A3B8] transition-colors duration-300 hover:text-white"
              >
                {link.label}
                <span 
                  className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-0 h-[2px] transition-all duration-300 group-hover:w-full rounded-full" 
                  style={{ backgroundColor: 'var(--accent)' }} 
                />
              </button>
            ))}
          </nav>

          {/* --- BOTÃO MENU MOBILE --- */}
          <div className="flex justify-end md:hidden">
            <button
              className="p-2 text-[#94A3B8] hover:text-white transition-colors focus:outline-none"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* --- MENU DROPDOWN MOBILE --- */}
        {isMobileMenuOpen && (
          <nav 
            className="md:hidden absolute top-full left-0 w-full bg-[#0A0D18]/95 backdrop-blur-xl border-t border-b shadow-2xl animate-in slide-in-from-top-2"
            style={{ borderColor: 'color-mix(in srgb, var(--accent) 15%, transparent)' }}
          >
            <div className="flex flex-col items-center py-6 gap-6">
              {navLinks.map((link) => (
                <button 
                  key={link.id}
                  onClick={() => scrollToSection(link.id)} 
                  className="font-cyber text-[12px] uppercase tracking-[0.2em] text-[#94A3B8] transition-colors duration-300 hover:text-white"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;