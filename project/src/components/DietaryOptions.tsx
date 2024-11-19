import React from 'react';
import { Check } from 'lucide-react';
import { motion } from 'framer-motion';

interface DietaryOptionsProps {
  selectedOptions: string[];
  onOptionToggle: (option: string) => void;
  onGenerate: () => void;
  onReset: () => void;
  isGenerating: boolean;
}

const options = [
  'Vegetarian',
  'Vegan',
  'Gluten-Free',
  'Dairy-Free',
  'Keto',
  'Low-Carb',
  'Mediterranean',
  'Paleo',
  'Whole30',
  'High-Protein',
  'Low-Fat',
  'Pescatarian',
  'Nut-Free',
  'Soy-Free',
  'FODMAP-Friendly'
];

export default function DietaryOptions({ 
  selectedOptions, 
  onOptionToggle,
  onGenerate,
  isGenerating 
}: DietaryOptionsProps) {
  const handleOptionClick = (option: string) => {
    // If the option is already selected, deselect it
    // If it's not selected, clear other selections and select this one
    if (selectedOptions.includes(option)) {
      onOptionToggle('');
    } else {
      onOptionToggle(option);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {options.map((option) => (
          <motion.button
            key={option}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleOptionClick(option)}
            className={`${
              selectedOptions.includes(option)
                ? 'bg-emerald-100 border-emerald-500 text-emerald-700 dark:bg-emerald-900/30 dark:border-emerald-500 dark:text-emerald-300'
                : 'bg-white border-gray-200 text-gray-700 hover:border-emerald-200 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300'
            } border-2 rounded-xl p-3 flex items-center justify-between transition-colors`}
          >
            <span className="font-medium">{option}</span>
            {selectedOptions.includes(option) && (
              <Check className="w-5 h-5 text-emerald-500" />
            )}
          </motion.button>
        ))}
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onGenerate}
        disabled={isGenerating}
        className="w-full bg-emerald-500 text-white py-4 px-6 rounded-xl font-semibold
                 flex items-center justify-center gap-2 hover:bg-emerald-600 transition-colors
                 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-emerald-600 
                 dark:hover:bg-emerald-700"
      >
        {isGenerating ? 'Generating Ideas...' : 'Generate Dinner Ideas'}
      </motion.button>
    </div>
  );
}