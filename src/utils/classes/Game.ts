import type { LogMovement } from "../types/types";
import { ChessBoard } from "./ChessBoard";

export class Game {
  protected historicoMovimentacoes: LogMovement[];
  protected chessboard: ChessBoard;
  constructor(position_elements: Element[][]) {
    this.historicoMovimentacoes = [];
    this.chessboard = new ChessBoard(position_elements);
    this.chessboard.onMovement(this.playerMove.bind(this));
  }

  start() {
    this.chessboard.set();
  }

  playerMove(movimento: LogMovement) {
    this.historicoMovimentacoes.push(movimento);
    if (movimento.type != "died") this.chessboard.switchRound();
    console.log(this.historicoMovimentacoes);
  }
}
