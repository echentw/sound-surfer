import { Note, mijukuDreamerBeatmap, shapeOfYouBeatmap } from './Beatmaps';

export interface SongData {
  name: string;
  tag: string;
  numBeats: number;
  songDurationMillis: number;
  offsetMillis: number;
  crotchet: number;
  beatmap: Array<Note>;
};

const mijukuDreamerData: SongData = {
  name: 'Mijuku Dreamer',
  tag: 'mijukuDreamer',
  numBeats: 88,
  songDurationMillis: 60050,
  offsetMillis: 2220,
  crotchet: 750.625,
  beatmap: mijukuDreamerBeatmap,
};

const shapeOfYouData: SongData = {
  name: 'Shape of You',
  tag: 'shapeOfYou',
  numBeats: 30,
  songDurationMillis: 12500,
  offsetMillis: 2320,
  crotchet: 416.6666666667,
  beatmap: shapeOfYouBeatmap,
};

export const beatmaps = [mijukuDreamerData, shapeOfYouData];
