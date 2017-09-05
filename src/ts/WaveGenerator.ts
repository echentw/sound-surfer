import * as Collections from 'typescript-collections';

import { Wave } from './Wave';
import { Conductor } from './Conductor';
import { GameParams } from './GameParams';

export class WaveGenerator {
  private canvas: HTMLCanvasElement;

  // Waves that haven't been rendered yet.
  private queuedWaves = new Collections.Queue<Wave>();

  // Waves that are currently being rendered.
  private currentWaves = new Collections.Queue<Wave>();

  // Waves that have passed the player but can still be hit.
  private passedWaves = new Collections.Queue<Wave>();

  // Waves that the player missed but are still being rendered.
  private missedWaves = new Collections.Queue<Wave>();

  // The number of milliseconds that the wave stays on the screen before it needs to get hit.
  private readonly preHitTime: number;

  // Time (in milliseconds) that the player has before and after the wave is supposed
  // to be hit, to hit the wave.
  private hitMargin = 100;

  // The number of milliseconds in a beat of the song.
  private crotchet: number;

  private gameParams: GameParams;

  // The wave that the player is currently surfing on.
  private playerWave: Wave;
  private yOffset: number;

  constructor(canvas: HTMLCanvasElement, conductor: Conductor, gameParams: GameParams) {
    this.canvas = canvas;
    this.crotchet = conductor.songData.crotchet;
    this.gameParams = gameParams;
    this.load();
  }

  resize(width: number, height: number) {
    this.yOffset = height * this.gameParams.offsetScaleY;
    this.queuedWaves.forEach((wave) => wave.resize(width, height));
    this.currentWaves.forEach((wave) => wave.resize(width, height));
    this.passedWaves.forEach((wave) => wave.resize(width, height));
    this.missedWaves.forEach((wave) => wave.resize(width, height));
  }

  draw(songPosition: number) {
    this.update(songPosition);

    this.drawWaves(songPosition, this.currentWaves);
    this.drawWaves(songPosition, this.passedWaves);
    this.drawWaves(songPosition, this.missedWaves);
  }

  private drawWaves(songPosition: number, waves: Collections.Queue<Wave>) {
    waves.forEach((wave) => wave.draw(songPosition));
  }

  private update(songPosition: number) {
    this.updateCurrentWaves(songPosition);
    this.updatePassedWaves(songPosition);
    this.updateMissedWaves(songPosition);
    this.deleteMissedWaves(songPosition);
  }

  private updateCurrentWaves(songPosition: number) {
    while (this.queuedWaves.size() > 0 &&
           songPosition > this.queuedWaves.peek().start - this.gameParams.preHitTime) {
      this.currentWaves.enqueue(this.queuedWaves.dequeue());
    }
  }

  private updatePassedWaves(songPosition: number) {
    while (this.currentWaves.size() > 0 &&
           songPosition > this.currentWaves.peek().start) {
      const wave = this.currentWaves.dequeue();
      this.playerWave = wave;
      this.passedWaves.enqueue(wave);
    }
  }

  private updateMissedWaves(songPosition: number) {
    while (this.passedWaves.size() > 0 &&
           songPosition > this.passedWaves.peek().start + this.hitMargin) {
      this.missedWaves.enqueue(this.passedWaves.dequeue());
    }
  }

  private deleteMissedWaves(songPosition: number) {
    while (this.missedWaves.size() > 0 &&
           songPosition > this.missedWaves.peek().end + 500) {
      this.missedWaves.dequeue();
    }
  }

  load() {
    // TODO: load waves correctly
    const timestamps = [3.0, 3.75, 4.0, 4.75, 5.0, 5.5, 6.0, 6.25, 6.5, 7.0, 10.0, 12.0];
    for (let i = 0; i < timestamps.length - 1; ++i) {
      const start = timestamps[i];
      const end = timestamps[i + 1];
      const upright = (i % 2 == 0) ? true : false;
      this.queuedWaves.enqueue(
        new Wave(this.canvas, this.gameParams, start, end, this.crotchet, upright)
      );
    }
    this.playerWave = this.queuedWaves.peek();
  }

  getPlayerY(songPosition: number): number {
    if (this.playerWave) {
      return this.playerWave.getPlayerY(songPosition);
    } else {
      return this.yOffset;
    }
  }
}
