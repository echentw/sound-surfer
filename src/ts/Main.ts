import * as $ from 'jquery';

import { Conductor } from './Conductor';
import { Wave } from './Wave';
import { Player } from './Player';

$(document).ready(main);

async function main() {
  const canvas = document.getElementById('game-canvas') as HTMLCanvasElement;

  const conductor = new Conductor('Mijuku Dreamer');
  await conductor.load();

  const wave = new Wave(canvas, conductor.songData.crotchet);
  const player = new Player(canvas, wave);

  $(window).resize(resize);
  function resize() {
    resizeCanvas();
    wave.resize(canvas.width, canvas.height);
    player.resize(canvas.width, canvas.height);
  }
  resize();

  // Start the game.
  conductor.start();
  requestAnimationFrame(update);

  // Called at every frame, re-renders the entire canvas.
  function update(time: number) {
    clearCanvas();

    const songPosition = conductor.position();
    drawHorizontalLine();
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

  function drawHorizontalLine() {
    const context = canvas.getContext('2d');

    context.beginPath();
    context.lineWidth = 5;
    context.strokeStyle = 'grey';
    context.moveTo(0, canvas.height * 0.5);
    context.lineTo(canvas.width, canvas.height * 0.5);
    context.stroke();
  }
}

document.addEventListener('keydown', (e) => {
  if (e.keyCode == 37) {
    console.log('left was pressed');
  } else if (e.keyCode == 39) {
    console.log('right was pressed');
  }
});
