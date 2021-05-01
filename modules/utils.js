export const utils = {
  times: [],
  fps: 0,
  now: undefined,
  fpsCounter: function(ctx) {
    this.now = performance.now();
    while (this.times.length > 0 && this.times[0] <= this.now - 1000) {
      this.times.shift();
    }
    this.times.push(this.now);
    this.fps = this.times.length;
    ctx.fillStyle = 'green';
    ctx.font = '30px arial';
    ctx.fillText(`${this.fps}`, 10, 30);
  }
}