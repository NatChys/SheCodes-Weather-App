let currentDate = new Date();
let date = document.querySelector(".date");
let weekdays = [
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
date.innerHTML = `${weekdays[currentDate.getDay()]}, ${
  months[currentDate.getUTCMonth()]
} ${currentDate.getDate()}`;

let time = document.querySelector(".time");
let minutes = currentDate.getMinutes();
if (minutes < 10) {
  time.innerHTML = `${currentDate.getHours()}:0${currentDate.getMinutes()}`;
} else {
  time.innerHTML = `${currentDate.getHours()}:${currentDate.getMinutes()}`;
}
let form = document.querySelector("#searchForm");

function displayWeather(result) {
  let apiTemperature = Math.round(result.data.main.temp);
  let temperature = document.querySelector("#mainTemperature");
  temperature.innerHTML = `${apiTemperature}°C`;
  let description = document.querySelector(".clear");
  description.innerHTML = result.data.weather[0].main;
  let wind = document.querySelector("#wind");
  wind.innerHTML = `Wind: ${Math.round(result.data.wind.speed)} km/h`;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `Humidity: ${result.data.main.humidity}%`;
  let city = document.querySelector(".city");
  city.innerHTML = result.data.name;
  let icon = document.querySelector("#icon");
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${result.data.weather[0].icon}@2x.png`
  );
}

function getWeather(event) {
  event.preventDefault();

  let searchForm = document.querySelector(".searchBar");

  let providedCity = searchForm.value;
  let apiKey = "828ad76bf021c328eb958dea6c22fb6f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${providedCity}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}
form.addEventListener("submit", getWeather);
let searchButton = document.querySelector("#searchCityButton");
searchButton.addEventListener("click", getWeather);

function handlePosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  let apiKey = "828ad76bf021c328eb958dea6c22fb6f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}
function receivePosition() {
  navigator.geolocation.getCurrentPosition(handlePosition);
}

let geolocationButton = document.querySelector(".geolocationButton");
geolocationButton.addEventListener("click", receivePosition);

let celcius = document.querySelector("#celcius");
function showCelcius() {
  let temperature = document.querySelector("#mainTemperature");
  temperature.innerHTML = "17°C";
}
celcius.addEventListener("click", showCelcius);

let fahrenheit = document.querySelector("#fahrenheit");
function showFahrenheit() {
  let temperature = document.querySelector("#mainTemperature");
  temperature.innerHTML = "66°F";
}
fahrenheit.addEventListener("click", showFahrenheit);