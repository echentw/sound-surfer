import * as $ from 'jquery';

import { Conductor } from './Conductor';

$(document).ready(() => {
  const conductor = new Conductor('Mijuku Dreamer');
  conductor.load().then(() => conductor.start());
});
