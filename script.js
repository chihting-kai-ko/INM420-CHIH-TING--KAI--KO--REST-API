const weather = document.createElement("section");

const API_KEY = "bfe0301590584158a68145001250310";

const locations = [
  "Toronto", "New York","Barcelona",  "Istanbul", "Taipei","Havana",
];

// FETCH WEATHER DATA FROM API (CHAT GPT SUGGEST I USE "FUNCTION")
function fetchWeather(city) {
  fetch(`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=1`)
    .then(response => response.json())
    .then(data => {
      weather.innerHTML = `
        <h2>Weather in ${data.location.name}, ${data.location.country}</h2>
        <div class="select-box">
          <div class="empty">
            <input type="text" class="input" placeholder="Please select the location"></input>
          </div>
          <ul class="options-container">
            <li class="option">Toronto</li>
            <li class="option">New York</li> 
            <li class="option">Taipei</li>
            <li class="option">Barcelona</li>
            <li class="option">Istanbul</li>
            <li class="option">Havana</li>
          </ul>
        </div>
        <p id="localTime">Local Time: ${data.location.localtime}</p>
        <div class="currentWeather">
          <div class="info">
            ${data.current.temp_c}°C
            <img class="weatherIcon" src="https:${data.current.condition.icon}" alt="${data.current.condition.text}">
          </div>
          <div class="info">Feels like <br> ${data.current.feelslike_c}°C</div>
          <div class="info">Humidity <br> ${data.current.humidity}%</div>
          <div class="info">Wind <br> ${data.current.wind_kph} kph</div>
        </div>
      `;

      // DROPDOWN MENU FUNCTIONALITY
      const input = weather.querySelector(".input");
      const optionsContainer = weather.querySelector(".options-container");

      input.onfocus = () => optionsContainer.classList.add("active");
      input.onblur = () => setTimeout(() => optionsContainer.classList.remove("active"), 200);

      const options = weather.querySelectorAll(".option");
      options.forEach(item => {
        item.onclick = () => {
          input.placeholder = item.innerText;
          fetchWeather(item.innerText);
        };
      });
    })
    .catch(error => console.log("Error: " + error));
}

// REFRESH
fetchWeather(locations[Math.floor(Math.random() * locations.length)]);
document.body.appendChild(weather);
