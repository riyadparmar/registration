function fetchWeather() {
    const city = document.getElementById('cityInput').value;
    const apiKey = '6f31b7a7ae5b20e0c4aab6248f92f09e';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const weather = `Weather in ${data.name}: ${data.weather[0].main}, Temperature: ${data.main.temp}°C`;
            document.getElementById('weatherResult').textContent = weather;
        })
        .catch(error => alert('Error fetching weather data: ' + error));
}

function fetchRandomGif() {
    const apiKey = '2Wf8IotRjoWnN2M9QhOxoxH1SlbluuX4';
    const url = `https://api.giphy.com/v1/gifs/random?api_key=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const gifUrl = data.data.images.original.url;
            document.getElementById('gifResult').innerHTML = `<img src="${gifUrl}" alt="Random Gif">`;
        })
        .catch(error => alert('Error fetching GIF: ' + error));
}
setInterval(fetchRandomGif, 120000);
fetchRandomGif();
