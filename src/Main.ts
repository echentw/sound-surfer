import * as $ from 'jquery';

import { Conductor } from './Conductor';

$(document).ready(start);

async function start() {
  const conductor = new Conductor('Mijuku Dreamer');
  await conductor.load();
  conductor.start();
}

document.addEventListener('keydown', (e) => {
  if (e.keyCode == 37) {
    console.log('left was pressed');
  } else if (e.keyCode == 39) {
    console.log('right was pressed');
  }
});
