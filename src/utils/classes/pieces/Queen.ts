import bQueen from "../../../assets/pieces/b-queen.svg";
import wQueen from "../../../assets/pieces/w-queen.svg";
import type { Color, Position, VerifyPosition } from "../../types/types";
import { Piece } from "../Piece";
import { Bishop } from "./Bishop";
import { Rook } from "./Rook";

export class Queen extends Piece {
  constructor(color: Color) {
    super(
      color,
      color == "white" ? [7, 3] : [0, 3],
      color == "white" ? [7, 3] : [0, 3],
      color == "white" ? wQueen : bQueen,
    );
  }

  possibleMovements(all_piece_position: VerifyPosition[]): Position[] {
    if (this.possible_movements.length > 0) {
      this.possible_movements = [];
    } else {
      const bishopMovements = new Bishop(
        this.color,
        this.position,
      ).possibleMovements(all_piece_position);
      const rookMovements = new Rook(
        this.color,
        this.position,
      ).possibleMovements(all_piece_position);
      this.possible_movements = bishopMovements.concat(rookMovements);
    }
    return this.possible_movements;
  }
}
