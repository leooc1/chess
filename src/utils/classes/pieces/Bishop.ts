import bBishop from "../../../assets/pieces/b-bishop.svg";
import wBishop from "../../../assets/pieces/w-bishop.svg";
import type { Color, Position } from "../../types/types";
import { Piece } from "../Piece";

export class Bishop extends Piece {
  constructor(color: Color, initial_position: Position) {
    super(
      color,
      initial_position,
      initial_position,
      color == "white" ? wBishop : bBishop,
    );
  }

  possibleMovements(): Position[] {
    if (this.possible_movements.length > 0) {
      this.possible_movements = [];
    } else {
      this.possible_movements = [];
      {
        let [x, y] = this.position;
        while (--x >= 0 && x <= 7 && --y >= 0 && y <= 7) {
          this.possible_movements.push([x, y]);
        }
        [x, y] = this.position;
        while (--x >= 0 && x <= 7 && ++y >= 0 && y <= 7) {
          this.possible_movements.push([x, y]);
        }
        [x, y] = this.position;
        while (++x >= 0 && x <= 7 && --y >= 0 && y <= 7) {
          this.possible_movements.push([x, y]);
        }
        [x, y] = this.position;
        while (++x >= 0 && x <= 7 && ++y >= 0 && y <= 7) {
          this.possible_movements.push([x, y]);
        }
      }
    }
    return this.possible_movements;
  }
}
