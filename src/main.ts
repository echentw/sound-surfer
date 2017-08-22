import * as $ from 'jquery';

const songId = "Mijuku Dreamer";

function loadAssets() {
  const songPromise = loadSong("assets/mijuku-dreamer.mp3", songId);
  songPromise.then((songPlayer: createjs.AbstractSoundInstance) => {
    songPlayer.play()
  });
}

function loadSong(songPath: string, id: string) {
  return new Promise((resolve) => {
    createjs.Sound.registerSound(songPath, id);
    createjs.Sound.on('fileload', (eventObj: any) => {
      if (eventObj['id'] == id) {
        const songPlayer: createjs.AbstractSoundInstance = createjs.Sound.createInstance(id);
        resolve(songPlayer);
      }
    });
  });
}

function playSong() {
  createjs.Sound.play(songId);
}

$(document).ready(loadAssets);
