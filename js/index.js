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
const getWeatherDetails=(cityName,lat,lon)=>{
    const WEATHER_API_URL=`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`

    fetch(WEATHER_API_URL).then(res=>res.json()).then(data=>{
        
    
        const uniqueForcastDays=[];
        const fiveDaysForecast= data.list.filter(forecast=> {
        const forecastDate=new Date(forecast.dt_txt).getDate();
        if(!uniqueForcastDays.includes(forecastDate)){
            return uniqueForcastDays.push(forecastDate);
        }
        });

        
        cityInput.value="";
        weathercardsDiv.innerHTML="";
        currentweatherDiv.innerHTML="";

        
        fiveDaysForecast.forEach((weatheritem,index )=> {

        if(index===0){
            weathercardsDiv.insertAdjacentHTML("beforeend",createweathercard(cityName,weatheritem,index));
        }else{
            weathercardsDiv.insertAdjacentHTML("beforeend",createweathercard(cityName,weatheritem,index));
        }
            
             });
    })  .catch(()=>{
            alert("An error occured while fetching the weather forecast!")
        })
    
}
const getcitycoordinates=()=>{
    const cityName=cityInput.value.trim();
    if(!cityName)return;
    const GEOCODING_API_URL=`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=${API_KEY}`;

    
    fetch(GEOCODING_API_URL).then(res=>res.json()).then(data=>{
        if(!data.length)return alert(`No coordinates found for${cityName}`);
        const {name,lat,lon}=data[0]
        getWeatherDetails(name,lat,lon);
    }).catch(()=>{
        alert("An error occured while fetching the coordinates")
    })
}
const getusercoordinates=()=>{
    navigator.geolocation.getCurrentPosition(
        position=>{
            const {latitude,longitude}=position.coords;
            const REVERSE_GEOCODING_URL=`http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${API_KEY}`
           
            fetch(REVERSE_GEOCODING_URL).then(res=>res.json()).then(data=>{
                const {name}=data[0]
                getWeatherDetails(name,latitude,longitude);
            }).catch(()=>{
                alert("An error occured while fetching the city!")
            });
        },
        error=>{
            if (error.code===error.PERMISSION_DENIED){
                alert("Geolocation request denied.please reset location permission to grant access again.")

            }
        }
    )
}