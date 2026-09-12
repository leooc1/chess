import bKnight from "../../../assets/pieces/b-knight.svg";
import wKnight from "../../../assets/pieces/w-knight.svg";
import type { Color, Position } from "../../types/types";
import { Piece } from "../Piece";

function moveLY(positon: Position): Position[] {
  const upL = [positon[0] - 2, positon[1] - 1] as Position;
  const upR = [positon[0] - 2, positon[1] + 1] as Position;
  const downL = [positon[0] + 2, positon[1] - 1] as Position;
  const downR = [positon[0] + 2, positon[1] + 1] as Position;
  return [upL, upR, downL, downR];
}

function moveLX(positon: Position): Position[] {
  const leftU = [positon[0] - 1, positon[1] - 2] as Position;
  const leftD = [positon[0] + 1, positon[1] - 2] as Position;
  const rigthU = [positon[0] - 1, positon[1] + 2] as Position;
  const rigthD = [positon[0] + 1, positon[1] + 2] as Position;
  return [leftU, leftD, rigthU, rigthD];
}

export class Knight extends Piece {
  constructor(color: Color, initial_position: Position) {
    super(
      color,
      initial_position,
      initial_position,
      color == "white" ? wKnight : bKnight,
    );
  }

  possibleMovements(): Position[] {
    if (this.possible_movements.length > 0) {
      this.possible_movements = [];
    } else {
      const mvY = moveLY(this.position).filter(
        (pm) => pm[0] >= 0 && pm[0] <= 7 && pm[1] >= 0 && pm[1] <= 7,
      );
      const mvX = moveLX(this.position).filter(
        (pm) => pm[0] >= 0 && pm[0] <= 7 && pm[1] >= 0 && pm[1] <= 7,
      );
      this.possible_movements = [...mvY, ...mvX];
    }
    return this.possible_movements;
  }
}
