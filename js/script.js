const apiKey = "b8710c4b9529776a1d98e7d95d198ff5";
const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");

async function fetchWeather(city) {
    if (!city) return;
    
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);
    const data = await response.json();

    if (data.cod === "404") {
        alert("City not found");
        return;
    }

    document.getElementById("cityName").innerText = data.name;
    document.getElementById("temp").innerText = `${Math.round(data.main.temp)}°`;
    document.getElementById("condition").innerText = data.weather[0].description;
    document.getElementById("humidity").innerText = `${data.main.humidity}%`;
    document.getElementById("wind").innerText = `${data.wind.speed} km/h`;

    const iconCode = data.weather[0].icon;
    document.getElementById("weatherIcon").src = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
}

searchBtn.addEventListener("click", () => fetchWeather(cityInput.value));
cityInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") fetchWeather(cityInput.value);
});

window.onload = () => fetchWeather("Karachi");