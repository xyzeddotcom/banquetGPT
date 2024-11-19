export interface Meal {
  name: string;
  description: string;
  cuisine: string;
  dietaryTags: string[];
  imageUrl?: string;
  restaurant?: string;
  price?: string;
}