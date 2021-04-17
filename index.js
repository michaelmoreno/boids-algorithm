import { Vector2D, constantVector } from './custom.js';
import { Boid } from './boid.js';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
canvas.style.backgroundColor = 'black';
function size() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
};
size();
window.addEventListener('resize', size());

const one = new Vector2D(500, 600);
const two = new Vector2D(5, 10);

const boids = [];
function init() {
  for (let i = 0; i < 300; i++) {
    boids.push(new Boid(
      new Vector2D(canvas.width/2, canvas.height/2)
      )
    );
  }
}

const pointone = new Vector2D(canvas.width / 2, canvas.height / 2);

function display() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let boid of boids) {
    boid.update();
    boid.draw(ctx);
  }
  requestAnimationFrame(display);
}

init();
display();