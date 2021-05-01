import { ctx } from '../main.js';

let count = 0;
export class Rectangle {
  constructor(x, y, w, h, anchor) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.anchor = anchor;

  }
  contains(point) {
    if (point === this.anchor)
      return false;

    return (
      (point.pos.x >= this.x && point.pos.x <= this.x + this.w) &&
      (point.pos.y >= this.y && point.pos.y <= this.y + this.h)
    )
  }

  intersects(range) {
    if (range instanceof Circle)
      return !(
        range.x+range.r < this.x ||
        range.x-range.r > this.x + this.w ||
        range.y+range.r < this.y ||
        range.y-range.r > this.y + this.h
      )
    return !(
      range.x + range.w < this.x ||
      range.x > this.x + this.w ||
      range.y + range.h < this.y ||
      range.y > this.y + this.h
    ); // Refactor this into one check.
  }

  draw(color) {
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x + this.w, this.y)
    ctx.lineTo(this.x + this.w, this.y + this.h);
    ctx.lineTo(this.x, this.y + this.h);
    ctx.lineTo(this.x, this.y);
    ctx.strokeStyle = color || 'green';
    ctx.stroke();
    ctx.closePath();
  }
}

export class Circle {
  constructor(x, y, r, anchor) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.anchor = anchor;
  }
  
  contains(point) {
    if (point === this.anchor)
      return false
    const dist = Math.sqrt(((point.pos.x - this.x)**2) + Math.abs((point.pos.y - this.y)**2));
    return (dist < this.r)
  }

  intersects(other) {
    return !(
      (this.x + this.r < other.x) || (this.x - this.r > other.x + other.w) ||
      (this.y + this.r < other.y) || (this.y - this.r > other.y + other.h)
    )
  }
  
  draw(color) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
    ctx.closePath();
    ctx.strokeStyle = color || 'blue';
    ctx.lineDashOffset = 4;
    ctx.setLineDash([10,20])
    ctx.stroke();
    ctx.setLineDash([0])
  }
}