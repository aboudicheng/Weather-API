var lat, long;
var api = "https://api.openweathermap.org/data/2.5/weather?";
var appid = "beeaf289d9cbe6bcaab2f08a8a2e0178";
var temp, minTemp, maxTemp;
var unit = "°C";



$(document).ready(function(){
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      lat = position.coords.latitude;
      long = position.coords.longitude;
      getWeather(lat, long);
    });
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
        //change unit when clicked
        $("#unit").click(function () {
          var currentUnit = $("#unit").text();
          var newUnit = currentUnit === "°C" ? "°F" : "°C";

          //click animation
          $("#temperature").fadeOut(0);
          $("#temperature").fadeIn(500);

          $("#unit").text(newUnit);
          $(".munit").text(newUnit);

          //convert to Fahrenheit
          var newTemp, newMin, newMax;
          if (newUnit === "°F") {
            newTemp = Math.round(parseInt($("#temp").text()) * 9 / 5 + 32);
            newMin = Math.round(parseInt($("#min").text()) * 9 / 5 + 32);
            newMax = Math.round(parseInt($("#max").text()) * 9 / 5 + 32);
          }

          //convert back to Celsius
          else {
            newTemp = temp;
            newMin = minTemp;
            newMax = maxTemp;
          }

          $("#temp").text(newTemp);
          $("#min").text(newMin);
          $("#max").text(newMax);
          $("#weatherGIF").hide();

        });


      })

function getWeather(lat, long) {
  var urlStr = api + "lat=" + lat + "&lon=" + long + "&appid=" + appid;
  var weatherGIF;
  $.ajax({
    method: "GET",
    url: urlStr,
    success: function(data) {
      //get local city and country name
      $("#city").text(data.name + ", ");
      $("#country").text(data.sys.country);

      //temperature initially converts from Kelvin to Celsius
      temp = Math.round(data.main.temp - 273.15);
      minTemp = Math.round(data.main.temp_min - 273.15);
      maxTemp = Math.round(data.main.temp_max - 273.15);

      $("#temp").text(temp);
      $("#min").text(minTemp);
      $(".backslash").text("/");
      $("#max").text(maxTemp);
      $("#unit").text(unit);
      $(".munit").text(unit);
      $("#load").text("");
      $("#humidity").text("Humidity: " + data.main.humidity + "%");

      switch (data.weather[0].main) {
        case "Clear":
        weatherGIF = "sunny.gif";
        break;
        case "Clouds":
        weatherGIF = "cloudy.gif";
        break;
        case "Thunderstorm":
        weatherGIF = "rainy.gif";
      }
      $("#weathergif").prepend('<img src="img/' + weatherGIF + '" height="100" width="100" />');
      console.log("Success");
    }
  });
}