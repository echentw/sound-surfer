import * as $ from 'jquery';

import { Conductor } from './Conductor';
import { Player } from './Player';
import { Midline } from './Midline';
import { CanvasWrapper } from './CanvasWrapper';
import { Notes } from './Notes';

$(document).ready(main);

async function main() {
  const canvas = document.getElementById('game-canvas') as HTMLCanvasElement;
  const canvasWrapper = new CanvasWrapper(canvas);

  const conductor = new Conductor('Mijuku Dreamer');
  await conductor.load();

  const notes = new Notes(canvas, conductor.songData.crotchet, 0.25);

  const player = new Player(canvas, 0.25, notes);

  const midline = new Midline(canvas);

  initializeGame();
  startGame();

  function initializeGame() {
    // Add a window-resize event listener.
    $(window).resize(resize);

    resize();
  }

  function startGame() {
    conductor.start();
    requestAnimationFrame(update);
  }

  // Make the game scale with the browser window.
  function resize() {
    canvasWrapper.resize();

    // Resize static elements.
    midline.resize(canvas.width, canvas.height);

    // Resize dynamic elements.
    notes.resize(canvas.width, canvas.height);
    player.resize(canvas.width, canvas.height);
  }


  // Called at every frame, re-renders the entire canvas.
  function update(time: number) {
    canvasWrapper.clear();

    // Draw static elements.
    midline.draw();

    // Draw dynamic elements (elements that rely on song position).
    const songPosition = conductor.position();
    notes.draw(songPosition);
    player.draw(songPosition);

    requestAnimationFrame(update);
  }
}

document.addEventListener('keydown', (e) => {
  if (e.keyCode == 37) {
    console.log('left was pressed');
  } else if (e.keyCode == 39) {
    console.log('right was pressed');
  }
});
