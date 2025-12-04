import React from 'react';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps }) => {
  return (
    <div className="w-full flex justify-center gap-2 mb-8">
      {Array.from({ length: totalSteps }).map((_, index) => (
        <div
          key={index}
          className={`h-1.5 rounded-full transition-all duration-500 ease-out
            ${index <= currentStep ? 'w-8 bg-apple-text' : 'w-2 bg-gray-300'}
          `}
        />
      ))}
    </div>
  );
};

export default ProgressBar;

