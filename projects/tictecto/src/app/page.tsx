"use client";

import React from "react";
import { useTicTacToe } from "@/hooks/useTicTacToe";
import Header from "@/components/Header";
import GameModeSelector from "@/components/GameModeSelector";
import Scoreboard from "@/components/Scoreboard";
import GameBoard from "@/components/GameBoard";
import Controls from "@/components/Controls";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const {
    board,
    turn,
    gameMode,
    difficulty,
    isAiThinking,
    winner,
    winningLine,
    scores,
    makeMove,
    resetRound,
    restartStats,
    changeGameMode,
    changeDifficulty,
  } = useTicTacToe();

  const boardEmpty = board.every((cell) => cell === null);
  const scoresEmpty =
    scores.xWins === 0 && scores.oWins === 0 && scores.ties === 0;

  // Generate dynamic, premium win notification text
  const getNotificationText = () => {
    if (!winner) return "";
    if (winner === "TIE") return "Round Drawn.";
    
    if (gameMode === "ai") {
      return winner === "X" ? "Winner: You! (X)" : "Winner: CPU (O)";
    } else {
      return winner === "X" ? "Winner: Player X" : "Winner: Player O";
    }
  };

  return (
    <div className="flex-1 w-full min-h-screen dot-grid bg-neutral-50 dark:bg-black text-neutral-900 dark:text-neutral-100 flex flex-col justify-between py-8 px-4 transition-colors duration-300">
      
      {/* Top Section */}
      <div className="w-full flex flex-col items-center">
        <Header />
        
        <GameModeSelector
          gameMode={gameMode}
          difficulty={difficulty}
          onChangeMode={changeGameMode}
          onChangeDifficulty={changeDifficulty}
          isAiThinking={isAiThinking}
        />
      </div>

      {/* Main Board Area (Centered) */}
      <main className="flex-1 w-full max-w-md mx-auto flex flex-col items-center justify-center my-6">
        
        {/* Game Result Banner */}
        <div className="h-12 w-full flex items-center justify-center mb-2">
          <AnimatePresence mode="wait">
            {winner && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -10 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-xs text-center py-2 px-4 rounded-xl border border-accent-red bg-accent-red/[0.04] text-accent-red font-mono text-[10px] uppercase tracking-widest font-semibold shadow-[0_2px_10px_rgba(255,59,48,0.05)]"
              >
                {getNotificationText()}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Board Component */}
        <GameBoard
          board={board}
          turn={turn}
          winner={winner}
          winningLine={winningLine}
          makeMove={makeMove}
          isAiThinking={isAiThinking}
        />
      </main>

      {/* Bottom Section */}
      <div className="w-full flex flex-col items-center space-y-4">
        <Scoreboard
          scores={scores}
          turn={turn}
          gameMode={gameMode}
          winner={winner}
        />
        
        <Controls
          onResetRound={resetRound}
          onRestartStats={restartStats}
          boardEmpty={boardEmpty}
          scoresEmpty={scoresEmpty}
        />

        {/* Minimal industrial footer text */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-[8px] font-mono tracking-widest text-neutral-500 uppercase mt-4"
        >
          NOTHING DESIGN CORP // CONCEPT
        </motion.div>
      </div>

    </div>
  );
}
