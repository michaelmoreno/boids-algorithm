# boids-algorithm
This is a flocking simulation based on Craig Reynold's 1986 Boids algorithm, built in vanilla JS and HTML5 Canvas.
The flocking behavior emerges from three simple rules defined into each boid:
* Alignment: Boids will steer towards the average direction of nearby boids.
* Cohesion: Boids will steer towards the average position of nearby boids.
* Separation: Boids will steer away from any boids who get too close. 

When all three of these rules are at play, a chaotic yet ordered pattern manifests that resembles not only the flocking behaviors we see in various animals, but also - at a high enough intensity - fluid dynamics.

## main.js
This is the top-level script that's inserted into index.html. It handles all of the canvas rendering and many of the callbacks to other scripts. 
`Init()` Creates an array and populates it with boids.
`Render()` recursively generates each frame, draws everything onto canvas, inserts boids into the quadtree, and controls steering behavior.

## quadtree.js
This file defines the class Quadtree, which serves as a spatial partitioning system to reduce big O complexity and speed up performance. Instead of every boid having to loop through every other boid to find boids which are nearby, the quadtree recursively subdivides the screen into quadrants once a certain number of boids have been inserted into it, with the remaining inserted into the following subdivided quadrants.
Then, every quadrant checks to see if it is intersecting with a boid, and if so it gives that boid a list of all of the other boids currently inserted inside of the quadrant. This way, boids check only nearbyboids provided to them by the quadtree.
