import { Vector2D, constantVector, drawTri } from './custom.js';
export class Boid {
  constructor(pos, vel, accel) {
    this.pos = pos;
    this.vel = new constantVector(10);
    this.accel = new Vector2D(0, 0);
    this.maxForce = 0.1;
    this.maxSpeed = 4;
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
    let sight = 100;
    let sum = new Vector2D(0, 0);
    let total = 0;
    for (let other of boids) {
      let dist = Math.sqrt(((other.pos.x - this.pos.x) ** 2) + (Math.abs((other.pos.y - this.pos.y) ** 2)));
      if (other != this && dist < sight) {
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

  cohesion(boids) {
    let sight = 100;
    let sum = new Vector2D(0, 0);
    let total = 0;
    for (let other of boids) {
      let dist = Math.sqrt(((other.pos.x - this.pos.x) ** 2) + (Math.abs((other.pos.y - this.pos.y) ** 2)));
      if (other != this && dist < sight) {
        sum.add(other.pos)
        total++;
      }
    }
    if (total > 0) {
      sum.div(total);
      sum.sub(this.pos)
      sum.setMag(this.maxSpeed)
      sum.sub(this.vel);
      sum.limit(this.maxForce)
    }
    return sum;
  }
  separation(boids) {
    let sight = 100;
    let sum = new Vector2D(0, 0);
    let total = 0;
    for (let other of boids) {
      let dist = Math.sqrt(((other.pos.x - this.pos.x) ** 2) + (Math.abs((other.pos.y - this.pos.y) ** 2)));
      if (other != this && dist < sight) {
        let diff = new Vector2D(this.pos.x,this.pos.y);
        diff.sub(other.pos)
        diff.div(dist)
        sum.add(diff)
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
    let cohesion = this.cohesion(boids)
    let separation = this.separation(boids);
    this.accel.add(separation);
    this.accel.add(alignment);
    this.accel.add(cohesion);
  }
  
  update() {
    this.pos.add(this.vel)
    this.vel.add(this.accel)
    this.vel.limit(this.maxSpeed);
    this.accel.mul({x: 0, y: 0})
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
      // ctx.arc(this.pos.x, this.pos.y, 5, 0, Math.PI * 2);
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
    // // ctx.rect(this.pos.x-sight/2, this.pos.y-sight/2, sight, sight);
    // ctx.arc(this.pos.x, this.pos.y, sight, 0, Math.PI* 2, false);
    // ctx.closePath();
    // ctx.setLineDash([5,10])
    // ctx.strokeStyle = 'blue';
    // ctx.stroke();
    // const cX = Math.sqrt((this.vel.x - this.pos.x)**2 + (this.vel.y - this.pos.y)**2);
    // ctx.lineTo()
  }
}