const express = require("express");
const app = express();
const weather = require("./backend/weather.js");
const steam = require("./backend/steam");
const epitech = require("./backend/epitech");
const pornhub = require("./backend/pornhub");
const horoscope = require("./backend/horoscope");
const mongo = require("./backend/mongo");
const editJsonFile = require("edit-json-file");
var bodyParser = require("body-parser");
const expressip = require("express-ip");
var expressLayouts = require("express-ejs-layouts");

configFile = editJsonFile("./config.json", {
    autosave: true
});

aboutFile = editJsonFile("./about.json", {
    autosave: true
});

app.set("view engine", "ejs");
app.use(expressLayouts);
app.use(express.static(__dirname));
app.use(expressip().getIpInfoMiddleware);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", async function(req, res) {
    var city = configFile.get("weather.city");
    var profile = configFile.get("steam.profile");
    var pornhubSearch = configFile.get("pornhub.search");
    var horoscopeSign = configFile.get("horoscope.sign");
    var epitechAuth = configFile.get("epitech.auth");
    weatherData = await weather.getWeather(city);
    epitechData = await epitech.getNotes(epitechAuth);
    try {
        steamData = await steam.getSteamInfo(profile);
    } catch (err) {
        steamData = null;
    }
    pornhubData = await pornhub.search(pornhubSearch);
    horoscopeData = await horoscope.getDaily(horoscopeSign);
    res.render("pages/dashboard", {
        layout: "layout",
        weatherData: weatherData,
        steamData: steamData,
        epitechData: epitechData,
        pornhubData: pornhubData.data,
        horoscopeData: horoscopeData
    });

    // epitech.getNotes(epitechAuth).then(epitechData => {
    //   steam.getSteamInfo(profile).then(tmp => {
    //     var steamData = Object;
    //     steamData.nick = tmp.nickname;
    //     steamData.real = tmp.realName;
    //     steamData.country = tmp.countryCode;
    //     steamData.lvl = tmp.level;
    //     steamData.nbrFriends = tmp.friends;
    //     steamData.img = tmp.avatar.medium;

    //     steamData.game_name_1 = tmp.games[0].name;
    //     steamData.game_img_1 = tmp.games[0].img;
    //     steamData.game_playTime_1 = tmp.games[0].playTime;
    //     steamData.game_name_2 = tmp.games[1].name;
    //     steamData.game_img_2 = tmp.games[1].img;
    //     steamData.game_playTime_2 = tmp.games[1].playTime;
    //     steamData.game_name_3 = tmp.games[2].name;
    //     steamData.game_img_3 = tmp.games[2].img;
    //     steamData.game_playTime_3 = tmp.games[2].playTime;

    //     steamData.mostPlayed_recent_name_1 = tmp.mostPlayed_recent[0].name;
    //     steamData.mostPlayed_recent_img_1 = tmp.mostPlayed_recent[0].img;
    //     steamData.mostPlayed_recent_playTime_1 = tmp.mostPlayed_recent[0].playTime;
    //     steamData.mostPlayed_recent_name_2 = tmp.mostPlayed_recent[1].name;
    //     steamData.mostPlayed_recent_img_2 = tmp.mostPlayed_recent[1].img;
    //     steamData.mostPlayed_recent_playTime_2 = tmp.mostPlayed_recent[1].playTime;
    //     steamData.mostPlayed_recent_name_3 = tmp.mostPlayed_recent[2].name;
    //     steamData.mostPlayed_recent_img_3 = tmp.mostPlayed_recent[2].img;
    //     steamData.mostPlayed_recent_playTime_3 = tmp.mostPlayed_recent[2].playTime;

    //     steamData.ownedGames_name_1 = tmp.allGames[0].name;
    //     steamData.ownedGames_img_1 = tmp.allGames[0].img;
    //     steamData.ownedGames_playTime_1 = tmp.allGames[0].playTime;
    //     steamData.ownedGames_name_2 = tmp.allGames[1].name;
    //     steamData.ownedGames_img_2 = tmp.allGames[1].img;
    //     steamData.ownedGames_playTime_2 = tmp.allGames[1].playTime;
    //     steamData.ownedGames_name_3 = tmp.allGames[2].name;
    //     steamData.ownedGames_img_3 = tmp.allGames[2].img;
    //     steamData.ownedGames_playTime_3 = tmp.allGames[2].playTime;

    //     steamData.gamingTime = tmp.gamingTime;
    //     steamData.totalGames = tmp.ownedGames;
    //     pornhub.search(pornhubSearch).then(pornhubData => {
    //       horoscope.getDaily(horoscopeSign).then(horoscopeData => {
    //         res.render("pages/dashboard", {
    //           layout: 'layout',
    //           weatherData: weatherData,
    //           steamData: steamData,
    //           epitechData: epitechData,
    //           pornhubData: pornhubData.data,
    //           horoscopeData: horoscopeData
    //         });
    //       })
    //     });
    //   });
    // });
    // });
});

app.get("/config", function(req, res) {
    var weatherCity = configFile.get("weather.city");
    var steamProfile = configFile.get("steam.profile");
    var pornhubSearch = configFile.get("pornhub.search");
    var horoscopeSign = configFile.get("horoscope.sign");
    var epitechAuth = configFile.get("epitech.auth");

    res.render("pages/config", {
        layout: "layoutMenu",
        weatherCity: weatherCity,
        steamProfile: steamProfile,
        pornhubSearch: pornhubSearch,
        horoscopeSign: horoscopeSign,
        epitechAuth: epitechAuth
    });
});

app.post("/submit_form", function(req, res) {
    var weatherCity = req.body.weatherCity,
        weatherShow = req.body.weatherShow == "on" ? true : false,
        steamProfile = req.body.steamProfile,
        pornhubSearch = req.body.pornhubSearch,
        horoscopeSign = req.body.horoscopeSign,
        epitechAuth = req.body.epitechAuth;

    configFile.set("weather", {
        city: weatherCity,
        show: weatherShow
    });
    configFile.set("steam", {
        profile: steamProfile
    });
    configFile.set("pornhub", {
        search: pornhubSearch
    });
    configFile.set("horoscope", {
        sign: horoscopeSign
    });
    configFile.set("epitech", {
        auth: epitechAuth
    });
    res.redirect("/");
});

app.get("/epitech", function(req, res) {
    epitech.getNotes().then(data => {
        console.log(data);
    });
});

app.get("/login", function(req, res) {
    res.render("pages/login", {
        layout: "layoutMenu",
        mail: configFile.get("user.mail"),
        mdp: configFile.get("user.mdp")
    });
});

app.post("/submit_login", function(req, res) {
    var mail = req.body.mail;
    var mdp = req.body.mdp;

    configFile.set("user", {
        mail: mail,
        mdp: mdp
    });

    res.redirect("/config");
});

app.get("/weather", function(req, res) {
    var city = configFile.get("weather.city");
    weather.getWeather(city).then(data => {
        var temp = data.main.temp;
        var city = data.name;
        res.render("pages/weather", { data: data });
    });
});

app.get("/Steam", function(req, res) {
    var profile = configFile.get("steam.profile");
    steam.getSteamInfo(profile).then(data => {
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

app.get("/mongo", function(req, res) {
    mongo.getUser();
});

app.listen(8080, function() {
    console.log("Example app listening on port 8080!");
});