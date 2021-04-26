import { ctx } from './script.js'

let count = 0;

class Point {
  constructor(x,y, userData) {
    this.x = x;
    this.y = y;
    this.userData = userData;
  }
  draw(color = 'white') { // fix this auto assignment
    ctx.beginPath();
    ctx.arc(this.x, this.y, 5, 0, Math.PI * 2, false);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
  }
}

class Rectangle {
  constructor(x,y,w,h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }
  contains(point) {
    return (
      (point.x >= this.x && point.x <= this.x+this.w) && 
      (point.y >= this.y && point.y <= this.y + this.h)
    )
  }

  intersects(range) {
    return !(
      range.x+range.w < this.x ||
      range.x > this.x+this.w ||
      range.y+range.h < this.y ||
      range.y > this.y+this.h
    );
  }
  
  draw(color = 'green') {
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x + this.w, this.y)
    ctx.lineTo(this.x + this.w, this.y + this.h);
    ctx.lineTo(this.x, this.y + this.h);
    ctx.lineTo(this.x, this.y);
    ctx.strokeStyle = color;
    ctx.stroke();
    ctx.closePath();
  }
}

class Circle {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.rSqrd = this.r;
  }

  contains(point) {
    let d = Math.sqrt((point.x - this.x)**2 + (point.y - this.y)**2);
    return d <= this.rSqrd;
  }

  intersects(range) {
    var xDist = Math.abs(range.x - this.x);
    var yDist = Math.abs(range.y - this.y);

    var r = this.r;

    var edges = Math.pow(xDist - range.w, 2) + Math.pow(yDist - range.h, 2)

    if (xDist > r + range.w || yDist > r + range.h)
      return false;
    if (xDist <= range.w || yDist <= range.h) 
      return true;
    return edges <= this.rSqrd;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.rSqrd, 0, Math.PI * 2, false);
    ctx.closePath();
    ctx.strokeStyle = 'blue';
    ctx.stroke();
  }
}

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
      return;
    } else {
      this.boundary.draw('red')
      for (let p of this.points) {
        count++;
        if (range.contains(p)) {
          found.push(p);
          p.draw('green');
        }
      }
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
    this.boundary.draw('green');
    this.points.forEach(p => p.draw());

    if (this.divided) {
      this.northeast.render();
      this.southeast.render();
      this.southwest.render();
      this.northwest.render();
    }
  }
}


export {
  Point,
  Rectangle,
  Circle,
  Quadtree,
  count
}