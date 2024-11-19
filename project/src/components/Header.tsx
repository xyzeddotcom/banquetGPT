import React from 'react';
import { ChefHat } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  return (
    <header className="flex justify-between items-center mb-12 sticky top-0 z-50 py-4 px-6 
                     bg-gradient-to-br from-emerald-50/90 to-teal-50/90 dark:from-gray-900/90 
                     dark:to-gray-800/90 backdrop-blur-sm">
      <div className="flex items-center gap-3">
        <ChefHat className="w-12 h-12 text-emerald-600 dark:text-emerald-400" />
        <div>
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white">BanquetGPT</h1>
          <p className="text-emerald-600 dark:text-emerald-400 text-xl mt-1 font-medium">
            Never Wonder "What's for Dinner?" Again!
          </p>
        </div>
      </div>
      <ThemeToggle />
    </header>
  );
}