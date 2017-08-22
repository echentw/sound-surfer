import * as $ from 'jquery';

import { SoundPlayer } from './SoundPlayer';

$(document).ready(() => {
  const soundPlayer = new SoundPlayer();
  soundPlayer.load('assets/mijuku-dreamer.mp3').then(() => soundPlayer.play());
});
