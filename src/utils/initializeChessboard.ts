import { ChessBoard } from "./classes/ChessBoard";

export default function initializeChessboard() {
  const chessPositions = [...document.querySelectorAll(".chess-position")];
  const matrizChessBoard = [];
  for (let i = 0; i < chessPositions.length; i += 8) {
    matrizChessBoard.push(chessPositions.slice(i, i + 8));
  }

  const chessBoard = new ChessBoard(matrizChessBoard);
  chessBoard.initialize();
}
