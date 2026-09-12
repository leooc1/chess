import bKing from "../../../assets/pieces/b-king.svg";
import wKing from "../../../assets/pieces/w-king.svg";
import type { Color, Position, VerifyPosition } from "../../types/types";
import { Piece } from "../Piece";

export class King extends Piece {
  constructor(color: Color) {
    super(
      color,
      color == "white" ? [7, 4] : [0, 4],
      color == "white" ? [7, 4] : [0, 4],
      color == "white" ? wKing : bKing,
    );
  }

  possibleMovements(all_piece_position: VerifyPosition[]): Position[] {
    if (this.possible_movements.length > 0) {
      this.possible_movements = [];
    } else {
      let [x, y] = this.position;
      if (--x >= 0 && y >= 0 && x <= 7 && y <= 7)
        if (!super.positionCollision([x, y], all_piece_position)) {
          this.possible_movements.push([x, y]);
        }
      [x, y] = this.position;
      if (++x >= 0 && y >= 0 && x <= 7 && y <= 7)
        if (!super.positionCollision([x, y], all_piece_position)) {
          this.possible_movements.push([x, y]);
        }
      [x, y] = this.position;
      if (x >= 0 && --y >= 0 && x <= 7 && y <= 7)
        if (!super.positionCollision([x, y], all_piece_position)) {
          this.possible_movements.push([x, y]);
        }
      [x, y] = this.position;
      if (x >= 0 && ++y >= 0 && x <= 7 && y <= 7)
        if (!super.positionCollision([x, y], all_piece_position)) {
          this.possible_movements.push([x, y]);
        }
      [x, y] = this.position;
      if (--x >= 0 && --y >= 0 && x <= 7 && y <= 7)
        if (!super.positionCollision([x, y], all_piece_position)) {
          this.possible_movements.push([x, y]);
        }
      [x, y] = this.position;
      if (--x >= 0 && ++y >= 0 && x <= 7 && y <= 7)
        if (!super.positionCollision([x, y], all_piece_position)) {
          this.possible_movements.push([x, y]);
        }
      [x, y] = this.position;
      if (++x >= 0 && --y >= 0 && x <= 7 && y <= 7)
        if (!super.positionCollision([x, y], all_piece_position)) {
          this.possible_movements.push([x, y]);
        }
      [x, y] = this.position;
      if (++x >= 0 && ++y >= 0 && x <= 7 && y <= 7)
        if (!super.positionCollision([x, y], all_piece_position)) {
          this.possible_movements.push([x, y]);
        }
      [x, y] = this.position;
    }
    return this.possible_movements;
  }
}
