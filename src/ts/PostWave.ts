import { Wave } from './Wave';
import { GameParams } from './Interfaces';

// To understand this file, look at PreWave.ts.
// This was essentially copy/pasted from that with some tweaks.

export class PostWave extends Wave {
  // The distance from the start endpoint to the local maximum.
  private l0: number;

  // The distance from the local maximum to the end endpoint.
  private l1: number;

  // The fraction of the total wave width allocated to the second wave.
  private waveFraction = 1.0 / 3;

  constructor(canvas: HTMLCanvasElement, gameParams: GameParams,
              start: number,
              crotchet: number,
              upright: boolean) {
    super(canvas, gameParams, start, start + 2, crotchet, upright);
    this.resize(canvas.width, canvas.height);
  }

  resize(width: number, height: number) {
    super.resize(width, height);
    this.l0 = (this.end - this.start) * this.waveFraction / this.preHitTime * (this.canvasWidth - this.playerPosition);
    this.l1 = (this.end - this.start) * (1.0 - this.waveFraction) / this.preHitTime * (this.canvasWidth - this.playerPosition);
    this.amplitude *= 2 * this.waveFraction;
  }

  draw(songPosition: number) {
    const x0 = (this.start - songPosition) / this.preHitTime * (this.canvasWidth - this.playerPosition) + this.playerPosition;
    const x1 = x0 + this.l0 + this.l1;

    this.context.beginPath();
    this.context.lineWidth = this.lineWidth;
    this.context.strokeStyle = this.color;
    this.context.moveTo(x0, this.yOffset);

    for (let x = x0; x < x0 + this.l0; ++x) {
      const tempX = x - x0;
      const y = this.amplitude * Math.sin(Math.PI * 0.5 / this.l0 * tempX) + this.yOffset;
      this.context.lineTo(x, y);
    }

    for (let x = x0 + this.l0; x < x1; ++x) {
      const tempX = x - x0 - this.l0;
      const y = 0.5 * this.amplitude * (Math.cos(Math.PI / 4 + Math.PI / this.l1 * (tempX - 0.5 * this.l0)) + 1) + this.yOffset;
      this.context.lineTo(x, y);
    }

    this.context.stroke();
  }

  getPlayerY(songPosition: number): number {
    const x0 = (this.start - songPosition) / this.preHitTime * (this.canvasWidth - this.playerPosition) + this.playerPosition;
    if (this.playerPosition - x0 < this.l0) {
      const tempX = this.playerPosition - x0;
      return this.amplitude * Math.sin(Math.PI * 0.5 / this.l0 * tempX) + this.yOffset;
    } else {
      const tempX = this.playerPosition - x0 - this.l0;
      return 0.5 * this.amplitude * (Math.cos(Math.PI / 4 + Math.PI / this.l1 * (tempX - 0.5 * this.l0)) + 1) + this.yOffset;
    }
  }
}
