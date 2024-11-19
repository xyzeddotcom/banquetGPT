import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: join(__dirname, '../.env') });

export function getConfig() {
  const apiKey = process.env.OPENAI_API_KEY;
  
  if (!apiKey) {
    console.error('OPENAI_API_KEY environment variable is missing or empty');
    process.exit(1);
  }

  return {
    openai: {
      apiKey: apiKey.trim()
    },
    server: {
      port: parseInt(process.env.PORT || '3000', 10)
    }
  };
}