$(document).ready(function () {
  var APIkey = "e8835723679dd5fa30210dbd83917a83";

  // var temperature = Math.floor(results.main.temp)
  // (temp in Kelvin − 273.15) × 9/5 + 32 //formula for converting Kelvin to Farenheit

  var c = 1;

  $("#temp").text("hello");
  $("#wind").text("hello");
  $("#humidity").text("hello");

  $(".btn").on("click", function (event) {
    event.preventDefault();
    //   console.log("Form submitted");
    var city = $("#chosen-city").val();

    //This query checks the weather
    var queryURL =
      "http://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&appid=" +
      APIkey;

      //Store the searched cities in order to display them in the next section
      localStorage.setItem("City " + c, city);
      c++;

    // This query checks the forecast
    var queryURL2 =
      "http://api.openweathermap.org/data/2.5/forecast?q=" +
      city +
      "&appid=" +
      APIkey;

    fetch(queryURL)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
      });

    fetch(queryURL2)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
      });
  });
});
