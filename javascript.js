
const apiKey = "04bc23ebae4540ad97425836232208"
const baseUrl = "http://api.weatherapi.com/v1/current.json?key=" + apiKey;

//define html elements
const lastUpdate = document.querySelector("#last-updated");
const icon = document.querySelector("#icon");
const temp = document.querySelector("#temp");
const feels = document.querySelector("#feels-like");
const wind = document.querySelector("#wind-speed");
const precip = document.querySelector("#precip");
const humidity = document.querySelector("#humid");
const body = document.querySelector("body");

async function getWeatherData(zip) {
    const weather = await fetch(baseUrl + "&q=" + zip);
    const json = await weather.json();
    return json;
}

function formatWeatherObject(weatherJson){
    const weatherObject = {};
    weatherObject.temperatureC = weatherJson.current.temp_c;
    weatherObject.temperatureF = weatherJson.current.temp_f;
    weatherObject.feelsLikeC = weatherJson.current.feelslike_c;
    weatherObject.feelsLikeF = weatherJson.current.feelslike_f;
    weatherObject.isDay = weatherJson.current.is_day;
    weatherObject.windSpeed = weatherJson.current.wind_mph;
    weatherObject.precipitation = weatherJson.current.precip_in;
    weatherObject.humidity = weatherJson.current.humidity;
    weatherObject.lastUpdated = weatherJson.current.last_updated;
    weatherObject.icon = weatherJson.current.condition.icon;
    return weatherObject;
}

function updateCard(weatherObject){
    lastUpdate.textContent = "Last Updated " + weatherObject.lastUpdated;
    icon.src = weatherObject.icon;
    temp.textContent = weatherObject.temperatureF + "˚F"
    feels.textContent = "Feels like " + weatherObject.feelsLikeF + "˚";
    wind.textContent = "Wind speed: " + weatherObject.windSpeed + "mph";
    precip.textContent = "Precipitation: " + weatherObject.precipitation + " in";
    humidity.textContent = "Humidity: " + weatherObject.humidity + "%";

    if(weatherObject.isDay){
        body.setAttribute("style", "background-color: lightblue;");
    }else {
        body.setAttribute("style", "background-color: #2F2F2F;");
    }
}

const form = document.getElementById("form");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const zip = document.querySelector("#zipcode").value;
    getWeatherData(zip).then(function(json){
        const obj = formatWeatherObject(json);
        updateCard(obj);
    });
});




