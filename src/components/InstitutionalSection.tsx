import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Lightbulb, Users, Wrench } from 'lucide-react';
import { Button } from '@/components/ui/button';
import team1 from '@/assets/team-1.jpg';
import team2 from '@/assets/team-2.jpg';
import team3 from '@/assets/team-3.jpg';

const teamPhotos = [team1, team2, team3];

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
  const [currentPhoto, setCurrentPhoto] = useState(0);

  const nextPhoto = () => {
    setCurrentPhoto((prev) => (prev + 1) % teamPhotos.length);
  };

  const prevPhoto = () => {
    setCurrentPhoto((prev) => (prev - 1 + teamPhotos.length) % teamPhotos.length);
  };

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
            <div className="relative aspect-[16/10] overflow-hidden bg-card border border-border">
              <img
                src={teamPhotos[currentPhoto]}
                alt={`Equipe LEDES ${currentPhoto + 1}`}
                className="w-full h-full object-cover"
              />
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
                    onClick={() => setCurrentPhoto(index)}
                    className={`w-2 h-2 transition-all ${
                      index === currentPhoto
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
    </section>
  );
};

export default InstitutionalSection;