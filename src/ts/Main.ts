import * as $ from 'jquery';

import { Conductor } from './Conductor';

$(document).ready(main);

async function main() {
  const conductor = new Conductor('Mijuku Dreamer');
  await conductor.load();
  conductor.start();

  const canvasElement = document.getElementById('game-canvas') as HTMLCanvasElement;

  requestAnimationFrame(update);

  let startTime: number = null;
  function update(time: number) {
    if (!startTime) startTime = time;
    updateDimensions();
    requestAnimationFrame(update);
  }

  function updateDimensions() {
    let ratio = 0.6;
    if (window.innerWidth * ratio < window.innerHeight) {
      canvasElement.width = window.innerWidth;
      canvasElement.height = canvasElement.width * ratio;
    } else {
      canvasElement.height = window.innerHeight;
      canvasElement.width = canvasElement.height / ratio;
    }

    const context = canvasElement.getContext('2d');
    context.fillStyle = 'black';
    context.fillRect(0, 0, canvasElement.width, canvasElement.height);
  }
}

document.addEventListener('keydown', (e) => {
  if (e.keyCode == 37) {
    console.log('left was pressed');
  } else if (e.keyCode == 39) {
    console.log('right was pressed');
  }
});
