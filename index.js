const express = require("express");
const app = express();
const weather = require("./backend/weather.js");
const steam = require("./backend/steam");
const editJsonFile = require("edit-json-file");
var bodyParser = require("body-parser");


file = editJsonFile("./about.json", {
  autosave: true
});


app.set("view engine", "ejs");
app.use(express.static(__dirname));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", function(req, res) {
  var weatherShow = file.get("weather.show");
    if (weatherShow == true) {
      var weatherData = weather.getWeather(file.get("weather.city"));
    } else {
      weatherData == null;
    }

  res.render("pages/home", { weatherData: weatherData});
});

app.get("/config", function(req, res) {
  var weatherCity = file.get("weather.city");
  var steamProfile = file.get("steam.profile");



  res.render("pages/config", {
    weatherCity: weatherCity,
    steamProfile: steamProfile
  });
});

app.post("/submit_form", function(req, res) {
  console.log(req.body);
  var weatherCity = req.body.weatherCity,
    weatherShow = req.body.weatherShow == 'on' ? true : false,
    steamProfile = req.body.steamProfile;
  file.set("weather", {
    city: weatherCity,
    show: weatherShow
  })
  file.set("steam", {
    profile: steamProfile
  })
  res.redirect("/config");
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
  var profile = file.get("steam.profile");
  steam.getSteamInfo(profile).then(data => {
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

app.listen(8080, function() {
  console.log("Example app listening on port 8080!");
});
