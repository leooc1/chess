import type { LogMovement } from "../types/types";
import { ChessBoard } from "./ChessBoard";

export class Game {
  protected historicoMovimentacoes: LogMovement[];
  protected chessboard: ChessBoard;
  private moveSound = [
    "/sfx/move1.mp3",
    "/sfx/move2.mp3",
  ];
  private captureSound = [
    "/sfx/capture1.mp3",
    "/sfx/capture2.mp3",
  ];
  private looseSound = [
    "/sfx/loose.mp3",
    "/sfx/final-move.mp3",
  ];

  constructor(position_elements: Element[][]) {
    this.historicoMovimentacoes = [];
    this.chessboard = new ChessBoard(position_elements);
    this.chessboard.onMovement(this.playerMove.bind(this));
  }

  start() {
    this.chessboard.set();
  }

  private getRandomSound(list: string[]) {
    return list[Math.floor(Math.random() * list.length)]
  }

  private playSound(type: LogMovement["type"]) {
    const source = type === "killed" ?
      this.getRandomSound(this.captureSound)
      : this.getRandomSound(this.moveSound);

    const sound = new Audio(source);
    sound.currentTime = 0;
    sound.play().catch(() => {

    })
  }

  private playLooseSound() {
    const source = this.getRandomSound(this.looseSound);
    const sound = new Audio(source);

    sound.currentTime = 0;
    sound.play().catch(() => { });
  }

  end() { }

  haveWinner(movimento: LogMovement): Boolean {
    if (movimento.piece == "King" && movimento.type == "died") {
      this.playLooseSound();
      return true;
    } else return false;
  }

  playerMove(movimento: LogMovement) {
    this.historicoMovimentacoes.push(movimento);

    this.playSound(movimento.type);

    if (this.haveWinner(movimento))
      alert(
        `Jogados das peças ${movimento.color == "black" ? "brancas" : "pretas"} ganhou!!`,
      );

    if (movimento.type != "died") this.chessboard.switchRound();
    console.log(this.historicoMovimentacoes);
  }
}
