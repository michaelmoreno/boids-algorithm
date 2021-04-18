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
    this.x *= other.x;
    this.y *= other.y;
  }
  sub(other) {
    this.x -= other.x;
    this.y -= other.y;
  }
  div(by) {
    this.x /= by;
    this.y /= by;
  }
}

export function constantVector(mag, range) {
  let x = Math.random() * range;
  let y = Math.sqrt((mag * mag) - (x * x));
  y = Math.round(Math.random()) < 1 ? -y:y;
  x = Math.round(Math.random()) < 1 ? -x:x;
  return new Vector2D(x, y)
}

export function drawTri(x1, y1, x2, y2) {
  const dist = Math.sqrt((x2 - x1) ** 2 + Math.abs((y2 - y1) ** 2));
  ctx.beginPath();
  ctx.arc(x1, y1, 5, 0, Math.PI * 2, false);
  ctx.arc(x2, y2, 5, 0, Math.PI * 2, false);
  ctx.fill();
  ctx.arc(x2, y1, 5, 0, Math.PI * 2, false)
  ctx.moveTo(x1, y1);
  ctx.lineTo(x1, y1)
  ctx.lineTo(x2, y1)
  ctx.strokeStyle = 'red';
  ctx.stroke();
  ctx.fillStyle = 'red';
  ctx.closePath();
  ctx.font = '48px serif';
  ctx.fillText(dist, canvas.width / 2, canvas.height / 2)
}