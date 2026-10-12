import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
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
    { id: 'about', index: '04', label: 'Laboratório' },
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
        <div className="relative flex items-center justify-between h-14">
          
          {/* Studio Brand */}
          <div 
            onClick={() => scrollToSection('hero')}
            className="flex items-center h-full cursor-pointer select-none z-10 transition-opacity hover:opacity-85 m-0 p-0"
          >
            <img 
              src={logoLedes} 
              alt="LEDES Games Logo" 
              className="h-[75%] w-auto object-contain block m-0 p-0"
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 absolute left-1/2 -translate-x-1/2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="group relative px-4 py-2 flex items-center gap-1.5 font-cyber text-xs uppercase tracking-wider text-[#9999A5] hover:text-white transition-colors"
              >
                <span>{item.label}</span>
                <span className="absolute bottom-0 left-4 right-4 h-[2px] bg-[#0051ff] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </button>
            ))}
          </nav>

          {/* Mobile Menu Toggle Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              type="button"
              className="flex items-center justify-center text-white border border-white/10 hover:bg-white/[0.05] hover:border-[#0051ff] rounded-none w-10 h-10 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Abrir menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
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
                    <span className="text-white font-medium">{item.label}</span>
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-white/40" />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;