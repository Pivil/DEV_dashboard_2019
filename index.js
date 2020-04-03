const express = require("express");
const app = express();
const weather = require("./backend/weather.js");
const steam = require("./backend/steam");

app.set("view engine", "ejs");
app.use(express.static(__dirname));

app.get("/", function(req, res) {
  weather.getWeather().then(data => {
    console.log("data => ", data);
    var temp = data.main.temp;
    var city = data.name;
    res.render("pages/weather", { temp: temp, city: city });
  });
});

app.get("/Steam", function(req, res) {
  steam.getSteamInfo().then(data => {
    console.log("data => ", data);

    res.render("pages/steam", {
      nick: data.nickname,
      real: data.realName,
      country: data.countryCode,
      lvl: data.level,
      nbrFriends: data.friends,
      img: data.avatar.medium,
      game_name_1: data.games[0].name,
      game_img_1: data.games[0].img,
      game_name_2: data.games[1].name,
      game_img_2: data.games[1].img,
      game_name_3: data.games[2].name,
      game_img_3: data.games[2].img,
      totalGames: data.ownedGames
    });
  });
});

app.listen(3000, function() {
  console.log("Example app listening on port 3000!");
});
