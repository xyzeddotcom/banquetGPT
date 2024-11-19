import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { RotateCcw, Shuffle } from 'lucide-react';
import { generateMeals } from './api/meals';
import type { Meal } from './types/meal';
import Header from './components/Header';
import ModeSelection from './components/ModeSelection';
import DietaryOptions from './components/DietaryOptions';
import RestaurantCard from './components/RestaurantCard';
import RandomMealCard from './components/RandomMealCard';
import PersonalizedMealCard from './components/PersonalizedMealCard';
import Footer from './components/Footer';

export type Mode = 'selection' | 'personalized' | 'random' | 'chains';

function App() {
  const [mode, setMode] = useState<Mode>('selection');
  const [selectedPreferences, setSelectedPreferences] = useState<string[]>([]);
  const [suggestions, setSuggestions] = useState<Meal[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateSuggestions = async () => {
    setIsGenerating(true);
    setError(null);
    
    try {
      const meals = await generateMeals({
        mode,
        dietaryPreferences: selectedPreferences
      });
      setSuggestions(meals);
    } catch (err) {
      setError('Failed to generate meal suggestions. Please try again.');
      console.error('Error:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleOptionToggle = (option: string) => {
    setSelectedPreferences(option ? [option] : []);
  };

  const handleReset = () => {
    setMode('selection');
    setSelectedPreferences([]);
    setSuggestions([]);
    setError(null);
  };

  const handleNewIdeas = () => {
    handleGenerateSuggestions();
  };

  const renderMealCard = (meal: Meal, index: number) => {
    switch (mode) {
      case 'chains':
        return <RestaurantCard key={`${meal.name}-${index}`} meal={meal} index={index} />;
      case 'random':
        return <RandomMealCard key={`${meal.name}-${index}`} meal={meal} index={index} />;
      case 'personalized':
        return <PersonalizedMealCard key={`${meal.name}-${index}`} meal={meal} index={index} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-radial from-emerald-400 via-teal-500 to-cyan-600 
                    dark:from-emerald-900 dark:via-teal-800 dark:to-cyan-900 p-6 transition-colors duration-200
                    before:fixed before:inset-0 before:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),rgba(255,255,255,0))] 
                    before:pointer-events-none relative">
      <div className="max-w-7xl mx-auto relative">
        <Header />

        {mode === 'selection' ? (
          <ModeSelection 
            onSelectMode={(newMode) => {
              setMode(newMode);
              if (newMode === 'random' || newMode === 'chains') {
                handleGenerateSuggestions();
              }
            }} 
          />
        ) : (
          <>
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl mb-8">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                  {mode === 'personalized' ? 'Select Your Dietary Preference' : 
                   mode === 'chains' ? 'Popular Restaurant Chain Items' : 
                   'Random Dinner Ideas'}
                </h2>
                <div className="flex gap-4">
                  {(mode === 'random' || mode === 'chains') && (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleNewIdeas}
                      disabled={isGenerating}
                      className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300
                               flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-emerald-200 
                               dark:hover:bg-emerald-800/30 transition-colors disabled:opacity-50"
                    >
                      <Shuffle className="w-4 h-4" />
                      <span>New Ideas</span>
                    </motion.button>
                  )}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleReset}
                    className="bg-gray-100 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300
                             flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-200 
                             dark:hover:bg-gray-600/50 transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Start Over</span>
                  </motion.button>
                </div>
              </div>

              {mode === 'personalized' && (
                <DietaryOptions
                  selectedOptions={selectedPreferences}
                  onOptionToggle={handleOptionToggle}
                  onGenerate={handleGenerateSuggestions}
                  onReset={handleReset}
                  isGenerating={isGenerating}
                />
              )}

              {error && (
                <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg">
                  {error}
                </div>
              )}
            </div>

            {suggestions.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {suggestions.map((meal, index) => renderMealCard(meal, index))}
              </div>
            )}
          </>
        )}

        <Footer />
      </div>
    </div>
  );
}

export default App;