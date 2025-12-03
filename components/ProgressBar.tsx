import React from 'react';

interface ProgressBarProps {
  value: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ value }) => (
  <div className="relative w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
    <div 
      className="absolute left-0 top-0 h-full rounded-full transition-all duration-500"
      style={{ 
        width: `${value}%`, 
        background: value < 40 ? '#FF3B30' : value < 60 ? '#FF9500' : value < 80 ? '#FFCC00' : '#34C759' 
      }} 
    />
  </div>
);