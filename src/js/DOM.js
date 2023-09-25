import hotImg from "../img/bg_hot.jpg";
import neutralImg from "../img/bg_city.jpg";
import coldImg from "../img/bg_cold.jpg";
import '../styles.css';

export const DOM = (() => {
  // Update background according to the temperature in Celsius
  const updateBackground = (temperature) => {
    console.log(temperature);
    if (temperature === undefined) return;
    const background = document.body;
    if (temperature < 14) background.style.background = `url(${coldImg})`;
    else if (temperature < 30)
      background.style.background = `url(${neutralImg})`;
    else background.style.background = `url(${hotImg})`;
  };

  // Update the current day weather info
  const updateCurrentWeatherInfo = (data) => {
    if (data === undefined || typeof data != "object")
      console.error("Invalid data");
    const description = document.querySelector(".weather-info .description");
    const location = document.querySelector(".weather-info .location");
    const date = document.querySelector(".weather-info .date");
    const time = document.querySelector(".weather-info .time");
    const icon = document.querySelector(".weather-info .temperature .icon");
    const localtime = data["location"]["localtime"].split(" ");

    description.textContent = data["current"]["condition"]["text"];
    location.textContent = `${data["location"]["name"]}, ${data["location"]["country"]}`;
    date.textContent = localtime[0];
    time.textContent = localtime[1];
    icon.style.background = `center / cover no-repeat url(${data["current"]["condition"]["icon"]})`;
    updateCurrentTemperature(data["current"]["feelslike_c"]);
  };

  // Update weather data on frontend
  const updateWeatherInfo = (data) => {
    if (data === undefined || typeof data != "object")
      console.error("Invalid data");
    updateCurrentWeatherInfo(data);
    updateForecastInfo(data["forecast"]);
  };

  // Update current day temperature and switch between celsius and fahrenheit
  const updateCurrentTemperature = (degree) => {
    const temperature = document.querySelector(
      ".weather-info .temperature .value"
    );
    let temperatureValue = degree;
    const isDisplayC = document
      .querySelector("#display-c")
      .classList.contains("hide");
    if (!isDisplayC) temperatureValue = temperatureValue * 1.8 + 32;
    temperature.textContent = `${temperatureValue} °${isDisplayC ? "C" : "F"}`;
    console.log(`Current day is ${temperature.textContent}`);
  };

  // Update forecast for the upcoming days
  const updateForecastInfo = (forecastData) => {
    const cards = document.querySelectorAll(".forecast .card");
    const forecastDays = forecastData["forecastday"];
    for (let i = 0; i < 3; i++) {
      const date = cards[i].querySelector(".date");
      const icon = cards[i].querySelector(".icon");
      const temperatureValue = cards[i].querySelector(".value");
      const temperatureMinValue = cards[i].querySelector(".min-value");

      date.textContent = forecastDays[i]["date"];
      icon.style.background = `center / cover no-repeat url(${forecastDays[i]["day"]["condition"]["icon"]})`;
      temperatureValue.textContent = `${forecastDays[i]["day"]["maxtemp_c"]} °C`;
      temperatureMinValue.textContent = `${forecastDays[i]["day"]["mintemp_c"]} °C`;
    }
    updateHourlyForeCastInfo(forecastDays[0]["hour"]);
  };

  // Update the hourly forecast
  const updateHourlyForeCastInfo = (data) => {
    const container = document.querySelector(".forecast .hourly");
    container.innerHTML = "";
    for (let i = 0; i < 24; i++) {
      const card = document.createElement("div");
      card.classList.add("card");
      const time = document.createElement("div");
      time.classList.add("time");
      time.textContent = `${i % 12 + 1} ${i < 11 ? "am" : "pm"}`;
      const temperature = document.createElement("div");
      time.classList.add("temperature");
      const icon = document.createElement("div");
      icon.classList.add("icon");
      icon.style.background = `center / cover no-repeat url(${data[i]["condition"]["icon"]})`;
      const temperatureValue = document.createElement("div");
      temperatureValue.classList.add("value");
      temperatureValue.textContent = `${data[i]["feelslike_c"]} °C`;
      temperature.append(icon);
      temperature.append(temperatureValue);
      card.append(time);
      card.append(temperature);
      container.append(card);
    }
  };

  return {
    updateBackground,
    updateWeatherInfo,
    updateCurrentTemperature,
    updateHourlyForeCastInfo,
  };
})();
