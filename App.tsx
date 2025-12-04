import React, { useState, useEffect } from 'react';
import Home from './pages/Home';
import PerformanceApp from './pages/PerformanceApp';
import MarcaProApp from './pages/MarcaProApp';

export default function App() {
  const [currentRoute, setCurrentRoute] = useState('/');

  useEffect(() => {
    // Carregar rota do hash
    const hash = window.location.hash.slice(1) || '/';
    setCurrentRoute(hash);

    // Listener para mudanças no hash
    const handleHashChange = () => {
      const newHash = window.location.hash.slice(1) || '/';
      setCurrentRoute(newHash);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (route: string) => {
    window.location.hash = route;
    setCurrentRoute(route);
  };

  // Header Global do Hub (aparece apenas na home)
  const renderHeader = () => {
    if (currentRoute === '/') {
      return (
        <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200/50">
          <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-xl">🎯</span>
              </div>
              <span className="font-bold text-lg tracking-tight text-gray-900">
                Hub Gestores
              </span>
            </div>
          </div>
        </header>
      );
    }

    // Header para subpáginas com botão de voltar
    return (
      <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            Voltar ao Hub
          </button>
        </div>
      </header>
    );
  };

  // Renderizar a página correta baseada na rota
  const renderPage = () => {
    switch (currentRoute) {
      case '/':
        return <Home onNavigate={navigate} />;
      case '/performance':
        return <PerformanceApp />;
      case '/marca-pro':
        return <MarcaProApp />;
      default:
        return <Home onNavigate={navigate} />;
    }
  };

  return (
    <>
      {renderHeader()}
      {renderPage()}
    </>
  );
}
