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

export const liangLiangBeatmap: Array<Note> = [
  {beat:  6.00, style: 0},
  {beat:  9.00, style: 0},
  {beat: 12.00, style: 0},

  {beat: 14.00, style: 0},
  {beat: 15.00, style: 0},
  {beat: 16.00, style: 0},
  {beat: 17.00, style: 0},
  {beat: 18.00, style: 0},
];
