import React, { useEffect, useState } from 'react';

interface HomeProps {
  onNavigate: (route: string) => void;
}

export default function Home({ onNavigate }: HomeProps) {
  const [stats, setStats] = useState({
    avaliacoes: 0,
    feedbacks: 0
  });

  useEffect(() => {
    // Carregar estatísticas do localStorage
    const avaliacaoRascunho = localStorage.getItem('avaliacao_rascunho');
    const marcaFeedbacks = localStorage.getItem('marca_feedbacks');
    
    let avaliacoesCount = 0;
    let feedbacksCount = 0;

    if (avaliacaoRascunho) {
      try {
        const data = JSON.parse(avaliacaoRascunho);
        if (data.dados && data.dados.nomeColaborador) {
          avaliacoesCount = 1;
        }
      } catch (e) {
        console.error('Erro ao ler avaliações:', e);
      }
    }

    if (marcaFeedbacks) {
      try {
        const feedbacks = JSON.parse(marcaFeedbacks);
        if (Array.isArray(feedbacks)) {
          feedbacksCount = feedbacks.length;
        }
      } catch (e) {
        console.error('Erro ao ler feedbacks:', e);
      }
    }

    setStats({ avaliacoes: avaliacoesCount, feedbacks: feedbacksCount });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      {/* Hero Section */}
      <div className="pt-20 pb-16 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl">
              <span className="text-3xl">🎯</span>
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
            Hub de Ferramentas
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              para Gestores
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Tudo que você precisa para desenvolver pessoas e gerar resultados em um só lugar.
          </p>
        </div>
      </div>

      {/* Tools Grid */}
      <div className="max-w-6xl mx-auto px-6 pb-20">
        <div className="grid md:grid-cols-2 gap-8">
          
          {/* Card 1: Avaliação de Competências */}
          <div 
            onClick={() => onNavigate('/performance')}
            className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer border border-gray-100 hover:border-blue-200 hover:-translate-y-2"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-full -mr-16 -mt-16 opacity-50 group-hover:opacity-70 transition-opacity"></div>
            
            <div className="relative z-10">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-lg group-hover:scale-110 transition-transform">
                📊
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                Avaliação de Competências
              </h2>
              
              <p className="text-gray-600 leading-relaxed mb-6">
                Sistema completo de avaliação T&D com análise comportamental, técnica e de liderança. Gere relatórios visuais com gráficos de radar.
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-semibold">
                  12 Competências Comportamentais
                </span>
                <span className="px-3 py-1 bg-cyan-50 text-cyan-700 rounded-full text-xs font-semibold">
                  12 Competências Técnicas
                </span>
                <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-xs font-semibold">
                  9 Competências de Liderança
                </span>
              </div>

              {stats.avaliacoes > 0 && (
                <div className="flex items-center gap-2 text-sm text-blue-600 font-medium mb-4">
                  <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
                  {stats.avaliacoes} avaliação em andamento
                </div>
              )}

              <div className="flex items-center gap-2 text-blue-600 font-semibold group-hover:gap-3 transition-all">
                Acessar ferramenta
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          </div>

          {/* Card 2: MARCA Pro Feedback */}
          <div 
            onClick={() => onNavigate('/marca-pro')}
            className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer border border-gray-100 hover:border-purple-200 hover:-translate-y-2"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full -mr-16 -mt-16 opacity-50 group-hover:opacity-70 transition-opacity"></div>
            
            <div className="relative z-10">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-lg group-hover:scale-110 transition-transform">
                💬
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                MARCA Pro Feedback
              </h2>
              
              <p className="text-gray-600 leading-relaxed mb-6">
                Ferramenta de feedback estruturado usando metodologia MARCA com assistência de IA. Crie feedbacks profissionais conversando com um coach virtual.
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-xs font-semibold">
                  Coaching com IA
                </span>
                <span className="px-3 py-1 bg-pink-50 text-pink-700 rounded-full text-xs font-semibold">
                  Metodologia MARCA
                </span>
                <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-semibold">
                  Comunicação Não-Violenta
                </span>
              </div>

              {stats.feedbacks > 0 && (
                <div className="flex items-center gap-2 text-sm text-purple-600 font-medium mb-4">
                  <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                  {stats.feedbacks} {stats.feedbacks === 1 ? 'feedback salvo' : 'feedbacks salvos'}
                </div>
              )}

              <div className="flex items-center gap-2 text-purple-600 font-semibold group-hover:gap-3 transition-all">
                Acessar ferramenta
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          </div>

        </div>

        {/* Info Cards */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-100">
            <div className="text-3xl mb-3">⚡</div>
            <h3 className="font-bold text-gray-900 mb-2">Tudo Local</h3>
            <p className="text-sm text-gray-600">Seus dados ficam salvos no navegador. Privacidade total.</p>
          </div>
          
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-100">
            <div className="text-3xl mb-3">🎯</div>
            <h3 className="font-bold text-gray-900 mb-2">Prático e Profissional</h3>
            <p className="text-sm text-gray-600">Ferramentas desenhadas para o dia a dia da gestão de pessoas.</p>
          </div>
          
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-100">
            <div className="text-3xl mb-3">💡</div>
            <h3 className="font-bold text-gray-900 mb-2">Sempre Disponível</h3>
            <p className="text-sm text-gray-600">Acesse de qualquer lugar, a qualquer momento.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

