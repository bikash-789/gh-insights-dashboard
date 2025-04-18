import React, { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';

export interface WidgetProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  onRemove?: () => void;
  onConfigure?: () => void;
  configurable?: boolean;
  removable?: boolean;
  loading?: boolean;
  size?: 'small' | 'medium' | 'large';
}

const Widget: React.FC<WidgetProps> = ({
  title,
  children,
  className = '',
  onRemove,
  onConfigure,
  configurable = true,
  removable = true,
  loading = false,
  size = 'medium'
}) => {
  const { theme } = useTheme();
  const [isHovered, setIsHovered] = useState(false);

  const sizeClasses = {
    small: 'col-span-1',
    medium: 'col-span-1 md:col-span-2',
    large: 'col-span-1 md:col-span-3'
  };

  return (
    <div 
      className={`${theme === 'dark' ? 'glass-medium' : 'glass-medium'} ${sizeClasses[size]} overflow-hidden shadow-xl ${theme === 'dark' ? 'shadow-black/20' : 'shadow-black/5'} transition-all duration-300 hover-glass ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`px-6 py-4 border-b ${theme === 'dark' ? 'border-zinc-800/70' : 'border-zinc-200/70'} flex justify-between items-center`}>
        <h2 className={`text-lg font-medium ${theme === 'dark' ? 'text-zinc-200' : 'text-gray-700'}`}>{title}</h2>
        
        {(configurable || removable) && isHovered && (
          <div className="flex space-x-2">
            {configurable && onConfigure && (
              <button 
                onClick={onConfigure}
                className={`p-1 rounded-full ${theme === 'dark' ? 'hover:bg-zinc-700/50' : 'hover:bg-gray-200/70'} transition-colors`}
                aria-label="Configure widget"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
            )}
            
            {removable && onRemove && (
              <button 
                onClick={onRemove}
                className={`p-1 rounded-full ${theme === 'dark' ? 'hover:bg-zinc-700/50' : 'hover:bg-gray-200/70'} transition-colors`}
                aria-label="Remove widget"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        )}
      </div>
      
      <div className="p-6">
        {loading ? (
          <div className="flex justify-center items-center py-8">
            <div className={`animate-spin h-8 w-8 border-t-2 border-b-2 ${theme === 'dark' ? 'border-blue-400' : 'border-blue-600'} opacity-70`}></div>
          </div>
        ) : (
          children
        )}
      </div>
    </div>
  );
};

export default Widget; 