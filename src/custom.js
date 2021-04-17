export class Vector2D {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  add(other) {
    return new Vector2D(this.x + other.x, this.y + other.y);
  }
  mul(other) {
    return new Vector2D(this.x * other.x, this.y * other.y);
  }
  sub(other) {
    return new Vector2D(this.x - other.x, this.y - other.y);
  }
}