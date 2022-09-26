function formatDate(timestamp) {
  let now = new Date(timestamp);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[now.getMonth()];
  let day = days[now.getDay()];
  let hour = now.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${month} ${now.getDate()} <br> ${day} ${hour}:${minutes}`;
}

function fahrenheitChangeTemperature(event) {
  event.preventDefault();
  let mainTemperature = document.querySelector("#current-temperature");
  let fahrenheitTemperature = `${Math.round(celsiumTemperature * 1.8 + 32)}°`;
  mainTemperature.innerHTML = fahrenheitTemperature;
  let feelsLikes = document.querySelector(".temperatur-feels");
  feelsLikes.innerHTML = `Feels likes ${Math.round(
    temperatureFeels * 1.8 + 32
  )}°`;

  celsius.classList.remove("active");
  fahrenheit.classList.add("active");
}

let celsiumTemperature = null;
let temperatureFeels = null;

let fahrenheit = document.querySelector("#fahrenheit-link");
fahrenheit.addEventListener("click", fahrenheitChangeTemperature);

function celsiusChangeTemperature(event) {
  event.preventDefault();
  let mainTemperature = document.querySelector("#current-temperature");
  mainTemperature.innerHTML = `${Math.round(celsiumTemperature)}°`;
  let feelsLikes = document.querySelector(".temperatur-feels");
  feelsLikes.innerHTML = `Feels likes ${Math.round(temperatureFeels)}°`;

  celsius.classList.add("active");
  fahrenheit.classList.remove("active");
}

let celsius = document.querySelector("#celsius-link");
celsius.addEventListener("click", celsiusChangeTemperature);

function searchLocation(city) {
  let appKey = "eb4b9c9f52e39ba16b6dff58dd6bccb0";
  let apiUrl = "https://api.openweathermap.org/data/2.5/weather";
  let url = `${apiUrl}?q=${city}&appid=${appKey}&units=metric`;

  axios.get(url).then(currentData);
}

function inputData(event) {
  event.preventDefault();
  let city = document.querySelector("#exampleDataList").value;
  searchLocation(city);
  geoButton.style = "color: #fbfdff";
}

let searchForm = document.querySelector("form");
searchForm.addEventListener("submit", inputData);

function currentData(response) {
  console.log(response.data);
  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector(".month-and-day").innerHTML = formatDate(
    response.data.dt * 1000
  );

  celsiumTemperature = response.data.main.temp;
  temperatureFeels = response.data.main.feels_like;
  document.querySelector("#current-temperature").innerHTML = `${Math.round(
    celsiumTemperature
  )}°`;
  document.querySelector(
    ".temperatur-feels"
  ).innerHTML = `Feels likes ${Math.round(temperatureFeels)}°`;

  let fig = document.querySelector("figcaption");
  fig.innerHTML = response.data.weather[0].main;
  let mainImage = document.querySelector("#image-weather");
  mainImage.setAttribute("src", `image/${response.data.weather[0].main}.png`);

  let sunRise = document.querySelector("#sun-rise");
  let secRise = response.data.sys.sunrise;
  let dateRise = new Date(secRise * 1000);
  let hour = dateRise.getHours();
  let min = dateRise.getMinutes();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  if (min < 10) {
    min = `0${min}`;
  }
  sunRise.innerHTML = `${hour}:${min}`;

  let sunSet = document.querySelector("#sun-set");
  let secSet = response.data.sys.sunset;
  let dateSet = new Date(secSet * 1000);
  let hours = dateSet.getHours();
  let minutes = dateSet.getMinutes();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  sunSet.innerHTML = `${hours}:${minutes}`;

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind-speed").innerHTML = Math.round(
    response.data.wind.speed * 3.6
  );
  document.querySelector("#country").innerHTML = response.data.sys.country;

  celsius.classList.add("active");
  fahrenheit.classList.remove("active");
}

function retrievePosition(position) {
  let appKey = "eb4b9c9f52e39ba16b6dff58dd6bccb0";
  let apiUrl = "https://api.openweathermap.org/data/2.5/weather";

  let url = `${apiUrl}?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${appKey}&units=metric`;

  axios.get(url).then(currentData);
}

function buttonGeoClick(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
  geoButton.style = "color: #ea3410";
}

let geoButton = document.querySelector(".fa-location-dot");
geoButton.addEventListener("click", buttonGeoClick);

searchLocation("San Leandro");

// Week weather
// let appKey = "eb4b9c9f52e39ba16b6dff58dd6bccb0";
// let urlWeek = `https://api.openweathermap.org/data/2.5/forecast?q=Paris&appid=${appKey}&units=metric`;

// function getWeekWeather(response) {
//   console.log(response.data);
//   let degreesMonday = document.querySelector("#monday");

// }
// axios.get(urlWeek).then(getWeekWeather);
