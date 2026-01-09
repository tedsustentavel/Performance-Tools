import React, { useMemo } from 'react';
import { DadosAvaliacao, Notas, GrupoCompetencia, Comentarios, Destaques } from '../../types/performance';
import { competenciasComportamentais, competenciasTecnicas, competenciasLideranca } from '../../constants/performance';
import { RadarChartCustom } from './RadarChartCustom';

interface RelatorioProps {
  dados: DadosAvaliacao;
  notas: Notas;
  comentarios?: Comentarios;
  destaques?: Destaques;
  temLideranca: boolean;
  onExportMD: () => void;
  onExportPDF: () => void;
}

export const Relatorio: React.FC<RelatorioProps> = ({ dados, notas, comentarios = {}, destaques = {}, temLideranca, onExportMD, onExportPDF }) => {
  const { nomeColaborador, cargoColaborador, unidade, nomeGestor, cargoGestor, dataAvaliacao } = dados;
  
  const calcMedia = (comps: GrupoCompetencia) => {
    let t = 0, c = 0;
    Object.values(comps).forEach(comp => comp.dimensoes.forEach(d => { if (notas[d.id]) { t += notas[d.id]; c++; } }));
    return c > 0 ? (t / c).toFixed(1) : "0";
  };

  // Helper para converter nota 1-5 em percentual 0-100%
  const calcPercentual = (mediaStr: string) => {
    const m = parseFloat(mediaStr);
    if (isNaN(m) || m === 0) return 0;
    // Fórmula: (Nota - 1) / 4 * 100. 
    // Ex: 1 -> 0%, 3 -> 50%, 5 -> 100%
    return Math.round(((m - 1) / 4) * 100);
  };

  const mediaComportamental = calcMedia(competenciasComportamentais);
  const mediaTecnica = calcMedia(competenciasTecnicas);
  const mediaLideranca = temLideranca ? calcMedia(competenciasLideranca) : null;
  const totalNotas = (Object.values(notas) as number[]).filter((v: number) => v > 0);
  const mediaGeral = totalNotas.length > 0 ? (totalNotas.reduce((a: number, b: number) => a + b, 0) / totalNotas.length).toFixed(1) : "0";
  
  // Lógica de Inteligência do Relatório
  const analiseEspecialista = useMemo(() => {
    const pontosFortes: { nome: string; nota: number; grupo: string; destacado: boolean }[] = [];
    const pontosDesenvolvimento: { nome: string; nota: number; grupo: string; destacado: boolean }[] = [];

    const processarGrupo = (grupo: GrupoCompetencia, nomeGrupo: string) => {
      Object.values(grupo).forEach(comp => {
        comp.dimensoes.forEach(dim => {
          const nota = notas[dim.id];
          const destacado = destaques[dim.id] || false;
          if (nota >= 4) {
            pontosFortes.push({ nome: dim.nome, nota, grupo: nomeGrupo, destacado });
          } else if (nota <= 3 && nota > 0) {
            pontosDesenvolvimento.push({ nome: dim.nome, nota, grupo: nomeGrupo, destacado });
          }
        });
      });
    };

    processarGrupo(competenciasComportamentais, 'Comportamental');
    processarGrupo(competenciasTecnicas, 'Técnica');
    if (temLideranca) processarGrupo(competenciasLideranca, 'Liderança');

    // Ordenar: destacados primeiro, depois por criticidade
    pontosDesenvolvimento.sort((a, b) => {
      if (a.destacado !== b.destacado) return a.destacado ? -1 : 1;
      return a.nota - b.nota; // Menores notas primeiro
    });
    pontosFortes.sort((a, b) => {
      if (a.destacado !== b.destacado) return a.destacado ? -1 : 1;
      return b.nota - a.nota; // Maiores notas primeiro
    });

    // Texto dinâmico baseado na média geral - TOM FACTUAL
    const media = parseFloat(mediaGeral);
    const perc = calcPercentual(mediaGeral);
    let textoIntro = "";
    let tituloPerfil = "";
    let corPerfil = "";
    let badgeColor = "";

    if (media >= 4.5) {
      tituloPerfil = "Perfil de Alta Performance";
      corPerfil = "from-green-600 to-emerald-800";
      badgeColor = "bg-green-500";
      textoIntro = `A análise quantitativa aponta uma aderência geral de ${perc}%, situando o desempenho na faixa de excelência. Os dados indicam que as competências avaliadas são demonstradas de forma consistente e em nível elevado. Observa-se um perfil que, segundo os indicadores, atua como referência técnica e comportamental no contexto atual.`;
    } else if (media >= 3.5) {
      tituloPerfil = "Perfil Sólido e Consistente";
      corPerfil = "from-blue-600 to-indigo-800";
      badgeColor = "bg-blue-500";
      textoIntro = `A análise quantitativa aponta uma aderência geral de ${perc}%, situando o desempenho na faixa de consistência. Os indicadores sugerem que o colaborador atende plenamente aos requisitos fundamentais da função. As notas atribuídas refletem entregas estáveis, com predominância de avaliações positivas nas competências críticas.`;
    } else if (media >= 2.5) {
      tituloPerfil = "Perfil em Desenvolvimento";
      corPerfil = "from-orange-500 to-amber-700";
      badgeColor = "bg-orange-500";
      textoIntro = `A análise quantitativa aponta uma aderência geral de ${perc}%, situando o desempenho na faixa de desenvolvimento. Os dados mostram oscilações entre as competências avaliadas, indicando áreas onde as expectativas são atendidas e outras que demandam atenção. O cenário sugere a necessidade de um plano de desenvolvimento estruturado.`;
    } else {
      tituloPerfil = "Perfil com Pontos de Atenção";
      corPerfil = "from-red-600 to-rose-800";
      badgeColor = "bg-red-500";
      textoIntro = `A análise quantitativa aponta uma aderência geral de ${perc}%, situando o desempenho abaixo da faixa esperada para a função. As avaliações indicam lacunas significativas nas competências analisadas. Os dados sugerem a priorização imediata de ações corretivas e alinhamento de expectativas.`;
    }

    return { pontosFortes, pontosDesenvolvimento, textoIntro, tituloPerfil, corPerfil, badgeColor };
  }, [notas, mediaGeral, temLideranca, destaques]);

  const radarComportamental = useMemo(() => {
    return Object.entries(competenciasComportamentais).map(([key, comp]) => {
      const media = calcMedia({ [key]: comp });
      return { competencia: comp.nome, valor: parseFloat(media), fullMark: 5 };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notas]);

  const radarTecnica = useMemo(() => {
    return Object.entries(competenciasTecnicas).map(([key, comp]) => {
      const media = calcMedia({ [key]: comp });
      return { competencia: comp.nome, valor: parseFloat(media), fullMark: 5 };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notas]);

  const radarLideranca = useMemo(() => {
    if (!temLideranca) return [];
    return Object.entries(competenciasLideranca).map(([key, comp]) => {
      const media = calcMedia({ [key]: comp });
      return { competencia: comp.nome, valor: parseFloat(media), fullMark: 5 };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notas, temLideranca]);

  // Função auxiliar para renderizar seções de gráficos com resumo
  const renderRadarSection = (titulo: string, icon: string, data: any[], color: string, mediaGrupo: string, grupoRef: GrupoCompetencia) => {
    // Calcular destaques do grupo específico
    let maiorNota = { nome: '-', valor: -1 };
    let menorNota = { nome: '-', valor: 6 };

    Object.values(grupoRef).forEach(comp => {
      comp.dimensoes.forEach(dim => {
        const val = notas[dim.id] || 0;
        if (val > 0) {
          if (val > maiorNota.valor) maiorNota = { nome: dim.nome, valor: val };
          if (val < menorNota.valor) menorNota = { nome: dim.nome, valor: val };
        }
      });
    });

    // Se todas forem iguais ou não houver notas
    if (maiorNota.valor === -1) maiorNota = { nome: 'Não avaliado', valor: 0 };
    if (menorNota.valor === 6) menorNota = { nome: 'Não avaliado', valor: 0 };

    return (
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-8 avoid-break">
        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50 flex items-center gap-3">
          <span className="text-2xl">{icon}</span>
          <h3 className="font-bold text-gray-800 text-lg">{titulo}</h3>
        </div>
        
        <div className="grid md:grid-cols-5 gap-6 p-6">
          {/* Coluna do Gráfico (Maior) */}
          <div className="md:col-span-3 border-r border-gray-100 pr-6">
            <RadarChartCustom data={data} title="" color={color} />
          </div>

          {/* Coluna do Resumo (Menor) */}
          <div className="md:col-span-2 flex flex-col justify-center space-y-6">
            <div className="text-center md:text-left">
              <span className="text-sm text-gray-400 uppercase tracking-wider font-semibold">Aderência do Grupo</span>
              <div className="text-4xl font-bold text-gray-800 mt-1">{calcPercentual(mediaGrupo)}%</div>
              <div className="text-sm text-gray-500 font-medium">Média: {mediaGrupo}/5.0</div>
            </div>

            {maiorNota.valor > 0 && (
              <div className="bg-green-50 p-3 rounded-xl border border-green-100">
                <span className="text-xs font-bold text-green-700 uppercase mb-1 block">Destaque Positivo</span>
                <div className="font-semibold text-gray-800 text-sm">{maiorNota.nome}</div>
                <div className="mt-1 text-xs text-gray-500">Nota atribuída: <strong>{maiorNota.valor}</strong></div>
              </div>
            )}

            {menorNota.valor > 0 && menorNota.valor < 5 && (
              <div className="bg-orange-50 p-3 rounded-xl border border-orange-100">
                 <span className="text-xs font-bold text-orange-700 uppercase mb-1 block">Ponto de Atenção</span>
                 <div className="font-semibold text-gray-800 text-sm">{menorNota.nome}</div>
                 <div className="mt-1 text-xs text-gray-500">Nota atribuída: <strong>{menorNota.valor}</strong></div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderGrupoDetalhe = (titulo: string, comps: GrupoCompetencia, icon: string) => (
    <div className="mb-8 avoid-break">
      <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2 text-lg border-b pb-2">
        <span className="text-2xl">{icon}</span> {titulo}
      </h4>
      <div className="space-y-4">
        {Object.entries(comps).map(([k, comp]) => {
          const m = calcMedia({ [k]: comp });
          return (
            <div key={k} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="bg-gray-50 px-4 py-2 border-b border-gray-100 flex justify-between items-center gap-3">
                <span className="font-semibold text-gray-700 text-sm flex items-center gap-2 whitespace-pre-line flex-1 min-w-0">
                  {comp.icon} {comp.nome}
                </span>
                <span className="text-xs bg-white px-2.5 py-1 rounded border border-gray-200 text-gray-500 font-bold flex items-center justify-center min-w-[70px] shrink-0 print-badge">
                  {calcPercentual(m)}% ({m})
                </span>
              </div>
              <div>
                {comp.dimensoes.map(dim => {
                  const nota = notas[dim.id];
                  const comentario = comentarios[dim.id];
                  const destacado = destaques[dim.id];
                  return (
                    <div key={dim.id} className="p-4 border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                      <div className="flex justify-between items-center gap-3 mb-1">
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                          <span className="text-sm font-medium text-gray-800">{dim.nome}</span>
                          {destacado && (
                            <span className="text-xs bg-yellow-100 w-6 h-6 rounded-full flex items-center justify-center shrink-0 print-badge-star">
                              ⭐
                            </span>
                          )}
                        </div>
                        <span className={`text-xs font-bold px-2.5 py-1.5 rounded min-w-[32px] flex items-center justify-center shrink-0 print-badge ${
                           !nota ? 'bg-gray-100 text-gray-400' :
                           nota >= 4 ? 'bg-green-100 text-green-700' :
                           nota === 3 ? 'bg-orange-100 text-orange-700' :
                           'bg-red-100 text-red-700'
                        }`}>
                          {nota || '-'}
                        </span>
                      </div>
                      {comentario && (
                        <div className="mt-2 p-2 bg-blue-50 rounded-lg border border-blue-100">
                          <p className="text-xs text-gray-700 italic">{comentario}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div id="relatorio-container" className="bg-white shadow-2xl overflow-hidden max-w-4xl mx-auto min-h-screen flex flex-col">
      
      {/* CAPA - HERO SECTION */}
      <div className={`relative ${analiseEspecialista.corPerfil} bg-gradient-to-br text-white p-10 print:p-8`}>
        {/* Marca d'água ou elemento decorativo */}
        <div className="absolute top-0 right-0 p-10 opacity-10 text-9xl">📊</div>
        
        <div className="relative z-10">
          <div className="flex justify-between items-start mb-12">
            <div>
              <p className="opacity-80 text-sm font-medium tracking-wider uppercase mb-2">AVALIAÇÃO DE DESEMPENHO</p>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">{nomeColaborador}</h1>
              <p className="text-xl opacity-90 font-light">{cargoColaborador}</p>
              <div className="mt-2 text-sm opacity-75 flex items-center gap-2">
                <span>📍 {unidade}</span>
              </div>
            </div>
            
            {/* Badge de Resultado */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 text-center min-w-[140px]">
              <div className="text-4xl font-bold">{calcPercentual(mediaGeral)}%</div>
              <div className="text-sm font-medium opacity-90 mt-1">{mediaGeral}/5.0</div>
              <div className="text-xs uppercase tracking-wide opacity-80 mt-1">Média Geral</div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-white/20 pt-8">
            <div>
              <p className="text-xs uppercase opacity-60 mb-1">Data da Avaliação</p>
              <p className="font-semibold">{new Date(dataAvaliacao).toLocaleDateString('pt-BR')}</p>
            </div>
            <div>
              <p className="text-xs uppercase opacity-60 mb-1">Gestor Avaliador</p>
              <p className="font-semibold">{nomeGestor}</p>
            </div>
            <div>
              <p className="text-xs uppercase opacity-60 mb-1">Cargo do Gestor</p>
              <p className="font-semibold">{cargoGestor}</p>
            </div>
            <div className="flex justify-end items-center gap-2">
               <button onClick={onExportMD} className="text-xs bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded transition no-print flex items-center gap-1">
                 📝 Baixar MD
               </button>
               <button onClick={onExportPDF} className="text-xs bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded transition no-print flex items-center gap-1">
                 📄 Baixar PDF
               </button>
            </div>
          </div>
        </div>
      </div>

      {/* CONTEÚDO PRINCIPAL */}
      <div className="p-8 md:p-12 space-y-12">

        {/* 1. Resumo Executivo & Análise */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className={`w-1.5 h-8 ${analiseEspecialista.badgeColor} rounded-full`}></div>
            <h3 className="text-2xl font-bold text-gray-800">Análise de Perfil</h3>
          </div>
          
          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
            <h4 className={`text-lg font-bold mb-3 ${analiseEspecialista.badgeColor.replace('bg-', 'text-')}`}>
              {analiseEspecialista.tituloPerfil}
            </h4>
            <p className="text-gray-700 leading-relaxed text-justify">
              {analiseEspecialista.textoIntro}
            </p>
          </div>

          {/* Indicadores Macro */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
            <div className="p-4 rounded-xl border border-gray-100 text-center">
              <div className="text-orange-500 font-bold text-3xl">{calcPercentual(mediaComportamental)}%</div>
              <div className="text-gray-400 font-medium text-sm">{mediaComportamental}/5.0</div>
              <div className="text-xs text-gray-500 uppercase font-semibold mt-1">Comportamental</div>
            </div>
            <div className="p-4 rounded-xl border border-gray-100 text-center">
              <div className="text-blue-500 font-bold text-3xl">{calcPercentual(mediaTecnica)}%</div>
              <div className="text-gray-400 font-medium text-sm">{mediaTecnica}/5.0</div>
              <div className="text-xs text-gray-500 uppercase font-semibold mt-1">Técnica</div>
            </div>
            {temLideranca && (
              <div className="p-4 rounded-xl border border-gray-100 text-center">
                <div className="text-purple-500 font-bold text-3xl">{calcPercentual(mediaLideranca)}%</div>
                <div className="text-gray-400 font-medium text-sm">{mediaLideranca}/5.0</div>
                <div className="text-xs text-gray-500 uppercase font-semibold mt-1">Liderança</div>
              </div>
            )}
          </div>
        </section>

        {/* 2. Mapeamento Visual (Detalhado por Grupo) */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-1.5 h-8 bg-gray-800 rounded-full"></div>
            <h3 className="text-2xl font-bold text-gray-800">Mapeamento Visual</h3>
          </div>
          
          <div className="space-y-6">
            {renderRadarSection(
              "Competências Comportamentais", 
              "🎯", 
              radarComportamental, 
              "#F97316", 
              mediaComportamental,
              competenciasComportamentais
            )}

            {renderRadarSection(
              "Competências Técnicas", 
              "🔧", 
              radarTecnica, 
              "#3B82F6", 
              mediaTecnica,
              competenciasTecnicas
            )}

            {temLideranca && renderRadarSection(
              "Competências de Liderança", 
              "👑", 
              radarLideranca, 
              "#A855F7", 
              mediaLideranca,
              competenciasLideranca
            )}
          </div>
        </section>

        {/* 3. Plano de Ação (Cards Fortalezas vs Oportunidades) */}
        <section className="avoid-break">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1.5 h-8 bg-gray-800 rounded-full"></div>
            <h3 className="text-2xl font-bold text-gray-800">Direcionamento de Desenvolvimento</h3>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Pontos Fortes */}
            <div>
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-100">
                <h4 className="font-bold text-gray-700 flex items-center gap-2">
                  <span className="text-green-500">★</span> Pontos Fortes (Notas 4-5)
                </h4>
              </div>
              {analiseEspecialista.pontosFortes.length > 0 ? (
                <div className="space-y-3">
                  {analiseEspecialista.pontosFortes.slice(0, 5).map((p, i) => (
                    <div key={i} className={`flex items-center justify-between p-3 rounded-lg border ${
                      p.destacado ? 'bg-yellow-50/50 border-yellow-200' : 'bg-green-50/50 border-green-100'
                    }`}>
                      <div className="flex items-center gap-2">
                        <div>
                          <span className="text-xs font-bold text-green-700 uppercase block mb-0.5">{p.grupo}</span>
                          <span className="text-sm font-medium text-gray-800">{p.nome}</span>
                        </div>
                        {p.destacado && <span className="text-xs">⭐</span>}
                      </div>
                      <span className="bg-white text-green-700 font-bold text-xs px-2 py-1 rounded shadow-sm">{p.nota}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500 italic">Nenhum destaque (nota 4 ou 5) identificado.</p>
              )}
            </div>

            {/* Pontos de Desenvolvimento */}
            <div>
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-100">
                <h4 className="font-bold text-gray-700 flex items-center gap-2">
                  <span className="text-orange-500">⚡</span> Oportunidades (Notas 1-3)
                </h4>
              </div>
              {analiseEspecialista.pontosDesenvolvimento.length > 0 ? (
                <div className="space-y-3">
                  {analiseEspecialista.pontosDesenvolvimento.slice(0, 5).map((p, i) => (
                    <div key={i} className={`flex items-center justify-between p-3 rounded-lg border ${
                      p.destacado ? 'bg-yellow-50/50 border-yellow-200' : 'bg-orange-50/50 border-orange-100'
                    }`}>
                      <div className="flex items-center gap-2">
                        <div>
                          <span className="text-xs font-bold text-orange-700 uppercase block mb-0.5">{p.grupo}</span>
                          <span className="text-sm font-medium text-gray-800">{p.nome}</span>
                        </div>
                        {p.destacado && <span className="text-xs">⭐</span>}
                      </div>
                      <span className="bg-white text-orange-700 font-bold text-xs px-2 py-1 rounded shadow-sm">{p.nota}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500 italic">Nenhum ponto crítico (nota 1, 2 ou 3) identificado.</p>
              )}
            </div>
          </div>
        </section>

        {/* 4. Detalhamento (Tabelas) */}
        <section className="pt-8 border-t border-gray-100">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-1.5 h-8 bg-gray-300 rounded-full"></div>
            <h3 className="text-xl font-bold text-gray-400">Detalhamento das Dimensões</h3>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
             <div>
               {renderGrupoDetalhe("Competências Comportamentais", competenciasComportamentais, "📊")}
             </div>
             <div>
               {renderGrupoDetalhe("Competências Técnicas", competenciasTecnicas, "🔧")}
               {temLideranca && renderGrupoDetalhe("Competências de Liderança", competenciasLideranca, "👑")}
             </div>
          </div>
        </section>

        {/* Assinaturas */}
        <section className="pt-16 pb-8 avoid-break">
          <div className="grid grid-cols-2 gap-12">
            <div className="border-t border-gray-300 pt-4 text-center">
              <p className="font-bold text-gray-800">{nomeColaborador}</p>
              <p className="text-xs text-gray-500 uppercase mt-1">Colaborador</p>
            </div>
            <div className="border-t border-gray-300 pt-4 text-center">
              <p className="font-bold text-gray-800">{nomeGestor}</p>
              <p className="text-xs text-gray-500 uppercase mt-1">Gestor</p>
            </div>
          </div>
        </section>

      </div>
      
      {/* Footer da Página */}
      <div className="bg-gray-50 border-t border-gray-200 p-6 text-center text-xs text-gray-400 print:hidden">
        <p>Sistema de Avaliação de Competências T&D Sustentável • Confidencial</p>
      </div>

      <style>{`
        /* Estilos aplicados durante geração de PDF */
        .generating-pdf * {
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
          color-adjust: exact !important;
        }
        
        @media print {
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
          }
          
          .avoid-break {
            break-inside: avoid;
            page-break-inside: avoid;
          }
          
          body {
            background-color: white;
            margin: 0;
            padding: 0;
          }
          
          #relatorio-container {
            box-shadow: none;
            max-width: 100%;
            margin: 0;
            padding: 0;
          }
          
          /* Preservar gradientes e cores de fundo */
          [class*="bg-gradient-to"] {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          
          /* Preservar todas as cores de fundo */
          [class*="bg-"] {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          
          /* Preservar bordas e sombras */
          [class*="border"], [class*="shadow"] {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          
          /* Estilos para badges na seção de detalhamento */
          .print-badge {
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            text-align: center !important;
            box-sizing: border-box !important;
            overflow: hidden !important;
            white-space: nowrap !important;
            flex-shrink: 0 !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            line-height: 1 !important;
          }
          
          .print-badge-star {
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            box-sizing: border-box !important;
            flex-shrink: 0 !important;
            width: 24px !important;
            height: 24px !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            line-height: 1 !important;
          }
          
          /* Garantir alinhamento correto dos elementos na seção de detalhamento */
          .bg-gray-50.px-4.py-2.flex {
            align-items: center !important;
            gap: 12px !important;
          }
          
          .p-4.border-b > .flex {
            align-items: center !important;
            gap: 12px !important;
          }
          
          /* Garantir que badges não quebrem */
          .print-badge, .print-badge-star {
            word-break: keep-all !important;
            overflow-wrap: normal !important;
          }
          
          /* Garantir que os elementos flex não quebrem */
          .flex {
            display: flex !important;
            box-sizing: border-box !important;
          }
          
          /* Garantir que porcentagens e números não saiam das caixas */
          [class*="bg-white"], [class*="bg-gray-100"], [class*="bg-green-100"], 
          [class*="bg-orange-100"], [class*="bg-red-100"], [class*="bg-yellow-100"],
          [class*="bg-blue-50"], [class*="bg-purple-50"], [class*="bg-gray-50"] {
            box-sizing: border-box !important;
            overflow: hidden !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          
          /* Garantir alinhamento correto dos elementos na seção de detalhamento */
          .bg-gray-50.px-4.py-2 {
            display: flex !important;
            align-items: center !important;
            justify-content: space-between !important;
            box-sizing: border-box !important;
          }
          
          .p-4.border-b {
            display: flex !important;
            flex-direction: column !important;
            box-sizing: border-box !important;
          }
          
          .p-4.border-b > .flex {
            display: flex !important;
            align-items: flex-start !important;
            justify-content: space-between !important;
            width: 100% !important;
            box-sizing: border-box !important;
          }
          
          /* Preservar espaçamentos */
          [class*="p-"], [class*="m-"], [class*="gap-"], [class*="space-"] {
            box-sizing: border-box !important;
          }
          
          /* Preservar grid e layout */
          [class*="grid"], [class*="flex"] {
            box-sizing: border-box !important;
          }
          
          /* Garantir que textos não quebrem */
          h1, h2, h3, h4, h5, h6, p, span, div {
            orphans: 3;
            widows: 3;
          }
          
          /* Preservar rounded corners */
          [class*="rounded"] {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          
          /* Garantir que ícones e emojis sejam renderizados */
          [class*="text-"] {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
        }
      `}</style>
    </div>
  );
};