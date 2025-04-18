import React from 'react';
import Head from 'next/head';
import { useTheme } from '../contexts/ThemeContext';
import ThemeToggle from './ThemeToggle';
import { THEME, LAYOUT } from '../constants';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

export default function Layout({
  children,
  title = 'GitHub Insights Dashboard',
  description = 'Dashboard for GitHub repository insights'
}: LayoutProps) {
  const { theme } = useTheme();
  const isDark = theme === THEME.DARK;

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gradient-dark text-white' : 'bg-gradient-light text-gray-800'}`}>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="fixed inset-0 overflow-hidden -z-10">
        <div className={`absolute top-0 -left-10 w-72 h-72 rounded-full ${isDark ? 'bg-blue-900/30' : 'bg-blue-300/40'} filter blur-3xl opacity-70 animate-blob`}></div>
        <div className={`absolute top-0 -right-10 w-72 h-72 rounded-full ${isDark ? 'bg-purple-900/30' : 'bg-purple-300/40'} filter blur-3xl opacity-70 animate-blob animation-delay-2000`}></div>
        <div className={`absolute bottom-0 left-1/4 w-72 h-72 rounded-full ${isDark ? 'bg-indigo-900/30' : 'bg-indigo-300/40'} filter blur-3xl opacity-70 animate-blob animation-delay-4000`}></div>
        <div className={`absolute bottom-0 right-1/4 w-72 h-72 rounded-full ${isDark ? 'bg-cyan-900/30' : 'bg-cyan-300/40'} filter blur-3xl opacity-70 animate-blob animation-delay-6000`}></div>
      </div>

      <div className={`${isDark ? 'glass-strong border-zinc-800' : 'glass-strong border-zinc-200'} border-b`}>
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
              GitHub Insights Dashboard
            </h1>
            <p className={`${isDark ? 'text-zinc-400' : 'text-zinc-600'} mt-2`}>Analyze repository performance and activity</p>
          </div>
          <ThemeToggle />
        </div>
      </div>

      <main className={`container mx-auto px-4 py-8 ${LAYOUT.MAIN_MAX_WIDTH} relative z-10`}>
        {children}
      </main>
      
      <footer className={`${isDark ? 'glass-strong border-zinc-800' : 'glass-strong border-zinc-200'} border-t mt-12`}>
        <div className="container mx-auto px-4 py-6">
          <p className={`text-center ${isDark ? 'text-zinc-500' : 'text-gray-500'} text-sm`}>
            GitHub Insights Dashboard &copy; {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  );
} 