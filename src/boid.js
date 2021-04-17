export class Boid {
  constructor(ctx, pos, vel, accel) {
    this.pos = pos
    this.vel = vel
    this.accel = accel;
  }
  
  update() {
    this.pos.add(this.vel)
    console.log(this.pos);
  }
  draw() {
    const vertices = [
      [this.x - 8, this.y + 8],
      [this.x, this.y - 8],
      [this.x + 8, this.y + 8],
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