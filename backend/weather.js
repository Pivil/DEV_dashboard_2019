const fetch = require("node-fetch");


async function getWeather(city) {
  return new Promise(function(resolve, reject) {
    let apiKey = "69a10b11621c334b6e837f8c77f5419f";
    let url =
      "http://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&appid=" +
      apiKey +
      "&units=metric";
    fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    })
      .then(res => res.json())
      .then(json => {
        // console.log(json);
        resolve(json);
      });
  });
}

module.exports = {
  getWeather: getWeather
};
