import type { Color, LogMovement, Position } from "../types/types";
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
  movement_round: Color;
  onMovementCallback?: (movement: LogMovement) => void;
  constructor(position: Element[][]) {
    this.positions = position;
    this.pieces = [];
    this.movement_round = "white";
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
    for (const piece of this.filterAlivePieces(this.pieces)) {
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
                p.getPosition()[1] == colIndex &&
                p.getColor() == this.movement_round,
            );
            if (piece) {
              piece.possibleMovements(
                this.pieces.map((p) => ({
                  color: p.getColor(),
                  position: p.getPosition(),
                })),
              );
              const otherPieces = this.pieces.filter(
                (p) =>
                  p.getPosition()[0] != piece.getPosition()[0] ||
                  p.getPosition()[1] != piece.getPosition()[1],
              );
              otherPieces.forEach((op) => {
                op.setPossibleMovements([]);
              });
            }
            this.markPossibleMovements();
          });
        }
      });
    });
  }

  filterAlivePieces(pieces: Piece[]) {
    return pieces.filter((p) => p.getPosition()[1] != 8);
  }

  markPossibleMovements() {
    const pmElementsRemove = document.querySelectorAll(".possible-movement");
    pmElementsRemove.forEach((e) => {
      e.remove();
    });
    this.pieces
      .map((p) => p.getPossibleMovements())
      .forEach((pm) => {
        pm.forEach((p) => {
          this.positions[p[0]][p[1]].insertAdjacentHTML(
            "beforeend",
            `<div class="possible-movement absolute w-full h-full flex justify-center items-center cursor-grab bg-blue-300/40">
          
          </div>`,
          );
        });
      });
    // onclick nas posiçoes para se mover
    const pmElements = document.querySelectorAll(".possible-movement");
    pmElements.forEach((e) => {
      e.addEventListener("click", () => {
        this.movementTo((e.parentElement as Element).id);
      });
    });
  }

  movementTo(id: string) {
    const piece = this.pieces.find(
      (p) =>
        p
          .getPossibleMovements()
          .filter(
            (pm) =>
              pm[0] == 8 - Number(id.charAt(1)) &&
              pm[1] == Number(id.charAt(0).charCodeAt(0) - 65),
          ).length > 0,
    );
    const to: Position = [
      8 - Number(id.charAt(1)),
      Number(id.charAt(0).charCodeAt(0) - 65),
    ];
    const deadPiece = this.pieces.find(
      (p) => p.getPosition()[0] == to[0] && p.getPosition()[1] == to[1],
    );
    if (piece) {
      const from = piece.getPosition();
      deadPiece?.die();
      piece.setPossibleMovements([]);
      this.markPossibleMovements();
      piece.moteTo(to);
      this.onMovementCallback?.({
        piece: piece.constructor.name,
        color: piece.getColor(),
        from,
        to,
        type: deadPiece ? "killed" : "move",
      });
      if (deadPiece) {
        this.onMovementCallback?.({
          piece: deadPiece.constructor.name,
          color: deadPiece.getColor(),
          from: to,
          to: deadPiece.getPosition(),
          type: "died",
        });
      }
    }
    this.reload();
  }

  set() {
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

  onMovement(callback: (movement: LogMovement) => void) {
    this.onMovementCallback = callback;
  }

  switchRound() {
    if (this.movement_round == "white") this.movement_round = "black";
    else this.movement_round = "white";
  }
}
