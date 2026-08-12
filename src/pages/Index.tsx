import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import GameGrid from '@/components/GameGrid';
import ResearchSection from '@/components/ResearchSection';
import InstitutionalSection from '@/components/InstitutionalSection';
import MediaSection from '@/components/MediaSection';
import Footer from '@/components/Footer';
import { BackgroundGrid } from '@/components/ui/background-grid';

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <BackgroundGrid></BackgroundGrid>
      <HeroSection />
      <GameGrid />
      <ResearchSection />
      <InstitutionalSection />
      <MediaSection />
      <Footer />
    </div>
  );
};

export default Index;