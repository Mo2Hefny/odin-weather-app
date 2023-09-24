import _ from 'lodash';
import { DOM } from './DOM';
import { Weather } from './weather';

function component() {
  const element = document.createElement('div');

  // Lodash, currently included via a script, is required for this line to work
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');

  return element;
}

document.body.appendChild(component());
Weather.fetchWeatherData().then(() => {
  DOM.updateBackground(Weather.getTemperateC())
})

// Search Input
const locationInput = document.querySelector('#location-input');
locationInput.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    Weather.fetchWeatherData(locationInput.value).then(() => {
      DOM.updateBackground(Weather.getTemperateC())
    })
  }
})