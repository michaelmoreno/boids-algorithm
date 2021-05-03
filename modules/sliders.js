import { init } from '../main.js'


let sliders = {};
['alignment', 'cohesion', 'separation', 'boids', 'sight', 'quadtree'].forEach(slider => {
  const sliderInput = document.querySelector(`#${slider}`);
  const sliderValue = document.querySelector(`#${slider}-value`);
  const update = () => { 
    sliderValue.innerHTML = sliderInput.value;
    sliders[`${slider}Slider`] = sliderInput.value;
  };
  update();

  sliderInput.addEventListener('input', () => {
    update();
    if (slider == 'boids')
      init();
  })
});

let sightVisible = false;
let quadtreeVisible = false;

let quadtreeSlider = document.querySelector('#quadtree')
quadtreeSlider.addEventListener('mousedown', () => quadtreeVisible = true)
quadtreeSlider.addEventListener('mouseup', () => quadtreeVisible = false)

let sightSlider = document.querySelector('#sight')
sightSlider.addEventListener('mousedown', () => sightVisible = true)
sightSlider.addEventListener('mouseup', () => sightVisible = false)

export { sliders, sightVisible, quadtreeVisible }