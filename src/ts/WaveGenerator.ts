import * as Collections from 'typescript-collections';

import { Wave } from './Wave';

export class WaveGenerator {
  private canvas: HTMLCanvasElement;

  // The number of milliseconds in a beat of the song.
  private crotchet: number;

  // Waves that haven't been rendered yet.
  private queuedWaves = new Collections.Queue<Wave>();

  // Waves that are currently being rendered.
  private currentWaves = new Collections.Queue<Wave>();

  // Waves that the player missed but are still being rendered.
  private missedWaves = new Collections.Queue<Wave>();

  // The number of milliseconds that the wave stays on the screen before it needs to get hit.
  private readonly preHitTime = 1000;

  // Time (in milliseconds) that the player has before and after the wave is supposed
  // to be hit, to hit the wave.
  // TODO: Currently this is set to 0 to make the player animation smooth. Fix this!
  private hitMargin = 0;

  private playerScaleX: number;

  // The wave that the player is currently surfing on.
  private playerWave: Wave;
  private yOffset: number;

  constructor(canvas: HTMLCanvasElement, crotchet: number, playerScaleX: number) {
    this.canvas = canvas;
    this.crotchet = crotchet;

    this.playerScaleX = playerScaleX;

    this.load();
  }

  resize(width: number, height: number) {
    this.yOffset = height * 0.5;
    this.queuedWaves.forEach((wave) => wave.resize(width, height));
    this.currentWaves.forEach((wave) => wave.resize(width, height));
    this.missedWaves.forEach((wave) => wave.resize(width, height));
  }

  draw(songPosition: number) {
    this.update(songPosition);

    this.drawWaves(songPosition, this.currentWaves);
    this.drawWaves(songPosition, this.missedWaves);
  }

  private drawWaves(songPosition: number, waves: Collections.Queue<Wave>) {
    waves.forEach((wave) => wave.draw(songPosition));
  }

  private update(songPosition: number) {
    this.updateCurrentWaves(songPosition);
    this.updateMissedWaves(songPosition);
    this.deleteMissedWaves(songPosition);
  }

  private updateCurrentWaves(songPosition: number) {
    while (this.queuedWaves.size() > 0 &&
           songPosition > this.queuedWaves.peek().start - this.preHitTime) {
      this.currentWaves.enqueue(this.queuedWaves.dequeue());
    }
  }

  private updateMissedWaves(songPosition: number) {
    while (this.currentWaves.size() > 0 &&
           songPosition > this.currentWaves.peek().start + this.hitMargin) {
      const wave = this.currentWaves.dequeue();
      this.playerWave = wave;
      this.missedWaves.enqueue(wave);
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
    this.queuedWaves.enqueue(new Wave(this.canvas, this.crotchet, 3.0, 4.0, true, this.playerScaleX, this.preHitTime));
    this.queuedWaves.enqueue(new Wave(this.canvas, this.crotchet, 4.0, 5.0, false, this.playerScaleX, this.preHitTime));
    this.queuedWaves.enqueue(new Wave(this.canvas, this.crotchet, 5.0, 5.5, true, this.playerScaleX, this.preHitTime));
    this.queuedWaves.enqueue(new Wave(this.canvas, this.crotchet, 5.5, 6.0, false, this.playerScaleX, this.preHitTime));
    this.queuedWaves.enqueue(new Wave(this.canvas, this.crotchet, 6.0, 8.0, true, this.playerScaleX, this.preHitTime));
  }

  getPlayerY(songPosition: number): number {
    if (this.playerWave) {
      return this.playerWave.getPlayerY(songPosition);
    } else {
      return this.yOffset;
    }
  }
}
