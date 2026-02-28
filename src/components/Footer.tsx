import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import logoUfms from '@/assets/logo-ufms.png';
import logoFacom from '@/assets/logo-facom.png';
import logoLedes from '@/assets/logo-ledes.png';
import logoLedesGames from '@/assets/logo-ledes-games.png';

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-6 flex-wrap">
              <img 
                src={logoUfms} 
                alt="Logo UFMS" 
                className="h-12 w-auto object-contain hover:opacity-80 transition-opacity" 
              />
              <img 
                src={logoFacom} 
                alt="Logo FACOM" 
                className="h-12 w-auto object-contain hover:opacity-80 transition-opacity" 
              />
              <img 
                src={logoLedes} 
                alt="Logo LEDES" 
                className="h-12 w-auto object-contain hover:opacity-80 transition-opacity" 
              />
              <img 
                src={logoLedesGames} 
                alt="Logo LEDES Games" 
                className="h-12 w-auto object-contain hover:opacity-80 transition-opacity" 
              />
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            
            <div>
              <h4 className="font-bold text-sm mb-4 uppercase tracking-wider">NAVEGAÇÃO</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#hero" className="text-foreground/70 hover:text-primary transition-colors text-sm">
                    Início
                  </a>
                </li>
                <li>
                  <a href="#games" className="text-foreground/70 hover:text-primary transition-colors text-sm">
                    Games
                  </a>
                </li>
                <li>
                  <a href="#about" className="text-foreground/70 hover:text-primary transition-colors text-sm">
                    Sobre
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-sm mb-4 uppercase tracking-wider">RECURSOS</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-foreground/70 hover:text-primary transition-colors text-sm">
                    Documentação
                  </a>
                </li>
                <li>
                  <a href="#" className="text-foreground/70 hover:text-primary transition-colors text-sm">
                    Publicações
                  </a>
                </li>
                <li>
                  <a href="#media" className="text-foreground/70 hover:text-primary transition-colors text-sm">
                    Redes
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-sm mb-4 uppercase tracking-wider">LINKS</h4>
              <ul className="space-y-2">
                <li>
                  <a href="https://www.ufms.br" target="_blank" rel="noopener noreferrer" className="text-foreground/70 hover:text-primary transition-colors text-sm">
                    UFMS
                  </a>
                </li>
                <li>
                  <a href="https://facom.ufms.br" target="_blank" rel="noopener noreferrer" className="text-foreground/70 hover:text-primary transition-colors text-sm">
                    FACOM
                  </a>
                </li>
                <li>
                  <a href="#" className="text-foreground/70 hover:text-primary transition-colors text-sm">
                    LEDES
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <div className="flex flex-col justify-center h-full">
                <div className="flex gap-4 flex-wrap">
                  <a
                    href="https://www.instagram.com/ledesfacom/"
                    className="w-10 h-10 border border-border hover:border-primary hover:bg-primary/10 flex items-center justify-center transition-all rounded-md"
                    title="Instagram"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a
                    href="https://www.youtube.com/@ledesgames"
                    className="w-10 h-10 border border-border hover:border-primary hover:bg-primary/10 flex items-center justify-center transition-all rounded-md"
                    title="YouTube"
                  >
                    <Youtube className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>

        <div className="pt-8 border-t border-border text-center">
          <p className="text-sm text-foreground/60">
            © {new Date().getFullYear()} LEDES Games - FACOM/UFMS. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;