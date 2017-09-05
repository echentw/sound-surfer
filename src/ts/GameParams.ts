export interface GameParams {
  // The amount of time (ms) between when the wave enters the screen
  // and when it's supposed supposed to be hit.
  preHitTime: number;

  // playerScaleX * canvas.width == x-coordinate of the player circle.
  playerScaleX: number;

  // offsetScaleY * canvas.height == y-coordinate of the median of the waves.
  offsetScaleY: number;
}
