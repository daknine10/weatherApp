import "./style.css"


const weatherContainer = document.querySelector(".weather-container")
const hoursContainer = document.querySelector(".hours")
const apiKey = "H2XHAPBX54GBKN9P427B5UBWM"

async function getWeather(city) {
    try {
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=${apiKey}&contentType=json`, {mode: 'cors'})
        const weatherData = await response.json();
        console.log(weatherData)
        let nextHours = []
        for (let hour of weatherData.days[0].hours) {
            nextHours.push({
                datetime: hour.datetime,
                temp: hour.temp,
                precipprob: hour.precipprob,
                icon: hour.icon
            })
        }
        let data = {
            city: weatherData.resolvedAddress,
            icon: weatherData.currentConditions.icon, 
            temp: Math.floor(weatherData.currentConditions.temp),
            humidity: weatherData.currentConditions.humidity,
            hours: nextHours
            }
        console.log(weatherData.days[0].hours)
        return data
    }
    catch (error) {
        return renderError()
    }
}

function renderError() {
    weatherContainer.textContent = "Bad API request"
}

async function renderWeather(apiCall) {
    const apiReturn = await apiCall

    const cityName = document.createElement("h2");
    cityName.textContent = apiReturn.city

    const icon = document.createElement("img")
    icon.src = `https://raw.githubusercontent.com/visualcrossing/WeatherIcons/58c79610addf3d4d91471abbb95b05e96fb43019/SVG/3rd%20Set%20-%20Color/${apiReturn.icon}.svg`

    const temperature = document.createElement("h3");
    temperature.textContent = 'Temperature: ' + apiReturn.temp + ' °C';

    const humidity = document.createElement("h4");
    humidity.textContent = apiReturn.humidity + '% Humidity';

    weatherContainer.append(cityName);
    weatherContainer.append(icon);
    weatherContainer.append(temperature);
    weatherContainer.append(humidity);
}

async function renderNextHours(apiCall) {
    const apiReturn = await apiCall
    console.log(apiReturn.hours)
    for (let hour of apiReturn.hours) {
        const hourCard = document.createElement("div");
        hourCard.className = "hour-card"
        const time = document.createElement("h3");
        const icon = document.createElement("img");
        const temp = document.createElement("h3");
        const precipprob = document.createElement("h4");

        time.textContent = hour.datetime;
        icon.src = `https://raw.githubusercontent.com/visualcrossing/WeatherIcons/58c79610addf3d4d91471abbb95b05e96fb43019/SVG/3rd%20Set%20-%20Color/${hour.icon}.svg`
        temp.textContent = hour.temp + ' °C';
        precipprob.textContent = 'Rain: ' + hour.precipprob + '%';
        
        hoursContainer.append(hourCard)
        hourCard.append(time)
        hourCard.append(icon)
        hourCard.append(temp)
        hourCard.append(precipprob)
    }
}

(function addInput() {
    const input = document.querySelector("#input")
    input.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            weatherContainer.textContent = ""
            hoursContainer.textContent = ""
            renderWeather(getWeather(`${input.value}`))
            renderNextHours(getWeather(`${input.value}`))
            input.value = ""
        }}
    )
})();