import { useEffect } from "react";
import initializeChessboard from "./utils/initializeChessboard";

function App() {
  const chessPositions = [
    ["A8", "B8", "C8", "D8", "E8", "F8", "G8", "H8"],
    ["A7", "B7", "C7", "D7", "E7", "F7", "G7", "H7"],
    ["A6", "B6", "C6", "D6", "E6", "F6", "G6", "H6"],
    ["A5", "B5", "C5", "D5", "E5", "F5", "G5", "H5"],
    ["A4", "B4", "C4", "D4", "E4", "F4", "G4", "H4"],
    ["A3", "B3", "C3", "D3", "E3", "F3", "G3", "H3"],
    ["A2", "B2", "C2", "D2", "E2", "F2", "G2", "H2"],
    ["A1", "B1", "C1", "D1", "E1", "F1", "G1", "H1"],
  ];

  useEffect(() => {
    initializeChessboard();
  }, []);

  return (
    <>
      <main className="w-screen min-h-screen flex justify-center items-center">
        <section className="grid grid-cols-8 w-130 h-130 border-2 border-[#895129] outline-24 outline-[#EAD6B3]">
          {chessPositions.map((row, rowIndex, array) =>
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
                    <span className="absolute text-black -left-4">
                      {position.charAt(1)}
                    </span>
                  )}
                  {rowIndex + 1 == array.length && (
                    <span className="absolute text-black -bottom-6">
                      {position.charAt(0)}
                    </span>
                  )}
                  {/*  */}
                </div>
              );
            }),
          )}
        </section>
      </main>
    </>
  );
}

export default App;
