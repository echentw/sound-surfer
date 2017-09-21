import { HitResult } from './Interfaces';

export class ScoreKeeper {
  public currentStreak: number;
  public longestStreak: number;

  public numGood: number;
  public numBad: number;

  constructor() {
    this.currentStreak = 0;
    this.longestStreak = 0;
    this.numGood = 0;
    this.numBad = 0;
  }

  resize(width: number, height: number) {
    // TODO: implement me!
  }

  draw() {
    // TODO: implement me!
  }

  register(result: HitResult) {
    if (result.success) {
      this.numGood += 1;
      this.currentStreak += 1;
      if (this.longestStreak < this.currentStreak) {
        this.longestStreak = this.currentStreak;
      }
    } else {
      this.numBad += 1;
      this.currentStreak = 0;
    }
  }
}
