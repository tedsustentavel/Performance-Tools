
import React from 'react';
import { SparklesIcon, CheckIcon } from './Icons';

interface OnboardingProps {
  onStart: () => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[600px] text-center animate-in fade-in zoom-in-95 duration-700">
      <div className="w-20 h-20 bg-black text-white rounded-3xl flex items-center justify-center text-4xl font-bold mb-8 shadow-glow transform rotate-3">
        M
      </div>
      
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
        Seu Mentor de Feedback
      </h1>
      
      <p className="text-xl text-gray-500 max-w-2xl leading-relaxed mb-12">
        Esqueça os formulários chatos. Aqui, nós vamos conversar. <br/>
        A Inteligência Artificial vai te entrevistar passo a passo (M-A-R-C-A) para construir um feedback estruturado e profissional.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 w-full max-w-4xl text-left">
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
          <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-4">
            <span className="font-bold">1</span>
          </div>
          <h3 className="font-bold text-gray-900 mb-2">Sem bloqueio criativo</h3>
          <p className="text-sm text-gray-500">Não sabe como começar? Apenas responda às perguntas do coach e ele escreverá por você.</p>
        </div>
        
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
          <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center mb-4">
             <SparklesIcon className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-gray-900 mb-2">Comunicação Não-Violenta</h3>
          <p className="text-sm text-gray-500">A IA garante que seu feedback seja baseado em fatos, removendo julgamentos que geram defesa.</p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
          <div className="w-10 h-10 bg-green-50 text-green-600 rounded-xl flex items-center justify-center mb-4">
             <CheckIcon className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-gray-900 mb-2">Pronto para entregar</h3>
          <p className="text-sm text-gray-500">No final, você terá um roteiro completo e polido para ler ou enviar para o seu liderado.</p>
        </div>
      </div>

      <button 
        onClick={onStart}
        className="px-10 py-4 bg-black text-white text-lg font-bold rounded-full hover:scale-105 active:scale-95 transition-all shadow-xl"
      >
        Começar Jornada
      </button>
    </div>
  );
};

export default Onboarding;

