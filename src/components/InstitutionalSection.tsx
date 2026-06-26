import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Lightbulb, Users, Wrench, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import team1 from '@/assets/team-1.jpg';
import team2 from '@/assets/team-2.jpg';
import team3 from '@/assets/team-3.jpg';
import { Dialog, DialogContent, DialogTitle, DialogHeader, DialogDescription } from '@/components/ui/dialog';

interface TeamPhoto {
  id: string;
  src: string;
  title: string;
  date: string;
  description: string;
}

const teamPhotos: TeamPhoto[] = [
  {
    id: 'photo-1',
    src: team1,
    title: 'Mini Curso Desenvolvimento de jogos 2D',
    date: 'Agosto de 2025',
    description: 'Aplicação do mini curso de desenvolvimento de jogos 2D feito apresentado por membros do projeto.',
  },
  {
    id: 'photo-2',
    src: team2,
    title: 'Evento da SBGames',
    date: 'Maio de 2025',
    description: 'Participação no evento da SBGames para apresentar o artigo publicado.',
  },
  {
    id: 'photo-3',
    src: team3,
    title: 'Mini Curso Desenvolvimento de jogos 2D',
    date: 'Agosto de 2025',
    description: 'Equipe do mini curso produzido pelo LEDES Games.',
  }
];

const pillars = [
  {
    icon: Lightbulb,
    title: 'Pesquisa & Desenvolvimento',
    description: 'Metodologias inovadoras em engenharia de software aplicadas a games.',
  },
  {
    icon: Users,
    title: 'Equipe Multidisciplinar',
    description: 'Combinamos expertise em programação, design, arte e game design.',
  },
  {
    icon: Wrench,
    title: 'Ferramentas e Criatividade',
    description: 'Utilizamos engines e ferramentas adequadas para criar experiências únicas, focando na arte e na jogabilidade.',
  },
];

const InstitutionalSection = () => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [selectedPhoto, setSelectedPhoto] = useState<TeamPhoto | null>(null);

  const nextPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev + 1) % teamPhotos.length);
  };

  const prevPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev - 1 + teamPhotos.length) % teamPhotos.length);
  };

   const currentPhoto = teamPhotos[currentPhotoIndex];


  return (
    <section id="about" className="py-24 bg-section-bg">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Quem Somos</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            
            <div 
              className="relative aspect-[16/10] overflow-hidden bg-card border border-border cursor-pointer group rounded-md"
              onClick={() => setSelectedPhoto(currentPhoto)}
            >
              <img
                src={currentPhoto.src}
                alt={currentPhoto.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-white font medium px-4 py-2 bg-primary/80 rounded-md backdrop-blur-sm">
                  Clique para ver detalhes
                </span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-4 mt-6">
              <Button
                variant="outline"
                size="icon"
                onClick={prevPhoto}
                className="border-primary/30 hover:bg-primary/10"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <div className="flex gap-2">
                {teamPhotos.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPhotoIndex(index)}
                    className={`w-2 h-2 transition-all ${
                      index === currentPhotoIndex
                        ? 'bg-primary w-8'
                        : 'bg-border hover:bg-primary/50'
                    }`}
                  />
                ))}
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={nextPhoto}
                className="border-primary/30 hover:bg-primary/10"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-start max-w-lg"
          >
            <h3 className="text-3xl font-bold mb-6">LEDES Games</h3>
            <div className="space-y-4 text-foreground/80 leading-relaxed">
              <p>
                O LEDES Games é o laboratório de desenvolvimento de jogos digitais da
                Faculdade de Computação (FACOM) da Universidade Federal de Mato Grosso do Sul (UFMS).
              </p>
              <p>
                Focamos na criação de experiências interativas que combinam entretenimento,
                educação e pesquisa acadêmica. Nossos projetos exploram desde games educacionais
                até experiências artísticas experimentais.
              </p>
              <p>
                Nossa missão é formar desenvolvedores qualificados e produzir games que façam
                diferença, seja no aprendizado, na preservação cultural ou no puro entretenimento.
              </p>
            </div>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full border-2 border-primary/50 bg-primary/5 mb-6">
                  <Icon className="w-10 h-10 text-primary" />
                </div>
                <h4 className="text-xl font-bold mb-3">{pillar.title}</h4>
                <p className="text-foreground/70 leading-relaxed">{pillar.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>

      <Dialog open={!!selectedPhoto} onOpenChange={(open) => !open && setSelectedPhoto((null))}>
        <DialogContent className="max-w-5xl bg-card border-border p-0 overflow-hidden">
          {selectedPhoto && (
            <div className="flex flex-col md:flex-row h-full max-h-[85vh]">
              <div className="p-6 md:p-8 flex flex-col w-full md:w-1/3 bg-muted/30 border-r border-border shirink-0">
                <DialogHeader className="text-left mb-6">
                  <DialogTitle className="text-2xl font-bold text-primary mb-2">
                    {selectedPhoto.title}
                  </DialogTitle>
                  <DialogDescription className="flex items-center gap-22 text-foreground/70 font-medium">
                    <Calendar className="w-4 h-4"/>
                    {selectedPhoto.date}
                  </DialogDescription>
                </DialogHeader>
                
                <div className="text-foreground/80 leading-relaxed text-sm">
                  {selectedPhoto.description}
                </div>

              </div>

              <div className="relative flex-1 bg-black flex items-center justify-center overflow-hideen">
                <div className="relative inline-block max-w-full max-h-full">
                  <img
                    src={selectedPhoto.src}
                    alt={selectedPhoto.title}
                    className="max-h-[85vh] w-auto object-contain"
                  />
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default InstitutionalSection;