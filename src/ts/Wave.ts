import { DynamicGameObject } from './GameObject';

export class Wave extends DynamicGameObject {
  private canvasWidth: number;

  private readonly color = 'white';
  private readonly lineWidth = 7;

  public readonly w: number;

  public amplitude: number;
  public yOffset: number;
  public frequency: number;

  constructor(canvas: HTMLCanvasElement, crotchet: number) {
    super(canvas);
    this.w = Math.PI / crotchet;
    this.resize(canvas.width, canvas.height);
  }

  resize(width: number, height: number) {
    this.amplitude = height * 0.25 * 0.5;
    this.yOffset = height * 0.5;
    this.frequency = 2 * Math.PI / width;
    this.canvasWidth = width;
  }

  draw(songPosition: number) {
    const theta = this.w * songPosition;

    this.context.beginPath();
    this.context.lineWidth = this.lineWidth;
    this.context.strokeStyle = this.color;
    this.context.moveTo(0, this.amplitude * Math.sin(theta) + this.yOffset);
    for (let x = 0; x < this.canvasWidth; ++x) {
      const y = this.amplitude * Math.sin(this.frequency * x + theta) + this.yOffset;
      this.context.lineTo(x, y);
    }
    this.context.stroke();
  }
}

export class Wave2 extends DynamicGameObject {
  private readonly color = 'white';
  private readonly lineWidth = 3;

  // The timestamp (in milliseconds) that the wave should begin to be rendered.
  public start: number;

  // The # of beats between the left and right endpoints of the wave.
  private beats: number;

  constructor(canvas: HTMLCanvasElement, crotchet: number, start: number, beats: number) {
    super(canvas);

    this.start = start;
    this.beats = beats;

    this.resize(canvas.width, canvas.height);
  }

  resize(width: number, height: number) {
    // TODO: implement me!
  }

  draw(songPosition: number) {
    // TODO: implement me!
  }
}
