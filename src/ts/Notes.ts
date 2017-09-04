import * as Collections from 'typescript-collections';

import { Wave } from './Wave';

export class Notes {
  private canvas: HTMLCanvasElement;

  // The number of milliseconds in a beat of the song.
  private crotchet: number;

  // Notes that haven't been rendered yet.
  private queuedNotes = new Collections.Queue<Wave>();

  // Notes that are currently being rendered.
  private currentNotes = new Collections.Queue<Wave>();

  // Notes that the player missed but are still being rendered.
  private missedNotes = new Collections.Queue<Wave>();

  // The number of milliseconds that the note stays on the screen before it needs to get hit.
  private readonly preHitTime = 1000;

  // Time (in milliseconds) that the player has before and after the note is supposed
  // to be hit, to hit the note.
  private hitMargin = 200;

  // TODO: some stuff needed to instantiate waves
  private playerScaleX: number;

  constructor(canvas: HTMLCanvasElement, crotchet: number, playerScaleX: number) {
    this.canvas = canvas;
    this.crotchet = crotchet;

    this.playerScaleX = playerScaleX;

    this.load();
  }

  resize(width: number, height: number) {
    this.queuedNotes.forEach((wave) => wave.resize(width, height));
    this.currentNotes.forEach((wave) => wave.resize(width, height));
    this.missedNotes.forEach((wave) => wave.resize(width, height));
  }

  draw(songPosition: number) {
    this.update(songPosition);

    this.drawNotes(songPosition, this.currentNotes);
    this.drawNotes(songPosition, this.missedNotes);
  }

  private drawNotes(songPosition: number, notes: Collections.Queue<Wave>) {
    notes.forEach((wave) => wave.draw(songPosition));
  }

  private update(songPosition: number) {
    this.updateCurrentNotes(songPosition);
    this.updateMissedNotes(songPosition);
    this.deleteMissedNotes(songPosition);
  }

  private updateCurrentNotes(songPosition: number) {
    while (this.queuedNotes.size() > 0 &&
           songPosition > this.queuedNotes.peek().start - this.preHitTime) {
      this.currentNotes.enqueue(this.queuedNotes.dequeue());
    }
  }

  private updateMissedNotes(songPosition: number) {
    while (this.currentNotes.size() > 0 &&
           songPosition > this.currentNotes.peek().start + this.hitMargin) {
      this.missedNotes.enqueue(this.currentNotes.dequeue());
    }
  }

  private deleteMissedNotes(songPosition: number) {
    while (this.missedNotes.size() > 0 &&
           songPosition > this.missedNotes.peek().end + 500) {
      this.missedNotes.dequeue();
    }
  }

  load() {
    // TODO: load notes correctly
    this.queuedNotes.enqueue(new Wave(this.canvas, this.crotchet, 3.0, 4.0, true, this.playerScaleX, this.preHitTime));
    this.queuedNotes.enqueue(new Wave(this.canvas, this.crotchet, 4.0, 5.0, false, this.playerScaleX, this.preHitTime));
    this.queuedNotes.enqueue(new Wave(this.canvas, this.crotchet, 5.0, 5.5, true, this.playerScaleX, this.preHitTime));
    this.queuedNotes.enqueue(new Wave(this.canvas, this.crotchet, 5.5, 6.0, false, this.playerScaleX, this.preHitTime));
    this.queuedNotes.enqueue(new Wave(this.canvas, this.crotchet, 6.0, 8.0, true, this.playerScaleX, this.preHitTime));
  }
}
