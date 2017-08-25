export class Wave {
  private readonly canvas: HTMLCanvasElement;
  private readonly context: CanvasRenderingContext2D;

  private readonly color = 'white';
  private readonly width = 5;

  private readonly w: number;

  constructor(canvas: HTMLCanvasElement, crotchet: number) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d');

    this.w = Math.PI / crotchet;
  }

  draw(songPosition: number) {
    const amplitude = this.canvas.height * 0.25;
    const yOffset = this.canvas.height * 0.5;
    const frequency = 2 * Math.PI / this.canvas.width;
    const theta = songPosition * this.w;

    this.context.beginPath();
    this.context.lineWidth = this.width;
    this.context.strokeStyle = this.color;
    this.context.moveTo(0, amplitude * Math.sin(theta) + yOffset);
    for (let x = 0; x < this.canvas.width; ++x) {
      const y = amplitude * Math.sin(frequency * x + theta) + yOffset;
      this.context.lineTo(x, y);
    }
    this.context.stroke();
  }
}
