import React from 'react';
import { motion } from 'framer-motion';
import { ChefHat, Sparkles, Shuffle } from 'lucide-react';
import type { Mode } from '../App';

interface ModeSelectionProps {
  onSelectMode: (mode: Mode) => void;
}

export default function ModeSelection({ onSelectMode }: ModeSelectionProps) {
  return (
    <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => onSelectMode('personalized')}
        className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl
                 hover:shadow-2xl transition-all flex flex-col items-center gap-4
                 text-center border border-white/20 dark:border-gray-700/20"
      >
        <Sparkles className="w-12 h-12 text-emerald-500 dark:text-emerald-400" />
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Personalized Suggestions</h2>
        <p className="text-gray-600 dark:text-gray-300">Get AI-powered dinner ideas based on your dietary preferences</p>
      </motion.button>

      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => onSelectMode('random')}
        className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl
                 hover:shadow-2xl transition-all flex flex-col items-center gap-4
                 text-center border border-white/20 dark:border-gray-700/20"
      >
        <Shuffle className="w-12 h-12 text-emerald-500 dark:text-emerald-400" />
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Random Ideas</h2>
        <p className="text-gray-600 dark:text-gray-300">Get AI-generated random dinner suggestions</p>
      </motion.button>

      <motion.button
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => onSelectMode('chains')}
        className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl
                 hover:shadow-2xl transition-all flex flex-col items-center gap-4
                 text-center border border-white/20 dark:border-gray-700/20"
      >
        <ChefHat className="w-12 h-12 text-emerald-500 dark:text-emerald-400" />
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Restaurant Chains</h2>
        <p className="text-gray-600 dark:text-gray-300">Discover popular menu items from your favorite US chains</p>
      </motion.button>
    </div>
  );
}