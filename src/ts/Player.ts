import { DynamicGameObject } from './GameObject';
import { Wave } from './Wave';

export class Player extends DynamicGameObject {
//  private readonly wave: Wave;
//
//  private readonly color = 'green';
//
//  private readonly scaleX = 350.0 / 793;
//  private readonly scaleY = 20.0 / 973;
//
//  private x: number;
//  private radius: number;
//
  constructor(canvas: HTMLCanvasElement, wave: Wave) {
    super(canvas)
//    this.wave = wave;
//    this.resize(canvas.width, canvas.height);
  }
//
  resize(width: number, height: number) {
//    this.x = this.scaleX * width;
//    this.radius = this.scaleY * width;
//    this.wave.resize(width, height);
  }
//
  draw(songPosition: number) {
//    const theta = songPosition * this.wave.w;
//    const y = this.wave.amplitude * Math.sin(this.wave.frequency * this.x + theta) + this.wave.yOffset;
//
//    this.context.beginPath();
//    this.context.arc(this.x, y, this.radius, 0, 2 * Math.PI, false);
//    this.context.fillStyle = this.color;
//    this.context.fill();
  }
}
