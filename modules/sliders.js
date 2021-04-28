import { init } from '../script.js'


let sliders = {};
['alignment', 'cohesion', 'separation', 'boids', 'sight', 'quadtree'].forEach(slider => {
  const sliderInput = document.querySelector(`#${slider}`);
  const sliderValue = document.querySelector(`#${slider}-value`);
  const update = () => { 
    sliderValue.innerHTML = sliderInput.value
    sliders[`${slider}Slider`] = sliderInput.value;
  };
  update();

  sliderInput.addEventListener('input', () => {
    update();
    if (slider == 'boids')
      init();
  })
});

// const visibility = {sight: false, quadtree: false}
// Object.entries(visibility).forEach(([key, value]) => {
//   console.log(value);
//   console.log(visibility.sight);
//   document.querySelector(`#${key}`).addEventListener('mousedown', () => visibility[value] = true);
//   document.querySelector(`#${key}`).addEventListener('mouseup', () => value = false);
// })

let sightVisible = false;
let quadtreeVisible = false;

let quadtreeSlider = document.querySelector('#quadtree')
quadtreeSlider.addEventListener('mousedown', () => quadtreeVisible = true)
quadtreeSlider.addEventListener('mouseup', () => quadtreeVisible = false)

let sightSlider = document.querySelector('#sight')
sightSlider.addEventListener('mousedown', () => sightVisible = true)
sightSlider.addEventListener('mouseup', () => sightVisible = false)

export { sliders, sightVisible, quadtreeVisible }