import * as $ from 'jquery';

import { Conductor } from './Conductor';
import { Wave } from './Wave';

$(document).ready(main);

async function main() {
  const canvas = document.getElementById('game-canvas') as HTMLCanvasElement;

  const conductor = new Conductor('Mijuku Dreamer');
  await conductor.load();

  const wave = new Wave(canvas, conductor.songData.crotchet);

  // Start the game.
  conductor.start();
  requestAnimationFrame(update);

  // Called at every frame, re-renders the entire canvas.
  function update(time: number) {
    updateDimensions();
    clearCanvas();

    const songPosition = conductor.position();
    drawHorizontalLine();
    wave.draw(songPosition);
    drawPlayer(songPosition);

    requestAnimationFrame(update);
  }

  // Update the width and height of the canvas element.
  function updateDimensions() {
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

  const scaleFactorX = 350 / 793;
  const scaleFactorY = 20 / 973;
  function drawPlayer(songPosition: number) {
    const context = canvas.getContext('2d');

    const amplitude = canvas.height * 0.25;
    const yOffset = canvas.height * 0.5;
    const frequency = 2 * Math.PI / canvas.width;
    const theta = songPosition * Math.PI / conductor.songData.crotchet;

    const x = scaleFactorX * canvas.width;
    const y = amplitude * Math.sin(frequency * x + theta) + yOffset;
    const radius = scaleFactorY * canvas.width;

    context.beginPath();
    context.arc(x, y, radius, 0, 2 * Math.PI, false);
    context.fillStyle = 'green';
    context.fill();
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
