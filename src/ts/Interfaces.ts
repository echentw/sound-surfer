export interface GameParams {
  // The amount of time (ms) between when the wave enters the screen
  // and when it's supposed supposed to be hit.
  preHitTime: number;

  // playerScaleX * canvas.width == x-coordinate of the player circle.
  playerScaleX: number;

  // offsetScaleY * canvas.height == y-coordinate of the median of the waves.
  offsetScaleY: number;
}

export interface HitResult {
  // True == good, False == bad
  success: boolean;

  // If the success, then this is the timestamp of the note
  // that was hit.
  timestamp?: number;
}
