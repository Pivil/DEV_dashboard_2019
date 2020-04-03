const express = require("express");
const app = express();
const weather = require("./backend/weather.js");
const steam = require("./backend/steam");

app.set("view engine", "ejs");
app.use(express.static(__dirname));

app.get("/", function (req, res) {
  res.render("templates/home");
});

app.get("/weather", function (req, res) {
  weather.getWeather().then(data => {
    console.log("data => ", data);
    var temp = data.main.temp;
    var city = data.name;
    res.render("weather", { temp: temp, city: city });
  });
});

app.get("/Steam", function (req, res) {
  steam.getSteamInfo().then(data => {
    console.log("data => ", data);
    var nick = data.nickname;
    var real = data.realName;
    var country = data.countryCode;
    var lvl = data.level;
    var nbrFriends = 0;
    data.friends.map((value, index) => {
      nbrFriends++;
    })
    res.render("steam", { nick: nick, real: real, country: country, lvl: lvl, nbrFriends: nbrFriends });
  });
});

app.listen(3000, function () {
  console.log("Example app listening on port 3000!");
});
