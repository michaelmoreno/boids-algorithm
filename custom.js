import { ctx, mouseX, mouseY } from './index.js';

export class Vector2D {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.mag = this.getMag();
  }
  add(other) {
    this.x += other.x;
    this.y += other.y;
    this.getMag();
  }
  mul(other) {
    this.x *= other.x;
    this.y *= other.y;
    this.getMag();
  }
  sub(other) {
    this.x -= other.x;
    this.y -= other.y;
    this.getMag();
  }
  div(by) {
    this.x /= by;
    this.y /= by;
    this.getMag();
  }
  getMag() {
    this.mag = Math.sqrt(Math.abs(this.x**2) + Math.abs(this.y**2));
    return this.mag;
  }
  setMag(to) {
    this.mul({x: to/this.mag, y: to/this.mag})
  }
  limit(max) {
    if (this.mag > max)
      this.setMag(max)
    return this;
  }
}

export function constantVector(mag) {
  let x = Math.random() * mag;
  let y = Math.sqrt((mag * mag) - (x * x));
  y = Math.round(Math.random()) < 1 ? -y:y;
  x = Math.round(Math.random()) < 1 ? -x:x;
  return new Vector2D(x, y, mag)
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

function drawCircle() {
  ctx.beginPath();
  ctx.arc(window.innerWidth / 2, window.innerHeight / 2, 75, 0, Math.PI * 2, false)
  ctx.strokeStyle = 'green';
  ctx.closePath();
  ctx.stroke();
}


// function drawLine() {
//   let dx = mouseX - window.innerWidth/2;
//   let dy = mouseY - window.innerHeight/2;
  
//   // console.log('dx: ' + dx + ' dy: ' + dy);
//   const v0 = new Vector2D(dx, dy);
  
//   // const v0 = new constantVector(7);
//   // v0.setMag(100)
  
  
//   ctx.beginPath();
//   ctx.moveTo(window.innerWidth / 2, window.innerHeight / 2);
//   v0.limit(75)
//   ctx.lineTo(window.innerWidth/2 + v0.x, window.innerHeight/2 + v0.y)
//   ctx.closePath();
//   ctx.stroke();
// }

// export function limitTest() {
//   drawCircle();
//   drawLine();
// }