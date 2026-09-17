import { useEffect, useState } from "react";
import { Game } from "./classes/Game";
import ChessBoard from "./components/ChessBoard";

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

  const [game, setGame] = useState<Game>();
  const soundBoard = new AudioContext();

  function playTileSound(index: number, delay = 0) {
    const oscillator = soundBoard.createOscillator();
    const gain = soundBoard.createGain();
    const filter = soundBoard.createBiquadFilter();

    filter.type = "lowpass";
    oscillator.type = "sine";
    oscillator.frequency.value = 220 + index * 12;

    const startAt = soundBoard.currentTime + delay;

    gain.gain.setValueAtTime(0.0001, startAt);
    gain.gain.exponentialRampToValueAtTime(0.12, startAt + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, startAt + 0.28);

    oscillator.connect(filter);
    filter.connect(gain);
    gain.connect(soundBoard.destination);

    oscillator.start(startAt);
    oscillator.stop(startAt + 0.3);
  }

  function initializeGame() {
    const chessPositions = [...document.querySelectorAll(".chess-position")];
    const matrizChessBoard = [];

    for (let i = 0; i < chessPositions.length; i += 8) {
      matrizChessBoard.push(chessPositions.slice(i, i + 8));
    }

    const triggerCascade = () => {
      if (soundBoard.state === "suspended") {
        soundBoard.resume();
      }

      chessPositions.forEach((_, index) => {
        const delayMs = index * 45;
        setTimeout(() => {
          playTileSound(index, 0.01);
        }, delayMs);
      });
    };

    window.addEventListener("pointerdown", triggerCascade, { once: true });

    const game = new Game(matrizChessBoard);
    game.start();
  }

  useEffect(() => {
    initializeGame();
  }, []);

  return (
    <>
      <main className="w-screen min-h-screen flex justify-center items-center bg-slate-700 relative">
        <ChessBoard chessPositions={chessPositions} />
      </main>
    </>
  );
}

export default App;
