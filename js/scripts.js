var lat, long;
var api = "https://api.openweathermap.org/data/2.5/weather?";
var appid = "beeaf289d9cbe6bcaab2f08a8a2e0178";
var temp;
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
  
})

function getWeather(lat, long) {
  var urlStr = api + "lat=" + lat + "&lon=" + long + "&appid=" + appid;
  $.ajax({
    method: "GET",
    url: urlStr,
    success: function(data) {
      //get local city and country name
      $("#city").text(data.name + ", ");
      $("#country").text(data.sys.country);

      //temperature initially converts from Kelvin to Celsius
      temp = data.main.temp - 273.15;
      

      //change unit when clicked
      if (unit === "°C") {
        $("#unit").on('click', () => {
          unit = "°F";
          temp = temp * 9 / 5 + 32;
        });
      }
      else {
        $("#unit").on('click', () => {
          unit = "°C";
          temp = (temp - 32) * 5 / 9;
        });
      }

      $("#temp").text(temp);
      $("#unit").text(unit);
      $("#load").text("");
      console.log("Success");
    }
  });
}