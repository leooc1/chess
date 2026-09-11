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
}
