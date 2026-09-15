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

  end() {}

  haveWinner(movimento: LogMovement): Boolean {
    if (movimento.piece == "King" && movimento.type == "died") {
      return true;
    } else return false;
  }

  playerMove(movimento: LogMovement) {
    this.historicoMovimentacoes.push(movimento);
    if (this.haveWinner(movimento))
      alert(
        `Jogados das peças ${movimento.color == "black" ? "brancas" : "pretas"} ganhou!!`,
      );

    if (movimento.type != "died") this.chessboard.switchRound();
    console.log(this.historicoMovimentacoes);
  }
}
