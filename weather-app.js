const cityInput = document.querySelector('.city-input');
const searchBtn = document.querySelector('.search-btn');
const weatherResult = document.querySelector('.weather-result');

const weatherDescription =  {
    0: 'Clear sky',
    1: 'Mainly clear',
    2: 'Partly cloudy',
    3: 'Overcast',
    51: 'Light drizzle',
    61: 'Slight rain'
};



async function loadWeather () {
    try {
        const city = cityInput.value.trim()
         weatherResult.innerText = 'Loading...';
        const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}`);
        const data = await response.json();
            if (data.results === undefined) {
                weatherResult.innerText = 'City not found';
                return;
            }
            const name = data.results[0].name
            console.log(data);
           const latitude = data.results[0].latitude;
            const longitude = data.results[0].longitude;
          const weatherResponse =  await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code`)
          if (!weatherResponse.ok) {
            throw new Error('Weather request failed');
            }
           const weatherData = await weatherResponse.json();
           const description = weatherDescription[weatherData.current.weather_code];
           if (!description) {
             weatherResult.innerText = `${name}\n${weatherData.current.temperature_2m}°C`   
           } else {
            weatherResult.innerText = `${name}\n${weatherData.current.temperature_2m}°C\n${weatherDescription[weatherData.current.weather_code]}`  
           }
             
    } //the try backet ends here. 
   catch (error) {
    weatherResult.innerText = 'Something went wrong. Please try again.';
    console.log(error);
}
                
}


searchBtn.onclick = async () => {
     if (cityInput.value === '') {
                weatherResult.innerText = 'Please enter a city';
                return;
            }
  await loadWeather();
    
}