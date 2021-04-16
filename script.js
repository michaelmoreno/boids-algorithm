window.Add

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
// canvas.style.backgroundColor = 'black';

function size(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
};
size();
window.addEventListener('resize', size())

  // ['load', 'resize'].forEach(e => window.addEventListener(e, function() {
  //   canvas.width = window.innerWidth;
  //   canvas.height = window.innerHeight;
  // }))

class Boid {
  constructor(x, y, dirX, dirY, accel){
    this.x = x;
    this.y = y;
    this.dirX = dirX;
    this.diry = dirY;
    this.accel = accel;
  }
  draw() {
    const vertices = [
      [this.x-8,this.y+8],
      [this.x, this.y-8],
      [this.x+8, this.y+8],
    ];

    c.beginPath();
    vertices.forEach(v => {
      if (v == vertices[0])
      c.moveTo(v[0], v[1]);
      else
      c.lineTo(v[0], v[1]);
    })
    c.closePath();
    c.fillStyle = '#ccc';
    c.fill();
  }
}

const boids = [];
function init() {
  for (let i = 0; i < 1; i++) {
    boids.push(new Boid(canvas.width/2, canvas.height/2))
  }
}


function display() {
  // c.clearRect(0, 0, canvas.width, canvas.height);
  for (boid of boids) {
    boid.draw();
  }
  requestAnimationFrame(display);
}

init();
display();