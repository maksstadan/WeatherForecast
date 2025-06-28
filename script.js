let select_city = document.querySelector("#select_city");
let btn = document.querySelector("#btn");
let API_KEY = "f1d3f5098b4148699a281517253105";
let infDOM = document.querySelector(".inf")
let body = document.querySelector("body");
getWeather(select_city.value)

function getWeather(city) {
    let url = `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no`;
    fetch(url).then(async response => {
        if (response.status == 400) {
            infDOM.innerHTML = null;
            infDOM.innerHTML = `
                <p>City not found<p>
            `
        } else {
            let data = await response.json();
            console.log(data);

            infDOM.innerHTML = null;
            infDOM.innerHTML = `
                <p id="city" class = "detail">City: ${data.location.name}</p>
                <p id="country" class = "detail">Country: ${data.location.country}</p> 
                <img src="https:${data.current.condition.icon}" alt="" id="icon"  class = "detail">
                <p id="temp"  class = "detail">Temperature: ${data.current.temp_c}°C</p>
                <p id="temp"  class = "detail">Wind: ${data.current.wind_kph}km/h</p>
                <p id="cloud" class = "detail">Clouds: ${data.current.cloud}%</p>
                <p id="humanity" class = "detail">Humidity: ${data.current.humidity}%</p>
            `
            if(data.current.temp_c <= 0) {
                body.style.background = "linear-gradient(90deg, #efd5ff 0%, #515ada 100%)"
            } else if(data.current.temp_c > 0 && data.current.temp_c <= 15) {
                 body.style.background = "linear-gradient(90deg, #e3ffe7 0%, #d9e7ff 100%)"
            } else if(data.current.temp_c > 15 && data.current.temp_c <= 25) {
                body.style.background = "linear-gradient(90deg, #f8ff00 0%, #3ad59f 100%)"
            } else if(data.current.temp_c > 25) {
                body.style.background = "linear-gradient(90deg, #fcff9e 0%, #c67700 100%)"
            } 
        }
    })
}

select_city.addEventListener("change", () => {
    let city = select_city.value;
    getWeather(city);
})

btn.addEventListener("click", () => {
    let inp = document.querySelector("#search");
    getWeather(inp.value)
})