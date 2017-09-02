import * as $ from 'jquery';

import { Conductor } from './Conductor';
import { Wave } from './Wave';
import { Player } from './Player';
import { Midline } from './Midline';

$(document).ready(main);

async function main() {
  const canvas = document.getElementById('game-canvas') as HTMLCanvasElement;

  const conductor = new Conductor('Mijuku Dreamer');
  await conductor.load();

  const wave = new Wave(canvas, conductor.songData.crotchet);
  const player = new Player(canvas, wave);

  const midline = new Midline(canvas);

  $(window).resize(resize);
  function resize() {
    resizeCanvas();
    wave.resize(canvas.width, canvas.height);
    player.resize(canvas.width, canvas.height);
    midline.resize(canvas.width, canvas.height);
  }
  resize();

  // Start the game.
  conductor.start();
  requestAnimationFrame(update);

  // Called at every frame, re-renders the entire canvas.
  function update(time: number) {
    clearCanvas();

    // Draw static elements.
    midline.draw();

    // Draw dynamic elements (elements that rely on song position).
    const songPosition = conductor.position();
    wave.draw(songPosition);
    player.draw(songPosition);

    requestAnimationFrame(update);
  }

  // Update the width and height of the canvas element.
  function resizeCanvas() {
    let ratio = 0.6;
    if (window.innerWidth * ratio < window.innerHeight) {
      canvas.width = window.innerWidth;
      canvas.height = canvas.width * ratio;
    } else {
      canvas.height = window.innerHeight;
      canvas.width = canvas.height / ratio;
    }
  }

  function clearCanvas() {
    const context = canvas.getContext('2d');
    context.fillStyle = 'black';
    context.fillRect(0, 0, canvas.width, canvas.height);
  }
}

document.addEventListener('keydown', (e) => {
  if (e.keyCode == 37) {
    console.log('left was pressed');
  } else if (e.keyCode == 39) {
    console.log('right was pressed');
  }
});
