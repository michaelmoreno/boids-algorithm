import { Vector2D, constantVector } from './vector.js';
import { Boid } from './boid.js';
import { Point, Rectangle, Circle, Quadtree } from './quadtree.js';

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
    boids.push(new Boid(new Vector2D(Math.random() * canvas.width, Math.random() * canvas.height)));
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
function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  let boundary = new Rectangle(150, 150, canvas.width - 300, canvas.height - 300);
  qtree = new Quadtree(boundary, 4);

  let found;
  for (let boid of boids) {
    let p = new Point(boid.pos.x, boid.pos.y, boid);
    qtree.insert(p);

    let range = new Circle(boid.pos.x, boid.pos.y, 2)
    range.draw();
    found = qtree.query(range);

    
    // for (let point of found) {
    //   let other = point.userData;
    // }
    
    boid.edges();
    boid.flock(boids)
    boid.update();
    boid.draw(ctx, sightVisible);
    qtree.render();
  }
  // ctx.fillText(found.length, qtree.boundary.x, qtree.boundary.y);
  // ctx.font = '25px arial';
  if (count < 5){
    count++;
  }
  requestAnimationFrame(render);
}

init();
render();

export {
  ctx,
  mouseX, mouseY,
}