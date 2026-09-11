import bQueen from "../../../assets/pieces/b-queen.svg";
import wQueen from "../../../assets/pieces/w-queen.svg";
import type { Color } from "../../types/types";
import { Piece } from "../Piece";

export class Queen extends Piece {
  constructor(color: Color) {
    super(
      color,
      color == "white" ? [7, 3] : [0, 3],
      color == "white" ? [7, 3] : [0, 3],
      color == "white" ? wQueen : bQueen,
    );
  }
}
