import { DynamicGameObject } from './GameObject';
import { WaveGenerator } from './WaveGenerator';

export class Player extends DynamicGameObject {
  private readonly waveGenerator: WaveGenerator;

  private readonly color = 'green';

  private readonly scaleX: number;
  private readonly scaleRadius: number;

  private x: number;
  private radius: number;

  private yOffset: number;

  constructor(canvas: HTMLCanvasElement, playerScaleX: number, waveGenerator: WaveGenerator) {
    super(canvas)
    this.waveGenerator = waveGenerator;
    this.scaleX = playerScaleX;
    this.scaleRadius = this.scaleX * 0.05;
    this.resize(canvas.width, canvas.height);
  }

  resize(width: number, height: number) {
    this.x = this.scaleX * width;
    this.radius = this.scaleRadius * width;
    this.yOffset = height * 0.5;
  }

  draw(songPosition: number) {
    const y = this.waveGenerator.getPlayerY(songPosition);

    this.context.beginPath();
    this.context.arc(this.x, y, this.radius, 0, 2 * Math.PI, false);
    this.context.fillStyle = this.color;
    this.context.fill();
  }
}
