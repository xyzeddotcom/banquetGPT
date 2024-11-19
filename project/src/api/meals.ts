import type { Meal } from '../types/meal';
import { restaurantMeals } from '../data/restaurantMeals';
import { randomMeals } from '../data/randomMeals';
import { personalizedMeals } from '../data/personalizedMeals';

export async function generateMeals({ 
  mode, 
  dietaryPreferences = [] 
}: {
  mode: 'random' | 'personalized' | 'chains';
  dietaryPreferences?: string[];
}): Promise<Meal[]> {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    if (mode === 'chains') {
      return [...restaurantMeals]
        .sort(() => 0.5 - Math.random())
        .slice(0, 6);
    }

    if (mode === 'random') {
      return [...randomMeals]
        .sort(() => 0.5 - Math.random())
        .slice(0, 6);
    }

    // Personalized mode
    let availableMeals = personalizedMeals.filter(meal => 
      dietaryPreferences.some(pref => meal.dietaryTags.includes(pref))
    );

    // If not enough meals match preferences, add random ones
    if (availableMeals.length < 6) {
      const remainingMeals = personalizedMeals.filter(meal => !availableMeals.includes(meal));
      const additionalMeals = remainingMeals
        .sort(() => 0.5 - Math.random())
        .slice(0, 6 - availableMeals.length);
      availableMeals = [...availableMeals, ...additionalMeals];
    }

    return availableMeals
      .sort(() => 0.5 - Math.random())
      .slice(0, 6);
  } catch (error) {
    console.error('Error generating meals:', error);
    throw new Error('Failed to generate meal suggestions');
  }
}