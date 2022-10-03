import {} from "dotenv/config";
import express from "express";
import fetch from "node-fetch";
import bodyParser from "body-parser";
import ejs from "ejs";
import https from "https";
import axios from "axios";
import ejsLint from "ejs-lint";
import _ from "lodash";
//const { NOTFOUND } = require("dns");
//const { isGeneratorFunction } = require("util/types");

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

var cities = ["kolkata"];

var units = ["metric"];
var bookmarks = [];

app.get("/", function (req, res) {
  var url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    cities[cities.length - 1] +
    "&units=" +
    units[units.length - 1] +
    "&appid=" +
    process.env.API_KEY1;

  const getMainData = async () => {
    let response = await fetch(url);

    if (response.status === 200) {
      return await response.json();
    } else {
      throw new Error("Something bad happened :(");
    }
  };

  getMainData()
    .then((weatherData) => {
     
      if (units[units.length - 1] == "metric") {
        var tUnit = "°C";
        var windspeedunit = "m/s";
        var unitType = "metric";
      } else {
        var tUnit = "°F";
        var windspeedunit = "mi/h";
        var unitType = "us";
      }

      var icon = weatherData.weather[0].icon;

      const tempM = weatherData.main.temp;
      const imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      const description = weatherData.weather[0].description.toUpperCase();
      const wind = weatherData.wind.speed;
      const hum = weatherData.main.humidity;
      const weather = weatherData.weather[0].main;
      const timeZone = weatherData.timezone;
      const timeZoneHour = Math.floor(timeZone / 3600);
      const timeZoneMinute = Math.floor((timeZone % 3600) / 60);
      const feelsLike = weatherData.main.feels_like;
      var cName = weatherData.name;
      var country = weatherData.sys.country;

      var longi = weatherData.coord.lon.toFixed(2);
      var lati = weatherData.coord.lat.toFixed(2);
      var latpos = "N";
      var lngpos = "E";

      if (lati < 0 && longi < 0) {
        lati = -lati;
        var latpos = "S";
        longi = -longi;
        var lngpos = "W";
      } else if (lati < 0) {
        lati = -lati;
        var latpos = "S";
      } else if (longi < 0) {
        longi = -longi;
        var lngpos = "W";
      }

      const link =
        "https://timezone.abstractapi.com/v1/current_time/?api_key=" +
        process.env.API_KEY2 +
        "&location=" +
        weatherData.name;

      const getpart1Data = async () => {
        let response = await fetch(link);

        if (response.status === 200) {
          return await response.json();
        } else {
          throw new Error("Something bad happened :(");
        }
      };

      getpart1Data()
        .then((response) => {
          var time = new Date(response.datetime);
          var timeHour = String(time.getHours()).padStart(2, "0");
          var timeMinute = String(time.getMinutes()).padStart(2, "0");
          var day = time.getDay();
          var date = time
            .toLocaleDateString("en-US", {
              date: "2-digit",
              month: "short",
              day: "numeric",
            })
            .toString();

          if (day == 0) {
            var Day = "Sun";
          } else if (day == 1) {
            var Day = "Mon";
          } else if (day == 2) {
            var Day = "Tue";
          } else if (day == 3) {
            var Day = "Wed";
          } else if (day == 4) {
            var Day = "Thu";
          } else if (day == 5) {
            var Day = "Fri";
          } else if (day == 6) {
            var Day = "Sat";
          }
          if (timeHour >= 5 && timeHour <= 17) {
            var img = "morning.jpg";
          } else {
            var img = "night.jpg";
          }
          if (weather == "Thunderstorm") {
            var wimg = "thunderstorm.jpg";
          } else if (weather == "Drizzle") {
            var wimg = "drizzle.jpg";
          } else if (weather == "Rain") {
            var wimg = "rain.jpg";
          } else if (weather == "Snow") {
            var wimg = "snow.jpg";
          } else if (weather == "Mist") {
            var wimg = "mist1.jpg";
          } else if (weather == "Haze") {
            var wimg = "haze.jpg";
          } else if (weather == "Clear") {
            var wimg = "clear.jpg";
          } else if (weather == "Clouds") {
            var wimg = "clouds.jpg";
          }
          const url2 =
            "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/" +
            weatherData.name +
            "?unitGroup=" +
            unitType +
            "&key=" +
            process.env.API_KEY3 +
            "&contentType=json";

          const getpart2Data = async () => {
            let response = await fetch(url2);

            if (response.status === 200) {
              return await response.json();
            } else {
              throw new Error("Something bad happened :(");
            }
          };

          getpart2Data()
            .then((json) => {
              var temp1 = json.days[0].hours[0].temp;
              var temp2 = json.days[0].hours[1].temp;
              var temp3 = json.days[0].hours[2].temp;
              var temp4 = json.days[0].hours[3].temp;
              var temp5 = json.days[0].hours[4].temp;
              var temp6 = json.days[0].hours[5].temp;
              var temp7 = json.days[0].hours[6].temp;
              var temp8 = json.days[0].hours[7].temp;
              var temp9 = json.days[0].hours[8].temp;
              var temp10 = json.days[0].hours[9].temp;
              var temp11 = json.days[0].hours[10].temp;
              var temp12 = json.days[0].hours[11].temp;
              var temp13 = json.days[0].hours[12].temp;
              var temp14 = json.days[0].hours[13].temp;
              var temp15 = json.days[0].hours[14].temp;
              var temp16 = json.days[0].hours[15].temp;
              var temp17 = json.days[0].hours[16].temp;
              var temp18 = json.days[0].hours[17].temp;
              var temp19 = json.days[0].hours[18].temp;
              var temp20 = json.days[0].hours[19].temp;
              var temp21 = json.days[0].hours[20].temp;
              var temp22 = json.days[0].hours[21].temp;
              var temp23 = json.days[0].hours[22].temp;
              var temp24 = json.days[0].hours[23].temp;

              var prec1 = json.days[0].hours[0].precipprob;
              var prec2 = json.days[0].hours[1].precipprob;
              var prec3 = json.days[0].hours[2].precipprob;
              var prec4 = json.days[0].hours[3].precipprob;
              var prec5 = json.days[0].hours[4].precipprob;
              var prec6 = json.days[0].hours[5].precipprob;
              var prec7 = json.days[0].hours[6].precipprob;
              var prec8 = json.days[0].hours[7].precipprob;
              var prec9 = json.days[0].hours[8].precipprob;
              var prec10 = json.days[0].hours[9].precipprob;
              var prec11 = json.days[0].hours[10].precipprob;
              var prec12 = json.days[0].hours[11].precipprob;
              var prec13 = json.days[0].hours[12].precipprob;
              var prec14 = json.days[0].hours[13].precipprob;
              var prec15 = json.days[0].hours[14].precipprob;
              var prec16 = json.days[0].hours[15].precipprob;
              var prec17 = json.days[0].hours[16].precipprob;
              var prec18 = json.days[0].hours[17].precipprob;
              var prec19 = json.days[0].hours[18].precipprob;
              var prec20 = json.days[0].hours[19].precipprob;
              var prec21 = json.days[0].hours[20].precipprob;
              var prec22 = json.days[0].hours[21].precipprob;
              var prec23 = json.days[0].hours[22].precipprob;
              var prec24 = json.days[0].hours[23].precipprob;

              var h1 = json.days[0].hours[0].icon;
              var h2 = json.days[0].hours[1].icon;
              var h3 = json.days[0].hours[2].icon;
              var h4 = json.days[0].hours[3].icon;
              var h5 = json.days[0].hours[4].icon;
              var h6 = json.days[0].hours[5].icon;
              var h7 = json.days[0].hours[6].icon;
              var h8 = json.days[0].hours[7].icon;
              var h9 = json.days[0].hours[8].icon;
              var h10 = json.days[0].hours[9].icon;
              var h11 = json.days[0].hours[10].icon;
              var h12 = json.days[0].hours[11].icon;
              var h13 = json.days[0].hours[12].icon;
              var h14 = json.days[0].hours[13].icon;
              var h15 = json.days[0].hours[14].icon;
              var h16 = json.days[0].hours[15].icon;
              var h17 = json.days[0].hours[16].icon;
              var h18 = json.days[0].hours[17].icon;
              var h19 = json.days[0].hours[18].icon;
              var h20 = json.days[0].hours[19].icon;
              var h21 = json.days[0].hours[20].icon;
              var h22 = json.days[0].hours[21].icon;
              var h23 = json.days[0].hours[22].icon;
              var h24 = json.days[0].hours[23].icon;

              if (h1 == "snow") {
                var h1img = "snow1.png";
              } else if (h1 == "rain") {
                var h1img = "rainy.png";
              } else if (h1 == "fog") {
                var h1img = "fog.png";
              } else if (h1 == "wind") {
                var h1img = "windy.jpg";
              } else if (h1 == "cloudy") {
                var h1img = "cloudy.jpg";
              } else if (h1 == "partly-cloudy-day") {
                var h1img = "partly-c-d.jpg";
              } else if (h1 == "partly-cloudy-night") {
                var h1img = "p-c-n.png";
              } else if (h1 == "clear-day") {
                var h1img = "clear day.png";
              } else if (h1 == "clear-night") {
                var h1img = "clear night.jpg";
              }

              if (h2 == "snow") {
                var h2img = "snow1.png";
              } else if (h2 == "rain") {
                var h2img = "rainy.png";
              } else if (h2 == "fog") {
                var h2img = "fog.png";
              } else if (h2 == "wind") {
                var h2img = "windy.jpg";
              } else if (h2 == "cloudy") {
                var h2img = "cloudy.jpg";
              } else if (h2 == "partly-cloudy-day") {
                var h2img = "partly-c-d.jpg";
              } else if (h2 == "partly-cloudy-night") {
                var h2img = "p-c-n.png";
              } else if (h2 == "clear-day") {
                var h2img = "clear day.png";
              } else if (h2 == "clear-night") {
                var h2img = "clear night.jpg";
              }

              if (h3 == "snow") {
                var h3img = "snow1.png";
              } else if (h3 == "rain") {
                var h3img = "rainy.png";
              } else if (h3 == "fog") {
                var h3img = "fog.png";
              } else if (h3 == "wind") {
                var h3img = "windy.jpg";
              } else if (h3 == "cloudy") {
                var h3img = "cloudy.jpg";
              } else if (h3 == "partly-cloudy-day") {
                var h3img = "partly-c-d.jpg";
              } else if (h3 == "partly-cloudy-night") {
                var h3img = "p-c-n.png";
              } else if (h3 == "clear-day") {
                var h3img = "clear day.png";
              } else if (h3 == "clear-night") {
                var h3img = "clear night.jpg";
              }

              if (h4 == "snow") {
                var h4img = "snow1.png";
              } else if (h4 == "rain") {
                var h4img = "rainy.png";
              } else if (h4 == "fog") {
                var h4img = "fog.png";
              } else if (h4 == "wind") {
                var h4img = "windy.jpg";
              } else if (h4 == "cloudy") {
                var h4img = "cloudy.jpg";
              } else if (h4 == "partly-cloudy-day") {
                var h4img = "partly-c-d.jpg";
              } else if (h4 == "partly-cloudy-night") {
                var h4img = "p-c-n.png";
              } else if (h4 == "clear-day") {
                var h4img = "clear day.png";
              } else if (h4 == "clear-night") {
                var h4img = "clear night.jpg";
              }

              if (h5 == "snow") {
                var h5img = "snow1.png";
              } else if (h5 == "rain") {
                var h5img = "rainy.png";
              } else if (h5 == "fog") {
                var h5img = "fog.png";
              } else if (h5 == "wind") {
                var h5img = "windy.jpg";
              } else if (h5 == "cloudy") {
                var h5img = "cloudy.jpg";
              } else if (h5 == "partly-cloudy-day") {
                var h5img = "partly-c-d.jpg";
              } else if (h5 == "partly-cloudy-night") {
                var h5img = "p-c-n.png";
              } else if (h5 == "clear-day") {
                var h5img = "clear day.png";
              } else if (h5 == "clear-night") {
                var h5img = "clear night.jpg";
              }

              if (h6 == "snow") {
                var h6img = "snow1.png";
              } else if (h6 == "rain") {
                var h6img = "rainy.png";
              } else if (h6 == "fog") {
                var h6img = "fog.png";
              } else if (h6 == "wind") {
                var h6img = "windy.jpg";
              } else if (h6 == "cloudy") {
                var h6img = "cloudy.jpg";
              } else if (h6 == "partly-cloudy-day") {
                var h6img = "partly-c-d.jpg";
              } else if (h6 == "partly-cloudy-night") {
                var h6img = "p-c-n.png";
              } else if (h6 == "clear-day") {
                var h6img = "clear day.png";
              } else if (h6 == "clear-night") {
                var h6img = "clear night.jpg";
              }

              if (h7 == "snow") {
                var h7img = "snow1.png";
              } else if (h7 == "rain") {
                var h7img = "rainy.png";
              } else if (h7 == "fog") {
                var h7img = "fog.png";
              } else if (h7 == "wind") {
                var h7img = "windy.jpg";
              } else if (h7 == "cloudy") {
                var h7img = "cloudy.jpg";
              } else if (h7 == "partly-cloudy-day") {
                var h7img = "partly-c-d.jpg";
              } else if (h7 == "partly-cloudy-night") {
                var h7img = "p-c-n.png";
              } else if (h7 == "clear-day") {
                var h7img = "clear day.png";
              } else if (h7 == "clear-night") {
                var h7img = "clear night.jpg";
              }

              if (h8 == "snow") {
                var h8img = "snow1.png";
              } else if (h8 == "rain") {
                var h8img = "rainy.png";
              } else if (h8 == "fog") {
                var h8img = "fog.png";
              } else if (h8 == "wind") {
                var h8img = "windy.jpg";
              } else if (h8 == "cloudy") {
                var h8img = "cloudy.jpg";
              } else if (h8 == "partly-cloudy-day") {
                var h8img = "partly-c-d.jpg";
              } else if (h8 == "partly-cloudy-night") {
                var h8img = "p-c-n.png";
              } else if (h8 == "clear-day") {
                var h8img = "clear day.png";
              } else if (h8 == "clear-night") {
                var h8img = "clear night.jpg";
              }

              if (h9 == "snow") {
                var h9img = "snow1.png";
              } else if (h9 == "rain") {
                var h9img = "rainy.png";
              } else if (h9 == "fog") {
                var h9img = "fog.png";
              } else if (h9 == "wind") {
                var h9img = "windy.jpg";
              } else if (h9 == "cloudy") {
                var h9img = "cloudy.jpg";
              } else if (h9 == "partly-cloudy-day") {
                var h9img = "partly-c-d.jpg";
              } else if (h9 == "partly-cloudy-night") {
                var h9img = "p-c-n.png";
              } else if (h9 == "clear-day") {
                var h9img = "clear day.png";
              } else if (h9 == "clear-night") {
                var h9img = "clear night.jpg";
              }

              if (h10 == "snow") {
                var h10img = "snow1.png";
              } else if (h10 == "rain") {
                var h10img = "rainy.png";
              } else if (h10 == "fog") {
                var h10img = "fog.png";
              } else if (h10 == "wind") {
                var h10img = "windy.jpg";
              } else if (h10 == "cloudy") {
                var h10img = "cloudy.jpg";
              } else if (h10 == "partly-cloudy-day") {
                var h10img = "partly-c-d.jpg";
              } else if (h10 == "partly-cloudy-night") {
                var h10img = "p-c-n.png";
              } else if (h10 == "clear-day") {
                var h10img = "clear day.png";
              } else if (h10 == "clear-night") {
                var h10img = "clear night.jpg";
              }

              if (h11 == "snow") {
                var h11img = "snow1.png";
              } else if (h11 == "rain") {
                var h11img = "rainy.png";
              } else if (h11 == "fog") {
                var h10img = "fog.png";
              } else if (h11 == "wind") {
                var h11img = "windy.jpg";
              } else if (h11 == "cloudy") {
                var h11img = "cloudy.jpg";
              } else if (h11 == "partly-cloudy-day") {
                var h11img = "partly-c-d.jpg";
              } else if (h11 == "partly-cloudy-night") {
                var h11img = "p-c-n.png";
              } else if (h11 == "clear-day") {
                var h11img = "clear day.png";
              } else if (h11 == "clear-night") {
                var h11img = "clear night.jpg";
              }

              if (h12 == "snow") {
                var h12img = "snow1.png";
              } else if (h12 == "rain") {
                var h12img = "rainy.png";
              } else if (h12 == "fog") {
                var h12img = "fog.png";
              } else if (h12 == "wind") {
                var h12img = "windy.jpg";
              } else if (h12 == "cloudy") {
                var h12img = "cloudy.jpg";
              } else if (h12 == "partly-cloudy-day") {
                var h12img = "partly-c-d.jpg";
              } else if (h12 == "partly-cloudy-night") {
                var h12img = "p-c-n.png";
              } else if (h12 == "clear-day") {
                var h12img = "clear day.png";
              } else if (h12 == "clear-night") {
                var h12img = "clear night.jpg";
              }

              if (h13 == "snow") {
                var h13img = "snow1.png";
              } else if (h13 == "rain") {
                var h13img = "rainy.png";
              } else if (h13 == "fog") {
                var h13img = "fog.png";
              } else if (h13 == "wind") {
                var h13img = "windy.jpg";
              } else if (h13 == "cloudy") {
                var h13img = "cloudy.jpg";
              } else if (h13 == "partly-cloudy-day") {
                var h13img = "partly-c-d.jpg";
              } else if (h13 == "partly-cloudy-night") {
                var h13img = "p-c-n.png";
              } else if (h13 == "clear-day") {
                var h13img = "clear day.png";
              } else if (h13 == "clear-night") {
                var h13img = "clear night.jpg";
              }

              if (h14 == "snow") {
                var h14img = "snow1.png";
              } else if (h14 == "rain") {
                var h14img = "rainy.png";
              } else if (h14 == "fog") {
                var h14img = "fog.png";
              } else if (h14 == "wind") {
                var h14img = "windy.jpg";
              } else if (h14 == "cloudy") {
                var h14img = "cloudy.jpg";
              } else if (h14 == "partly-cloudy-day") {
                var h14img = "partly-c-d.jpg";
              } else if (h14 == "partly-cloudy-night") {
                var h14img = "p-c-n.png";
              } else if (h14 == "clear-day") {
                var h14img = "clear day.png";
              } else if (h14 == "clear-night") {
                var h14img = "clear night.jpg";
              }

              if (h15 == "snow") {
                var h15img = "snow1.png";
              } else if (h15 == "rain") {
                var h15img = "rainy.png";
              } else if (h15 == "fog") {
                var h15img = "fog.png";
              } else if (h15 == "wind") {
                var h15img = "windy.jpg";
              } else if (h15 == "cloudy") {
                var h15img = "cloudy.jpg";
              } else if (h15 == "partly-cloudy-day") {
                var h15img = "partly-c-d.jpg";
              } else if (h15 == "partly-cloudy-night") {
                var h15img = "p-c-n.png";
              } else if (h15 == "clear-day") {
                var h15img = "clear day.png";
              } else if (h15 == "clear-night") {
                var h15img = "clear night.jpg";
              }

              if (h16 == "snow") {
                var h16img = "snow1.png";
              } else if (h16 == "rain") {
                var h16img = "rainy.png";
              } else if (h16 == "fog") {
                var h16img = "fog.png";
              } else if (h16 == "wind") {
                var h16img = "windy.jpg";
              } else if (h16 == "cloudy") {
                var h16img = "cloudy.jpg";
              } else if (h16 == "partly-cloudy-day") {
                var h16img = "partly-c-d.jpg";
              } else if (h16 == "partly-cloudy-night") {
                var h16img = "p-c-n.png";
              } else if (h16 == "clear-day") {
                var h16img = "clear day.png";
              } else if (h16 == "clear-night") {
                var h16img = "clear night.jpg";
              }

              if (h17 == "snow") {
                var h17img = "snow1.png";
              } else if (h17 == "rain") {
                var h17img = "rainy.png";
              } else if (h17 == "fog") {
                var h17img = "fog.png";
              } else if (h17 == "wind") {
                var h17img = "windy.jpg";
              } else if (h17 == "cloudy") {
                var h17img = "cloudy.jpg";
              } else if (h17 == "partly-cloudy-day") {
                var h17img = "partly-c-d.jpg";
              } else if (h17 == "partly-cloudy-night") {
                var h17img = "p-c-n.png";
              } else if (h17 == "clear-day") {
                var h17img = "clear day.png";
              } else if (h17 == "clear-night") {
                var h17img = "clear night.jpg";
              }

              if (h18 == "snow") {
                var h18img = "snow1.png";
              } else if (h18 == "rain") {
                var h18img = "rainy.png";
              } else if (h18 == "fog") {
                var h18img = "fog.png";
              } else if (h18 == "wind") {
                var h18img = "windy.jpg";
              } else if (h18 == "cloudy") {
                var h18img = "cloudy.jpg";
              } else if (h18 == "partly-cloudy-day") {
                var h18img = "partly-c-d.jpg";
              } else if (h18 == "partly-cloudy-night") {
                var h18img = "p-c-n.png";
              } else if (h18 == "clear-day") {
                var h18img = "clear day.png";
              } else if (h18 == "clear-night") {
                var h18img = "clear night.jpg";
              }

              if (h19 == "snow") {
                var h19img = "snow1.png";
              } else if (h19 == "rain") {
                var h19img = "rainy.png";
              } else if (h19 == "fog") {
                var h19img = "fog.png";
              } else if (h19 == "wind") {
                var h19img = "windy.jpg";
              } else if (h19 == "cloudy") {
                var h19img = "cloudy.jpg";
              } else if (h19 == "partly-cloudy-day") {
                var h19img = "partly-c-d.jpg";
              } else if (h19 == "partly-cloudy-night") {
                var h19img = "p-c-n.png";
              } else if (h19 == "clear-day") {
                var h19img = "clear day.png";
              } else if (h19 == "clear-night") {
                var h19img = "clear night.jpg";
              }

              if (h20 == "snow") {
                var h20img = "snow1.png";
              } else if (h20 == "rain") {
                var h20img = "rainy.png";
              } else if (h20 == "fog") {
                var h20img = "fog.png";
              } else if (h20 == "wind") {
                var h20img = "windy.jpg";
              } else if (h20 == "cloudy") {
                var h20img = "cloudy.jpg";
              } else if (h20 == "partly-cloudy-day") {
                var h20img = "partly-c-d.jpg";
              } else if (h20 == "partly-cloudy-night") {
                var h20img = "p-c-n.png";
              } else if (h20 == "clear-day") {
                var h20img = "clear day.png";
              } else if (h20 == "clear-night") {
                var h20img = "clear night.jpg";
              }

              if (h21 == "snow") {
                var h21img = "snow1.png";
              } else if (h21 == "rain") {
                var h21img = "rainy.png";
              } else if (h21 == "fog") {
                var h21img = "fog.png";
              } else if (h21 == "wind") {
                var h21img = "windy.jpg";
              } else if (h21 == "cloudy") {
                var h21img = "cloudy.jpg";
              } else if (h21 == "partly-cloudy-day") {
                var h21img = "partly-c-d.jpg";
              } else if (h21 == "partly-cloudy-night") {
                var h21img = "p-c-n.png";
              } else if (h21 == "clear-day") {
                var h21img = "clear day.png";
              } else if (h21 == "clear-night") {
                var h21img = "clear night.jpg";
              }

              if (h22 == "snow") {
                var h22img = "snow1.png";
              } else if (h22 == "rain") {
                var h22img = "rainy.png";
              } else if (h22 == "fog") {
                var h22img = "fog.png";
              } else if (h22 == "wind") {
                var h22img = "windy.jpg";
              } else if (h22 == "cloudy") {
                var h22img = "cloudy.jpg";
              } else if (h22 == "partly-cloudy-day") {
                var h22img = "partly-c-d.jpg";
              } else if (h22 == "partly-cloudy-night") {
                var h22img = "p-c-n.png";
              } else if (h22 == "clear-day") {
                var h22img = "clear day.png";
              } else if (h22 == "clear-night") {
                var h22img = "clear night.jpg";
              }

              if (h23 == "snow") {
                var h23img = "snow1.png";
              } else if (h23 == "rain") {
                var h23img = "rainy.png";
              } else if (h23 == "fog") {
                var h23img = "fog.png";
              } else if (h23 == "wind") {
                var h23img = "windy.jpg";
              } else if (h23 == "cloudy") {
                var h23img = "cloudy.jpg";
              } else if (h23 == "partly-cloudy-day") {
                var h23img = "partly-c-d.jpg";
              } else if (h23 == "partly-cloudy-night") {
                var h23img = "p-c-n.png";
              } else if (h23 == "clear-day") {
                var h23img = "clear day.png";
              } else if (h23 == "clear-night") {
                var h23img = "clear night.jpg";
              }

              if (h24 == "snow") {
                var h24img = "snow1.png";
              } else if (h24 == "rain") {
                var h24img = "rainy.png";
              } else if (h24 == "fog") {
                var h24img = "fog.png";
              } else if (h24 == "wind") {
                var h24img = "windy.jpg";
              } else if (h24 == "cloudy") {
                var h24img = "cloudy.jpg";
              } else if (h24 == "partly-cloudy-day") {
                var h24img = "partly-c-d.jpg";
              } else if (h24 == "partly-cloudy-night") {
                var h24img = "p-c-n.png";
              } else if (h24 == "clear-day") {
                var h24img = "clear day.png";
              } else if (h24 == "clear-night") {
                var h24img = "clear night.jpg";
              }

              var sunriseHr = json.days[0].sunrise.split(":")[0];
              var sunsetHr = json.days[0].sunset.split(":")[0];
              var sunSetRes =
                sunsetHr +
                ":" +
                json.days[0].sunset.split(":")[1] +
                ":" +
                json.days[0].sunset.split(":")[2] +
                " ";
              var sunRiseRes =
                sunriseHr +
                ":" +
                json.days[0].sunrise.split(":")[1] +
                ":" +
                json.days[0].sunrise.split(":")[2] +
                " ";
              res.render("index", {
                Url: imageUrl,
                temp: tempM,

                weatherDes: description,
                windSpeed: wind,
                humidity: hum,
                hour: timeHour,
                minute: timeMinute,
                tempUnit: tUnit,
                date: date,
                day: Day,
                cityname: cName,
                country: country,
                img: img,
                wImg: wimg,
                sunRise: sunRiseRes,
                sunSet: sunSetRes,
                windSpeedUnit: windspeedunit,
                lat: lati,
                lng: longi,
                tpos: latpos,
                npos: lngpos,
                fl: feelsLike,
                t1: temp1,
                t2: temp2,
                t3: temp3,
                t4: temp4,
                t5: temp5,
                t6: temp6,
                t7: temp7,
                t8: temp8,
                t9: temp9,
                t10: temp10,
                t11: temp11,
                t12: temp12,
                t13: temp13,
                t14: temp14,
                t15: temp15,
                t16: temp16,
                t17: temp17,
                t18: temp18,
                t19: temp19,
                t20: temp20,
                t21: temp21,
                t22: temp22,
                t23: temp23,
                t24: temp24,
                p1: prec1,
                p2: prec2,
                p3: prec3,
                p4: prec4,
                p5: prec5,
                p6: prec6,
                p7: prec7,
                p8: prec8,
                p9: prec9,
                p10: prec10,
                p11: prec11,
                p12: prec12,
                p13: prec13,
                p14: prec14,
                p15: prec15,
                p16: prec16,
                p17: prec17,
                p18: prec18,
                p19: prec19,
                p20: prec20,
                p21: prec21,
                p22: prec22,
                p23: prec23,
                p24: prec24,
                lists: bookmarks,
                bookCityname: bookmarks[bookmarks.length - 1],
                h1img: h1img,
                h2img: h2img,
                h3img: h3img,
                h4img: h4img,
                h5img: h5img,
                h6img: h6img,
                h7img: h7img,
                h8img: h8img,
                h9img: h9img,
                h10img: h10img,
                h11img: h11img,
                h12img: h12img,
                h13img: h13img,
                h14img: h14img,
                h15img: h15img,
                h16img: h16img,
                h17img: h17img,
                h18img: h18img,
                h19img: h19img,
                h20img: h20img,
                h21img: h21img,
                h22img: h22img,
                h23img: h23img,
                h24img: h24img,
              });
            })
            .catch((error) => {
              console.log(error.message);
            });
        })
        .catch((error) => {
          console.log(error.message);
        });
    })
    .catch((error) => {
      console.log(error.message);
    });
});

app.post("/", function (req, res) {
  var city = req.body.citySearch;
  cities.push(city);
  var unit = req.body.checkbox;
  units.push(unit);

  res.redirect("/");
});

app.get("/chart", function (req, res) {
  var urlc =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    cities[cities.length - 1] +
    "&units=" +
    units[units.length - 1] +
    "&appid=" +
    process.env.API_KEY1;

  const getData1 = async () => {
    let response = await fetch(urlc);

    if (response.status === 200) {
      return await response.json();
    } else {
      throw new Error("Something bad happened :(");
    }
  };

  getData1()
    .then((weatherData) => {
      var urlg =
        "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/" +
        weatherData.name +
        "?unitGroup=metric&key=" +
        process.env.API_KEY3 +
        "&contentType=json";

      const getData2 = async () => {
        let response = await fetch(urlg);

        if (response.status === 200) {
          return await response.json();
        } else {
          throw new Error("Something bad happened :(");
        }
      };

      getData2()
        .then((json) => {
          const graph = json.days;

          res.render("chart", {
            bigData: graph,
            titleName: json.resolvedAddress,
          })
        })
        .catch((error) => {
          console.log(error.message);
        })
    })
    .catch((error) => {
      console.log(error.message);
    })
});

app.get("/test", function (req, res) {
  if (bookmarks.length >= 8) {
    bookmarks.shift();
    bookmarks.push(cities[cities.length - 1]);
  } else {
    bookmarks.push(cities[cities.length - 1]);
  }

  res.redirect("/");
});

app.get("/:topic", function (req, res) {
  var bookCity = _.lowerCase(req.params.topic);

  cities.push(bookCity);
  res.redirect("/");
});

app.listen(process.env.PORT || 3000, function () {
  console.log("Server is running on port 3000...");
});
