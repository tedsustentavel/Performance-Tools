
import React, { useState } from 'react';
import { FeedbackType, FeedbackData, MarcaField } from '../types/marca';
import WizardStep from '../components/marca/WizardStep';
import FeedbackList from '../components/marca/FeedbackList';
import ReviewScreen from '../components/marca/ReviewScreen';
import ProgressBar from '../components/marca/ProgressBar';
import Onboarding from '../components/marca/Onboarding';
import { PlusIcon, CheckIcon } from '../components/marca/Icons';

const MARCA_STEPS = [
  {
    field: MarcaField.MOMENT,
    letter: 'M',
    title: 'Momento e Contexto',
    description: 'Situe a pessoa no tempo e espaço. O feedback precisa de um cenário claro.'
  },
  {
    field: MarcaField.ACTION,
    letter: 'A',
    title: 'Ação e Comportamento',
    description: 'Descreva os fatos observáveis (o que foi dito ou feito), como uma filmagem.'
  },
  {
    field: MarcaField.REACTION,
    letter: 'R',
    title: 'Reação e Impacto',
    description: 'Qual foi o efeito imediato dessa ação nas pessoas ou no ambiente?'
  },
  {
    field: MarcaField.CONSEQUENCE,
    letter: 'C',
    title: 'Consequência no Negócio',
    description: 'Se isso se repetir, qual o impacto no longo prazo para o time ou carreira?'
  },
  {
    field: MarcaField.ALTERNATIVE,
    letter: 'A',
    title: 'Alternativa ou Reforço',
    description: 'Qual o comportamento ideal esperado para o futuro?'
  }
];

function MarcaProApp() {
  const [feedbacks, setFeedbacks] = useState<FeedbackData[]>([]);
  const [viewMode, setViewMode] = useState<'onboarding' | 'wizard' | 'list'>('onboarding'); 
  
  // Wizard State
  const [stepIndex, setStepIndex] = useState(-1); // -1 is Type Selection
  const [draft, setDraft] = useState({
    moment: '',
    action: '',
    reaction: '',
    consequence: '',
    alternative: '',
    type: FeedbackType.RECOGNITION,
  });

  const handleUpdateDraft = (field: MarcaField, value: string) => {
    setDraft(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    setStepIndex(prev => prev + 1);
  };

  const handleBack = () => {
    setStepIndex(prev => prev - 1);
  };
  
  const jumpToStep = (index: number) => {
      setStepIndex(index);
      setViewMode('wizard');
  }

  const handleSave = () => {
    const newFeedback: FeedbackData = {
      ...draft,
      id: crypto.randomUUID(),
      createdAt: new Date(),
    };
    setFeedbacks([newFeedback, ...feedbacks]);
    
    // Reset and go to list
    setDraft({
      moment: '',
      action: '',
      reaction: '',
      consequence: '',
      alternative: '',
      type: FeedbackType.RECOGNITION,
    });
    setStepIndex(-1);
    setViewMode('list');
  };

  const handleDeleteFeedback = (id: string) => {
    setFeedbacks(feedbacks.filter(f => f.id !== id));
  };

  const startNew = () => {
      setStepIndex(-1);
      setViewMode('wizard');
  }

  const handleOnboardingStart = () => {
      setViewMode('wizard');
  }

  // --- Render Helpers ---

  const renderTypeSelection = () => (
    <div className="animate-in fade-in zoom-in-95 duration-500 flex flex-col items-center justify-center min-h-[400px]">
        <h2 className="text-3xl md:text-4xl font-bold text-apple-text mb-6 text-center tracking-tight">Qual o objetivo da conversa?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
            <button
                onClick={() => {
                    setDraft(prev => ({ ...prev, type: FeedbackType.RECOGNITION }));
                    handleNext();
                }}
                className="group p-8 rounded-[2rem] bg-white border border-gray-100 shadow-soft hover:shadow-xl hover:-translate-y-1 transition-all text-left relative overflow-hidden"
            >
                <div className="absolute top-0 right-0 p-32 bg-green-50 rounded-full -mr-16 -mt-16 opacity-50 group-hover:bg-green-100 transition-colors"></div>
                <div className="relative z-10">
                    <span className="inline-block p-3 rounded-xl bg-green-100 text-green-600 mb-4">
                        <CheckIcon className="w-6 h-6" />
                    </span>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Reconhecimento</h3>
                    <p className="text-gray-500 leading-relaxed">Reforçar um comportamento positivo para que ele se repita.</p>
                </div>
            </button>

            <button
                onClick={() => {
                    setDraft(prev => ({ ...prev, type: FeedbackType.ALIGNMENT }));
                    handleNext();
                }}
                className="group p-8 rounded-[2rem] bg-white border border-gray-100 shadow-soft hover:shadow-xl hover:-translate-y-1 transition-all text-left relative overflow-hidden"
            >
                <div className="absolute top-0 right-0 p-32 bg-amber-50 rounded-full -mr-16 -mt-16 opacity-50 group-hover:bg-amber-100 transition-colors"></div>
                <div className="relative z-10">
                    <span className="inline-block p-3 rounded-xl bg-amber-100 text-amber-600 mb-4">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
                    </span>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Alinhamento</h3>
                    <p className="text-gray-500 leading-relaxed">Corrigir um comportamento ou alinhar expectativas.</p>
                </div>
            </button>
        </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F5F5F7] text-apple-text font-sans selection:bg-apple-blue selection:text-white pb-20">
      {/* Header */}
      <header className="fixed w-full top-0 z-50 glass border-b border-gray-200/50">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Botão Voltar ao Hub */}
            <button
              onClick={() => window.location.hash = '/'}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium transition-colors group"
              title="Voltar ao Hub"
            >
              <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
              <span className="text-sm hidden sm:inline">Hub</span>
            </button>

            {/* Logo e Título */}
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => setViewMode('list')}>
              <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-md">
                M
              </div>
              <span className="font-semibold text-lg tracking-tight">MARCA Pro</span>
            </div>
          </div>
          
          {viewMode === 'list' && (
              <button 
                onClick={startNew}
                className="bg-black text-white px-4 py-2 rounded-full text-sm font-medium hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
              >
                  <PlusIcon className="w-4 h-4" />
                  <span className="hidden sm:inline">Novo Feedback</span>
                  <span className="sm:hidden">Novo</span>
              </button>
          )}
           {viewMode === 'wizard' && stepIndex >= 0 && (
              <button 
                onClick={() => { setViewMode('list'); setStepIndex(-1); }}
                className="text-gray-500 hover:text-red-500 text-sm font-medium transition-colors"
              >
                  Cancelar
              </button>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-6 pt-32">
        
        {viewMode === 'onboarding' && (
             <Onboarding onStart={handleOnboardingStart} />
        )}

        {viewMode === 'list' && (
             <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <FeedbackList feedbacks={feedbacks} onDelete={handleDeleteFeedback} />
             </div>
        )}
        
        {viewMode === 'wizard' && (
            <>
                {/* Wizard Container */}
                <div className="w-full">
                    
                    {stepIndex >= 0 && stepIndex < MARCA_STEPS.length && (
                         <ProgressBar currentStep={stepIndex} totalSteps={MARCA_STEPS.length} />
                    )}

                    {stepIndex === -1 && renderTypeSelection()}

                    {stepIndex >= 0 && stepIndex < MARCA_STEPS.length && (
                        <div className="bg-white/50 backdrop-blur-xl border border-white/60 p-8 md:p-12 rounded-[2.5rem] shadow-soft">
                            {/* CRITICAL FIX: Adding key={stepIndex} forces React to destroy and recreate the component when step changes, resetting the chat state */}
                             <WizardStep 
                                key={stepIndex}
                                field={MARCA_STEPS[stepIndex].field}
                                value={draft[MARCA_STEPS[stepIndex].field]}
                                feedbackType={draft.type}
                                letter={MARCA_STEPS[stepIndex].letter}
                                title={MARCA_STEPS[stepIndex].title}
                                description={MARCA_STEPS[stepIndex].description}
                                onChange={(val) => handleUpdateDraft(MARCA_STEPS[stepIndex].field, val)}
                                onNext={handleNext}
                                onBack={handleBack}
                                isLastStep={stepIndex === MARCA_STEPS.length - 1}
                             />
                        </div>
                    )}

                    {stepIndex === MARCA_STEPS.length && (
                        <ReviewScreen 
                            data={draft}
                            onEdit={jumpToStep}
                            onSave={handleSave}
                            onBack={handleBack}
                        />
                    )}

                </div>
            </>
        )}
      </main>
    </div>
  );
}

export default MarcaProApp;

