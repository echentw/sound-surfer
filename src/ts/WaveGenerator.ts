import * as Collections from 'typescript-collections';

import { Wave } from './Wave';
import { Conductor } from './Conductor';
import { GameParams } from './GameParams';
import { Note } from './data/Beatmaps';

enum Endpoint {
  Start,
  End,
}

class WaveQueue extends Collections.Queue<Wave> {
  peekTime(endpoint: Endpoint) {
    let time: number;
    switch(endpoint) {
      case Endpoint.Start: {
        time = this.peek().start;
        break;
      }
      case Endpoint.End: {
        time = this.peek().end;
        break;
      }
    }
    return time;
  }
}

export class WaveGenerator {
  private canvas: HTMLCanvasElement;

  private readonly numWaveQueues = 6;

  // waveQueues[0]: haven't been rendered yet.
  // waveQueues[1]: currently being rendered, but have not passed the player yet.
  // waveQueues[2]: have passed the player, but can still be hit.
  // waveQueues[3]: too late to be hit, but are needed to update `this.playerWave`.
  // waveQueues[4]: aren't needed for anything, but still need to be rendered.
  // waveQueues[5]: aren't being rendered, essentially garbage.
  private readonly waveQueues = Array<WaveQueue>(this.numWaveQueues);

  // The number of milliseconds that the wave stays on the screen before it needs to get hit.
  private readonly preHitTime: number;

  // Time (in milliseconds) that the player has before and after the wave is supposed
  // to be hit, to hit the wave.
  private hitMargin = 100;

  // The number of milliseconds in a beat of the song.
  private crotchet: number;

  private gameParams: GameParams;

  // The wave that the player is currently surfing on.
  private playerWave: Wave;
  private yOffset: number;

  constructor(canvas: HTMLCanvasElement, conductor: Conductor, gameParams: GameParams) {
    this.canvas = canvas;
    this.crotchet = conductor.songData.crotchet;
    this.gameParams = gameParams;
    this.waveQueues[0] = this.loadBeatmap(conductor.songData.beatmap);
    for (let i = 1; i < this.numWaveQueues; ++i) {
      this.waveQueues[i] = new WaveQueue();
    }
  }

  resize(width: number, height: number) {
    this.yOffset = height * this.gameParams.offsetScaleY;
    this.waveQueues.forEach((waveQueue) => {
      waveQueue.forEach((wave) => wave.resize(width, height));
    });
  }

  draw(songPosition: number) {
    this.update(songPosition);
    this.waveQueues.slice(1, this.numWaveQueues - 1).forEach((waveQueue) => {
      waveQueue.forEach((wave) => wave.draw(songPosition));
    });
  }

  private update(songPosition: number) {
    this.updateWaveQueue(0, 1, songPosition, Endpoint.Start, -this.gameParams.preHitTime, (wave: Wave) => {});

    this.updateWaveQueue(1, 2, songPosition, Endpoint.Start, 0, (wave: Wave) => {
      // The start endpoint of the wave has just passed the player.
      // Time to surf the wave!
      this.playerWave = wave;
    });

    this.updateWaveQueue(2, 3, songPosition, Endpoint.Start, this.hitMargin, (wave: Wave) => {});

    this.updateWaveQueue(3, 4, songPosition, Endpoint.End, 0, (wave: Wave) => {
      // If `this.playerWave` has not been assigned to another wave, at this point,
      // then this wave is the last wave.
      if (this.playerWave == wave) {
        this.playerWave = null;
      }
    });

    this.updateWaveQueue(4, 5, songPosition, Endpoint.End, 500, (wave: Wave) => {});
  }

  private updateWaveQueue(queueId1: number,
                          queueId2: number,
                          songPosition: number,
                          endpoint: Endpoint,
                          timeOffset: number,
                          callback: (wave: Wave) => void) {
    const waveQueue1 = this.waveQueues[queueId1];
    const waveQueue2 = this.waveQueues[queueId2];
    while (waveQueue1.size() > 0 &&
           songPosition > waveQueue1.peekTime(endpoint) + timeOffset) {
      const wave = waveQueue1.dequeue();
      callback(wave);
      waveQueue2.enqueue(wave);
    }
  }

  private loadBeatmap(beatmap: Array<Note>) {
    const waves = new WaveQueue();
    for (let i = 0; i < beatmap.length - 1; ++i) {
      const start = beatmap[i].beat;
      const end = beatmap[i + 1].beat;
      const upright = (i % 2 == 0) ? true : false;
      waves.enqueue(new Wave(this.canvas, this.gameParams, start, end, this.crotchet, upright));
    }
    return waves;
  }

  getPlayerY(songPosition: number): number {
    if (this.playerWave) {
      return this.playerWave.getPlayerY(songPosition);
    } else {
      return this.yOffset;
    }
  }
}
