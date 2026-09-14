import type { LogMovement } from "../types/types";
import { ChessBoard } from "./ChessBoard";

export class Game {
  private historicoMovimentacoes: LogMovement[];
  private chessboard: ChessBoard;
  constructor(position_elements: Element[][]) {
    this.historicoMovimentacoes = [];
    this.chessboard = new ChessBoard(position_elements);
    this.chessboard.onMovement(this.switchRound.bind(this));
  }

  start() {
    this.chessboard.set();
  }

  switchRound(movimento: LogMovement) {
    this.historicoMovimentacoes.push(movimento);
    if (movimento.type != "died") this.chessboard.switchRound();
    console.log(this.historicoMovimentacoes);
  }
}
