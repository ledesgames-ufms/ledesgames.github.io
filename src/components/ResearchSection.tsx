import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowUpRight, ChevronLeft, ChevronRight, User } from 'lucide-react';
// Importação ajustada para o arquivo separado que você criou
import { publications, Publication } from '@/data/Publications';

const ITEMS_PER_PAGE = 3;

const Research = () => {
  const [activeFilter, setActiveFilter] = useState<'todos' | 'artigo' | 'monografia'>('todos');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredPublications = publications.filter((pub) => {
    if (activeFilter === 'todos') return true;
    
    const lowerType = pub.type.toLowerCase();
    
    if (activeFilter === 'artigo') {
      return lowerType.includes('artigo') || lowerType.includes('paper') || lowerType.includes('resumo') || lowerType.includes('congresso');
    }
    if (activeFilter === 'monografia') {
      return lowerType.includes('tcc') || lowerType.includes('tese') || lowerType.includes('dissertação') || lowerType.includes('monografia');
    }

    return true;
  });

  const totalPages = Math.ceil(filteredPublications.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = filteredPublications.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleFilterChange = (filter: 'todos' | 'artigo' | 'monografia') => {
    setActiveFilter(filter);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      document.getElementById('research-list')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  return (
    <section id="research" className="py-24 bg-muted/20">
      <div className="container mx-auto px-4 max-w-5xl">
        
        {/* Cabeçalho */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Pesquisas e Publicações</h2>
          <p className="text-foreground/70 max-w-4xl mx-auto text-lg">
            No LEDES Games, desenvolver jogos digitais e pesquisar caminham lado a lado!<br/>
            Conheça nossas contribuições para a ciência e engenharia de software.
          </p>
        </motion.div>

        {/* Filtros */}
        <div className="flex items-center gap-4 mb-12 flex-wrap">
          <FilterButton 
            active={activeFilter === 'todos'} 
            onClick={() => handleFilterChange('todos')}
          >
            Todos
          </FilterButton>
          <FilterButton 
            active={activeFilter === 'artigo'} 
            onClick={() => handleFilterChange('artigo')}
          >
            Artigos
          </FilterButton>
          <FilterButton 
            active={activeFilter === 'monografia'} 
            onClick={() => handleFilterChange('monografia')}
          >
            Monografias
          </FilterButton>
        </div>

        {/* Lista */}
        <div id="research-list" className="space-y-6 min-h-[400px]">
          <AnimatePresence mode="wait">
            {currentItems.length > 0 ? (
              currentItems.map((pub) => (
                <ResearchCard key={pub.id} publication={pub} />
              ))
            ) : (
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="text-center py-12 text-muted-foreground bg-muted/20 rounded-lg border border-border/50"
              >
                Nenhum item encontrado nesta categoria.
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Paginação */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-12">
            <Button
              variant="default"
              size="icon"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="rounded-md w-10 h-10"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            
            <span className="text-sm font-medium text-muted-foreground">
              Página {currentPage} de {totalPages}
            </span>

            <Button
              variant="default"
              size="icon"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="rounded-md w-10 h-10"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        )}

      </div>
    </section>
  );
};

const FilterButton = ({ active, children, onClick }: { active: boolean, children: React.ReactNode, onClick: () => void }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-300 ${
      active 
        ? 'bg-primary/20 text-primary border border-primary/20' 
        : 'text-foreground/60 hover:text-foreground hover:bg-muted'
    }`}
  >
    {children}
  </button>
);

const ResearchCard = ({ publication }: { publication: Publication }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="bg-card/50 border-border/60 p-6 md:p-8 hover:border-primary/40 transition-colors group relative overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center gap-4 mb-4">
          <Badge variant="secondary" className="bg-muted text-foreground/80 hover:bg-muted font-normal px-3 py-1 rounded-full border border-border/50">
            {publication.type}
          </Badge>
          <span className="text-xs md:text-sm text-muted-foreground">
            {publication.date}
          </span>
        </div>

        {/* Título */}
        <h3 className="text-2xl font-bold text-primary mb-4 leading-tight group-hover:text-primary/90 transition-colors">
          {publication.title}
        </h3>

        {/* Resumo */}
        <p className="text-foreground/70 mb-8 leading-relaxed line-clamp-3 md:w-3/4">
          {publication.abstract}
        </p>

        {/* Footer */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-t border-border/30 pt-6 mt-auto">
          
          {/* Exibição de Autores */}
          <div className="flex-1">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold mb-2 flex items-center gap-1">
              <User className="w-3 h-3" /> Autores
            </p>
            <p className="text-sm font-medium text-foreground/90">
              {publication.authors}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {publication.conference}
            </p>
          </div>

          {/* Botão */}
          <Button 
            className="self-start md:self-end bg-muted/50 text-foreground hover:bg-primary hover:text-primary-foreground border border-border/50 hover:border-primary/50 transition-all duration-300 gap-2 pl-6 pr-4 h-12 shrink-0"
            asChild
          >
            <a href={publication.link} target="_blank" rel="noopener noreferrer">
              {publication.type.toLowerCase().includes('artigo') ? 'Ler artigo' : 'Ler documento'}
              <ArrowUpRight className="w-4 h-4 ml-1" />
            </a>
          </Button>

        </div>
      </Card>
    </motion.div>
  );
};

export default Research;