import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import GameGrid from '@/components/GameGrid';
import ResearchSection from '@/components/ResearchSection';
import InstitutionalSection from '@/components/InstitutionalSection';
import MediaSection from '@/components/MediaSection';
import Footer from '@/components/Footer';
import { ScrollColorProvider, useScrollColor } from '@/context/ScrollColorContext';

const MainLayout = () => {
  const { theme } = useScrollColor();
  
  return (
    <div 
      className="min-h-screen text-foreground font-sans transition-colors duration-1000 ease-in-out"
      style={{ backgroundColor: theme.bg }}
    >
      <Header />
      <main>
        <HeroSection />
        <GameGrid />
        <ResearchSection />
        <InstitutionalSection />
        <MediaSection />
      </main>
      <Footer />
    </div>
  );
};

const Index = () => {
  return (
    <ScrollColorProvider>
      <MainLayout />
    </ScrollColorProvider>
  );
};

export default Index;