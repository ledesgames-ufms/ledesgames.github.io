import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ChevronLeft, ChevronRight, User, BookOpen } from 'lucide-react';
import { publications, Publication } from '@/data/Publications';

const ITEMS_PER_PAGE = 3;

const ResearchSection = () => {
  const [activeFilter, setActiveFilter] = useState<'todos' | 'artigo' | 'monografia'>('todos');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredPublications = publications.filter((pub) => {
    if (activeFilter === 'todos') return true;
    
    const lowerType = pub.type.toLowerCase();
    if (activeFilter === 'artigo') {
      return lowerType.includes('artigo') || lowerType.includes('paper') || lowerType.includes('resumo') || lowerType.includes('congresso') || lowerType.includes('sbsi');
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
    <section id="research" className="relative py-28 bg-[#F4F4F6] text-[#08080A] border-b border-zinc-300 overflow-hidden">
      
      <div className="container mx-auto px-4 lg:px-8 max-w-6xl relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-[#71717A] mb-2">
            <span className="w-1.5 h-1.5 bg-[#0051ff]" />
            <span>PRODUÇÃO CIENTÍFICA // FACOM UFMS</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2 className="font-display text-4xl sm:text-6xl uppercase tracking-wider text-[#08080A] leading-none">
                Pesquisa & <span className="text-[#0051ff]">Publicações</span>
              </h2>
              <p className="text-[#52525B] font-sans text-base max-w-2xl mt-3 leading-relaxed">
                No LEDES Games, desenvolver jogos digitais e pesquisar engenharia de software caminham lado a lado. Conheça nossas contribuições para a ciência.
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-1.5 border border-zinc-300 bg-white p-1 shrink-0 shadow-sm">
              <button 
                onClick={() => handleFilterChange('todos')}
                className={`px-3.5 py-1.5 font-cyber text-xs uppercase tracking-wider transition-all ${
                  activeFilter === 'todos'
                    ? 'bg-[#0051ff] text-white font-bold shadow-sm'
                    : 'text-[#52525B] hover:text-black hover:bg-zinc-100'
                }`}
              >
                Todos ({publications.length})
              </button>

              <button 
                onClick={() => handleFilterChange('artigo')}
                className={`px-3.5 py-1.5 font-cyber text-xs uppercase tracking-wider transition-all ${
                  activeFilter === 'artigo'
                    ? 'bg-[#0051ff] text-white font-bold shadow-sm'
                    : 'text-[#52525B] hover:text-black hover:bg-zinc-100'
                }`}
              >
                Artigos
              </button>

              <button 
                onClick={() => handleFilterChange('monografia')}
                className={`px-3.5 py-1.5 font-cyber text-xs uppercase tracking-wider transition-all ${
                  activeFilter === 'monografia'
                    ? 'bg-[#0051ff] text-white font-bold shadow-sm'
                    : 'text-[#52525B] hover:text-black hover:bg-zinc-100'
                }`}
              >
                Monografias
              </button>
            </div>
          </div>
        </motion.div>

        {/* Publications List */}
        <div id="research-list" className="space-y-6 min-h-[350px]">
          <AnimatePresence mode="wait">
            {currentItems.length > 0 ? (
              currentItems.map((pub) => (
                <ResearchCard key={pub.id} publication={pub} />
              ))
            ) : (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }}
                className="text-center py-16 text-[#71717A] bg-white border border-zinc-300 p-8 font-mono text-sm shadow-sm"
              >
                [ NENHUM DOCUMENTO LOCALIZADO NESTA CATEGORIA ]
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Pagination Bar */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-12 pt-6 border-t border-zinc-300 font-mono text-xs">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 border border-zinc-300 bg-white text-[#08080A] disabled:opacity-30 hover:border-[#0051ff] transition-colors shadow-sm"
              aria-label="Página anterior"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            
            <span className="text-[#52525B] uppercase tracking-wider">
              PÁGINA <span className="text-[#08080A] font-bold">{currentPage}</span> DE <span className="text-[#08080A]">{totalPages}</span>
            </span>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 border border-zinc-300 bg-white text-[#08080A] disabled:opacity-30 hover:border-[#0051ff] transition-colors shadow-sm"
              aria-label="Próxima página"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </section>
  );
};

const ResearchCard = ({ publication }: { publication: Publication }) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.3 }}
      className="group relative bg-white border border-zinc-300 hover:border-[#0051ff] transition-all duration-300 p-6 sm:p-8 shadow-sm"
    >
      {/* Corner Marks */}
      <span className="absolute top-2 left-2 font-mono text-[9px] text-[#0051ff] select-none font-bold">+ DOC_{publication.id}</span>
      <span className="absolute top-2 right-2 font-mono text-[9px] text-[#A1A1AA] select-none">ARCHIVE.FACOM</span>

      {/* Meta Top Line */}
      <div className="flex flex-wrap items-center gap-3 mb-4 mt-2">
        <span className="px-2.5 py-0.5 bg-[#0051ff] text-white font-mono text-[10px] font-bold uppercase tracking-wider">
          {publication.type}
        </span>

        <span className="px-2.5 py-0.5 bg-zinc-100 border border-zinc-200 font-mono text-[10px] text-[#3F3F46] uppercase tracking-wider font-semibold">
          {publication.conference}
        </span>

        <span className="font-mono text-xs text-[#71717A]">
          {publication.date}
        </span>
      </div>

      {/* Article Title */}
      <h3 className="font-display text-2xl sm:text-3xl text-[#08080A] uppercase tracking-wider mb-4 group-hover:text-[#0051ff] transition-colors leading-snug">
        {publication.title}
      </h3>

      {/* Abstract */}
      <p className="text-[#52525B] font-sans text-sm sm:text-base leading-relaxed mb-6">
        {publication.abstract}
      </p>

      {/* Footer Info & Action */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-t border-zinc-200 pt-5 mt-auto">
        
        {/* Authors Roster */}
        <div className="flex-1">
          <p className="font-mono text-[10px] uppercase tracking-wider text-[#71717A] font-bold mb-1 flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-[#0051ff]" /> AUTORES & PESQUISADORES
          </p>
          <p className="font-sans text-sm font-medium text-[#18181B]">
            {publication.authors}
          </p>
        </div>

        {/* Read Document Link */}
        <a 
          href={publication.link} 
          target="_blank" 
          rel="noopener noreferrer"
          className="self-start md:self-end px-6 py-2.5 bg-[#08080A] text-white hover:bg-[#0051ff] font-cyber font-bold text-xs uppercase tracking-widest transition-all duration-300 flex items-center gap-2 tech-cut-sm shrink-0 shadow-md"
        >
          <span>{publication.type.toLowerCase().includes('artigo') ? 'Acessar Artigo' : 'Ver Documento'}</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </a>

      </div>
    </motion.article>
  );
};

export default ResearchSection;