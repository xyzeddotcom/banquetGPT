import React from 'react';
import { motion } from 'framer-motion';
import { XIcon } from './icons/XIcon';

export default function Footer() {
  return (
    <footer className="mt-12 text-center pb-6">
      <div className="flex flex-col items-center gap-2">
        <motion.a
          href="https://x.com/BanquetGPT"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full
                   bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700
                   text-gray-700 dark:text-gray-300 transition-colors"
        >
          <XIcon />
          <span className="font-medium">Follow us on X</span>
        </motion.a>
        <div className="text-gray-600 dark:text-gray-400 text-sm">
          © 2024 BanquetGPT. All rights reserved. | Version 1.0.0
        </div>
        <div className="text-emerald-600 dark:text-emerald-400 text-xs">
          Powered by GPT-3.5 Turbo
        </div>
      </div>
    </footer>
  );
}