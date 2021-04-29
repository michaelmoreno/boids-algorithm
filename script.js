import { Vector2D } from './modules/vector.js';
import { Boid } from './modules/boid.js';
import { Rectangle } from './modules/geometry.js';
import { Quadtree } from './modules/quadtree.js';
import { sliders } from './modules/sliders.js'

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
    let range = new Rectangle(b.pos.x, b.pos.y, 200, 200, b);
    b.range = range;
    boids.push(b);
  }
}


let sightVisible = false;
const sightSlider = document.querySelector(`#sight`)
sightSlider.addEventListener('mousedown', function() {
  sightVisible = true;
})
sightSlider.addEventListener('mouseup', function () {
  sightVisible = false;
})


let boundary = new Rectangle(0, 0, canvas.width, canvas.height);
let qtree;
function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  qtree = new Quadtree(boundary, sliders.quadtreeSlider);
  
  for (let boid of boids) {
    boid.draw(ctx);
    qtree.insert(boid)
    
    boid.edges();
    boid.flock(boids)
    boid.update();
    qtree.render();
    boid.pruneNearby();
  }
  
  for (let boid of boids) {
    boid.range.x = boid.pos.x - boid.sight;
    boid.range.y = boid.pos.y - boid.sight;
    boid.range.w = boid.sight * 2;
    boid.range.h = boid.sight * 2;
    qtree.query(boid.range);
    // boid.range.draw();
  }
  
  requestAnimationFrame(render);
}

init();
render();

export {
  ctx,
  init,
}