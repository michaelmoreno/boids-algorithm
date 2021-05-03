import { Rectangle } from './geometry.js';
import { quadtreeVisible } from './sliders.js';

class Quadtree {
  constructor(boundary, n) {
    this.boundary = boundary;
    this.capacity = n;
    this.points = [];
    this.divided = false;
  }
  
  subdivide() {
    const { x, y, w, h } = this.boundary,
      halfWidth = w/2,
      halfHeight = h/2;
    let neBoundary = new Rectangle(x + halfWidth, y, halfWidth, halfHeight);
    this.northeast = new Quadtree(neBoundary, this.capacity)
    let seBoundary = new Rectangle(x + halfWidth, y + halfHeight, halfWidth, halfHeight);
    this.southeast = new Quadtree(seBoundary, this.capacity);
    let swBoundary = new Rectangle(x, y + halfHeight, halfWidth, halfHeight)
    this.southwest = new Quadtree(swBoundary, this.capacity)
    let nwBoundary = new Rectangle(x, y, halfWidth, halfHeight)
    this.northwest = new Quadtree(nwBoundary, this.capacity)
    
    this.divided = true;
  }
  
  insert(point) {
    if (!this.boundary.contains(point)) {
      return false;
    }
    if (this.points.length < this.capacity) {
      this.points.push(point)
      point.parent = this;
      return true
    } else {
      if (!this.divided) {
        this.subdivide();
      }

      if (this.northeast.insert(point)) {
        return true;
      }
      if (this.southeast.insert(point)) {
        return true
      }
      if (this.southwest.insert(point)) {
        return true
      }
      if (this.northwest.insert(point)) {
        return true;
      }
    }
  }
  
  query(range) {
    if (!this.boundary.intersects(range))
      return false;

    if (quadtreeVisible)
      this.boundary.draw('green')

    for (let p of this.points) {
      if (range.contains(p)) {
        range.anchor.nearbyBoids[`${p.id}`] = p;
      }
    }
    if (this.divided) {
      this.northeast.query(range);
      this.southeast.query(range);
      this.southwest.query(range);
      this.northwest.query(range);
    }
  }
}

export {
  Rectangle,
  Quadtree,
}