import type {
  Color,
  Position,
  ResponseCollision,
  VerifyPosition,
} from "../types/types";

export class Piece {
  protected color: Color;
  protected initial_position: Position;
  protected position: Position;
  protected image: string;
  protected possible_movements: Position[];

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

  getColor() {
    return this.color;
  }

  getImage() {
    return this.image;
  }

  getPossibleMovements() {
    return this.possible_movements;
  }
  
  setPossibleMovements(possible_movements: Position[]) {
    return (this.possible_movements = possible_movements);
  }

  possibleMovements(all_piece_position: VerifyPosition[]): Position[] {
    all_piece_position;
    return [];
  }

  verifyPosition(
    position: Position,
    all_piece_position: VerifyPosition[],
  ): ResponseCollision {
    const search = all_piece_position.find(
      (p) => p.position[0] == position[0] && p.position[1] == position[1],
    );
    if (search) return { color: search.color, found: true };
    else return { found: false };
  }

  inChessBoard(position: Position) {
    if (
      position[0] >= 0 &&
      position[0] <= 7 &&
      position[1] >= 0 &&
      position[1] <= 7
    )
      return true;
    return false;
  }

  positionCollision(position: Position, all_piece_position: VerifyPosition[]) {
    if (!this.inChessBoard(position)) {
      return false;
    }
    if (this.verifyPosition(position, all_piece_position).found) {
      if (
        (this.verifyPosition(position, all_piece_position).color as Color) ==
        this.color
      ) {
        return true;
      } else {
        this.possible_movements.push(position);
        return true;
      }
    } else {
      return false;
    }
  }

  moteTo(position: Position) {
    this.position = position;
  }

  die() {
    if (this.color == "white") this.position = [0, 8];
    else this.position = [7, 8];
  }
}
