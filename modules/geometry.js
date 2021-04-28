import { ctx } from '../script.js';

export class Rectangle {
  constructor(x, y, w, h, anchor) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.anchor = anchor;

  }
  contains(point) {
    if (point === this.anchor) {
      return false;
    }

    return (
      (point.pos.x >= this.x && point.pos.x <= this.x + this.w) &&
      (point.pos.y >= this.y && point.pos.y <= this.y + this.h)
    )
  }

  intersects(range) {
    return !(
      range.x + range.w < this.x ||
      range.x > this.x + this.w ||
      range.y + range.h < this.y ||
      range.y > this.y + this.h
    );
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