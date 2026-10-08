"use client";

import React from "react";
import { RotateCcw, Trash2 } from "lucide-react";
import { motion } from "framer-motion";

interface ControlsProps {
  onResetRound: () => void;
  onRestartStats: () => void;
  boardEmpty: boolean;
  scoresEmpty: boolean;
}

export default function Controls({
  onResetRound,
  onRestartStats,
  boardEmpty,
  scoresEmpty,
}: ControlsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-md mx-auto px-4 flex gap-3 mt-4"
    >
      {/* Reset Round Button */}
      <motion.button
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        onClick={onResetRound}
        disabled={boardEmpty}
        className={`flex-1 flex items-center justify-center space-x-2 py-3.5 px-4 rounded-2xl border text-xs font-semibold uppercase tracking-wider transition-all duration-300 focus:outline-none ${
          boardEmpty
            ? "border-neutral-200/30 dark:border-neutral-900/30 text-neutral-300 dark:text-neutral-800 cursor-not-allowed"
            : "border-neutral-200 dark:border-neutral-800 bg-neutral-100/30 dark:bg-neutral-900/10 text-neutral-800 dark:text-neutral-200 hover:border-accent-red/60 hover:text-accent-red hover:bg-accent-red/[0.02]"
        }`}
      >
        <RotateCcw className="h-3.5 w-3.5" />
        <span>Reset Round</span>
      </motion.button>

      {/* Restart Stats Button */}
      <motion.button
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        onClick={onRestartStats}
        disabled={boardEmpty && scoresEmpty}
        className={`flex-1 flex items-center justify-center space-x-2 py-3.5 px-4 rounded-2xl border text-xs font-semibold uppercase tracking-wider transition-all duration-300 focus:outline-none ${
          boardEmpty && scoresEmpty
            ? "border-neutral-200/30 dark:border-neutral-900/30 text-neutral-300 dark:text-neutral-800 cursor-not-allowed"
            : "border-neutral-200 dark:border-neutral-800 bg-neutral-100/30 dark:bg-neutral-900/10 text-neutral-800 dark:text-neutral-200 hover:border-accent-red/60 hover:text-accent-red hover:bg-accent-red/[0.02]"
        }`}
      >
        <Trash2 className="h-3.5 w-3.5" />
        <span>Restart Stats</span>
      </motion.button>
    </motion.div>
  );
}
