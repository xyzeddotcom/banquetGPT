import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { restaurantMeals } from '../src/data/restaurantMeals.js';
import { randomMeals } from '../src/data/randomMeals.js';
import { personalizedMeals } from '../src/data/personalizedMeals.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the dist directory
app.use(express.static(join(__dirname, '../dist')));

// API routes
app.post('/api/generate-meals', async (req, res) => {
  try {
    const { mode, dietaryPreferences = [] } = req.body;
    let meals = [];

    switch (mode) {
      case 'chains':
        meals = restaurantMeals;
        break;
      case 'random':
        meals = randomMeals;
        break;
      case 'personalized':
        meals = dietaryPreferences.length > 0
          ? personalizedMeals.filter(meal => 
              dietaryPreferences.some(pref => meal.dietaryTags.includes(pref))
            )
          : personalizedMeals;
        break;
      default:
        throw new Error('Invalid mode selected');
    }

    // Shuffle and select 6 meals
    const selected = [...meals]
      .sort(() => 0.5 - Math.random())
      .slice(0, 6);

    res.json({ meals: selected });
  } catch (error) {
    console.error('Error generating meals:', error);
    res.status(500).json({ error: 'Failed to generate meal suggestions' });
  }
});

// Handle all other routes by serving the index.html
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, '../dist/index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});