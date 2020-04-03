const express = require("express");
const app = express();
const weather = require("./backend/weather.js");
app.set("view engine", "ejs");

app.get("/", function(req, res) {
  weather.getWeather().then(data => {
    console.log("data => ", data);
    var temp = data.main.temp;
    var city = data.name;
    // res.send("OLALA il fait " + temp + " degré à " + city);
    res.render("test", { temp: temp });
  });
});

app.listen(3000, function() {
  console.log("Example app listening on port 3000!");
});
