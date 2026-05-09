const apiKey = "b0dcda69ee437873b2bb2fc299022a05";

const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const modal = document.getElementById("modal")
async function fetchWeather(city) {
    if (!city) return;

    try {

        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
        );

        const data = await response.json();

        if (!response.ok) {
            showModal()
            return;
        }

        document.getElementById("cityName").innerText = data.name;
        document.getElementById("temp").innerText = `${Math.round(data.main.temp)}°`;
        document.getElementById("condition").innerText = data.weather[0].description;
        document.getElementById("humidity").innerText = `${data.main.humidity}%`;
        document.getElementById("wind").innerText = `${data.wind.speed} km/h`;

        const iconCode = data.weather[0].icon;
        document.getElementById("weatherIcon").src =
            `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

    } catch (error) {
        showModal();
    }
}

searchBtn.addEventListener("click", () => {
    fetchWeather(cityInput.value.trim());
});

cityInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        fetchWeather(cityInput.value.trim());
    }
});

function showModal() {
    if (modal) modal.classList.add("active");
}

function hideModal() {
    if (modal) modal.classList.remove("active");
}

window.onload = () => fetchWeather("Karachi");