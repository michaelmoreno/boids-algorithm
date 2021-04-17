export class Boid {
  constructor(pos, vel, accel) {
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