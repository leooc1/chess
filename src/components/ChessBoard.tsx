import { useEffect, useState } from "react";

type ChessBoardProps = {
  chessPositions: string[][];
};

export default function ChessBoard(props: ChessBoardProps) {
  const [sizeRef, setSizeRef] = useState<"width" | "height">(
    innerWidth > innerHeight ? "height" : "width",
  );

  useEffect(() => {
    window.addEventListener("resize", () => {
      setSizeRef(innerWidth > innerHeight ? "height" : "width");
    });
  }, []);

  return (
    <section
      className={`chessboard transition-all grid grid-cols-8 border-2 border-[#895129] outline-24 outline-[#EAD6B3]
    md:${sizeRef == "height" ? "w-[50vh]" : "w-[50vw]"} md:${sizeRef == "height" ? "h-[50vh]" : "h-[50vw]"} ${sizeRef == "height" ? "w-[80vh]" : "w-[80vw]"} ${sizeRef == "height" ? "h-[80vh]" : "h-[80vw]"} mt-8`}
    >
      {props.chessPositions.map((row, rowIndex, array) =>
        row.map((position, colIndex) => {
          const isEvenRow = rowIndex % 2 === 0;
          return (
            <div
              key={position}
              id={position}
              className={`chess-position flex justify-center items-center font-bold
                    ${colIndex == 0 || rowIndex + 1 == array.length ? "relative" : ""} 
                    ${
                      isEvenRow
                        ? "even:text-white odd:text-black even:bg-[#895129] odd:bg-[#EAD6B3]"
                        : "odd:text-white even:text-black odd:bg-[#895129] even:bg-[#EAD6B3]"
                    }`}
            >
              {colIndex == 0 && (
                <span className="position-notation transition-all absolute text-black -left-4">
                  {position.charAt(1)}
                </span>
              )}
              {rowIndex + 1 == array.length && (
                <span className="position-notation transition-all absolute text-black -bottom-6">
                  {position.charAt(0)}
                </span>
              )}
              {/*  */}
            </div>
          );
        }),
      )}
    </section>
  );
}
