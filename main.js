const api = {
    key: "00799a2411c9d3034ddb71bf848b6483",
    base: "https://api.openweathermap.org/data/2.5/"
}

// Press enter
const searchBar = document.querySelector('.search__bar');
searchBar.addEventListener('keypress', function(event){
    if (event.keyCode == 13) {
        getResult(searchBar.value);
    }
});

// Click on search button
const searchBtn = document.querySelector('.search__btn');
searchBtn.addEventListener('click', function(event){
    getResult(searchBar.value);
});

function getResult(query){
    fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
    .then(weather => {
        return weather.json();
    })
    .then(displayResult);
}

let now = new Date();
let date = document.querySelector('.weather__date');
date.innerText = findDate(now);

function displayResult(weather){

    // Change background
    document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + `${weather.name}` + "')";

    // Change city
    let city = document.querySelector('.weather__city');
    city.innerText = `Weather in ${weather.name}, ${weather.sys.country}`;

    // Change temperature
    let temp = document.querySelector('.weather__temp');
    temp.innerText = `${Math.round(weather.main.temp)}°C`;

    // Change icon weather
    let icon = document.querySelector('.weather__icon');
    icon.src = "http://openweathermap.org/img/wn/" + `${weather.weather[0].icon}` + "@2x.png";
    
    // Change description
    let description = document.querySelector('.weather__description');
    description.innerText = `${weather.weather[0].description}`;

    //Chang range temperature
    let rangeTemp = document.querySelector('.weather__low-hi');
    rangeTemp.innerText = `${Math.round(weather.main.temp_min)}°C - ${Math.round(weather.main.temp_max)}°C`;

    // Change humidity
    let humidity = document.querySelector('.weather__humidity');
    humidity.innerText = `Humidity: ${weather.main.humidity}%`;

    // Chang wind speed
    let windSpeed = document.querySelector('.weather__wind-speed');
    windSpeed.innerText = `Wind speed: ${weather.wind.speed} km/h`;

}




function findDate (d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
  
    return `${day} ${date} ${month} ${year}`;
  }