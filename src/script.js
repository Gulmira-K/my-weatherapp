// Default city
searchCity("barcelona");

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
  if (response.data.weather[0].main === "Clear") {
    document.querySelector("#icon").setAttribute("src", "media/sun.gif");
  } else if (response.data.weather[0].main === "Drizzle" ||
    response.data.weather[0].main === "Mist" || 
    response.data.weather[0].main === "Smoke" ||
    response.data.weather[0].main === "Haze") {
    document.querySelector("#icon").setAttribute("src", "media/cloud.gif");
  } else if (response.data.weather[0].main === "Clouds") {
    document.querySelector("#icon").setAttribute("src", "media/sunCloud.gif");
  } else if (response.data.weather[0].main === "Thunderstorm") {
    document.querySelector("#icon").setAttribute("src", "media/thunder.png");
  } else if (response.data.weather[0].main === "Rain") {
    document.querySelector("#icon").setAttribute("src", "media/rain.gif");
  } else if (response.data.weather[0].main === "Snow") {
    document.querySelector("#icon").setAttribute("src", "media/snow.gif");
  }
}

// Search for a city
function searchCity(city) {
  let apiKey = "3d2ad3624a972543a23fa163db444044";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

let searchForm = document.querySelector("form");
searchForm.addEventListener("submit", handleSubmit);

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
let locationBtn = document.querySelector("#location-btn");
locationBtn.addEventListener("click", getPosition);

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

let currently = new Date();
let h2 = document.querySelector("h2");
h2.innerHTML = formatDate(currently);

// Change to hourly forecast
function removeDate(allDates) {
  allDates.innerHTML = null;
} 
function changeToHourly() {
  let firstHourlyForecast = document.querySelector("#day-one");
  let secondHourlyForecast = document.querySelector("#day-two");
  let thirdHourlyForecast = document.querySelector("#day-three");
  let fourthHourlyForecast = document.querySelector("#day-four");
  let fifthHourlyForecast = document.querySelector("#day-five");
  let dates = document.querySelectorAll("p.date");

  firstHourlyForecast.innerHTML = "17:00";
  secondHourlyForecast.innerHTML = "18:00";
  thirdHourlyForecast.innerHTML = "19:00";
  fourthHourlyForecast.innerHTML = "20:00";
  fifthHourlyForecast.innerHTML = "21:00";

  dates.forEach(removeDate);
}

let hourlyButton = document.querySelector("#hourly-btn");
hourlyButton.addEventListener("click", changeToHourly);

// Change to daily forecast
function addDate(allDates) {
  allDates.innerHTML = "Nov 25";
} 
function changeToDaily() {
  let firstDailyForecast = document.querySelector("#day-one");
  let secondDailyForecast = document.querySelector("#day-two");
  let thirdDailyForecast = document.querySelector("#day-three");
  let fourthDailyForecast = document.querySelector("#day-four");
  let fifthDailyForecast = document.querySelector("#day-five");
 
  firstDailyForecast.innerHTML = "Thursday";
  secondDailyForecast.innerHTML = "Friday";
  thirdDailyForecast.innerHTML = "Saturday";
  fourthDailyForecast.innerHTML = "Sunday";
  fifthDailyForecast.innerHTML = "Monday";

  dates.forEach(addDate);
}
let dates = document.querySelectorAll("p.date");
let dailyButton = document.querySelector("#daily-btn");
dailyButton.addEventListener("click", changeToDaily);
dates.forEach(addDate);


