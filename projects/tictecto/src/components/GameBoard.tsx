"use client";

import React from "react";
import { CellValue, Player } from "@/hooks/useTicTacToe";
import { motion } from "framer-motion";

interface GameBoardProps {
  board: CellValue[];
  turn: Player;
  winner: string | null;
  winningLine: number[] | null;
  makeMove: (index: number) => void;
  isAiThinking: boolean;
}

// Calculate responsive percentage centers for winning line coordinates
function getCellPercentageCoordinates(index: number) {
  const row = Math.floor(index / 3);
  const col = index % 3;
  return {
    x: 16.66 + col * 33.33,
    y: 16.66 + row * 33.33,
  };
}

export default function GameBoard({
  board,
  turn,
  winner,
  winningLine,
  makeMove,
  isAiThinking,
}: GameBoardProps) {
  
  // Custom X SVG Component with draw animations
  const XIcon = ({ isWinningCell }: { isWinningCell: boolean }) => (
    <svg
      viewBox="0 0 100 100"
      className={`w-14 h-14 md:w-16 md:h-16 transition-colors duration-300 ${
        isWinningCell
          ? "text-accent-red"
          : "text-neutral-900 dark:text-neutral-100"
      }`}
    >
      <motion.path
        d="M 24 24 L 76 76"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.path
        d="M 76 24 L 24 76"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.35, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      />
    </svg>
  );

  // Custom O SVG Component (Nothing-inspired concentric dotted & solid circles)
  const OIcon = ({ isWinningCell }: { isWinningCell: boolean }) => (
    <svg
      viewBox="0 0 100 100"
      className={`w-14 h-14 md:w-16 md:h-16 transition-colors duration-300 ${
        isWinningCell
          ? "text-accent-red"
          : "text-neutral-900 dark:text-neutral-100"
      }`}
    >
      {/* Outer technical dotted circle */}
      <motion.circle
        cx="50"
        cy="50"
        r="30"
        fill="none"
        stroke={isWinningCell ? "#FF3B30" : "currentColor"}
        strokeWidth="1"
        strokeDasharray="2 3"
        className="opacity-40"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.4 }}
        transition={{ duration: 0.4 }}
      />
      {/* Inner primary solid circle */}
      <motion.circle
        cx="50"
        cy="50"
        r="20"
        fill="none"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      />
    </svg>
  );

  // Faint hover/preview symbol
  const PreviewIcon = ({ symbol }: { symbol: Player }) => (
    <div className="opacity-15 dark:opacity-10 scale-90 transition-transform duration-200">
      {symbol === "X" ? (
        <svg viewBox="0 0 100 100" className="w-14 h-14 md:w-16 md:h-16 text-neutral-500">
          <path d="M 24 24 L 76 76" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
          <path d="M 76 24 L 24 76" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
        </svg>
      ) : (
        <svg viewBox="0 0 100 100" className="w-14 h-14 md:w-16 md:h-16 text-neutral-500">
          <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2 3" />
          <circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" strokeWidth="5" />
        </svg>
      )}
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex items-center justify-center py-6"
    >
      <div className="relative w-76 h-76 sm:w-84 sm:h-84 md:w-96 md:h-96 bg-white/40 dark:bg-neutral-950/20 rounded-3xl p-6 border border-neutral-200/50 dark:border-neutral-800/30 shadow-[0_8px_30px_rgb(0,0,0,0.01)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.15)] backdrop-blur-md">
        
        {/* Dotted Grid Pattern overlay inside board */}
        <div className="absolute inset-6 dot-grid pointer-events-none rounded-xl" />

        {/* 3x3 Grid Layout */}
        <div className="grid grid-cols-3 grid-rows-3 w-full h-full relative z-10">
          {board.map((cellValue, idx) => {
            const row = Math.floor(idx / 3);
            const col = idx % 3;
            const isWinningCell = winningLine ? winningLine.includes(idx) : false;

            return (
              <button
                key={idx}
                onClick={() => makeMove(idx)}
                disabled={cellValue !== null || winner !== null || isAiThinking}
                className={`relative flex items-center justify-center focus:outline-none transition-all duration-300 group ${
                  col < 2 ? "border-r" : ""
                } ${row < 2 ? "border-b" : ""} border-neutral-200/60 dark:border-neutral-800/40`}
              >
                {/* Cell Contents */}
                {cellValue === "X" && <XIcon isWinningCell={isWinningCell} />}
                {cellValue === "O" && <OIcon isWinningCell={isWinningCell} />}
                
                {/* Empty Cell Hover State */}
                {cellValue === null && !winner && !isAiThinking && (
                  <>
                    {/* Faint preview of O/X symbol */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <PreviewIcon symbol={turn} />
                    </div>
                    {/* Micro-interaction: Nothing-inspired red status dot */}
                    <div className="absolute h-1.5 w-1.5 rounded-full bg-accent-red opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 bottom-2" />
                  </>
                )}
              </button>
            );
          })}
        </div>

        {/* Winning Line SVG Overlay */}
        {winningLine && (
          <svg className="absolute inset-6 w-[calc(100%-48px)] h-[calc(100%-48px)] pointer-events-none z-20">
            {(() => {
              const start = getCellPercentageCoordinates(winningLine[0]);
              const end = getCellPercentageCoordinates(winningLine[2]);
              return (
                <motion.line
                  x1={`${start.x}%`}
                  y1={`${start.y}%`}
                  x2={`${end.x}%`}
                  y2={`${end.y}%`}
                  stroke="#FF3B30"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                />
              );
            })()}
          </svg>
        )}
      </div>
    </motion.div>
  );
}
