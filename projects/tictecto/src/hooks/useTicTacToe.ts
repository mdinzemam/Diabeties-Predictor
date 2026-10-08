"use client";

import { useState, useEffect, useCallback } from "react";

export type Player = "X" | "O";
export type GameMode = "pvp" | "ai";
export type AIDifficulty = "easy" | "smart";
export type CellValue = Player | null;
export type GameWinner = Player | "TIE" | null;

const WINNING_COMBINATIONS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6]             // Diagonals
];

export function checkWinner(board: CellValue[]): { winner: GameWinner; winningLine: number[] | null } {
  for (const combo of WINNING_COMBINATIONS) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], winningLine: combo };
    }
  }
  if (board.every((cell) => cell !== null)) {
    return { winner: "TIE", winningLine: null };
  }
  return { winner: null, winningLine: null };
}

// Minimax scoring helper
function evaluateBoard(board: CellValue[]): number {
  const { winner } = checkWinner(board);
  if (winner === "O") return 10;
  if (winner === "X") return -10;
  return 0;
}

// Minimax algorithm for AI
function minimax(board: CellValue[], depth: number, isMax: boolean): number {
  const score = evaluateBoard(board);

  if (score === 10) return score - depth;
  if (score === -10) return score + depth;
  if (board.every((c) => c !== null)) return 0;

  if (isMax) {
    let best = -1000;
    for (let i = 0; i < 9; i++) {
      if (board[i] === null) {
        board[i] = "O";
        best = Math.max(best, minimax(board, depth + 1, false));
        board[i] = null;
      }
    }
    return best;
  } else {
    let best = 1000;
    for (let i = 0; i < 9; i++) {
      if (board[i] === null) {
        board[i] = "X";
        best = Math.min(best, minimax(board, depth + 1, true));
        board[i] = null;
      }
    }
    return best;
  }
}

// Find best move for O (AI)
function getBestMove(board: CellValue[]): number {
  let bestVal = -1000;
  let bestMove = -1;

  for (let i = 0; i < 9; i++) {
    if (board[i] === null) {
      board[i] = "O";
      const moveVal = minimax(board, 0, false);
      board[i] = null;

      if (moveVal > bestVal) {
        bestMove = i;
        bestVal = moveVal;
      }
    }
  }
  return bestMove;
}

// Find random move for O (Easy AI)
function getRandomMove(board: CellValue[]): number {
  const availableMoves: number[] = [];
  board.forEach((cell, idx) => {
    if (cell === null) availableMoves.push(idx);
  });
  if (availableMoves.length === 0) return -1;
  const randomIndex = Math.floor(Math.random() * availableMoves.length);
  return availableMoves[randomIndex];
}

export function useTicTacToe() {
  const [board, setBoard] = useState<CellValue[]>(Array(9).fill(null));
  const [turn, setTurn] = useState<Player>("X");
  const [gameMode, setGameMode] = useState<GameMode>("ai");
  const [difficulty, setDifficulty] = useState<AIDifficulty>("smart");
  const [isAiThinking, setIsAiThinking] = useState(false);
  
  // Game stats
  const [scores, setScores] = useState({
    xWins: 0,
    oWins: 0,
    ties: 0,
  });

  // Load scores from localStorage on mount
  useEffect(() => {
    const savedScores = localStorage.getItem("tictecto_scores");
    const savedMode = localStorage.getItem("tictecto_mode") as GameMode | null;
    const savedDiff = localStorage.getItem("tictecto_diff") as AIDifficulty | null;
    
    if (savedScores) {
      try {
        setScores(JSON.parse(savedScores));
      } catch (e) {
        console.error("Failed to parse scores", e);
      }
    }
    if (savedMode) setGameMode(savedMode);
    if (savedDiff) setDifficulty(savedDiff);
  }, []);

  // Save changes
  const updateScores = useCallback((newScores: typeof scores) => {
    setScores(newScores);
    localStorage.setItem("tictecto_scores", JSON.stringify(newScores));
  }, []);

  const changeGameMode = useCallback((mode: GameMode) => {
    setGameMode(mode);
    localStorage.setItem("tictecto_mode", mode);
    // Restart board on mode change to avoid weird state transition
    setBoard(Array(9).fill(null));
    setTurn("X");
  }, []);

  const changeDifficulty = useCallback((diff: AIDifficulty) => {
    setDifficulty(diff);
    localStorage.setItem("tictecto_diff", diff);
  }, []);

  const { winner, winningLine } = checkWinner(board);

  // Trigger win or tie stats update
  useEffect(() => {
    if (winner) {
      const newScores = { ...scores };
      if (winner === "X") {
        newScores.xWins += 1;
      } else if (winner === "O") {
        newScores.oWins += 1;
      } else if (winner === "TIE") {
        newScores.ties += 1;
      }
      updateScores(newScores);
    }
  }, [winner, updateScores]);

  // AI turn trigger
  useEffect(() => {
    if (gameMode === "ai" && turn === "O" && !winner) {
      setIsAiThinking(true);
      
      const timer = setTimeout(() => {
        let aiMove = -1;
        if (difficulty === "smart") {
          aiMove = getBestMove(board);
        } else {
          // Easy AI: 70% random, 30% minimax for balance
          if (Math.random() < 0.7) {
            aiMove = getRandomMove(board);
          } else {
            aiMove = getBestMove(board);
          }
        }

        if (aiMove !== -1) {
          setBoard((prev) => {
            const next = [...prev];
            next[aiMove] = "O";
            return next;
          });
          setTurn("X");
        }
        setIsAiThinking(false);
      }, 500); // 500ms thinking delay for premium feel

      return () => clearTimeout(timer);
    }
  }, [board, gameMode, turn, winner, difficulty]);

  // Handle cell click
  const makeMove = useCallback((index: number) => {
    // Block if cell is already occupied, game is over, or AI is thinking
    if (board[index] || winner || isAiThinking) return;
    if (gameMode === "ai" && turn === "O") return;

    setBoard((prev) => {
      const next = [...prev];
      next[index] = turn;
      return next;
    });

    setTurn((prev) => (prev === "X" ? "O" : "X"));
  }, [board, winner, turn, gameMode, isAiThinking]);

  // Clear current board but keep scores
  const resetRound = useCallback(() => {
    setBoard(Array(9).fill(null));
    setTurn("X");
    setIsAiThinking(false);
  }, []);

  // Clear board and reset scores
  const restartStats = useCallback(() => {
    setBoard(Array(9).fill(null));
    setTurn("X");
    setIsAiThinking(false);
    updateScores({
      xWins: 0,
      oWins: 0,
      ties: 0,
    });
  }, [updateScores]);

  return {
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
  };
}
