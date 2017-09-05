import * as $ from 'jquery';

import { GameParams } from './GameParams';

import { SfxPlayer } from './SfxPlayer';
import { Conductor } from './Conductor';
import { Player } from './Player';
import { Midline } from './Midline';
import { CanvasWrapper } from './CanvasWrapper';
import { WaveGenerator } from './WaveGenerator';

$(document).ready(main);

async function main() {
  const gameParams: GameParams = {
    preHitTime: 1000,
    playerScaleX: 0.25,
    offsetScaleY: 0.5,
  };

  const canvas = document.getElementById('game-canvas') as HTMLCanvasElement;
  const canvasWrapper = new CanvasWrapper(canvas);

  const conductor = new Conductor('Mijuku Dreamer');
  const tambourine = new SfxPlayer('tambourine');
  await Promise.all([conductor.load(), tambourine.load()]);

  const waveGenerator = new WaveGenerator(canvas, conductor, gameParams);
  const player = new Player(canvas, gameParams, waveGenerator);
  const midline = new Midline(canvas);

  initializeGame();
  startGame();

  function initializeGame() {
    // Listen for changes in the window dimensions and adapt.
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
    midline.resize(canvas.width, canvas.height);
    waveGenerator.resize(canvas.width, canvas.height);
    player.resize(canvas.width, canvas.height);
  }

  // Called at every frame, re-renders the entire canvas.
  function update(time: number) {
    canvasWrapper.clear();

    // Draw static elements.
    midline.draw();

    // Draw dynamic elements (elements that rely on song position).
    const songPosition = conductor.position();
    waveGenerator.draw(songPosition);
    player.draw(songPosition);

    requestAnimationFrame(update);
  }

  // Listen for user input.
  document.addEventListener('keydown', (e) => {
    if (e.keyCode == 32) {
      // Spacebar is pressed
      tambourine.play();
    }
  });
}
