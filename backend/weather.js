const fetch = require('node-fetch');


let apiKey = "69a10b11621c334b6e837f8c77f5419f";
let city = 'Lyon';
let url = 'http://api.openweathermap.org/data/2.5/weather?q='+ city + '&appid=' + apiKey + '&units=metric';

async function getWeather() {
    return new Promise(function(resolve, reject) {
        fetch(url, {
            method: "GET",
            headers: { 'Content-Type': 'application/json' },
        })
        .then(res => res.json())
        .then(json => {
            resolve(json);
        });
    });
}


module.exports = {
    getWeather: getWeather
}

