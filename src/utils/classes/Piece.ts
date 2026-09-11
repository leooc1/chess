import type { Color, Position } from "../types/types";

export class Piece {
  color: Color;
  initial_position: Position;
  position: Position;
  image: string;

  constructor(
    color: Color,
    position: Position,
    initial_position: Position,
    image: string,
  ) {
    this.color = color;
    this.position = position;
    this.initial_position = initial_position;
    this.image = image
  }
}
