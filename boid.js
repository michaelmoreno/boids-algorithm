import { Vector2D, constantVector } from './custom.js';

export class Boid {
  constructor(pos, vel, accel) {
    this.pos = pos;
    this.vel = new constantVector(10,13);
  }
  update() {
    this.pos.add(this.vel)
    // console.log(this.pos);
  }
  draw(ctx) {
    const vertices = [
      [this.pos.x - 8, this.pos.y + 8],
      [this.pos.x, this.pos.y - 8],
      [this.pos.x + 8, this.pos.y + 8],
    ];

    ctx.beginPath();
    vertices.forEach(v => {
      if (v == vertices[0])
        ctx.moveTo(v[0], v[1]);
      else
        ctx.lineTo(v[0], v[1]);
    })
    ctx.closePath();
    ctx.fillStyle = '#ccc';
    ctx.fill();
  }
}