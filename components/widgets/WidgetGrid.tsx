import React, { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';

interface WidgetGridProps {
  children: React.ReactNode;
  onAddWidget?: () => void;
}

const WidgetGrid: React.FC<WidgetGridProps> = ({ children, onAddWidget }) => {
  const { theme } = useTheme();
  
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className={`text-xl font-medium ${theme === 'dark' ? 'text-zinc-200' : 'text-gray-700'}`}>
          Dashboard Widgets
        </h2>
        
        {onAddWidget && (
          <button
            onClick={onAddWidget}
            className={`flex items-center px-3 py-1.5 ${theme === 'dark' ? 'bg-zinc-800 hover:bg-zinc-700' : 'bg-white hover:bg-gray-100'} rounded-md shadow-sm transition-colors`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 mr-2 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span className={theme === 'dark' ? 'text-zinc-200' : 'text-gray-700'}>Add Widget</span>
          </button>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {children}
      </div>
    </div>
  );
};

export default WidgetGrid; 