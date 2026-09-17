import bPawn from "../../assets/pieces/b-pawn.svg";
import wPawn from "../../assets/pieces/w-pawn.svg";
import type { Color, Position, VerifyPosition } from "../../types/types";
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

  positionCollision(position: Position, all_piece_position: VerifyPosition[]) {
    if (!this.inChessBoard(position)) {
      return false;
    }
    if (super.verifyPosition(position, all_piece_position).found) {
      return true;
    } else {
      return false;
    }
  }

  possibleMovements(all_piece_position: VerifyPosition[]): Position[] {
    if (this.possible_movements.length > 0) {
      this.possible_movements = [];
    } else {
      this.possible_movements = [];
      if (this.color == "white") {
        if (this.position[0] == 6) {
          for (const jump of [1, 2]) {
            if (
              this.positionCollision(
                [this.position[0] - jump, this.position[1]],
                all_piece_position,
              )
            ) {
              break;
            } else {
              this.possible_movements.push([
                this.position[0] - jump,
                this.position[1],
              ]);
            }
          }
        } else {
          if (this.position[0] - 1 >= 0) {
            if (
              !this.positionCollision(
                [this.position[0] - 1, this.position[1]],
                all_piece_position,
              )
            )
              this.possible_movements.push([
                this.position[0] - 1,
                this.position[1],
              ]);
          }
        }
        super.positionCollision(
          [this.position[0] - 1, this.position[1] - 1],
          all_piece_position,
        );
        super.positionCollision(
          [this.position[0] - 1, this.position[1] + 1],
          all_piece_position,
        );
      } else {
        if (this.position[0] == 1) {
          for (const jump of [1, 2]) {
            if (
              this.positionCollision(
                [this.position[0] + jump, this.position[1]],
                all_piece_position,
              )
            ) {
              break;
            } else {
              this.possible_movements.push([
                this.position[0] + jump,
                this.position[1],
              ]);
            }
          }
        } else {
          if (
            !this.positionCollision(
              [this.position[0] + 1, this.position[1]],
              all_piece_position,
            )
          )
            this.possible_movements.push([
              this.position[0] + 1,
              this.position[1],
            ]);
        }
        super.positionCollision(
          [this.position[0] + 1, this.position[1] - 1],
          all_piece_position,
        );
        super.positionCollision(
          [this.position[0] + 1, this.position[1] + 1],
          all_piece_position,
        );
      }
    }
    return this.possible_movements;
  }
}
