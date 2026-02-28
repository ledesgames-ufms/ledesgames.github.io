import { motion } from 'framer-motion';
import { Mail, MapPin, Instagram, Youtube } from 'lucide-react';

const MediaSection = () => {
  return (
    <section id="media" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Conecte-se Conosco</h2>
          <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
            Encontre-nos no campus ou acompanhe nossos projetos nas redes sociais.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          
          {/* Endereço */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col items-center text-center p-6 bg-card border border-border rounded-lg hover:border-primary/50 transition-colors"
          >
            <div className="w-12 h-12 bg-primary/10 border border-primary/30 flex items-center justify-center rounded-full mb-4">
              <MapPin className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-bold text-lg mb-2">Visite-nos</h3>
            <p className="text-foreground/70 text-sm leading-relaxed">
              FACOM - UFMS<br />
              Cidade Universitária<br />
              Campo Grande - MS
            </p>
            
          </motion.div>

          {/* Email */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col items-center text-center p-6 bg-card border border-border rounded-lg hover:border-primary/50 transition-colors"
          >
            <div className="w-12 h-12 bg-primary/10 border border-primary/30 flex items-center justify-center rounded-full mb-4">
              <Mail className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-bold text-lg mb-2">Email</h3>
            <p className="text-foreground/70 text-sm mb-4">
              Fale com nossa equipe
            </p>
            <a 
              href="mailto:ledesgames.facom@ufms.br" 
              className="text-primary hover:underline font-medium"
            >
              ledesgames.facom@ufms.br
            </a>
          </motion.div>

          {/* Instagram */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col items-center text-center p-6 bg-card border border-border rounded-lg hover:border-primary/50 transition-colors"
          >
            <div className="w-12 h-12 bg-primary/10 border border-primary/30 flex items-center justify-center rounded-full mb-4">
              <Instagram className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-bold text-lg mb-2">Instagram</h3>
            <p className="text-foreground/70 text-sm mb-4">
              Acompanhe novidades e bastidores
            </p>
            <a 
              href="https://www.instagram.com/ledesfacom/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline font-medium"
            >
              @ledesfacom
            </a>
          </motion.div>

          {/* YouTube */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col items-center text-center p-6 bg-card border border-border rounded-lg hover:border-primary/50 transition-colors"
          >
            <div className="w-12 h-12 bg-primary/10 border border-primary/30 flex items-center justify-center rounded-full mb-4">
              <Youtube className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-bold text-lg mb-2">YouTube</h3>
            <p className="text-foreground/70 text-sm mb-4">
              Assista nossos trailers e gameplays
            </p>
            <a 
              href="https://www.youtube.com/@ledesgames" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline font-medium"
            >
              Inscreva-se
            </a>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default MediaSection;