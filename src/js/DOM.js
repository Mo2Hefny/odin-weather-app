import hotImg from '../img/bg_hot.jpg'
import neutralImg from '../img/bg_city.jpg'
import coldImg from '../img/bg_cold.jpg'

export const DOM = (() => {
  // Update background according to the temperature in Celsius
  const updateBackground = (temperature) => {
    console.log(temperature);
    if (temperature === undefined) return;
    const background = document.body;
    if (temperature < 14)
      background.style.background = `url(${coldImg})`
    else if (temperature < 30)
      background.style.background = `url(${neutralImg})`
    else
      background.style.background = `url(${hotImg})`
  }

  return {
    updateBackground,
  }

})();