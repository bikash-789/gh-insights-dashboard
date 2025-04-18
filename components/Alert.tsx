import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { THEME, ALERT_TYPES } from '../constants';

export type AlertType = typeof ALERT_TYPES.SUCCESS | typeof ALERT_TYPES.WARNING | typeof ALERT_TYPES.ERROR | typeof ALERT_TYPES.INFO;

export interface AlertProps {
  type: AlertType;
  message: string;
}

export default function Alert({ type, message }: AlertProps) {
  const { theme } = useTheme();
  const isDark = theme === THEME.DARK;
  
  const styles = {
    [ALERT_TYPES.SUCCESS]: {
      container: isDark 
        ? 'glass-medium p-4 text-green-200 border border-green-900/30 shadow-lg shadow-green-900/20'
        : 'glass-medium p-4 text-green-800 border border-green-300/70 shadow-lg shadow-green-400/10',
      icon: isDark ? 'text-green-300' : 'text-green-600',
      text: isDark ? 'text-green-200' : 'text-green-800'
    },
    [ALERT_TYPES.WARNING]: {
      container: isDark 
        ? 'glass-medium p-4 text-yellow-200 border border-yellow-900/30 shadow-lg shadow-yellow-900/20'
        : 'glass-medium p-4 text-yellow-800 border border-yellow-300/70 shadow-lg shadow-yellow-400/10',
      icon: isDark ? 'text-yellow-300' : 'text-yellow-600',
      text: isDark ? 'text-yellow-200' : 'text-yellow-800'
    },
    [ALERT_TYPES.ERROR]: {
      container: isDark 
        ? 'glass-medium p-4 text-red-200 border border-red-900/30 shadow-lg shadow-red-900/20'
        : 'glass-medium p-4 text-red-800 border border-red-300/70 shadow-lg shadow-red-400/10',
      icon: isDark ? 'text-red-300' : 'text-red-600',
      text: isDark ? 'text-red-200' : 'text-red-800'
    },
    [ALERT_TYPES.INFO]: {
      container: isDark 
        ? 'glass-medium p-4 text-blue-200 border border-blue-900/30 shadow-lg shadow-blue-900/20'
        : 'glass-medium p-4 text-blue-800 border border-blue-300/70 shadow-lg shadow-blue-400/10',
      icon: isDark ? 'text-blue-300' : 'text-blue-600',
      text: isDark ? 'text-blue-200' : 'text-blue-800'
    }
  };

  // Icons based on alert type
  const icons = {
    [ALERT_TYPES.SUCCESS]: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
      </svg>
    ),
    [ALERT_TYPES.WARNING]: (
      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
      </svg>
    ),
    [ALERT_TYPES.ERROR]: (
      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
      </svg>
    ),
    [ALERT_TYPES.INFO]: (
      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z" clipRule="evenodd" />
      </svg>
    )
  };

  return (
    <div className={`${styles[type].container} mb-6`}>
      <div className="flex">
        <div className="flex-shrink-0">
          <div className={styles[type].icon}>
            {icons[type]}
          </div>
        </div>
        <div className="ml-3">
          <p className={`text-sm ${styles[type].text}`}>
            {message}
          </p>
        </div>
      </div>
    </div>
  );
} 