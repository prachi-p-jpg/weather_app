// 🔹 Select elements
let input = document.querySelector("#input");
let button = document.querySelector("#button");

let icon = document.querySelector(".screen1 i");
let temp = document.querySelector("#temperature");
let condition = document.querySelector("#condition");

let feel = document.querySelector(".feel");
let humidity = document.querySelector(".humidity");
let wind = document.querySelector(".wind");



// 🔹 Button click
button.addEventListener("click", function () {
    let city = input.value.trim();

    if (city === "") {
        alert("Enter city name");
        return;
    }

    getWeather(city);
});

// 🔹 Fetch weather data
async function getWeather(city) {
    let apiKey = "8ea8abe3cd18923fd9295ecf8887a4db";

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        let response = await fetch(url);
        let data = await response.json();

        console.log(data);

        // ❌ If city not found
        if (data.cod === "404") {
            alert("City not found");
            return;
        }

        // ✅ Save city + data in localStorage
        localStorage.setItem("city", city);
        localStorage.setItem("weatherData", JSON.stringify(data));

        updateUI(data);

    } catch (error) {
        console.log("Error:", error);
    }
}

// 🔹 Update UI
function updateUI(data) {
    temp.innerText = data.main.temp + "°C";
    condition.innerText = data.weather[0].main;

    feel.innerText = "Feels like: " + data.main.feels_like + "°C";
    humidity.innerText = "Humidity: " + data.main.humidity + "%";
    wind.innerText = "Wind Speed: " + data.wind.speed + " km/h";

    updateIcon(data.weather[0].main);
}

// 🔹 Change icon dynamically
function updateIcon(weather) {
    weather = weather.toLowerCase();

    if (weather.includes("cloud")) {
        icon.className = "fa-solid fa-cloud";
    } 
    else if (weather.includes("rain")) {
        icon.className = "fa-solid fa-cloud-rain";
    } 
    else if (weather.includes("clear")) {
        icon.className = "fa-solid fa-sun";
    } 
    else if (weather.includes("haze") || weather.includes("mist")) {
        icon.className = "fa-solid fa-smog";
    } 
    else {
        icon.className = "fa-solid fa-cloud";
    }
}

// 🔹 Load saved data on refresh
window.addEventListener("load", function () {

    let savedCity = localStorage.getItem("city");

    if (savedCity) {
        getWeather(savedCity); // fetch fresh data
    }

    // Optional: instant UI (without waiting API)
    let savedData = localStorage.getItem("weatherData");

    if (savedData) {
        let data = JSON.parse(savedData);
        updateUI(data);
    }
});

// 🔹 Press Enter to search
input.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        button.click();
    }
});