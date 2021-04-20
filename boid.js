import { Vector2D, constantVector, drawTri } from './custom.js';
export class Boid {
  constructor(i, pos, vel, accel) {
    this.i = i;
    this.pos = pos;
    this.vel = new constantVector(10);
    this.accel = new Vector2D(0, 0);
    this.maxForce = 0.1;
    this.maxSpeed = 4;
    this.sight = 50;
  }

  edges() {
    if (this.pos.x > window.innerWidth) {
      this.pos.x = 0;
    } else if (this.pos.x < 0) {
      this.pos.x = window.innerWidth;
    }
    if (this.pos.y > window.innerHeight) {
      this.pos.y = 0;
    } else if (this.pos.y < 0) {
      this.pos.y = window.innerHeight;
    }
  }

  align(boids) {
    let sum = new Vector2D(0, 0);
    let total = 0;
    for (let other of boids) {
      let dist = Math.sqrt(((other.pos.x - this.pos.x) ** 2) + (Math.abs((other.pos.y - this.pos.y) ** 2)));
      if (other != this && dist < this.sight) {
        sum.add(other.vel)
        total++;
      }
    }
    if (total > 0) {
      sum.div(total);
      sum.setMag(this.maxSpeed)
      sum.sub(this.vel);
      sum.limit(this.maxForce)
    }
    return sum;
  }

  flock(boids) {
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

    ctx.beginPath();
    ctx.fill();
    ctx.moveTo(this.pos.x,this.pos.y);
    ctx.lineTo(this.pos.x + (this.vel.x * 10), this.pos.y + (this.vel.y * 10));
    ctx.lineTo(this.pos.x, this.pos.y + (this.vel.y * 10));
    ctx.lineTo(this.pos.x, this.pos.y);
    ctx.strokeStyle = 'green';
    ctx.stroke();
    ctx.closePath();

    // ctx.beginPath();
    // // ctx.rect(this.pos.x-this.sight/2, this.pos.y-this.sight/2, this.sight, this.sight);
    // ctx.arc(this.pos.x, this.pos.y, this.sight, 0, Math.PI* 2, false);
    // ctx.closePath();
    // ctx.setLineDash([5,10])
    // ctx.strokeStyle = 'blue';
    // ctx.stroke();
    // const cX = Math.sqrt((this.vel.x - this.pos.x)**2 + (this.vel.y - this.pos.y)**2);
    // ctx.lineTo()
  }
}