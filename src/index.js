import "./style.css"



const apiKey = "H2XHAPBX54GBKN9P427B5UBWM"

async function getWeather(city) {
    try {
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=${apiKey}&contentType=json`, {mode: 'cors'})
        const weatherData = await response.json();
        console.log(weatherData)
        let data = [weatherData.resolvedAddress, weatherData.currentConditions.icon, Math.floor(weatherData.currentConditions.temp), weatherData.currentConditions.humidity]
        return data
    }
    catch (error) {
        return console.log("API request unsuccessful")
    }
}

async function renderWeather(apiCall) {
    const apiReturn = await apiCall
    const container = document.querySelector(".container")
    console.log(apiReturn)

    const cityName = document.createElement("h2");
    cityName.textContent = apiReturn[0]

    const icon = document.createElement("img")
    icon.src = `https://raw.githubusercontent.com/visualcrossing/WeatherIcons/58c79610addf3d4d91471abbb95b05e96fb43019/SVG/3rd%20Set%20-%20Color/${apiReturn[1]}.svg`

    const temperature = document.createElement("h3");
    temperature.textContent = apiReturn[2] + ' °C';

    const humidity = document.createElement("h4");
    humidity.textContent = apiReturn[3] + '% Humidity';

    container.append(cityName);
    container.append(icon);
    container.append(temperature);
    container.append(humidity);
}

renderWeather(getWeather("Wien"))