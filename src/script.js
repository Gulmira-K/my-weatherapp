// Default city
searchCity("barcelona");

// Current Date
function formatDate(date) {
  let days = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat"
];  
  let currentDay = days[date.getDay()];
  let currentMonth = months[date.getMonth()];
  let currentDate = date.getDate();
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minuts = date.getMinutes();
  if (minuts < 10) {
    minuts = `0${minuts}`;
  }
  let time = `${hour}:${minuts}`;
  let formattedDate = `${currentDay} ${currentMonth} ${currentDate}, ${time}`;
    return formattedDate;
}

// Display current city, country and weather conditions 
function displayWeather(response) {
  document.querySelector("#current-city").innerHTML = response.data.name;
  document.querySelector("#current-temp").innerHTML = `${Math.round(response.data.main.temp)}ºC`;
  document.querySelector("#country").innerHTML = response.data.sys.country;
  document.querySelector("#description").innerHTML = response.data.weather[0].main;
  document.querySelector("#feels-temp").innerHTML = `${Math.round(response.data.main.feels_like)}ºC`;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed)  ;
  document.querySelector("#max-temp").innerHTML = Math.round(response.data.main.temp_max);
  document.querySelector("#min-temp").innerHTML = Math.round(response.data.main.temp_min);
  document.querySelector("#icon").setAttribute("src", `media/${response.data.weather[0].icon}.png`);
}

// Search for a city
function searchCity(city) {
  let apiKey = "3d2ad3624a972543a23fa163db444044";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayHourlyForecast);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

// Geolocationn and weather conditions
function defineLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiKey = "3d2ad3624a972543a23fa163db444044";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(displayWeather);
}
function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(defineLocation);
}

// Display 3-hours forecast
function displayHourlyForecast(response) {
 let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;
  for (let index = 0; index < 5; index ++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += 
    `<div class="col">
    <h5 id="day-one">${formatHours(forecast.dt *1000)}</h5>
    <img src=media/${forecast.weather[0].icon}.png alt="Forecast Icon" id="forecast-icon" />
    <p class="degrees"><strong> ${Math.round(forecast.main.temp_max)}ºC </strong>| ${Math.round(forecast.main.temp_min)}ºC</p>
    </div>`;
  }
}

function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minuts = date.getMinutes();
  if (minuts < 10) {
    minuts = `0${minuts}`;
  }
  let time = `${hour}:${minuts}`;
  return time;
}

let searchForm = document.querySelector("form");
let locationBtn = document.querySelector("#location-btn");
let currently = new Date();
let h2 = document.querySelector("h2");
let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
]; 
let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
]; 
let dates = document.querySelectorAll("p.date");
h2.innerHTML = formatDate(currently);
searchForm.addEventListener("submit", handleSubmit);
locationBtn.addEventListener("click", getPosition);





