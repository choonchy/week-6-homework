const userCity = $("#cityInput")
const searchBtn = $("#searchBtn")
const apiKey = "b4ea4da592f2f1d7ec332acbe5fef32d"
localStorage.getItem('CurrentCity')
var currentCity = localStorage.getItem('CurrentCity')
var units = "metric"
var temp
var tempEl = $("#temp")
var wind
var windEl = $("#wind")
var humidity
var humidityEl = $("#humidity")
var uvIndex
var uvIndexEl = $("#uv")
var cityHeader = $("#city-header")
cityHeader.text(localStorage.getItem('CurrentCity'))
const cityHistory = $("#history")
var lat
var lon
var currentURL = "https://api.openweathermap.org/data/2.5/weather?q=" + currentCity + "&units=" + units + "&appid=" + apiKey 
var forecastURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=hourly,daily&appid=" + apiKey

currentWeatherData = function(url) {
    fetch(url)
    .then((response) => response.json())
    .then(function(response) {
        temp = response.main.temp + "°C"
        wind = response.wind.speed + "m/s"
        humidity = response.main.humidity + "%"
        tempEl.text("Temp: " + temp)
        windEl.text("Wind: " + wind)
        humidityEl.text("Humidity: " + humidity)
        console.log(response)
        console.log(temp)
        console.log(humidity)
        console.log(wind)
        lat = response.coord.lat
        lon = response.coord.lon
        console.log(lat, lon)
        forecastURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=hourly,daily&appid=" + apiKey
        forecastWeatherData(forecastURL)
    })
}

forecastWeatherData = function(url) {
    fetch(url)
    .then((response) => response.json())
    .then(function(response) {
        uvIndex = response.current.uvi
        uvIndexEl.text("UV Index: " + uvIndex)
    })
}

currentWeatherData(currentURL)

console.log(currentWeatherData)

searchBtn.click(function(){
    cityHistory.children().last().append("<p class=\"city-history\">" + localStorage.getItem('CurrentCity') + "</p>")
    localStorage.setItem('CurrentCity', userCity.val())
    currentCity = userCity.val()
    cityHeader.text(currentCity)

    currentURL = "https://api.openweathermap.org/data/2.5/weather?q=" + currentCity + "&units=" + units + "&appid=" + apiKey
    currentWeatherData(currentURL)
})