import { Vector2D, constantVector } from './vector.js';
import { Boid } from './boid.js';
import { Point, Rectangle, Quadtree } from './quadtree.js';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
canvas.style.backgroundColor = 'black';
function size() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
};
size();
window.addEventListener('resize', size());


const boidsSlider = document.querySelector('#boids');
const boidsValue = document.querySelector('#boids-value');
boidsValue.innerHTML = `${(boidsSlider.value)}`;

let qtree;
let boids = [];
function init() {
  
  for (let i = 0; i < boidsSlider.value; i++) {
    let b = new Boid(i, new Vector2D(Math.random()*canvas.width, Math.random() * canvas.height));
    let range = new Rectangle(b.pos.x, b.pos.y, 200, 200, b);
    b.range = range;
    boids.push(b);
  }
}


boidsSlider.addEventListener('input', function(){
  boidsValue.innerHTML = `${(boidsSlider.value)}`;
  boids = [];
  init();
  console.log('test');
});

let sightVisible = false;
const sightSlider = document.querySelector(`#sight`)
sightSlider.addEventListener('mousedown', function() {
  sightVisible = true;
})
sightSlider.addEventListener('mouseup', function () {
  sightVisible = false;
})

  
let mouseX, mouseY;
window.addEventListener('mousemove', function(event){
  [mouseX, mouseY] = [event.x, event.y]
})


let count = 0;
let boundary = new Rectangle(0, 0, canvas.width, canvas.height);
function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  qtree = new Quadtree(boundary, 1);
  
  let found;
  for (let boid of boids) {
    boid.draw(ctx, sightVisible);
    qtree.insert(boid)
    
    
    boid.edges();
    boid.flock(boids)
    boid.update();
    qtree.render();
    boid.pruneNearby();
  }
  
  for (let boid of boids) {
    // let range = new Rectangle(boid.pos.x - 100, boid.pos.y - 100, 200, 200, boid);
    boid.range.x = boid.pos.x - boid.sight;
    boid.range.y = boid.pos.y - boid.sight;
    // boid.range.draw();
    boid.range.w = boid.sight * 2;
    boid.range.h = boid.sight * 2;
    found = qtree.query(boid.range);
    if (count < 1){
      // console.log(boid.sight * 0.10);
      // count++;
      // console.log(boid);
      // console.log(boid.nearbyBoids);
      // console.log(found);
      // console.log(qtree);
      // console.log(found);
      // console.log();
    }
  }
  
  // ctx.fillText(found.length, qtree.boundary.x, qtree.boundary.y);
  // ctx.font = '25px arial';
  requestAnimationFrame(render);
}

init();
render();

export {
  ctx,
  mouseX, mouseY,
}