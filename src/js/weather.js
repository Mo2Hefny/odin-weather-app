import countries from "./countries.json";
import timezones from "./timezones.json";

export const Weather = (() => {
  let weatherData;

  const getCountry = () => {
    try {
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (timezone === "" || !timezone) {
        return null;
      }
      const _country = timezones[timezone].c[0];
      const country = countries[_country];
      return country;
    } catch (error) {
      console.log(`Error getting country: ${error}`);
      return "Egypt";
    }
  };

  const getState = () => {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (timezone === "" || !timezone) {
      return null;
    }
    const state = timezone.split("/")[1].replace("_", " ");

    return state;
  };

  const fetchWeatherData = async (country) => {
    let state = undefined;
    if (country === undefined) {
      country = getCountry();
      state = getState();
    }
    console.log([country, state]);
    try {
      const key = "8bbb4795cc32474fa0b175201232309";
      const requestURL = `https://api.weatherapi.com/v1/forecast.json?key=${key}&q=${
        state === undefined ? country : state
      }&days=3&api=yes&alerts=no`;
      const request = new Request(requestURL);
      const response = await fetch(request);
      if (!response.ok) throw new Error("Invalid country/city name.");
      const data = await response.json();
      console.log(data);
      if (data != undefined) weatherData = data;
    } catch (error) {
      console.error(error);
    }
  };

  const getTemperateC = () => {
    return weatherData["current"]["feelslike_c"];
  };

  const getData = () => {
    return weatherData;
  };

  return {
    fetchWeatherData,
    getTemperateC,
    getData,
  };
})();
