import { Game } from "./classes/Game";

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

export default function initializeChessboard() {
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
