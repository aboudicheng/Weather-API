var lat, long;
var api = "http://api.openweathermap.org/data/2.5/weather?";
var appid = "beeaf289d9cbe6bcaab2f08a8a2e0178";
var temp;



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
      $("#city").text(data.name + ", ");
      $("#country").text(data.sys.country);
      temp = data.main.temp - 273.15;
      $("#temp").text(temp);
      $("#load").text("");
      console.log("Success");
    }
  });
}