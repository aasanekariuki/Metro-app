const API_KEY="c0f2c10c5e3ab9f222041e6621b7d837";
const cityInput=document.querySelector(".city-input");
const searchButton=document.querySelector(".search-btn")
const locationButton=document.querySelector(".location-btn")
const weathercardsDiv=document.querySelector(".Current-weather")
const currentweatherDiv=document.querySelector(".weather-cards")

const createweathercard= (cityName,weatherItem, index)=>{
    if(index === 0){
      return ` <div class="details">
          <h2>${cityName} (${weatherItem.dt_txt.split(" ")[0]})</h2>
          <h4>Temperature: ${(weatherItem.main.temp - 273.15).toFixed(2)}°C</h4>
          <h4>Wind:${weatherItem.wind.speed}M/S</h4>
          <h4>Humidity:${weatherItem.main.humidity}%</h4>
          
     </div>
     <div class="icon">
          <img src= "https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}@4x.png" alt="weather-icon">
          <h4>${weatherItem.weather[0].description}</h4>
     </div>`;
    }else{ 
     return `<li class="card">
                 <h2>(${weatherItem.dt_txt.split(" ")[0]})</h2>
                 <img src="https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}@2x.png" alt="weather-icon">
                 <h4>Temp: ${(weatherItem.main.temp - 273.15).toFixed(2)}°C</h4>
                 <h4>Wind:${weatherItem.wind.speed}M/S</h4>
                 <h4>Humidity:${weatherItem.main.humidity}%</h4>
             </li>`;
    }
} 