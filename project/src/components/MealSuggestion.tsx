import React from 'react';
import { motion } from 'framer-motion';
import { Utensils } from 'lucide-react';
import type { Meal } from '../types/meal';

interface MealSuggestionProps {
  meal: Meal & { image: string };
  index: number;
}

export default function MealSuggestion({ meal, index }: MealSuggestionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={meal.image}
          alt={meal.name}
          className="w-full h-full object-cover transition-transform hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="p-5">
        <div className="flex items-center gap-2 mb-2">
          <Utensils className="w-5 h-5 text-emerald-500 flex-shrink-0" />
          <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">{meal.name}</h3>
        </div>
        <p className="text-gray-600 mb-3 line-clamp-2">{meal.description}</p>
        <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm">
          {meal.cuisine}
        </span>
      </div>
    </motion.div>
  );
}