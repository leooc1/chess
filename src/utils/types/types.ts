export type Color = "black" | "white";
export type Position = [number, number];
export type VerifyPosition = { color: Color; position: Position };
export type ResponseCollision = { color?: Color; found: Boolean };
