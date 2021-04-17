export class Vector2D {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  add(other) {
    this.x += other.x;
    this.y += other.y
  }
  mul(other) {
    this.x *= this.x;
    this.y *= this.y;
  }
  sub(other) {
    this.x -= this.x;
    this.y -= this.y;
  }
}

export function constantVector(mag, range) {
  let x = Math.random() * range;
  let y = Math.sqrt((mag * mag) - (x * x));
  y = Math.round(Math.random()) < 1 ? -y:y;
  x = Math.round(Math.random()) < 1 ? -x:x;
  return {
    x: x,
    y: y
  }
}

// console.log(constantVector(10, 13))