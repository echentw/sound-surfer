import * as $ from 'jquery';
import * as _ from 'lodash';

import { Conductor } from './Conductor';
import { Wave } from './Wave';

$(document).ready(main);

interface SongData {
  name: string;
  tag: string;
  numBeats: number;
  songDurationMillis: number;
  offsetMillis: number;
}

async function main() {
  const conductor = new Conductor('Mijuku Dreamer');

  const canvas = document.getElementById('game-canvas') as HTMLCanvasElement;
  const wave = new Wave(canvas);

  const [, songDataArray] = await Promise.all([conductor.load(), $.get('./songData')]);
  const songData = _.find(songDataArray, {'name': 'Mijuku Dreamer'});

  conductor.start();

  requestAnimationFrame(update);

  function update(time: number) {
    updateDimensions();
    clearCanvas();

    wave.draw(conductor.position());

    requestAnimationFrame(update);
  }

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
}

document.addEventListener('keydown', (e) => {
  if (e.keyCode == 37) {
    console.log('left was pressed');
  } else if (e.keyCode == 39) {
    console.log('right was pressed');
  }
});
