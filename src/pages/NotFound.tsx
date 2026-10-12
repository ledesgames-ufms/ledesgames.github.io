import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#08080A] text-white">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-display uppercase tracking-wider text-[#0051ff]">404</h1>
        <p className="mb-6 text-xl text-[#9999A5]">Página não encontrada</p>
        <Link 
          to="/" 
          className="inline-block px-5 py-2.5 bg-[#0051ff] text-white font-cyber text-xs uppercase tracking-wider hover:bg-white hover:text-black transition-colors"
        >
          Voltar ao Início
        </Link>
      </div>
    </div>
  );
};

export default NotFound;