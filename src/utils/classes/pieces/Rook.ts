import bRook from "../../../assets/pieces/b-rook.svg";
import wRook from "../../../assets/pieces/w-rook.svg";
import type { Color, Position } from "../../types/types";
import { Piece } from "../Piece";

export class Rook extends Piece {
  constructor(color: Color, initial_position: Position) {
    super(
      color,
      initial_position,
      initial_position,
      color == "white" ? wRook : bRook,
    );
  }

  possibleMovements(): Position[] {
    if (this.possible_movements.length > 0) {
      this.possible_movements = [];
    } else {
      this.possible_movements = [];
      {
        let [x, y] = this.position;
        while (--x >= 0) {
          this.possible_movements.push([x, y]);
        }
        [x, y] = this.position;
        while (++x <= 7) {
          this.possible_movements.push([x, y]);
        }
        [x, y] = this.position;
        while (--y >= 0) {
          this.possible_movements.push([x, y]);
        }
        [x, y] = this.position;
        while (++y <= 7) {
          this.possible_movements.push([x, y]);
        }
      }
    }
    return this.possible_movements;
  }
}
