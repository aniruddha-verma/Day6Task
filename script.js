const API_KEY = "4e7fb388c25bd0f391f1cb217e173f91";
const API_URL = "https://api.openweathermap.org/data/2.5/weather";  


const cityInput = document.getElementById("cityInput");
const searchButton = document.getElementById("searchButton");
const climateInfo = document.getElementById("climateInfo");


const HOT_URL = "https://images.unsplash.com/photo-1504370805625-d32c54b16100?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aG90JTIwd2VhdGhlcnxlbnwwfHwwfHx8MA%3D%3D";
const COLD_URL = "https://images.unsplash.com/photo-1734290261674-a67538f96f12?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzl8fGNvbGQlMjB3ZWF0aGVyfGVufDB8fDB8fHww";
const RAIN_URL = "https://images.unsplash.com/photo-1493314894560-5c412a56c17c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjIwfHxyYWlueSUyMHdlYXRoZXJ8ZW58MHx8MHx8fDA%3D";


async function fetchClimate() {
    const city = cityInput.value.trim(); // Get user input and remove extra spaces

    if (city === "") {
        climateInfo.innerHTML = "<p style='color: red;'>Please enter a city name.</p>";
        return;
    }

    try {

        const response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
        
        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();

        
        climateInfo.innerHTML = `
            <h3>${data.name}</h3>
            <img src=${data.main.humidity} > 80 ? ${RAIN_URL} : ${data.main.temp} > 25 ? ${HOT_URL} : ${COLD_URL} alt=""Images">
            <p>Temperature: ${data.main.temp}°C</p>
            <p>Feels Like: ${data.main.feels_like}°C</p>
            <p>Humidity: ${data.main.humidity}%</p>
            <p>Weather: ${data.weather[0].main}</p>
        `;
    } catch (error) {
        climateInfo.innerHTML = `<p style='color: red;'>${error.message}</p>`;
    }
}

searchButton.addEventListener("click", fetchClimate);
