document.getElementById('getWeatherBtn').addEventListener('click', function() {
    const city = document.getElementById('city').value.trim();
    if (city === "") {
        displayError("Please enter a city name.");
        return;
    }

    const apiKey = 'ded09b015c50459893873006242112'; // Replace with your actual API key
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                displayError("City not found. Please try again.");
            } else {
                displayWeather(data);
            }
        })
        .catch(err => {
            displayError("An error occurred. Please try again later.");
        });
});

function displayWeather(data) {
    const weatherInfo = document.getElementById('weatherInfo');
    const errorElement = document.getElementById('error');

    // Clear previous error message
    errorElement.textContent = "";

    const { name, region, country } = data.location;
    const { temp_c, condition } = data.current;

    weatherInfo.innerHTML = `
        <p><strong>City:</strong> ${name}, ${region}, ${country}</p>
        <p><strong>Temperature:</strong> ${temp_c}°C</p>
        <p><strong>Condition:</strong> ${condition.text}</p>
    `;
}

function displayError(message) {
    const weatherInfo = document.getElementById('weatherInfo');
    const errorElement = document.getElementById('error');

    weatherInfo.innerHTML = ""; // Clear previous weather info
    errorElement.textContent = message;
}
