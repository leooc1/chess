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
        const indicators = cp.querySelectorAll(".position-notation");
        const possible_moviments = cp.querySelectorAll(".possible-movement");
        if (indicators || possible_moviments) {
          !indicators
            ? cp.replaceChildren(...possible_moviments)
            : !possible_moviments
              ? cp.replaceChildren(...indicators)
              : cp.replaceChildren(...indicators, ...possible_moviments);
        } else cp.replaceChildren();
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
        `<div class="piece-position absolute w-full h-full flex justify-center items-center cursor-grab">
      <img class="piece-image" src="${piece.getImage()}" />
      </div>`,
      );
    }
    // posiçoes para se mover
    this.positions.forEach((row, rowIndex) => {
      row.forEach((col, colIndex) => {
        if (col.lastElementChild?.classList.contains("piece-position")) {
          col.lastElementChild.addEventListener("click", () => {
            const piece = this.pieces.find(
              (p) =>
                p.getPosition()[0] == rowIndex &&
                p.getPosition()[1] == colIndex,
            );
            if (piece) {
              piece.possibleMovements();
              const otherPieces = this.pieces.filter(
                (p) =>
                  p.getPosition()[0] != piece.getPosition()[0] ||
                  p.getPosition()[1] != piece.getPosition()[1],
              );
              otherPieces.forEach((op) => {
                op.possible_movements = [];
              });
            }
            this.markPossibleMovements();
          });
        }
      });
    });
  }

  markPossibleMovements() {
    const pmElements = document.querySelectorAll(".possible-movement");
    pmElements.forEach((e) => {
      e.remove();
    });
    this.pieces
      .map((p) => p.possible_movements)
      .forEach((pm) => {
        pm.forEach((p) => {
          this.positions[p[0]][p[1]].insertAdjacentHTML(
            "beforeend",
            `<div class="possible-movement absolute w-full h-full flex justify-center items-center cursor-grab bg-blue-300/40">
          
          </div>`,
          );
        });
      });
  }

  initialize() {
    // black
    {
      this.pieces.push(new Rook("black", [0, 0]));
      this.pieces.push(new Knight("black", [0, 1]));
      this.pieces.push(new Bishop("black", [0, 2]));
      this.pieces.push(new King("black"));
      this.pieces.push(new Queen("black"));
      this.pieces.push(new Bishop("black", [0, 5]));
      this.pieces.push(new Knight("black", [0, 6]));
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
      this.pieces.push(new Pawn("white", [6, 0]));
      this.pieces.push(new Pawn("white", [6, 1]));
      this.pieces.push(new Pawn("white", [6, 2]));
      this.pieces.push(new Pawn("white", [6, 3]));
      this.pieces.push(new Pawn("white", [6, 4]));
      this.pieces.push(new Pawn("white", [6, 5]));
      this.pieces.push(new Pawn("white", [6, 6]));
      this.pieces.push(new Pawn("white", [6, 7]));
      this.pieces.push(new Rook("white", [7, 0]));
      this.pieces.push(new Knight("white", [7, 1]));
      this.pieces.push(new Bishop("white", [7, 2]));
      this.pieces.push(new Queen("white"));
      this.pieces.push(new King("white"));
      this.pieces.push(new Bishop("white", [7, 5]));
      this.pieces.push(new Knight("white", [7, 6]));
      this.pieces.push(new Rook("white", [7, 7]));
    }
    this.reload();
  }
}
