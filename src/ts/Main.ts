import * as $ from 'jquery';

import { GameParams } from './Interfaces';
import { SfxPlayer } from './SfxPlayer';
import { Conductor } from './Conductor';
import { Player } from './Player';
import { Midline } from './Midline';
import { Title } from './Title';
import { CanvasWrapper } from './CanvasWrapper';
import { WaveController } from './WaveController';
import { ScoreKeeper } from './ScoreKeeper';
import { Splash } from './Splash';

$(document).ready(main);

async function main() {
  const gameParams: GameParams = {
    preHitTime: 1500,
    playerScaleX: 0.25,
    offsetScaleY: 0.5,
  };

  const canvas = document.getElementById('game-canvas') as HTMLCanvasElement;
  const canvasWrapper = new CanvasWrapper(canvas);

  const conductor = new Conductor('Liang Liang');
  const tambourine = new SfxPlayer('tambourine');
  await Promise.all([conductor.load(), tambourine.load()]);

  tambourine.setVolume(0.02);

  const midline = new Midline(canvas, gameParams);
  const titleText = new Title(canvas, gameParams, conductor.songData.name);

  const scoreKeeper = new ScoreKeeper();
  const waveController = new WaveController(canvas, conductor, gameParams);
  const player = new Player(canvas, gameParams, waveController);
  const splash = new Splash(canvas, gameParams);

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

    const width = canvas.width;
    const height = canvas.height;

    midline.resize(width, height);
    titleText.resize(width, height);
    scoreKeeper.resize(width, height);
    waveController.resize(width, height);
    player.resize(width, height);
    splash.resize(width, height);
  }

  // Called at every frame, re-renders the entire canvas.
  function update(time: number) {
    canvasWrapper.clear();

    // Draw static elements.
    midline.draw();
    titleText.draw();
    scoreKeeper.draw();

    // Draw dynamic elements (elements that rely on song position).
    const songPosition = conductor.position();
    waveController.draw(songPosition);
    player.draw(songPosition);
    splash.draw(songPosition);

    requestAnimationFrame(update);
  }

  // Listen for user input.
  document.addEventListener('keydown', (e) => {
    if (e.keyCode == 32) {
      // Spacebar is pressed
      const songPosition = conductor.position();
      const hit = waveController.hit(songPosition);
      scoreKeeper.register(hit);
      splash.hit(hit, songPosition);
      tambourine.play();
    }
  });
}
