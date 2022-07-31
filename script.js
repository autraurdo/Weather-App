let key = 'individual unique key';
let temperatureDescription = document.querySelector('.weather-description');
let temperatureDegree = document.querySelector(".degree");
let locationTimezone = document.querySelector(".location-timezone");
window.addEventListener('load', () => {
    let long;
    let lat;
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            const api = `http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&appid=${key}&units=metric`;
            fetch(api).then(Response => {
                return Response.json()
            }).then(data => {
                temperatureDegree.textContent = data.current.temp + ' C';
                locationTimezone.textContent = data.timezone;
                let locationIcon = document.querySelector('.weather-icon');
                const icon = data.current.weather[0].icon;
                locationIcon.innerHTML = `<img src="icons/${icon}.png">`;
                temperatureDescription.textContent = capitalizeFirstLetter(data.current.weather[0].description);
            });
        });
    }
});
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
document.querySelector('.search-button').addEventListener("click", function () {
    let city = document.querySelector('.search-bar').value;
    const apiCity = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${key}`;
    fetch(apiCity).then(Response => {
        return Response.json()
    }).then(data => {
        temperatureDegree.textContent = data.main.temp + ' C';
        locationTimezone.textContent = data.name;
        let locationIcon = document.querySelector('.weather-icon');
        const icon = data.weather[0].icon;
        locationIcon.innerHTML = `<img src="icons/${icon}.png">`;
        temperatureDescription.textContent = capitalizeFirstLetter(data.weather[0].description);
    });
});
document.querySelector('.search-bar').addEventListener("keyup", function (event) {
    let city = document.querySelector('.search-bar').value;
    if (event.key == "Enter") {
        const apiCity = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${key}`;
    fetch(apiCity).then(Response => {
        return Response.json()
    }).then(data => {
        temperatureDegree.textContent = data.main.temp + ' C';
        locationTimezone.textContent = data.name;
        let locationIcon = document.querySelector('.weather-icon');
        const icon = data.weather[0].icon;
        locationIcon.innerHTML = `<img src="icons/${icon}.png">`;
        temperatureDescription.textContent = capitalizeFirstLetter(data.weather[0].description);
    });
    }
});