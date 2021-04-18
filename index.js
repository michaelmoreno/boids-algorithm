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
  for (let i = 0; i < 100; i++) {
    boids.push(new Boid(i,
      new Vector2D(Math.random() * canvas.width, Math.random() * canvas.height)
      )
    );
  }
}

let count = 0;
function display() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let boid of boids) {
    boid.flock(boids)
    boid.update();
    boid.draw(ctx);
  }
  if (count < 200) {
    count++
  }
  requestAnimationFrame(display);
  // console.log(count < 100);
}

init();
display();

// console.log(dist);