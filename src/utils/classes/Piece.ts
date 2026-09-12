import type { Color, Position } from "../types/types";

export class Piece {
  protected color: Color;
  protected initial_position: Position;
  protected position: Position;
  protected image: string;
  possible_movements: Position[];

  constructor(
    color: Color,
    position: Position,
    initial_position: Position,
    image: string,
  ) {
    this.color = color;
    this.position = position;
    this.initial_position = initial_position;
    this.image = image;
    this.possible_movements = [];
  }

  getPosition() {
    return this.position;
  }

  getImage() {
    return this.image;
  }

  possibleMovements(): Position[] {
    return [];
  }
}
