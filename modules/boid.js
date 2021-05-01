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
    this.steering = {};
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
  
  steer() {
    let alignment = new Vector2D(0, 0);
    let cohesion = new Vector2D(0, 0);
    let separation = new Vector2D(0, 0);
    let total = 0;

    for (let key in this.nearbyBoids) {
      let near = this.nearbyBoids[key];
      let dist = Math.sqrt(((near.pos.x - this.pos.x) ** 2) + (Math.abs((near.pos.y - this.pos.y) ** 2)));
      
      if (dist < this.range.r) {
          alignment.add(near.vel);
          cohesion.add(near.pos);
          const getSeparation = () => {
            let diff = new Vector2D(this.pos.x, this.pos.y);
            diff.sub(near.pos);
            diff.div(dist);
            separation.add(diff)
          };
          getSeparation();
        total++;
      }
    }
    if (total > 0) {
      let i = 0;
      [alignment, cohesion, separation].forEach(val => {
        i++
        val.div(total);
        if (i == 2)
          val.sub(this.pos)
        val.setMag(this.maxSpeed);
        val.sub(this.vel);
        val.limit(this.maxForce);
      })
    }
    
    this.steering.alignment = alignment;
    this.steering.cohesion = cohesion;
    this.steering.separation = separation;
  }

  flock() {
    this.steer()

    Object.entries(this.steering).forEach(([key, value]) => {
      value.mul(sliders[`${key}Slider`] * 0.10);
    });
    this.range.r = sliders.sightSlider**2.5;

    this.accel.add(this.steering.separation);
    this.accel.add(this.steering.alignment);
    this.accel.add(this.steering.cohesion);
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
    ctx.closePath();
    ctx.strokeStyle = color || 'green';
    ctx.stroke();
    
    if (sightVisible) {
      this.range.draw();
    }
  }
}