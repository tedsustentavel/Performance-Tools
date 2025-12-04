import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  title: string;
  message: string;
  type?: 'confirm' | 'alert' | 'error' | 'warning';
  confirmText?: string;
  cancelText?: string;
  confirmColor?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  type = 'confirm',
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  confirmColor = 'blue'
}) => {
  if (!isOpen) return null;

  const colorClasses = {
    blue: 'bg-blue-600 hover:bg-blue-700',
    red: 'bg-red-600 hover:bg-red-700',
    green: 'bg-green-600 hover:bg-green-700',
    yellow: 'bg-yellow-600 hover:bg-yellow-700'
  };

  const iconConfig = {
    confirm: {
      bg: 'bg-blue-100',
      color: 'text-blue-600',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    alert: {
      bg: 'bg-blue-100',
      color: 'text-blue-600',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    error: {
      bg: 'bg-red-100',
      color: 'text-red-600',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      )
    },
    warning: {
      bg: 'bg-yellow-100',
      color: 'text-yellow-600',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      )
    }
  };

  const config = iconConfig[type];
  const isAlertOnly = type === 'alert' || type === 'error';

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={isAlertOnly ? onClose : undefined}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-in fade-in zoom-in-95 duration-300">
        {/* Icon */}
        <div className={`w-12 h-12 rounded-full ${config.bg} flex items-center justify-center mx-auto mb-4`}>
          <div className={config.color}>
            {config.icon}
          </div>
        </div>

        {/* Content */}
        <h3 className="text-xl font-bold text-gray-900 text-center mb-2">
          {title}
        </h3>
        <p className="text-gray-600 text-center mb-6 leading-relaxed">
          {message}
        </p>

        {/* Actions */}
        {isAlertOnly ? (
          <button
            onClick={onClose}
            className={`w-full px-4 py-2.5 rounded-xl font-semibold text-white transition-colors shadow-lg ${colorClasses[confirmColor as keyof typeof colorClasses]}`}
          >
            {confirmText || 'OK'}
          </button>
        ) : (
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2.5 rounded-xl font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              {cancelText}
            </button>
            <button
              onClick={handleConfirm}
              className={`flex-1 px-4 py-2.5 rounded-xl font-semibold text-white transition-colors shadow-lg ${colorClasses[confirmColor as keyof typeof colorClasses]}`}
            >
              {confirmText}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

