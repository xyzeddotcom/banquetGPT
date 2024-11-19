import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import type { Meal } from '../types/meal';

interface PersonalizedMealCardProps {
  meal: Meal;
  index: number;
}

export default function PersonalizedMealCard({ meal, index }: PersonalizedMealCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden 
                hover:shadow-xl transition-all border border-white/20 dark:border-gray-700/20"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={meal.imageUrl}
          alt={meal.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-5 h-5 text-emerald-500 dark:text-emerald-400 flex-shrink-0" />
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{meal.name}</h3>
        </div>
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">{meal.description}</p>
        <div className="flex flex-wrap gap-2">
          <span className="px-3 py-1 bg-emerald-100/80 dark:bg-emerald-900/30 text-emerald-700 
                       dark:text-emerald-300 rounded-full text-sm backdrop-blur-sm">
            {meal.cuisine}
          </span>
          {meal.dietaryTags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-gray-100/80 dark:bg-gray-700/80 text-gray-700 dark:text-gray-300 
                       rounded-full text-sm backdrop-blur-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}