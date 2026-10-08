"use client";

import React from "react";
import { GameMode, AIDifficulty } from "@/hooks/useTicTacToe";
import { motion, AnimatePresence } from "framer-motion";
import { User, Cpu } from "lucide-react";

interface GameModeSelectorProps {
  gameMode: GameMode;
  difficulty: AIDifficulty;
  onChangeMode: (mode: GameMode) => void;
  onChangeDifficulty: (diff: AIDifficulty) => void;
  isAiThinking: boolean;
}

export default function GameModeSelector({
  gameMode,
  difficulty,
  onChangeMode,
  onChangeDifficulty,
  isAiThinking,
}: GameModeSelectorProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-md mx-auto px-4 flex flex-col items-center space-y-3"
    >
      {/* Game Mode Pill Selector */}
      <div className="w-full relative flex p-1 rounded-xl bg-neutral-100 dark:bg-neutral-900/50 border border-neutral-200/60 dark:border-neutral-800/40">
        <button
          onClick={() => onChangeMode("ai")}
          className={`flex-1 flex items-center justify-center space-x-2 py-2 px-3 text-xs font-medium uppercase tracking-wider relative z-10 transition-colors duration-300 ${
            gameMode === "ai"
              ? "text-neutral-900 dark:text-neutral-50"
              : "text-neutral-500 hover:text-neutral-950 dark:hover:text-neutral-200"
          }`}
        >
          <Cpu className="h-3.5 w-3.5" />
          <span>VS Computer</span>
          {gameMode === "ai" && (
            <motion.div
              layoutId="activeMode"
              className="absolute inset-0 rounded-lg bg-white dark:bg-neutral-800 shadow-sm border border-neutral-200/50 dark:border-neutral-700/50 -z-10"
              transition={{ type: "spring", stiffness: 380, damping: 30 }}
            />
          )}
        </button>

        <button
          onClick={() => onChangeMode("pvp")}
          className={`flex-1 flex items-center justify-center space-x-2 py-2 px-3 text-xs font-medium uppercase tracking-wider relative z-10 transition-colors duration-300 ${
            gameMode === "pvp"
              ? "text-neutral-900 dark:text-neutral-50"
              : "text-neutral-500 hover:text-neutral-950 dark:hover:text-neutral-200"
          }`}
        >
          <User className="h-3.5 w-3.5" />
          <span>VS Friend</span>
          {gameMode === "pvp" && (
            <motion.div
              layoutId="activeMode"
              className="absolute inset-0 rounded-lg bg-white dark:bg-neutral-800 shadow-sm border border-neutral-200/50 dark:border-neutral-700/50 -z-10"
              transition={{ type: "spring", stiffness: 380, damping: 30 }}
            />
          )}
        </button>
      </div>

      {/* Difficulty Sub-Selector (Hidden in PvP) */}
      <div className="h-8 overflow-hidden w-full">
        <AnimatePresence initial={false} mode="wait">
          {gameMode === "ai" && (
            <motion.div
              key="difficulty"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="w-full flex items-center justify-between"
            >
              <div className="flex items-center space-x-1.5">
                <span className="font-mono text-[9px] uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                  CPU STATUS:
                </span>
                <span className="font-mono text-[9px] uppercase font-semibold text-accent-red animate-pulse">
                  {isAiThinking ? "THINKING..." : "READY"}
                </span>
              </div>
              
              <div className="flex items-center space-x-1 p-0.5 rounded-lg bg-neutral-100 dark:bg-neutral-900/40 border border-neutral-200/40 dark:border-neutral-800/30">
                <button
                  onClick={() => onChangeDifficulty("easy")}
                  className={`text-[9px] uppercase tracking-widest px-2.5 py-1 rounded font-medium relative transition-colors duration-200 ${
                    difficulty === "easy"
                      ? "text-neutral-900 dark:text-neutral-50 font-bold"
                      : "text-neutral-400 dark:text-neutral-600 hover:text-neutral-700 dark:hover:text-neutral-400"
                  }`}
                >
                  Easy
                  {difficulty === "easy" && (
                    <motion.div
                      layoutId="activeDiff"
                      className="absolute inset-0 rounded bg-white dark:bg-neutral-800 shadow-xs -z-10"
                      transition={{ type: "spring", stiffness: 400, damping: 35 }}
                    />
                  )}
                </button>
                
                <button
                  onClick={() => onChangeDifficulty("smart")}
                  className={`text-[9px] uppercase tracking-widest px-2.5 py-1 rounded font-medium relative transition-colors duration-200 ${
                    difficulty === "smart"
                      ? "text-neutral-900 dark:text-neutral-50 font-bold"
                      : "text-neutral-400 dark:text-neutral-600 hover:text-neutral-700 dark:hover:text-neutral-400"
                  }`}
                >
                  Unbeatable
                  {difficulty === "smart" && (
                    <motion.div
                      layoutId="activeDiff"
                      className="absolute inset-0 rounded bg-white dark:bg-neutral-800 shadow-xs -z-10"
                      transition={{ type: "spring", stiffness: 400, damping: 35 }}
                    />
                  )}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
