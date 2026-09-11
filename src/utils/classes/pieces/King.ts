import bKing from "../../../assets/pieces/b-king.svg";
import wKing from "../../../assets/pieces/w-king.svg";
import type { Color } from "../../types/types";
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
}
