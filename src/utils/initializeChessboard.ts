/* // black pieces
import bBishop from "../assets/pieces/b-bishop.svg";
import bKing from "../assets/pieces/b-king.svg";
import bKnight from "../assets/pieces/b-knight.svg";
import bPawn from "../assets/pieces/b-pawn.svg";
import bQueen from "../assets/pieces/b-queen.svg";
import bRook from "../assets/pieces/b-rook.svg";

// white pieces
import wBishop from "../assets/pieces/w-bishop.svg";
import wKing from "../assets/pieces/w-king.svg";
import wKnight from "../assets/pieces/w-knight.svg";
import wPawn from "../assets/pieces/w-pawn.svg";
import wQueen from "../assets/pieces/w-queen.svg";
import wRook from "../assets/pieces/w-rook.svg"; */

import { ChessBoard } from "./classes/ChessBoard";

export default function initializeChessboard() {
  const chessPositions = [...document.querySelectorAll(".chess-position")];
  const matrizChessBoard = [];
  for (let i = 0; i < chessPositions.length; i += 8) {
    matrizChessBoard.push(chessPositions.slice(i, i + 8));
  }

  const chessBoard = new ChessBoard(matrizChessBoard);
  console.log(chessBoard.pieces);
  chessBoard.initialize();
  console.log(chessBoard.pieces);
  chessBoard.reload();
}
