const searchBoxElement = document.querySelector("#locationInputData");
const searchButton = document.querySelector(".searchButton");
const weatherDataContainerElement=document.querySelector(".weatherData");
const weatherIcon = document.querySelector("#weatherImage");
const tempratureData = document.querySelector("#tempratureData");
const locationData = document.querySelector("#locationData");
const humidityData = document.querySelector("#humidityData");
const windSpeedData = document.querySelector("#windSpeedData");

const apiKey = "27ec3c955023f7c067e6fcfde410be41";



searchButton.addEventListener("click", (searchButtonClickEvent) => {
    var location = searchBoxElement.value;
    if (location === " " || !isNaN(location)) {
        alert("Please Enter a Valid Location!");
    }
    else {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`)
            .then((response) => {
                return response.json();
            })
            .then((weatherData) => {
                updatedata(weatherData);
            })
            .catch((error) => {
                alert("Please Enter a Valid Location!");
                window.location.reload();
            })
    }
})

function updatedata(weatherData) {
    weatherDataContainerElement.style.display="block";
    updateWeatherIcon(weatherData);
    updateWeatherData(weatherData);
}

function updateWeatherIcon(weatherData) {
    let weatherDescrption = weatherData.weather[0].description;
    console.log(weatherDescrption);
    if (weatherDescrption == "clear") {
        weatherIcon.src = "images/clear.png";
    }
    else if (weatherDescrption == "drizzle") {
        weatherIcon.src = "images/drizzle.png";
    }
    else if (weatherDescrption == "rain") {
        weatherIcon.src = "images/rain.png";
    }
    else if (weatherDescrption == "snow") {
        weatherIcon.src = "images/snow.png";
    }
    else if (weatherDescrption == "overcast clouds") {
        weatherIcon.src = "images/clouds.png";
    }
    else if (weatherDescrption == "haze") {
        weatherIcon.src = "images/mist.png";
    }
}

function updateWeatherData(weatherData){ 
    tempratureData.innerText = `${Math.round(weatherData.main.temp)}℃`;
    locationData.innerText = `${weatherData.name}`;
    humidityData.innerText = `${weatherData.main.humidity}`;
    windSpeedData.innerText = `${weatherData.wind.speed} `;
}