import _ from "lodash";
import "../styles.css";
import { DOM } from "./DOM";
import { Weather } from "./weather";

Weather.fetchWeatherData().then(() => {
  DOM.updateBackground(Weather.getTemperateC());
  DOM.updateWeatherInfo(Weather.getData());
});

// Display temperature buttons
const displayButtons = document.querySelectorAll(".weather-info .btn");
displayButtons.forEach((button) => {
  button.addEventListener("click", () => {
    displayButtons.forEach((button) => {
      button.classList.remove("hide");
    });
    button.classList.add("hide");
    DOM.updateCurrentTemperature(Weather.getTemperateC());
  });
});

// Search Input
const locationInput = document.querySelector("#location-input");
const searchIcon = document.querySelector("#search-icon");
locationInput.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    searchSystem();
  }
});
searchIcon.addEventListener("click", searchSystem);

function searchSystem() {
  Weather.fetchWeatherData(locationInput.value).then(() => {
    DOM.updateBackground(Weather.getTemperateC());
    DOM.updateWeatherInfo(Weather.getData());
  });
  locationInput.value = "";
  locationInput.blur();
}

// Forecast
const daysCards = document.querySelectorAll(".daily .card");
daysCards.forEach((card) => {
  card.addEventListener("click", () => {
    let index = 0;
    for (let i = 0; i < 3; i++) {
      if (daysCards[i] == card) index = i;
      daysCards[i].classList.remove("active");
    }
    card.classList.add("active");
    const data = Weather.getData();
    DOM.updateHourlyForeCastInfo(data["forecast"]["forecastday"][index]["hour"]);
  });
});
