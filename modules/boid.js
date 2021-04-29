import { Vector2D, constantVector } from './vector.js';
import { sliders, sightVisible, } from './sliders.js';

export class Boid {
  constructor(id, pos, range) {
    this.id = id;
    this.pos = pos;
    this.vel = new constantVector(10);
    this.accel = new Vector2D(0, 0);
    this.maxForce = 0.1;
    this.maxSpeed = 3;
    this.range = range;
    this.nearbyBoids = {};
  }

  pruneNearby() {
    for (let key in this.nearbyBoids){
      const nearby = this.nearbyBoids[key];
      if (!this.range.contains(nearby)) {
        delete this.nearbyBoids[key]
      }
    }
  }

  edges() {
    if (this.pos.x > window.innerWidth) {
      this.pos.x = 0;
    } else if (this.pos.x < 0) {
      this.pos.x = window.innerWidth;
    }
    if (this.pos.y > window.innerHeight) {
      this.pos.y = 0;
    } else if (this.pos.y < 0) {
      this.pos.y = window.innerHeight;
    }
  }

  steer(rule) {
    let desired = new Vector2D(0, 0);
    let total = 0;
    for (let key in this.nearbyBoids) {
      let near = this.nearbyBoids[key];
      let dist = Math.sqrt(((near.pos.x - this.pos.x) ** 2) + (Math.abs((near.pos.y - this.pos.y) ** 2)));
      if (near != this && dist < this.range.r) {
        if (rule === 'alignment')
          desired.add(near.vel);
        else if (rule === 'cohesion')
          desired.add(near.pos)
        else if (rule === 'separation') {
          let diff = new Vector2D(this.pos.x, this.pos.y);
          diff.sub(near.pos);
          diff.div(dist);
          desired.add(diff)
        }
        total++;
      }
    }
    if (total > 0) {
      desired.div(total);
      if (rule === 'cohesion')
        desired.sub(this.pos)
      desired.setMag(this.maxSpeed);
      desired.sub(this.vel)
      desired.limit(this.maxForce);
    }
    return desired;
  }

  flock() {
    let alignment = this.steer('alignment')
    let cohesion = this.steer('cohesion')
    let separation = this.steer('separation');
    
    Object.entries({alignment: alignment, cohesion: cohesion, separation: separation }).forEach(([key, value]) => {
      const htmlSlider = (document.querySelector(`#${key}`).value * 0.10).toFixed(2);
      value.mul(htmlSlider);
    });
      
    this.range.r = sliders.sightSlider;
    this.accel.add(separation);
    this.accel.add(alignment);
    this.accel.add(cohesion);
  }
    
  update() {
    this.pos.add(this.vel)
    this.vel.add(this.accel)
    this.vel.limit(this.maxSpeed);
    this.accel.mul({x: 0, y: 0})
  }
  
  draw(ctx, color) {
    ctx.beginPath();
    ctx.moveTo(this.pos.x,this.pos.y);
    ctx.lineTo(this.pos.x + (this.vel.x * 10), this.pos.y + (this.vel.y * 10));
    ctx.lineTo(this.pos.x, this.pos.y + (this.vel.y * 10));
    ctx.lineTo(this.pos.x, this.pos.y);
    ctx.strokeStyle = color || 'green';
    ctx.stroke();
    ctx.closePath();
    
    if (sightVisible) {
      this.range.draw();
    }
  }
}