"use client";

import React from "react";
import { GameMode, Player } from "@/hooks/useTicTacToe";
import { motion } from "framer-motion";

interface ScoreboardProps {
  scores: {
    xWins: number;
    oWins: number;
    ties: number;
  };
  turn: Player;
  gameMode: GameMode;
  winner: string | null;
}

export default function Scoreboard({ scores, turn, gameMode, winner }: ScoreboardProps) {
  const isXTurn = turn === "X" && !winner;
  const isOTurn = turn === "O" && !winner;

  const oLabel = gameMode === "ai" ? "CPU (O)" : "PLAYER O (O)";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-md mx-auto px-4 grid grid-cols-3 gap-3"
    >
      {/* Player X Score Card */}
      <div
        className={`relative flex flex-col items-center justify-center p-3 rounded-2xl border transition-all duration-300 ${
          isXTurn
            ? "border-neutral-900 dark:border-neutral-100 bg-neutral-100/30 dark:bg-neutral-900/20"
            : "border-neutral-200/50 dark:border-neutral-800/30 bg-transparent"
        }`}
      >
        <span className="font-mono text-[9px] uppercase tracking-wider text-neutral-400 dark:text-neutral-500 mb-1">
          Player X (X)
        </span>
        <span className="font-sans font-bold text-2xl text-neutral-900 dark:text-neutral-50">
          {scores.xWins}
        </span>
        {isXTurn && (
          <motion.div
            layoutId="turnDot"
            className="absolute bottom-1.5 h-1 w-1 rounded-full bg-accent-red"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        )}
      </div>

      {/* Ties Score Card */}
      <div className="flex flex-col items-center justify-center p-3 rounded-2xl border border-neutral-200/50 dark:border-neutral-800/30 bg-transparent">
        <span className="font-mono text-[9px] uppercase tracking-wider text-neutral-400 dark:text-neutral-500 mb-1">
          Ties
        </span>
        <span className="font-sans font-bold text-2xl text-neutral-900 dark:text-neutral-50">
          {scores.ties}
        </span>
      </div>

      {/* Player O Score Card */}
      <div
        className={`relative flex flex-col items-center justify-center p-3 rounded-2xl border transition-all duration-300 ${
          isOTurn
            ? "border-neutral-900 dark:border-neutral-100 bg-neutral-100/30 dark:bg-neutral-900/20"
            : "border-neutral-200/50 dark:border-neutral-800/30 bg-transparent"
        }`}
      >
        <span className="font-mono text-[9px] uppercase tracking-wider text-neutral-400 dark:text-neutral-500 mb-1 truncate max-w-full">
          {oLabel}
        </span>
        <span className="font-sans font-bold text-2xl text-neutral-900 dark:text-neutral-50">
          {scores.oWins}
        </span>
        {isOTurn && (
          <motion.div
            layoutId="turnDot"
            className="absolute bottom-1.5 h-1 w-1 rounded-full bg-accent-red"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        )}
      </div>
    </motion.div>
  );
}
