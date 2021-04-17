// import { vector2D } from './custom.ts'

// const testV = new Vector2D(5, 3);
// console.log(testV);

// const canvas = document.querySelector('canvas');
// const c = canvas.getContext('2d');
// // canvas.style.backgroundColor = 'black';

// function size() {
//   canvas.width = window.innerWidth;
//   canvas.height = window.innerHeight;
// };
// size();
// window.addEventListener('resize', size())

// // ['load', 'resize'].forEach(e => window.addEventListener(e, function() {
// //   canvas.width = window.innerWidth;
// //   canvas.height = window.innerHeight;
// // }))

// const boids = [];
// function init() {
//   for (let i = 0; i < 1; i++) {
//     boids.push(new Boid(
//       new Vector2D(2, 2),
//       new Vector2D(3, 10)))
//   }
// }


// function display() {
//   // c.clearRect(0, 0, canvas.width, canvas.height);
//   for (boid of boids) {
//     boid.draw();
//     boid.update();
//   }

//   requestAnimationFrame(display);
// }

// init();
// display();