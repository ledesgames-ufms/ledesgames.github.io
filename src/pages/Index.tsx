import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import GamesSection from '@/components/GamesSection';
import ResearchSection from '@/components/ResearchSection';
import InstitutionalSection from '@/components/InstitutionalSection';
import MediaSection from '@/components/MediaSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-[#08080A] text-foreground font-sans">
      <Header />
      <main>
        <HeroSection />
        <GamesSection />
        <ResearchSection />
        <InstitutionalSection />
        <MediaSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;