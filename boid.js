import { Vector2D, constantVector } from './vector.js';
export class Boid {
  constructor(pos) {
    this.pos = pos;
    this.vel = new constantVector(10);
    this.accel = new Vector2D(0, 0);
    this.maxForce = 0.1;
    this.maxSpeed = 3;
    this.sight = 100;
    this.nearbyBoids = [];
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

  align(boids) {
    // let sight = 100;
    let sum = new Vector2D(0, 0);
    let total = 0;
    // console.log(boids[0].pos);
    for (let other of this.nearbyBoids) {
      let dist = Math.sqrt(((other.pos.x - this.pos.x) ** 2) + (Math.abs((other.pos.y - this.pos.y) ** 2)));
      if (other != this && dist < this.sight) {
        sum.add(other.vel)
        total++;
      }
    }
    if (total > 0) {
      sum.div(total);
      sum.setMag(this.maxSpeed)
      sum.sub(this.vel);
      sum.limit(this.maxForce)
    }
    return sum;
  }

  cohesion(boids) {
    // let sight = 100;
    let sum = new Vector2D(0, 0);
    let total = 0;
    for (let other of this.nearbyBoids) {
      let dist = Math.sqrt(((other.pos.x - this.pos.x) ** 2) + (Math.abs((other.pos.y - this.pos.y) ** 2)));
      if (other != this && dist < this.sight) {
        sum.add(other.pos)
        total++;
      }
    }
    if (total > 0) {
      sum.div(total);
      sum.sub(this.pos)
      sum.setMag(this.maxSpeed)
      sum.sub(this.vel);
      sum.limit(this.maxForce)
    }
    return sum;
  }
  separation(boids) {
    // let sight = 100;
    let sum = new Vector2D(0, 0);
    let total = 0;
    for (let other of this.nearbyBoids) {
      let dist = Math.sqrt(((other.pos.x - this.pos.x) ** 2) + (Math.abs((other.pos.y - this.pos.y) ** 2)));
      if (other != this && dist < this.sight) {
        let diff = new Vector2D(this.pos.x,this.pos.y);
        diff.sub(other.pos)
        diff.div(dist)
        sum.add(diff)
        total++;
      }
    }
    if (total > 0) {
      sum.div(total);
      sum.setMag(this.maxSpeed)
      sum.sub(this.vel);
      sum.limit(this.maxForce)
    }
    return sum;
  }

  flock(boids) {

    let alignment = this.align(boids)
    let cohesion = this.cohesion(boids)
    let separation = this.separation(boids);

    Object.entries({alignment: alignment, cohesion: cohesion, separation: separation }).forEach(([key, value]) => {
      const htmlSlider = (document.querySelector(`#${key}`).value * 0.10).toFixed(2);
      value.mul(htmlSlider);
      document.querySelector(`#${key}-value`).innerHTML = `${htmlSlider}x`;
    });

    const alignmentSlider = document.querySelector('#alignment');
    const separationSlider = document.querySelector('#separation')
    const cohesionSlider = document.querySelector('#cohesion');
    // alignment.mul(alignmentSlider.value * 0.10);
    // separation.mul(separationSlider.value * 0.10);
    // cohesion.mul(cohesionSlider.value * 0.10);

    


    const sightSlider = document.querySelector('#sight')
    const sightValue = document.querySelector('#sight-value');
    sightValue.innerHTML = `${(sightSlider.value)}`

    
    this.sight = sightSlider.value;
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
  draw(ctx, sightVisible, color) {
    ctx.beginPath();
    ctx.moveTo(this.pos.x,this.pos.y);
    ctx.lineTo(this.pos.x + (this.vel.x * 10), this.pos.y + (this.vel.y * 10));
    ctx.lineTo(this.pos.x, this.pos.y + (this.vel.y * 10));
    ctx.lineTo(this.pos.x, this.pos.y);
    ctx.strokeStyle = color || 'green';
    ctx.stroke();
    ctx.closePath();

    if (sightVisible) {
      ctx.beginPath();
      ctx.arc(this.pos.x, this.pos.y, this.sight, 0, Math.PI* 2, false);
      ctx.closePath();
      // ctx.setLineDash([5,10])
      ctx.strokeStyle = 'blue';
      ctx.stroke();
    }
  }
  drawSight(ctx) {
  }
}