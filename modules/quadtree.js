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
  
  query(range, found) {
    if (!found) {
      found = [];
    }
    
    if (!this.boundary.intersects(range)) {
      return false;
    } else {
      if (quadtreeVisible){
        this.boundary.draw('green')
      }
      for (let p of this.points) {
        // console.log(this.points);
        if (range.contains(p)) {
          range.anchor.nearbyBoids[`${p.id}`] = p;
          found.push(p);
        }
      }
      // console.log(this.divided);
      if (this.divided) {
        this.northeast.query(range, found);
        this.southeast.query(range, found);
        this.southwest.query(range, found);
        this.northwest.query(range, found);
      }
      return [found]
    }
  }
  
  render() {
    // this.boundary.draw('green');
    // this.points.forEach(p => p.draw());
    this.points.forEach(p => {
      
          // ctx.beginPath();
          // ctx.moveTo(this.boundary.x + this.boundary.w/2, this.boundary.y + this.boundary.y/2);
          // ctx.lineTo(p.pos.x, p.pos.y)
          // ctx.closePath();
          // ctx.strokeStyle = 'blue';
          // ctx.fillStyle = 'blue';
          // ctx.fill();
          // ctx.stroke();
          // this.boundary.draw('blue');
      // ctx.lineTo(p.pos.x, p.pos.y)
    });
    
    if (this.divided) {
      this.northeast.render();
      this.southeast.render();
      this.southwest.render();
      this.northwest.render();
    }
  }
}


export {
  Rectangle,
  Quadtree,
}