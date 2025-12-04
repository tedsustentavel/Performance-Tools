import React, { useRef, useState } from 'react';
import { FeedbackData } from '../../types/marca';
import { CheckIcon, DownloadIcon } from './Icons';

// Declaração global para a biblioteca importada via CDN
declare var html2pdf: any;

interface ReviewScreenProps {
  data: Omit<FeedbackData, 'id' | 'createdAt'>;
  onEdit: (stepIndex: number) => void;
  onSave: () => void;
  onBack: () => void;
}

const ReviewScreen: React.FC<ReviewScreenProps> = ({ data, onEdit, onSave, onBack }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);

  const fields = [
    { label: 'Momento', value: data.moment, letter: 'M', index: 0 },
    { label: 'Ação', value: data.action, letter: 'A', index: 1 },
    { label: 'Reação', value: data.reaction, letter: 'R', index: 2 },
    { label: 'Consequência', value: data.consequence, letter: 'C', index: 3 },
    { label: 'Alternativa', value: data.alternative, letter: 'A', index: 4 },
  ];

  const handleDownloadMD = () => {
    const text = `# Feedback MARCA - Estruturado

**Tipo:** ${data.type}
**Data:** ${new Date().toLocaleDateString()}

---

## [M] Momento
${data.moment}

## [A] Ação
${data.action}

## [R] Reação
${data.reaction}

## [C] Consequência
${data.consequence}

## [A] Alternativa
${data.alternative}

---
*Gerado por MARCA Pro AI*
`;
    const blob = new Blob([text], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `feedback-marca-${new Date().getTime()}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleDownloadPDF = async () => {
    if (!contentRef.current) return;
    setIsExporting(true);
    
    const element = contentRef.current;
    const opt = {
      margin:       10,
      filename:     `feedback-marca-${new Date().getTime()}.pdf`,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2, useCORS: true, logging: false },
      jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    try {
        await html2pdf().set(opt).from(element).save();
    } catch (e) {
        console.error("Erro ao gerar PDF", e);
    } finally {
        setIsExporting(false);
    }
  };

  return (
    <div className="animate-in fade-in zoom-in-95 duration-500">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
           <CheckIcon className="w-8 h-8" />
        </div>
        <h2 className="text-3xl font-bold text-apple-text">Feedback Pronto!</h2>
        <p className="text-apple-subtext mt-2">Revise os detalhes, exporte ou salve no histórico.</p>
      </div>

      {/* Área de conteúdo para impressão/visualização */}
      <div 
        ref={contentRef} 
        className="space-y-4 bg-white rounded-3xl p-6 shadow-sm border border-gray-100 mb-6 print:shadow-none print:border-none"
      >
        <div className="mb-6 border-b border-gray-100 pb-4 flex justify-between items-center">
            <div>
                <h3 className="text-xl font-bold text-gray-900">Roteiro de Feedback MARCA</h3>
                <span className="text-sm text-gray-500">{new Date().toLocaleDateString()} • {data.type}</span>
            </div>
            {/* Logo visual apenas para o PDF/Tela */}
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center text-white font-bold text-xs">
                M
            </div>
        </div>

        {fields.map((field) => (
          <div 
            key={field.letter + field.index}
            onClick={() => onEdit(field.index)}
            className="group p-4 rounded-2xl hover:bg-gray-50 transition-colors cursor-pointer border border-transparent hover:border-gray-200"
          >
            <div className="flex items-start gap-4">
               <div className="w-8 h-8 rounded-lg bg-gray-100 text-gray-500 font-bold flex items-center justify-center text-sm group-hover:bg-apple-blue group-hover:text-white transition-colors shrink-0">
                  {field.letter}
               </div>
               <div className="flex-1">
                  <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">{field.label}</h3>
                  <p className="text-gray-800 text-sm leading-relaxed whitespace-pre-wrap">{field.value}</p>
               </div>
               <div className="text-xs text-apple-blue opacity-0 group-hover:opacity-100 font-medium self-center print:hidden">
                  Editar
               </div>
            </div>
          </div>
        ))}
        
        <div className="mt-8 pt-4 border-t border-gray-100 text-center">
             <p className="text-xs text-gray-400 italic">Documento gerado pela ferramenta MARCA Pro com auxílio de IA.</p>
        </div>
      </div>

      {/* Botões de Ação */}
      <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <button
                onClick={handleDownloadMD}
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition-colors"
            >
                <DownloadIcon className="w-4 h-4" />
                Baixar Markdown
            </button>
            <button
                onClick={handleDownloadPDF}
                disabled={isExporting}
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition-colors disabled:opacity-50"
            >
                <DownloadIcon className="w-4 h-4" />
                {isExporting ? 'Gerando...' : 'Baixar PDF'}
            </button>
          </div>

          <div className="flex justify-between items-center pt-4 border-t border-gray-200">
            <button
            onClick={onBack}
            className="px-6 py-3 rounded-full text-apple-subtext font-medium hover:bg-gray-100 transition-colors"
            >
            Voltar
            </button>
            <button
            onClick={onSave}
            className="px-8 py-3 rounded-full bg-green-600 hover:bg-green-700 text-white font-bold shadow-lg hover:shadow-xl transition-all transform hover:scale-105 active:scale-95 flex items-center gap-2"
            >
            <CheckIcon className="w-5 h-5" />
            Salvar no Histórico
            </button>
          </div>
      </div>
    </div>
  );
};

export default ReviewScreen;

