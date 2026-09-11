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
}
