import React, { useState, useMemo, useEffect } from 'react';
import { 
  cargos, 
  competenciasComportamentais, 
  competenciasTecnicas, 
  competenciasLideranca 
} from '../constants/performance';
import { DadosAvaliacao, Notas, Dimensao, Comentarios, Destaques } from '../types/performance';
import { gerarMarkdown, gerarPDF } from '../services/performance/exportService';
import { ProgressBar } from '../components/performance/ProgressBar';
import { Relatorio } from '../components/performance/Relatorio';
import { NivelSelector } from '../components/performance/NivelSelector';
import { Modal } from '../components/shared/Modal';

// Tipos para o fluxo do Wizard
type WizardStepType = 'intro' | 'cover' | 'question';

interface WizardStep {
  type: WizardStepType;
  id: string; // identificador único do passo
  // Propriedades para 'question'
  dimension?: Dimensao & {
    competenciaNome: string;
    competenciaIcon: string;
    competenciaCor: string;
    grupo: string;
  };
  // Propriedades para 'intro' e 'cover'
  title?: string;
  description?: string;
  icon?: string;
  color?: string;
}

export default function PerformanceApp() {
  const [step, setStep] = useState(0); // 0: FormDados, 1: Avaliação
  const [dados, setDados] = useState<DadosAvaliacao>({ 
    nomeColaborador: '', 
    cargoColaborador: '', 
    unidade: '', 
    nomeGestor: '', 
    cargoGestor: '', 
    dataAvaliacao: new Date().toISOString().split('T')[0] 
  });
  const [notas, setNotas] = useState<Notas>({});
  const [comentarios, setComentarios] = useState<Comentarios>({});
  const [destaques, setDestaques] = useState<Destaques>({});
  const [showReport, setShowReport] = useState(false);
  const [showContinueModal, setShowContinueModal] = useState(false);
  const [savedData, setSavedData] = useState<{ dados: DadosAvaliacao; notas: Notas; comentarios?: Comentarios; destaques?: Destaques } | null>(null);
  
  // Estados para modais
  const [modalConfig, setModalConfig] = useState<{
    isOpen: boolean;
    type: 'confirm' | 'alert' | 'error' | 'warning';
    title: string;
    message: string;
    onConfirm?: () => void;
    confirmText?: string;
    cancelText?: string;
    confirmColor?: string;
  }>({
    isOpen: false,
    type: 'alert',
    title: '',
    message: ''
  });
  
  // Controle do Wizard (Índice da lista de passos mistos)
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const temLideranca = useMemo(() => cargos.find(c => c.value === dados.cargoColaborador)?.lideranca || false, [dados.cargoColaborador]);

  useEffect(() => {
    if (step > 0) {
      const saveData = { dados, notas, comentarios, destaques, timestamp: Date.now() };
      localStorage.setItem('avaliacao_rascunho', JSON.stringify(saveData));
    }
  }, [dados, notas, comentarios, destaques, step]);

  useEffect(() => {
    const saved = localStorage.getItem('avaliacao_rascunho');
    if (saved) {
      try {
        const { dados: savedDados, notas: savedNotas, comentarios: savedComentarios, destaques: savedDestaques } = JSON.parse(saved);
        if (savedDados.nomeColaborador && Object.keys(savedNotas).length > 0) {
          setSavedData({ dados: savedDados, notas: savedNotas, comentarios: savedComentarios, destaques: savedDestaques });
          setShowContinueModal(true);
        }
      } catch (e) {
        console.error('Erro ao carregar rascunho:', e);
      }
    }
  }, []);

  const handleContinueEvaluation = () => {
    if (savedData) {
      setDados(savedData.dados);
      setNotas(savedData.notas);
      setComentarios(savedData.comentarios || {});
      setDestaques(savedData.destaques || {});
      setStep(1);
    }
    setShowContinueModal(false);
  };

  const handleStartNew = () => {
    localStorage.removeItem('avaliacao_rascunho');
    setSavedData(null);
    setShowContinueModal(false);
  };

  // Construção do Fluxo do Wizard (Steps)
  const wizardSteps = useMemo(() => {
    const steps: WizardStep[] = [];

    // 1. Capa Geral (Intro)
    steps.push({
      type: 'intro',
      id: 'intro_geral',
      title: 'Diretrizes da Avaliação',
      description: 'Bem-vindo à ferramenta de avaliação de competências. Você passará por diferentes grupos de competências. Leia atentamente cada definição e escolha o nível que melhor descreve o comportamento observado no dia a dia.',
      icon: '👋',
      color: 'bg-gradient-to-br from-gray-800 to-gray-900'
    });

    // Função auxiliar para adicionar grupo
    const addGroup = (grupoObj: any, nomeGrupo: string, iconGrupo: string, corGrupo: string, descGrupo: string) => {
      // Capa da Seção
      steps.push({
        type: 'cover',
        id: `cover_${nomeGrupo}`,
        title: `Competências ${nomeGrupo}`,
        description: descGrupo,
        icon: iconGrupo,
        color: corGrupo
      });

      // Perguntas
      Object.values(grupoObj).forEach((comp: any) => {
        comp.dimensoes.forEach((dim: Dimensao) => {
          steps.push({
            type: 'question',
            id: dim.id,
            dimension: {
              ...dim,
              competenciaNome: comp.nome,
              competenciaIcon: comp.icon,
              competenciaCor: comp.cor,
              grupo: nomeGrupo
            }
          });
        });
      });
    };

    // 2. Comportamentais
    addGroup(
      competenciasComportamentais, 
      'Comportamentais', 
      '🎯', 
      'bg-gradient-to-br from-orange-500 to-amber-600',
      'Avaliaremos agora como o colaborador se comporta diante de desafios, como se comunica e como interage com o time. Estas competências refletem os valores da cultura organizacional.'
    );

    // 3. Técnicas
    addGroup(
      competenciasTecnicas, 
      'Técnicas', 
      '🔧', 
      'bg-gradient-to-br from-blue-500 to-cyan-600',
      'Agora focaremos na excelência técnica. Avalie o domínio do conhecimento específico da função, qualidade das entregas, gestão de processos e capacidade de ensino.'
    );

    // 4. Liderança (se aplicável)
    if (temLideranca) {
      addGroup(
        competenciasLideranca, 
        'de Liderança', 
        '👑', 
        'bg-gradient-to-br from-purple-500 to-fuchsia-600',
        'Por fim, avaliaremos a capacidade de gestão. Foque na habilidade de desenvolver pessoas, gerenciar processos estratégicos e visão sistêmica do negócio.'
      );
    }

    return steps;
  }, [temLideranca]);

  // Cálculos de Progresso (Baseado apenas nas QUESTIONS, ignorando capas)
  const totalQuestions = wizardSteps.filter(s => s.type === 'question').length;
  const answeredQuestions = Object.keys(notas).filter(k => 
    (!temLideranca && k.startsWith('L')) ? false : notas[k] > 0
  ).length;
  const progressPercent = totalQuestions > 0 ? Math.round((answeredQuestions / totalQuestions) * 100) : 0;
  
  // Encontrar o índice da questão atual dentro do subconjunto de questões (para mostrar "Questão X de Y")
  const currentStep = wizardSteps[currentStepIndex];
  const currentQuestionNumber = currentStep.type === 'question' 
    ? wizardSteps.slice(0, currentStepIndex + 1).filter(s => s.type === 'question').length 
    : 0;

  const handleExportMD = () => {
    try {
      const md = gerarMarkdown(dados, notas, comentarios, destaques, temLideranca);
      const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Avaliacao_${dados.nomeColaborador.replace(/\s+/g, '_')}_${dados.dataAvaliacao}.md`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Erro ao exportar MD:', error);
      setModalConfig({
        isOpen: true,
        type: 'error',
        title: 'Erro ao Exportar',
        message: 'Não foi possível gerar o arquivo Markdown. Por favor, tente novamente.',
        confirmText: 'OK',
        confirmColor: 'red'
      });
    }
  };

  const handleExportPDF = async () => {
    try {
      await gerarPDF(dados);
    } catch (error) {
      console.error('Erro ao exportar PDF:', error);
      setModalConfig({
        isOpen: true,
        type: 'error',
        title: 'Erro ao Exportar',
        message: 'Não foi possível gerar o arquivo PDF. Por favor, tente novamente.',
        confirmText: 'OK',
        confirmColor: 'red'
      });
    }
  };

  const handleChange = (field: keyof DadosAvaliacao, value: string) => setDados({ ...dados, [field]: value });

  const limparRascunho = () => {
    setModalConfig({
      isOpen: true,
      type: 'warning',
      title: 'Limpar Rascunho',
      message: 'Deseja realmente limpar todos os dados e começar uma nova avaliação? Esta ação não pode ser desfeita.',
      confirmText: 'Sim, Limpar',
      cancelText: 'Cancelar',
      confirmColor: 'red',
      onConfirm: () => {
        localStorage.removeItem('avaliacao_rascunho');
        setDados({ nomeColaborador: '', cargoColaborador: '', unidade: '', nomeGestor: '', cargoGestor: '', dataAvaliacao: new Date().toISOString().split('T')[0] });
        setNotas({});
        setComentarios({});
        setDestaques({});
        setStep(0);
        setShowReport(false);
        setCurrentStepIndex(0);
      }
    });
  };

  const iniciarNovaAvaliacao = () => {
    localStorage.removeItem('avaliacao_rascunho');
    setDados({ nomeColaborador: '', cargoColaborador: '', unidade: '', nomeGestor: '', cargoGestor: '', dataAvaliacao: new Date().toISOString().split('T')[0] });
    setNotas({});
    setComentarios({});
    setDestaques({});
    setStep(0);
    setShowReport(false);
    setCurrentStepIndex(0);
  };

  const handleNotaChange = (valor: number) => {
    if (currentStep.type === 'question' && currentStep.dimension) {
      setNotas(prev => ({ ...prev, [currentStep.dimension!.id]: valor }));
      // Removido o auto-avanço (setTimeout) conforme solicitado
    }
  };

  const handleComentarioChange = (dimensaoId: string, comentario: string) => {
    setComentarios(prev => ({ ...prev, [dimensaoId]: comentario }));
  };

  const handleDestaqueToggle = (dimensaoId: string) => {
    setDestaques(prev => ({ ...prev, [dimensaoId]: !prev[dimensaoId] }));
  };

  const prevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const nextStep = () => {
    // Validação: Se for pergunta, exige nota para avançar
    if (currentStep.type === 'question' && currentStep.dimension) {
      if (!notas[currentStep.dimension.id]) {
        setModalConfig({
          isOpen: true,
          type: 'warning',
          title: 'Atenção',
          message: 'Por favor, selecione uma nota antes de prosseguir para a próxima questão.',
          confirmText: 'Entendi',
          confirmColor: 'yellow'
        });
        return;
      }
    }

    if (currentStepIndex < wizardSteps.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setShowReport(true);
    }
  };

  if (step === 0) {
    const canStart = dados.nomeColaborador && dados.cargoColaborador && dados.unidade && dados.nomeGestor && dados.cargoGestor && dados.dataAvaliacao;
    const temRascunho = localStorage.getItem('avaliacao_rascunho');
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 flex items-center justify-center">
        <div className="w-full max-w-lg">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mx-auto mb-3 flex items-center justify-center shadow-lg">
              <span className="text-3xl">📊</span>
            </div>
            <h1 className="text-xl font-bold text-gray-900">Avaliação de Competências</h1>
            <p className="text-gray-500 text-sm">T&D Sustentável</p>
          </div>
          
          {temRascunho && (
            <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-xl text-sm text-blue-800 flex items-start gap-2">
              <span className="text-lg">💾</span>
              <div className="flex-1">
                <strong>Rascunho salvo encontrado!</strong>
                <p className="text-xs mt-1">Seus dados são salvos automaticamente enquanto você trabalha.</p>
              </div>
            </div>
          )}
          
          <div className="bg-white rounded-2xl p-5 shadow-lg space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="text-xs font-medium text-gray-600 mb-1 block">👤 Nome do Colaborador *</label>
                <input type="text" value={dados.nomeColaborador} onChange={(e) => handleChange('nomeColaborador', e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-gray-50 text-sm focus:ring-2 focus:ring-blue-500 outline-none border border-gray-200" 
                  placeholder="Nome completo do avaliado" required />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-600 mb-1 block">💼 Cargo do Colaborador *</label>
                <select value={dados.cargoColaborador} onChange={(e) => handleChange('cargoColaborador', e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-gray-50 text-sm focus:ring-2 focus:ring-blue-500 outline-none border border-gray-200" required>
                  <option value="">Selecione...</option>
                  {cargos.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-600 mb-1 block">🏢 Unidade *</label>
                <input type="text" value={dados.unidade} onChange={(e) => handleChange('unidade', e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-gray-50 text-sm focus:ring-2 focus:ring-blue-500 outline-none border border-gray-200" 
                  placeholder="Ex: Macaé" required />
              </div>
              <div className="col-span-2 border-t border-gray-100 pt-4 mt-2">
                <p className="text-xs text-gray-400 mb-3">👔 Dados do Gestor Avaliador</p>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-600 mb-1 block">Nome do Gestor *</label>
                <input type="text" value={dados.nomeGestor} onChange={(e) => handleChange('nomeGestor', e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-gray-50 text-sm focus:ring-2 focus:ring-blue-500 outline-none border border-gray-200" 
                  placeholder="Seu nome completo" required />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-600 mb-1 block">Cargo do Gestor *</label>
                <input type="text" value={dados.cargoGestor} onChange={(e) => handleChange('cargoGestor', e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-gray-50 text-sm focus:ring-2 focus:ring-blue-500 outline-none border border-gray-200" 
                  placeholder="Ex: Coordenador" required />
              </div>
              <div className="col-span-2">
                <label className="text-xs font-medium text-gray-600 mb-1 block">📅 Data da Avaliação *</label>
                <input type="date" value={dados.dataAvaliacao} onChange={(e) => handleChange('dataAvaliacao', e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-gray-50 text-sm focus:ring-2 focus:ring-blue-500 outline-none border border-gray-200" required />
              </div>
            </div>
            {dados.cargoColaborador && (
              <div className="p-3 bg-blue-50 rounded-xl text-xs text-blue-800">
                <strong>📝 Competências a avaliar:</strong> 12 Comportamentais + 12 Técnicas {temLideranca && '+ 9 de Liderança'} = <strong>{totalQuestions} dimensões</strong>
              </div>
            )}
            <button onClick={() => canStart && setStep(1)} disabled={!canStart}
              className="w-full py-3 rounded-xl font-semibold text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ background: canStart ? 'linear-gradient(135deg, #007AFF, #5856D6)' : '#cbd5e1' }}>
              {canStart ? 'Iniciar Avaliação →' : 'Preencha todos os campos obrigatórios'}
            </button>
            {temRascunho && (
              <button onClick={limparRascunho} 
                className="w-full py-2.5 rounded-xl font-medium text-red-600 border-2 border-red-200 hover:bg-red-50 transition-all text-sm">
                🗑️ Limpar Rascunho e Começar Nova Avaliação
              </button>
            )}
          </div>
          <p className="text-center text-xs text-gray-400 mt-4">
            💡 Seu progresso é salvo automaticamente
          </p>
        </div>
      </div>
    );
  }

  // Se estiver no modo relatório
  if (showReport) {
    return (
      <div className="min-h-screen bg-gray-100 p-4 print:bg-white print:p-0">
        <div className="max-w-4xl mx-auto print:max-w-none print:w-full print:mx-0">
           <div className="flex gap-3 mb-4 print:hidden no-print">
             <button onClick={() => setShowReport(false)} className="px-4 py-2 bg-gray-200 rounded-lg text-sm font-medium hover:bg-gray-300 transition-colors">
               ← Voltar para Edição
             </button>
             <button 
               onClick={iniciarNovaAvaliacao} 
               className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg text-sm font-semibold hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg flex items-center gap-2"
             >
               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
               </svg>
               Nova Avaliação
             </button>
           </div>
          <Relatorio dados={dados} notas={notas} comentarios={comentarios} destaques={destaques} temLideranca={temLideranca} onExportMD={handleExportMD} onExportPDF={handleExportPDF} />
        </div>
      </div>
    );
  }

  // --- RENDERIZAÇÃO DO WIZARD ---
  const isFirst = currentStepIndex === 0;
  const isLast = currentStepIndex === wizardSteps.length - 1;

  // Renderização condicional baseada no tipo de step
  const renderContent = () => {
    if (currentStep.type === 'intro' || currentStep.type === 'cover') {
      // TELA DE CAPA (Intro ou Seção)
      return (
        <div className="flex flex-col items-center justify-center text-center p-8 h-full min-h-[400px]">
          <div className={`w-24 h-24 rounded-3xl flex items-center justify-center text-5xl mb-6 shadow-xl text-white ${currentStep.color || 'bg-blue-500'}`}>
            {currentStep.icon}
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{currentStep.title}</h2>
          <div className="w-16 h-1.5 bg-gray-200 rounded-full mb-6"></div>
          <p className="text-gray-600 text-lg leading-relaxed max-w-md">
            {currentStep.description}
          </p>
          <div className="mt-8 text-sm text-gray-400 font-medium uppercase tracking-widest">
            {currentStep.type === 'intro' ? 'Preparado para começar?' : 'Avançar para avaliação'}
          </div>
        </div>
      );
    } else if (currentStep.type === 'question' && currentStep.dimension) {
      // TELA DE PERGUNTA
      return (
        <>
          {/* Cabeçalho da Dimensão */}
          <div className="bg-gray-50 px-5 py-4 border-b border-gray-100">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg">{currentStep.dimension.competenciaIcon}</span>
              <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
                {currentStep.dimension.grupo} • {currentStep.dimension.competenciaNome}
              </span>
            </div>
            <h2 className="text-xl font-bold text-gray-900 leading-tight">{currentStep.dimension.nome}</h2>
            <p className="text-sm text-gray-600 mt-2 italic">{currentStep.dimension.def}</p>
          </div>

          {/* Corpo - Opções de Voto */}
          <div className="p-4 overflow-y-auto">
             <NivelSelector 
                value={notas[currentStep.dimension.id] || 0} 
                onChange={handleNotaChange} 
                cor={currentStep.dimension.competenciaCor} 
                dimensaoId={currentStep.dimension.id}
                comentario={comentarios[currentStep.dimension.id] || ''}
                onComentarioChange={handleComentarioChange}
                destacado={destaques[currentStep.dimension.id] || false}
                onDestaqueToggle={handleDestaqueToggle}
              />
          </div>
        </>
      );
    }
    return null;
  };

  return (
    <>
      {/* Modal de Continuar Avaliação */}
      <Modal
        isOpen={showContinueModal}
        onClose={handleStartNew}
        onConfirm={handleContinueEvaluation}
        type="confirm"
        title="Avaliação em Andamento"
        message="Encontramos uma avaliação salva anteriormente. Deseja continuar de onde parou ou começar uma nova avaliação?"
        confirmText="Continuar Avaliação"
        cancelText="Nova Avaliação"
        confirmColor="blue"
      />

      {/* Modal Genérico (para erros, avisos, etc) */}
      <Modal
        isOpen={modalConfig.isOpen}
        onClose={() => setModalConfig({ ...modalConfig, isOpen: false })}
        onConfirm={modalConfig.onConfirm}
        type={modalConfig.type}
        title={modalConfig.title}
        message={modalConfig.message}
        confirmText={modalConfig.confirmText}
        cancelText={modalConfig.cancelText}
        confirmColor={modalConfig.confirmColor}
      />

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
        {/* Header Sticky */}
        <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-lg border-b border-gray-200 px-4 py-3 shadow-sm">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm truncate">
              <span className="font-semibold text-gray-900">{dados.nomeColaborador}</span>
            </div>
            {/* Só mostra contador se for questão */}
            {currentStep.type === 'question' && (
              <div className="text-xs font-semibold text-gray-500 whitespace-nowrap">
                {currentQuestionNumber} de {totalQuestions}
              </div>
            )}
          </div>
          <div className="flex items-center gap-3">
            <ProgressBar value={progressPercent} />
            <span className="text-xs font-semibold text-gray-600 min-w-[32px] text-right">{progressPercent}%</span>
          </div>
        </div>
      </div>

      {/* Área Principal de Votação - Focada em caber na tela */}
      <div className="flex-1 flex flex-col justify-center p-4">
        <div className="max-w-2xl w-full mx-auto bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col min-h-[500px]">
          
          {/* Conteúdo Dinâmico */}
          <div className="flex-1 flex flex-col">
            {renderContent()}
          </div>

          {/* Rodapé - Navegação */}
          <div className="px-5 py-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
            <button 
              onClick={prevStep}
              disabled={isFirst}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${isFirst ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-200'}`}
            >
              ← Anterior
            </button>

            <button 
              onClick={nextStep}
              className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-lg shadow-gray-200 flex items-center gap-2 ${
                currentStep.type !== 'question' 
                  ? 'bg-blue-600 text-white hover:bg-blue-700' 
                  : 'bg-gray-900 text-white hover:bg-gray-800'
              }`}
            >
              {isLast ? 'Finalizar e Ver Relatório ✨' : currentStep.type === 'question' ? 'Confirmar e Próximo' : 'Começar / Continuar →'}
            </button>
          </div>
        </div>
        
        {/* Helper text */}
        <p className="text-center text-xs text-gray-400 mt-4">
          A avaliação é salva automaticamente.
        </p>
      </div>
    </div>
    </>
  );
}

