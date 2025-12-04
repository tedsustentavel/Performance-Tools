
import React, { useState, useEffect, useRef } from 'react';
import { MarcaField, FeedbackType, ChatMessage } from '../../types/marca';
import { SparklesIcon, CheckIcon } from './Icons';
import { consultWithCoach, getInitialCoachMessage } from '../../services/marca/geminiService';

interface WizardStepProps {
  field: MarcaField;
  value: string;
  feedbackType: FeedbackType;
  onChange: (value: string) => void;
  onNext: () => void;
  onBack: () => void;
  isLastStep: boolean;
  title: string;
  description: string;
  letter: string;
}

const WizardStep: React.FC<WizardStepProps> = ({
  field,
  value,
  feedbackType,
  onChange,
  onNext,
  onBack,
  isLastStep,
  title,
  description,
  letter
}) => {
  // Se já existir um valor (edição), começamos com ele, senão começamos o chat
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [proposedDraft, setProposedDraft] = useState<string | null>(value || null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Inicializa o chat quando o componente monta ou muda de field
  useEffect(() => {
    if (!value && messages.length === 0) {
      const initialMsg = getInitialCoachMessage(field);
      setMessages([{ role: 'model', text: initialMsg }]);
    }
  }, [field]);

  // Scroll para o fim do chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMsg: ChatMessage = { role: 'user', text: inputText };
    const newHistory = [...messages, userMsg];
    
    setMessages(newHistory);
    setInputText('');
    setIsLoading(true);

    try {
      const response = await consultWithCoach(field, feedbackType, newHistory);
      
      const aiMsg: ChatMessage = { role: 'model', text: response.message };
      setMessages(prev => [...prev, aiMsg]);

      if (response.draft) {
        setProposedDraft(response.draft);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleAcceptDraft = () => {
    if (proposedDraft) {
      onChange(proposedDraft);
      onNext();
    }
  };

  return (
    <div className="flex flex-col h-[600px] animate-in fade-in slide-in-from-right-4 duration-500">
      
      {/* Header Compacto */}
      <div className="flex items-start gap-4 mb-4 pb-4 border-b border-gray-100 shrink-0">
        <div className="w-12 h-12 bg-black text-white rounded-xl flex items-center justify-center text-2xl font-bold shadow-lg shrink-0">
          {letter}
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">{title}</h2>
          <p className="text-sm text-gray-500 leading-snug mt-1">{description}</p>
        </div>
      </div>

      {/* Área de Chat */}
      <div className="flex-1 overflow-y-auto space-y-4 p-2 pr-4 custom-scrollbar">
        {messages.map((msg, idx) => (
          <div 
            key={idx} 
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed shadow-sm whitespace-pre-wrap
                ${msg.role === 'user' 
                  ? 'bg-blue-600 text-white rounded-br-none' 
                  : 'bg-white border border-gray-100 text-gray-800 rounded-bl-none'
                }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-100 p-4 rounded-2xl rounded-bl-none shadow-sm flex gap-2 items-center">
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></span>
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Card de Proposta de Texto (Aparece quando a IA sugere um draft) */}
      {proposedDraft && (
        <div className="mt-4 shrink-0 animate-in slide-in-from-bottom-4 fade-in duration-500">
           <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-100 p-4 rounded-2xl shadow-sm relative">
              <div className="flex items-center gap-2 mb-2">
                 <SparklesIcon className="w-4 h-4 text-green-600" />
                 <span className="text-xs font-bold text-green-700 uppercase tracking-wide">Sugestão MARCA</span>
              </div>
              <textarea
                value={proposedDraft}
                onChange={(e) => setProposedDraft(e.target.value)}
                className="w-full bg-white/60 text-gray-800 text-sm p-3 rounded-xl border border-green-200 focus:ring-2 focus:ring-green-500/20 outline-none resize-none h-24 mb-3"
              />
              <div className="flex justify-end gap-3">
                 <button 
                   onClick={() => setProposedDraft(null)} // Usuário quer continuar conversando
                   className="text-xs font-medium text-gray-500 hover:text-gray-700 px-3 py-2"
                 >
                   Continuar chat
                 </button>
                 <button 
                   onClick={handleAcceptDraft}
                   className="bg-green-600 hover:bg-green-700 text-white text-sm font-bold px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all flex items-center gap-2"
                 >
                   <CheckIcon className="w-4 h-4" />
                   {isLastStep ? 'Finalizar' : 'Aprovar e Avançar'}
                 </button>
              </div>
           </div>
        </div>
      )}

      {/* Área de Input (Só aparece se não tiver draft pendente para aprovação) */}
      {!proposedDraft && (
        <div className="mt-4 pt-4 border-t border-gray-100 shrink-0">
          <div className="flex gap-2">
             <button 
                onClick={onBack}
                className="p-3 text-gray-400 hover:text-gray-600 transition-colors"
                title="Voltar"
             >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
             </button>
             <div className="relative flex-1">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Responda ao Coach..."
                  className="w-full p-4 pr-12 bg-gray-50 border border-gray-200 rounded-full focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all shadow-inner"
                />
                <button 
                  onClick={handleSendMessage}
                  disabled={!inputText.trim() || isLoading}
                  className={`absolute right-2 top-2 p-2 rounded-full transition-all
                    ${!inputText.trim() || isLoading 
                       ? 'bg-gray-200 text-gray-400' 
                       : 'bg-blue-600 text-white hover:scale-105 shadow-md'
                    }`}
                >
                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M12 5l7 7-7 7" /></svg>
                </button>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WizardStep;

