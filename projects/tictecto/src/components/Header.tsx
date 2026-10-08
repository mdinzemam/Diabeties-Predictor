"use client";

import React from "react";
import { useTheme } from "@/context/ThemeContext";
import { Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-md mx-auto flex items-center justify-between py-6 px-4 mb-2 border-b border-neutral-200/50 dark:border-neutral-800/30"
    >
      <div className="flex items-center space-x-1 tracking-tighter">
        <span className="font-sans font-bold text-2xl tracking-widest text-neutral-900 dark:text-neutral-100 uppercase">
          Tict<span className="text-accent-red">e</span>cto
        </span>
        <span className="font-mono text-[9px] px-1.5 py-0.5 rounded border border-neutral-300 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-900 text-neutral-500 dark:text-neutral-400">
          v1.0.0
        </span>
      </div>

      <button
        onClick={toggleTheme}
        className="relative h-10 w-10 flex items-center justify-center rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-100/50 dark:bg-neutral-900/40 hover:border-accent-red hover:text-accent-red transition-colors duration-300 focus:outline-none"
        aria-label="Toggle theme"
      >
        <AnimatePresence mode="wait" initial={false}>
          {theme === "dark" ? (
            <motion.div
              key="sun"
              initial={{ rotate: -90, opacity: 0, scale: 0.8 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: 90, opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
            >
              <Sun className="h-[18px] w-[18px]" />
            </motion.div>
          ) : (
            <motion.div
              key="moon"
              initial={{ rotate: -90, opacity: 0, scale: 0.8 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: 90, opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
            >
              <Moon className="h-[18px] w-[18px]" />
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </motion.header>
  );
}
