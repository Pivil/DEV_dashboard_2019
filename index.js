const express = require("express");
const app = express();
const weather = require("./backend/weather.js");
const steam = require("./backend/steam");
const editJsonFile = require("edit-json-file");


file = editJsonFile("./about.json", {
  autosave: true
});


app.set("view engine", "ejs");
app.use(express.static(__dirname));

app.get("/", function(req, res) {
  res.render("pages/home");
});

app.get("/weather", function(req, res) {
  var city = file.get("weather.city");
  weather.getWeather(city).then(data => {
    var temp = data.main.temp;
    var city = data.name;
    res.render("pages/weather", { data: data });
  });
});

app.get("/Steam", function(req, res) {
  steam.getSteamInfo().then(data => {
    console.log(data);
    res.render("pages/steam", {
      nick: data.nickname,
      real: data.realName,
      country: data.countryCode,
      lvl: data.level,
      nbrFriends: data.friends,
      img: data.avatar.medium,

      game_name_1: data.games[0].name,
      game_img_1: data.games[0].img,
      game_playTime_1: data.games[0].playTime,
      game_name_2: data.games[1].name,
      game_img_2: data.games[1].img,
      game_playTime_2: data.games[1].playTime,
      game_name_3: data.games[2].name,
      game_img_3: data.games[2].img,
      game_playTime_3: data.games[2].playTime,

      mostPlayed_recent_name_1: data.mostPlayed_recent[0].name,
      mostPlayed_recent_img_1: data.mostPlayed_recent[0].img,
      mostPlayed_recent_playTime_1: data.mostPlayed_recent[0].playTime,
      mostPlayed_recent_name_2: data.mostPlayed_recent[1].name,
      mostPlayed_recent_img_2: data.mostPlayed_recent[1].img,
      mostPlayed_recent_playTime_2: data.mostPlayed_recent[1].playTime,
      mostPlayed_recent_name_3: data.mostPlayed_recent[2].name,
      mostPlayed_recent_img_3: data.mostPlayed_recent[2].img,
      mostPlayed_recent_playTime_3: data.mostPlayed_recent[2].playTime,

      ownedGames_name_1: data.allGames[0].name,
      ownedGames_img_1: data.allGames[0].img,
      ownedGames_playTime_1: data.allGames[0].playTime,
      ownedGames_name_2: data.allGames[1].name,
      ownedGames_img_2: data.allGames[1].img,
      ownedGames_playTime_2: data.allGames[1].playTime,
      ownedGames_name_3: data.allGames[2].name,
      ownedGames_img_3: data.allGames[2].img,
      ownedGames_playTime_3: data.allGames[2].playTime,

      gamingTime: data.gamingTime,
      totalGames: data.ownedGames
    });
  });
});

app.listen(3000, function() {
  console.log("Example app listening on port 3000!");
});
