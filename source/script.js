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
  let icon = document.querySelector("#icon");
  icon.setAttribute("src", `source/${result.data.weather[0].icon}.png`);
  currentCelsius = result.data.main.temp;

  forecastCall(result.data.coord);
}

function forecastCall(coords) {
  let apiKey = "828ad76bf021c328eb958dea6c22fb6f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coords.lat}&lon=${coords.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
function formatDay(timestamp) {
  let forecastDate = new Date(timestamp * 1000);
  let day = forecastDate.getDay();
  let forecastDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return forecastDays[day];
}

function displayForecast(response) {
  let forecastResponse = response.data.daily;

  let forecastElement = document.querySelector("#forecastContainer");
  let forecastHTML = `<div class="row">`;
  forecastResponse.forEach(function (dayObject, index) {
    if (index < 6 && index != 0) {
      forecastHTML =
        forecastHTML +
        `<div class="col">
            <span class="weekDay">${formatDay(dayObject.dt)}</span>
             <br /><span class="emoji"
              ><img src="source/${
                dayObject.weather[0].icon
              }.png" alt="icon" id="icon" width="50" />
            </span>
            <br /><span class="highestTemperature">${Math.round(
              dayObject.temp.max
            )} °C</span>
            <span class="lowestTemperature">${Math.round(
              dayObject.temp.min
            )} °C</span>
          </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;

  forecastElement.innerHTML = forecastHTML;
}

function search(city) {
  let searchForm = document.querySelector(".searchBar");
  let apiKey = "828ad76bf021c328eb958dea6c22fb6f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let providedCity = document.querySelector("#exampleFormControlInput1");
  search(providedCity.value);
}
let currentCelsius = null;

let form = document.querySelector("#searchForm");
form.addEventListener("submit", handleSubmit);
let searchButton = document.querySelector("#searchCityButton");
searchButton.addEventListener("click", handleSubmit);

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

let celcius = document.querySelector("#celsius");
function showCelsius() {
  let temperature = document.querySelector("#mainTemperature");
  temperature.innerHTML = `${Math.round(currentCelsius)}°C`;
  fahrenheit.classList.remove("active");
  celcius.classList.add("active");
}
celcius.addEventListener("click", showCelsius);

let fahrenheit = document.querySelector("#fahrenheit");
function showFahrenheit() {
  let temperature = document.querySelector("#mainTemperature");
  temperature.innerHTML = `${Math.round((currentCelsius * 9) / 5 + 32)}°F`;
  fahrenheit.classList.add("active");
  celcius.classList.remove("active");
}
fahrenheit.addEventListener("click", showFahrenheit);

search("Zhytomyr");
displayForecast();
