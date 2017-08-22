import * as $ from 'jquery';
import { Greeter } from './greet';

let greeter = new Greeter('Eric');

console.log(greeter.greet());

// Create the canvas
$(document).ready(() => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = 512;
  canvas.height = 480;
  document.body.appendChild(canvas);

  // graphics
  const backgroundImage = new Image();
  const heroImage = new Image();
  const monsterImage = new Image();
  let backgroundImageReady = false;
  let heroImageReady = false;
  let monsterImageReady = false;
  backgroundImage.src = "images/background.png";
  heroImage.src = "images/hero.png";
  monsterImage.src = "images/monster.png";
  backgroundImage.addEventListener('load', () => backgroundImageReady = true);
  heroImage.addEventListener('load', () => heroImageReady = true);
  monsterImage.addEventListener('load', () => monsterImageReady = true);

  // game objects
  const hero: {speed: number, x: number, y: number} = {speed: 256, x: 0, y: 0};
  const monster: {x: number, y: number} = {x: 0, y: 0};
  let monstersCaught = 0;

  // keyboard controls
  const keysDown: {[key: number]: boolean} = {};
  addEventListener('keydown', (e) => keysDown[e.keyCode] = true, false);
  addEventListener('keyup', (e) => delete keysDown[e.keyCode], false);

  // render function
  function render() {
    if (backgroundImageReady) ctx.drawImage(backgroundImage, 0, 0);
    if (heroImageReady) ctx.drawImage(heroImage, hero.x, hero.y);
    if (monsterImageReady) ctx.drawImage(monsterImage, monster.x, monster.y);
  }

  // update objects
  function update(delta: number) {
    if (38 in keysDown) { // up
      hero.y -= hero.speed * delta;
    }
    if (40 in keysDown) { // Player holding down
      hero.y += hero.speed * delta;
    }
    if (37 in keysDown) { // Player holding left
      hero.x -= hero.speed * delta;
    }
    if (39 in keysDown) { // Player holding right
      hero.x += hero.speed * delta;
    }
  }

  // the main game loop
  let then = Date.now()
  function main() {
    let now = Date.now();
    let delta = now - then;
    update(delta / 1000);
    render();
    then = now;
    requestAnimationFrame(main);
  };

  main();
});
