import * as $ from 'jquery';
import * as _ from 'lodash';

import { SoundPlayer } from './SoundPlayer';

interface SongData {
  name: string;
  tag: string;
  numBeats: number;
  songDurationMillis: number;
  offsetMillis: number;
  crotchet: number;
}

export class Conductor {
  private readonly songName: string;

  private musicPlayer: SoundPlayer;
  public songData: SongData;

  constructor(songName: string) {
    this.songName = songName;
  }

  async load(): Promise<string> {
    const result = await $.get('/assets/songData.json');
    const songDataArray = result as Array<SongData>;
    this.songData = _.find(songDataArray, {'name': this.songName});

    this.musicPlayer = new SoundPlayer(`assets/music/${this.songData.tag}.mp3`);
    return this.musicPlayer.load();
  }

  start() {
    this.musicPlayer.play();
  }

  stop() {
    this.musicPlayer.stop();
  }

  pause() {
    this.musicPlayer.pause();
  }

  unpause() {
    this.musicPlayer.unpause();
  }

  position(): number {
    return this.musicPlayer.position();
  }

  duration(): number {
    return this.musicPlayer.duration();
  }
}
