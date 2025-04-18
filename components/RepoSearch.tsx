import { useState, FormEvent } from 'react';
import { useTheme } from '../contexts/ThemeContext';

export interface RepoSearchProps {
  onSearch: (org: string, repo: string) => void;
  initialOrg?: string;
  initialRepo?: string;
  disabled?: boolean;
}

export default function RepoSearch({ 
  onSearch, 
  initialOrg = 'Allen-Career-Institute', 
  initialRepo = 'common-protos',
  disabled = false
}: RepoSearchProps) {
  const { theme } = useTheme();
  const [org, setOrg] = useState(initialOrg);
  const [repo, setRepo] = useState(initialRepo);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSearch(org, repo);
  };

  return (
    <div className={`${theme === 'dark' ? 'glass-medium border-zinc-800/70' : 'glass-medium border-zinc-200/70'} mb-8 overflow-hidden hover-glass transition-all duration-300`}>
      <div className={`px-6 py-4 border-b ${theme === 'dark' ? 'border-zinc-800/70' : 'border-zinc-200/70'}`}>
        <h2 className={`text-lg font-medium ${theme === 'dark' ? 'text-zinc-200' : 'text-gray-700'}`}>Repository Search</h2>
      </div>
      
      <form onSubmit={handleSubmit} className="p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label htmlFor="org" className={`block text-sm font-medium ${theme === 'dark' ? 'text-zinc-300' : 'text-gray-600'} mb-1`}>
              Organization
            </label>
            <input
              id="org"
              type="text"
              value={org}
              onChange={(e) => setOrg(e.target.value)}
              className={`w-full px-3 py-2 ${theme === 'dark' ? 'bg-zinc-900/50 text-white' : 'bg-white/50 text-gray-800'} backdrop-blur-md border ${theme === 'dark' ? 'border-zinc-700/70' : 'border-zinc-300/70'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
              placeholder="e.g. facebook"
            />
          </div>
          <div className="flex-1">
            <label htmlFor="repo" className={`block text-sm font-medium ${theme === 'dark' ? 'text-zinc-300' : 'text-gray-600'} mb-1`}>
              Repository
            </label>
            <input
              id="repo"
              type="text"
              value={repo}
              onChange={(e) => setRepo(e.target.value)}
              className={`w-full px-3 py-2 ${theme === 'dark' ? 'bg-zinc-900/50 text-white' : 'bg-white/50 text-gray-800'} backdrop-blur-md border ${theme === 'dark' ? 'border-zinc-700/70' : 'border-zinc-300/70'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200`}
              placeholder="e.g. react"
            />
          </div>
          <div className="flex items-end">
            <button
              type="submit"
              disabled={disabled}
              className={`px-4 py-2 ${theme === 'dark' ? 'bg-blue-500/80' : 'bg-blue-600/90'} backdrop-blur-md text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-zinc-900 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg ${theme === 'dark' ? 'shadow-blue-500/20' : 'shadow-blue-500/30'}`}
            >
              Search
            </button>
          </div>
        </div>
      </form>
    </div>
  );
} 