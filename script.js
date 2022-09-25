// ⏰Change data and time
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

//🙀Change degrees fahrenheit
function fahrenheitChangeTemperature() {
  let mainTemperature = document.querySelector("h2");
  let fahrenheitTemperature = 25 * 1.8 + 32;
  mainTemperature.innerHTML = `<img src="image/thermometer_1f321-fe0f.png" alt="thermometr" width="50px"> ${fahrenheitTemperature}°`;
  let feelsLikes = document.querySelector(".temperatur-feels");
  let fahrenheitTemperatureFeels = 23 * 1.8 + 32;
  feelsLikes.innerHTML = `Feels likes ${Math.round(
    fahrenheitTemperatureFeels
  )}°`;

  let daysTemperature = document.querySelector(".forecast-temperature");
  let fahrenheitTemperatureDays = 24 * 1.8 + 32;
  daysTemperature.innerHTML = `${Math.round(fahrenheitTemperatureDays)}°`;
  fahrenheit.style = `color: #006ec5;`;
  let celsiusLink = document.querySelector("#celsius-link");
  celsiusLink.style = `color: #fbfdff`;
}

let fahrenheit = document.querySelector("#fahrenheit-link");
fahrenheit.addEventListener("click", fahrenheitChangeTemperature);

//🙀Change degrees celsius
function celsiusChangeTemperature() {
  window.location.reload();
}

let celsius = document.querySelector("#celsius-link");
celsius.addEventListener("click", celsiusChangeTemperature);

// 🕵️‍♀️Change H1 with search
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
}

let searchForm = document.querySelector("form");
searchForm.addEventListener("submit", inputData);

// Current temperature
function currentData(response) {
  console.log(response.data);
  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector(".month-and-day").innerHTML = formatDate(
    response.data.dt * 1000
  );

  document.querySelector("#current-temperature").innerHTML = `${Math.round(
    response.data.main.temp
  )}°`;
  document.querySelector(
    ".temperatur-feels"
  ).innerHTML = `Feels likes ${Math.round(response.data.main.feels_like)}°`;

  let fig = response.data.weather[0].main;
  let mainImage = document.querySelector("#figure-img");
  if (fig === "Clear") {
    mainImage.innerHTML = `<img src="image/sun.png" class="main-image" alt="main image" width="200px" height="180px"><figcaption>${fig}</figcaption>`;
  }
  if (fig === "Clouds") {
    mainImage.innerHTML = `<img src="image/cloud.png" class="main-image" alt="main image" width="200px" height="180px"><figcaption>${fig}</figcaption>`;
  }
  if (fig === "Rain") {
    mainImage.innerHTML = `<img src="image/cloud-with-rain.png" class="main-image" alt="main image" width="200px" height="180px"><figcaption>${fig}</figcaption>`;
  }
  if (fig === "Drizzle") {
    mainImage.innerHTML = `<img src="image/sun-behind-rain-cloud.png" class="main-image" alt="main image" width="200px" height="180px"><figcaption>${fig}</figcaption>`;
  }
  if (fig === "Fog") {
    mainImage.innerHTML = `<img src="image/fog.png" class="main-image" alt="main image" width="200px" height="180px"><figcaption>${fig}</figcaption>`;
  }

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
}

// Current place
function retrievePosition(position) {
  let appKey = "eb4b9c9f52e39ba16b6dff58dd6bccb0";
  let apiUrl = "https://api.openweathermap.org/data/2.5/weather";

  let url = `${apiUrl}?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${appKey}&units=metric`;

  axios.get(url).then(currentData);
}
function buttonGeoClick(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
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
