import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
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

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background/95 backdrop-blur-sm border-b border-border' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 items-center h-16">
          <div className="flex items-center gap-2 justify-start">
            <img 
              src={logoLedes} 
              alt="LEDES Games Logo" 
              className="w-10 h-10 object-contain"
            />
            <span className="text-xl font-bold">LEDES GAMES</span>
          </div>

          <nav className="hidden md:flex items-center justify-center gap-8">
            <button onClick={() => scrollToSection('hero')} className="text-sm font-medium hover:text-primary transition-colors">
              Início
            </button>
            <button onClick={() => scrollToSection('games')} className="text-sm font-medium hover:text-primary transition-colors">
              Games
            </button>
            <button onClick={() => scrollToSection('research')} className="text-sm font-medium hover:text-primary transition-colors">
              Pesquisa
            </button>
            <button onClick={() => scrollToSection('about')} className="text-sm font-medium hover:text-primary transition-colors">
              Sobre
            </button>
            <button onClick={() => scrollToSection('media')} className="text-sm font-medium hover:text-primary transition-colors">
              Redes
            </button>
          </nav>

          <div className="flex justify-end">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border bg-background/95 backdrop-blur-sm animate-in slide-in-from-top-5">
            <div className="flex flex-col gap-4 items-center">
              <button onClick={() => scrollToSection('hero')} className="text-sm font-medium hover:text-primary py-2">
                Início
              </button>
              <button onClick={() => scrollToSection('games')} className="text-sm font-medium hover:text-primary py-2">
                Games
              </button>
              <button onClick={() => scrollToSection('research')} className="text-sm font-medium hover:text-primary py-2">
                Pesquisa
              </button>
              <button onClick={() => scrollToSection('about')} className="text-sm font-medium hover:text-primary py-2">
                Sobre
              </button>
              <button onClick={() => scrollToSection('media')} className="text-sm font-medium hover:text-primary py-2">
                Redes
              </button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;