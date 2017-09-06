export interface Note {
  beat: number;

  // Not very useful right now, but in the future will use this to signal
  // notes that need to be held.
  style: number;
}

export const mijukuDreamerBeatmap: Array<Note> = [
  {beat:  3.00, style: 0},
  {beat:  3.50, style: 0},
  {beat:  4.00, style: 0},
  {beat:  6.00, style: 0},
  {beat:  6.50, style: 0},
  {beat:  8.00, style: 0},
  {beat: 10.00, style: 0},
  {beat: 10.25, style: 0},
];

export const shapeOfYouBeatmap: Array<Note> = [
  {beat:  3.00, style: 0},
  {beat:  4.00, style: 0},
  {beat:  5.00, style: 0},
  {beat:  6.00, style: 0},
  {beat:  7.00, style: 0},
];
