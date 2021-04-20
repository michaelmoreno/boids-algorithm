import { Vector2D, constantVector, limitTest, drawTri } from './custom.js';
import { Boid } from './boid.js';

const canvas = document.querySelector('canvas');
export const ctx = canvas.getContext('2d');
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
  for (let i = 0; i < 0; i++) {
    boids.push(new Boid(i,
      new Vector2D(Math.random() * canvas.width, Math.random() * canvas.height)
      )
    );
  }
}

  
export let mouseX, mouseY;
window.addEventListener('mousemove', function(event){
  [mouseX, mouseY] = [event.x, event.y]
})
  
function display() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  limitTest();
  requestAnimationFrame(display);
}

init();
display();

// console.log(dist);