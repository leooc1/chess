import bKing from "../../../assets/pieces/b-king.svg";
import wKing from "../../../assets/pieces/w-king.svg";
import type { Color, Position, VerifyPosition } from "../../types/types";
import { Piece } from "../Piece";
import { Rook } from "./Rook";

export class King extends Piece {
  protected moved: Boolean;
  protected queenside_castling: Boolean;
  protected kingside_castling: Boolean;
  protected queenside_rook: Rook | null;
  protected kingside_rook: Rook | null;
  constructor(color: Color) {
    super(
      color,
      color == "white" ? [7, 4] : [0, 4],
      color == "white" ? [7, 4] : [0, 4],
      color == "white" ? wKing : bKing,
    );
    this.moved = false;
    this.queenside_castling = false;
    this.queenside_rook = null;
    this.kingside_castling = false;
    this.kingside_rook = null;
  }

  moteTo(position: Position) {
    if (position[0] == this.position[0] && position[1] == this.position[1] - 2)
      this.queenside_rook?.moteTo([position[0], position[1] + 1]);
    if (position[0] == this.position[0] && position[1] == this.position[1] + 2)
      this.kingside_rook?.moteTo([position[0], position[1] - 1]);
    this.position = position;
    this.moved = true;
  }

  possibleMovements(all_piece_position: VerifyPosition[]): Position[] {
    if (this.possible_movements.length > 0) {
      this.queenside_castling = false;
      this.queenside_rook = null;
      this.kingside_castling = false;
      this.kingside_rook = null;
      this.possible_movements = [];
    } else {
      let [x, y] = this.position;
      if (--x >= 0 && y >= 0 && x <= 7 && y <= 7)
        if (!super.positionCollision([x, y], all_piece_position)) {
          this.possible_movements.push([x, y]);
        }
      [x, y] = this.position;
      if (++x >= 0 && y >= 0 && x <= 7 && y <= 7)
        if (!super.positionCollision([x, y], all_piece_position)) {
          this.possible_movements.push([x, y]);
        }
      [x, y] = this.position;
      if (x >= 0 && --y >= 0 && x <= 7 && y <= 7)
        if (!super.positionCollision([x, y], all_piece_position)) {
          this.possible_movements.push([x, y]);
        }
      [x, y] = this.position;
      if (x >= 0 && ++y >= 0 && x <= 7 && y <= 7)
        if (!super.positionCollision([x, y], all_piece_position)) {
          this.possible_movements.push([x, y]);
        }
      [x, y] = this.position;
      if (--x >= 0 && --y >= 0 && x <= 7 && y <= 7)
        if (!super.positionCollision([x, y], all_piece_position)) {
          this.possible_movements.push([x, y]);
        }
      [x, y] = this.position;
      if (--x >= 0 && ++y >= 0 && x <= 7 && y <= 7)
        if (!super.positionCollision([x, y], all_piece_position)) {
          this.possible_movements.push([x, y]);
        }
      [x, y] = this.position;
      if (++x >= 0 && --y >= 0 && x <= 7 && y <= 7)
        if (!super.positionCollision([x, y], all_piece_position)) {
          this.possible_movements.push([x, y]);
        }
      [x, y] = this.position;
      if (++x >= 0 && ++y >= 0 && x <= 7 && y <= 7)
        if (!super.positionCollision([x, y], all_piece_position)) {
          this.possible_movements.push([x, y]);
        }
      [x, y] = this.position;
      // castling
      if (this.queenside_castling) {
        this.possible_movements.push([this.position[0], this.position[1] - 2]);
      }
      if (this.kingside_castling) {
        this.possible_movements.push([this.position[0], this.position[1] + 2]);
      }
    }
    return this.possible_movements;
  }

  canQueenSideCastling(all_pieces: Piece[]): Boolean {
    if (this.firstMove()) {
      for (let i = 0; i < 4; i++) {
        if (
          super.positionCollision(
            [this.position[0], i],
            all_pieces.map((p) => ({
              color: p.getColor(),
              position: p.getPosition(),
            })),
          )
        ) {
          if (this.rookFirstMove([this.position[0], i], all_pieces)) {
            this.queenside_castling = true;
          } else {
            this.queenside_castling = false;
            return false;
          }
        }
      }
      return true;
    }
    this.queenside_castling = false;
    this.queenside_rook = null;
    return false;
  }

  canKingSideCastling(all_pieces: Piece[]): Boolean {
    if (this.firstMove()) {
      for (let i = 5; i < 8; i++) {
        if (
          super.positionCollision(
            [this.position[0], i],
            all_pieces.map((p) => ({
              color: p.getColor(),
              position: p.getPosition(),
            })),
          )
        ) {
          if (this.rookFirstMove([this.position[0], i], all_pieces)) {
            this.kingside_castling = true;
          } else {
            this.kingside_castling = false;
            return false;
          }
        }
      }
      return true;
    }
    this.kingside_castling = false;
    this.kingside_rook = null;
    return false;
  }

  rookFirstMove(position: Position, all_piece_position: Piece[]): Boolean {
    const piece = all_piece_position.find(
      (piece) =>
        piece.getPosition()[0] == position[0] &&
        piece.getPosition()[1] == position[1],
    );
    if (piece instanceof Rook) {
      if (piece.firstMove()) {
        if (piece.getPosition()[1] == 0) this.queenside_rook = piece;
        if (piece.getPosition()[1] == 7) this.kingside_rook = piece;
        return true;
      }
    }
    return false;
  }

  firstMove(): Boolean {
    return this.moved == false;
  }
}
