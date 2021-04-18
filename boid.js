import { Vector2D, constantVector, drawTri } from './custom.js';
export class Boid {
  constructor(i, pos, vel, accel) {
    this.i = i;
    this.pos = pos;
    this.vel = new constantVector(2,2);
    this.accel = new Vector2D(0,0);
  }
  align(boids) {
    let sight = 50;
    let steer = new Vector2D(0,0);
    let total = 0;
    for (let other of boids) {
      let dist = Math.sqrt(((other.pos.x - this.pos.x)**2) + (Math.abs((other.pos.y - this.pos.y)**2)));
      if (other != this && dist < sight) {
        steer.add(other.vel)
        total++;
      }
    }
    if (total > 0) {
      steer.div(total);
      steer.sub(this.vel);
    }
    return steer; 
  }

  flock(boids){
    let alignment = this.align(boids)
    this.accel = alignment;
  }
  
  update() {
    this.pos.add(this.vel)
    this.vel.add(this.accel)
  }
  draw(ctx) {
    const vertices = [
      [this.pos.x - 8, this.pos.y + 8],
      [this.pos.x, this.pos.y - 8],
      [this.pos.x + 8, this.pos.y + 8],
    ];

    ctx.beginPath();
    vertices.forEach(v => {
      // if (v == vertices[0])
      //   ctx.moveTo(v[0], v[1]);
      // else
      //   ctx.lineTo(v[0], v[1]);
      ctx.arc(this.pos.x, this.pos.y, 5, 0, Math.PI * 2);
    })
    ctx.closePath();
    ctx.fillStyle = '#ccc';
    ctx.fill();
  }
}