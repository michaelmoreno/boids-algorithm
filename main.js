import { Vector2D } from './modules/vector.js';
import { Boid } from './modules/boid.js';
import { Rectangle, Circle } from './modules/geometry.js';
import { Quadtree } from './modules/quadtree.js';
import { sliders } from './modules/sliders.js'
import { utils } from './modules/utils.js';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
canvas.style.backgroundColor = 'black';
function size() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
size();
window.addEventListener('resize', size());

let boids;
function init() {
  boids = [];
  for (let i = 0; i < sliders.boidsSlider; i++) {
    let b = new Boid(i, new Vector2D(Math.random()*canvas.width, Math.random() * canvas.height));
    let range = new Circle(b.pos.x, b.pos.y, sliders.sightSlider, b);
    b.range = range;
    boids.push(b);
  }
}


let count = 0;

let mouseX = 500;
let mouseY = 500;
window.addEventListener('mousemove', (event) => {
  [mouseX, mouseY] = [event.x, event.y];
})

let boundary = new Rectangle(0, 0, canvas.width, canvas.height);
let qtree;
let time = [], fps, now;
function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  qtree = new Quadtree(boundary, sliders.quadtreeSlider);
  
  for (let boid of boids) {
    boid.draw(ctx);
    qtree.insert(boid)
    
    boid.edges();
    boid.flock()
    boid.update();
    boid.pruneNearby();
  }
  
  for (let boid of boids) {
    boid.range.x = boid.pos.x;
    boid.range.y = boid.pos.y;
    // boid.range.draw();
    qtree.query(boid.range);
    // boid.range.draw();
  }
  qtree.render();
  if (count < 1) {
    count++
  }
  requestAnimationFrame(render);
  // utils.fpsCounter(ctx);
}

init();
render();


export {
  ctx,
  init,
}
