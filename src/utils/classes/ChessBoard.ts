import type { Piece } from "./Piece";
import { Bishop } from "./pieces/Bishop";
import { King } from "./pieces/King";
import { Knight } from "./pieces/Knight";
import { Pawn } from "./pieces/Pawn";
import { Queen } from "./pieces/Queen";
import { Rook } from "./pieces/Rook";

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
      this.positions[piece.getPosition()[0]][
        piece.getPosition()[1]
      ].insertAdjacentHTML(
        "beforeend",
        `<div class="absolute w-full h-full flex justify-center items-center">
      <img class="" src="${piece.getImage()}" />
      </div>`,
      );
    }
  }

  initialize() {
    // black
    {
      this.pieces.push(new King("black"));
      this.pieces.push(new Queen("black"));
      this.pieces.push(new Bishop("black", [0, 2]));
      this.pieces.push(new Bishop("black", [0, 5]));
      this.pieces.push(new Knight("black", [0, 1]));
      this.pieces.push(new Knight("black", [0, 6]));
      this.pieces.push(new Rook("black", [0, 0]));
      this.pieces.push(new Rook("black", [0, 7]));
      this.pieces.push(new Pawn("black", [1, 0]));
      this.pieces.push(new Pawn("black", [1, 1]));
      this.pieces.push(new Pawn("black", [1, 2]));
      this.pieces.push(new Pawn("black", [1, 3]));
      this.pieces.push(new Pawn("black", [1, 4]));
      this.pieces.push(new Pawn("black", [1, 5]));
      this.pieces.push(new Pawn("black", [1, 6]));
      this.pieces.push(new Pawn("black", [1, 7]));
    }

    //white
    {
      this.pieces.push(new King("white"));
      this.pieces.push(new Queen("white"));
      this.pieces.push(new Bishop("white", [7, 2]));
      this.pieces.push(new Bishop("white", [7, 5]));
      this.pieces.push(new Knight("white", [7, 1]));
      this.pieces.push(new Knight("white", [7, 6]));
      this.pieces.push(new Rook("white", [7, 0]));
      this.pieces.push(new Rook("white", [7, 7]));
      this.pieces.push(new Pawn("white", [6, 0]));
      this.pieces.push(new Pawn("white", [6, 1]));
      this.pieces.push(new Pawn("white", [6, 2]));
      this.pieces.push(new Pawn("white", [6, 3]));
      this.pieces.push(new Pawn("white", [6, 4]));
      this.pieces.push(new Pawn("white", [6, 5]));
      this.pieces.push(new Pawn("white", [6, 6]));
      this.pieces.push(new Pawn("white", [6, 7]));
    }
  }
}
