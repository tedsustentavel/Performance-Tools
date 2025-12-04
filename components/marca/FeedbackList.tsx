import React from 'react';
import { FeedbackData, FeedbackType } from '../../types/marca';
import { TrashIcon } from './Icons';

interface FeedbackListProps {
  feedbacks: FeedbackData[];
  onDelete: (id: string) => void;
}

const FeedbackList: React.FC<FeedbackListProps> = ({ feedbacks, onDelete }) => {
  if (feedbacks.length === 0) {
    return (
      <div className="text-center py-20 opacity-50">
        <p className="text-lg font-medium text-apple-subtext">Nenhum feedback registrado ainda.</p>
        <p className="text-sm text-gray-400">Preencha o formulário para começar sua jornada.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-apple-text tracking-tight px-1">Histórico</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {feedbacks.map((feedback) => (
          <div 
            key={feedback.id} 
            className="group relative bg-white p-6 rounded-3xl shadow-soft border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex justify-between items-start mb-4">
              <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider
                ${feedback.type === FeedbackType.RECOGNITION 
                  ? 'bg-green-50 text-green-600 border border-green-100' 
                  : 'bg-amber-50 text-amber-600 border border-amber-100'}`}
              >
                {feedback.type}
              </span>
              <button 
                onClick={() => onDelete(feedback.id)}
                className="text-gray-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                title="Excluir feedback"
              >
                <TrashIcon />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <span className="text-xs font-semibold text-gray-400 uppercase">Situação</span>
                <p className="text-sm text-gray-700 line-clamp-2">{feedback.moment}</p>
              </div>
              <div>
                <span className="text-xs font-semibold text-gray-400 uppercase">Ação</span>
                <p className="text-sm text-gray-700 line-clamp-2">{feedback.action}</p>
              </div>
              <div className="pt-2 border-t border-gray-50 flex justify-between items-center mt-2">
                 <span className="text-xs text-gray-400 font-medium">
                    {feedback.createdAt.toLocaleDateString()}
                 </span>
                 <span className="text-xs text-blue-500 font-medium cursor-pointer hover:underline">
                    Ver detalhes
                 </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeedbackList;

