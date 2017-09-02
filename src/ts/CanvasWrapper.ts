export class CanvasWrapper {
  private readonly ratio = 0.6;
  private readonly canvas: HTMLCanvasElement;
  private readonly context: CanvasRenderingContext2D;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
  }

  resize() {
    if (window.innerWidth * this.ratio < window.innerHeight) {
      this.canvas.width = window.innerWidth;
      this.canvas.height = this.canvas.width * this.ratio;
    } else {
      this.canvas.height = window.innerHeight;
      this.canvas.width = this.canvas.height / this.ratio;
    }
  }

  clear() {
    this.context.fillStyle = 'black';
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }
}
