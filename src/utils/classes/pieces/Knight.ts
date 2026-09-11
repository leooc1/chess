import bKnight from "../../../assets/pieces/b-knight.svg";
import wKnight from "../../../assets/pieces/w-knight.svg";
import type { Color, Position } from "../../types/types";
import { Piece } from "../Piece";

export class Knight extends Piece {
  constructor(color: Color, initial_position: Position) {
    super(
      color,
      initial_position,
      initial_position,
      color == "white" ? wKnight : bKnight,
    );
  }
}
