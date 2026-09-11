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
}
