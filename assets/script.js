const weather = document.createElement("section");

const API_KEY = "bfe0301590584158a68145001250310";

const locations = [ "Toronto", "New York", "Los Angeles", "Chicago", "Vancouver", "Mexico City", "São Paulo", "Santiago", "London", "Paris", "Berlin", "Rome", "Madrid", "Barcelona", "Cairo", "Istanbul", "Dubai", "Tokyo", "Osaka", "Fukuoka", "Seoul","Bangkok", "Sydney", "Melbourne", "Singapore", "Hong Kong", "Taipei", "Havana", "Banff"];

const randomCity = locations[Math.floor(Math.random() * locations.length)];

fetch(`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${randomCity}&days=1`)
  .then (response => response.json())
  .then (data => {
    weather.innerHTML = `
        <h2>${data.location.name} , ${data.location.country}</h2>
        
        <div class="select-box">
          <div class="empty">
            <input type="text" class="input" placeholder="Please select the location"></input>
            <i class="fa fa-chevron-down"></i>
          </div>
          <ul class="options-container  ">
            <li class="option">Toronto</li>
            <li class="option">New York</li> 
            <li class="option">Taipei</li>
            <li class="option">Barcelona</li>
            <li class="option">Istanbul</li>
            <li class="option">Havana</li>
          </ul>
        </div>


















        <p id=localTime>Local Time : ${data.location.localtime}</p>
      <div class="currentWeather">
        <div class="info">
          ${data.current.temp_c}°C
          <img class= "weatherIcon" src="https:${data.current.condition.icon}" alt="${data.current.condition.text}">
        </div>
        <div class="info">Feels like <br> ${data.current.feelslike_c}°C</div>
        <div class="info">Humidity <br> ${data.current.humidity}%</div>
        <div class="info">Wind <br> ${data.current.wind_kph} kph</div>
      </div>
        
    `;
  })
  .catch (error => console.log("Error!" + error));

  document.body.appendChild(weather);