import bPawn from "../../../assets/pieces/b-pawn.svg";
import wPawn from "../../../assets/pieces/w-pawn.svg";
import type { Color, Position } from "../../types/types";
import { Piece } from "../Piece";

export class Pawn extends Piece {
  constructor(color: Color, initial_position: Position) {
    super(
      color,
      initial_position,
      initial_position,
      color == "white" ? wPawn : bPawn,
    );
  }

  possibleMovements(): Position[] {
    if (this.possible_movements.length > 0) {
      this.possible_movements = [];
    } else {
      this.possible_movements = [];
      if (this.color == "white") {
        if (this.position[0] == 6) {
          this.possible_movements.push([
            this.position[0] - 1,
            this.position[1],
          ]);
          this.possible_movements.push([
            this.position[0] - 2,
            this.position[1],
          ]);
        } else {
          if (this.position[0] - 1 >= 0)
            this.possible_movements.push([
              this.position[0] - 1,
              this.position[1],
            ]);
        }
      } else {
        if (this.position[0] == 1) {
          this.possible_movements.push([
            this.position[0] + 1,
            this.position[1],
          ]);
          this.possible_movements.push([
            this.position[0] + 2,
            this.position[1],
          ]);
        } else {
          if (this.position[0] + 1 <= 7)
            this.possible_movements.push([
              this.position[0] + 1,
              this.position[1],
            ]);
        }
      }
    }
    return this.possible_movements;
  }
}
