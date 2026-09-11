import type { Piece } from "./Piece";
import { King } from "./pieces/King";
import { Queen } from "./pieces/Queen";

export class ChessBoard {
  positions: Element[][];
  pieces: Piece[];
  constructor(position: Element[][]) {
    this.positions = position;
    this.pieces = [];
  }
  clear() {
    this.positions.forEach((rows) => {
      rows.forEach((cp) => {
        const indicators = cp.querySelectorAll(".absolute.text-black");
        if (indicators) cp.replaceChildren(...indicators);
        else cp.replaceChildren();
      });
    });
  }

  reload() {
    this.clear();
    for (const piece of this.pieces) {
      this.positions[piece.position[0]][piece.position[1]].insertAdjacentHTML(
        "beforeend",
        `<div class="absolute w-full h-full flex justify-center items-center">
      <img class="" src="${piece.image}" />
      </div>`,
      );
    }
  }

  initialize() {
    this.pieces.push(new King("black"));
    this.pieces.push(new King("white"));
    this.pieces.push(new Queen("black"));
    this.pieces.push(new Queen("white"));
  }
}
