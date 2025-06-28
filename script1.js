let select_city_f = document.querySelector("#select_city_f");
let select_day = document.querySelector("#select_day");
let forecast = document.querySelector("#box_forecast");
let btn_f = document.querySelector("#btn_f");
let API_KEY = "f1d3f5098b4148699a281517253105";
getForecast(select_city_f.value, select_day.value);

function getForecast(city, days) {
    let url = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=${days}&aqi=no&alerts=no`;
    fetch(url).then(async response => {
        if (response.status == 400) {
            forecast.innerHTML = null;
            forecast.innerHTML = `
                <p>City not found<p>
            `
        } else {
            let data = await response.json();
            const forecastDays = data.forecast.forecastday;
            console.log(data);
            forecast.innerHTML = "";
            data.forecast.forecastday.forEach(day => {
                let box = document.querySelector("#box_forecast");
                box.innerHTML += `
                    <div class="day">
                        <p>${formatDate(day.date)}</p>
                        <div class="hours" id="hours${day.date}"></div>
                    </div>`
                let hours = document.querySelector(`#hours${day.date}`)
                day.hour.forEach(hour => {
                    hours.innerHTML += `
                        <div class="hour detail" id="hour-${hour.time.split(" ")[1]} data-day="${day.date}" data-hour-index="${hour.time}">
                            <p>${hour.time.split(" ")[1]}<p>
                            <img src="https:${hour.condition.icon}" alt="">
                            <p>Temperature</p>
                            <p>${hour.temp_c}℃</p>
                        </div>
                        `

                })
            })
            document.querySelectorAll(".hour").forEach(block => {
                block.addEventListener("click", () => {
                    const day = block.getAttribute('data-day');
                    const hourIndex = +block.getAttribute('data-hour-index');
                    const dayData = forecastDays.find(d => d.date === day);
                    const hour = dayData.hour[hourIndex];
                    
                    let modal = document.querySelector("#myModal");
                    modal.innerHTML = `
                            <div class="modal-content">
                                <span class="close">&times;</span>
                                <p>${data.location.name}</p>
                                <img src="https://cdn.weatherapi.com/weather/64x64/day/176.png" alt="">
                                <p>${hour.time.split(" ")[1]}</p>
                                <div class="more_inf">
                                    <div class="item">Temp: ${hour.temp_c}℃</div>
                                    <div class="item">Fellshape: ${hour.feelslike_c}℃</div>
                                    <div class="item">Wind: ${hour.wind_kph}km/h</div>
                                    <div class="item">Humadity: ${hour.humidity}%</div>
                                    <div class="item">Pressure: ${hour.pressure_mb}mbaar</div>
                                    <div class="item">Clouds: ${hour.cloud}%<div>
                                </div>
                            </div>
                        `
                    modal.classList.remove("hide")
                })
            })
        }
    })
}

btn_f.addEventListener("click", () => {
    let city = document.querySelector("#search");
    let days = select_day.value;
    getForecast(city.value, days);
})

select_city_f.addEventListener("change", () => {
    let city = select_city_f.value;
    let days = select_day.value;
    getForecast(city, days)
})

select_day.addEventListener("change", () => {
    let city = select_city_f.value;
    let days = select_day.value;
    getForecast(city, days)
})

function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString(
        'uk-UA', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
    );
}

document.querySelector(".close").addEventListener("click", () => {
    document.querySelector("#myModal").classList.add("hide");
})