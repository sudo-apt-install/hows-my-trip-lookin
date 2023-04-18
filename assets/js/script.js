$(document).ready(function () {
  var APIkey = "e8835723679dd5fa30210dbd83917a83";

  var todaysDate = dayjs().format('MMMM D, YYYY');

  var c = 1; // c is for "counter" (counts to add a number to each searched city in the local storage)

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
        var tempInKelvin = (data.main.temp);
        var temperature = parseFloat((tempInKelvin - 273.15) * 9/5 + 32); //formula for converting Kelvin to Farenheit
        temperature = temperature.toFixed(2);
        var humidity = (data.main.humidity);
        var wind = (data.wind.speed);

        $("#current-city").text(city + " " + todaysDate);
        $("#temp").text("Temp: " + temperature + "°F");
        $("#wind").text("Wind: " + wind + " MPH");
        $("#humidity").text("Humidity: " + humidity + "%");
        
        for (var i = 0; i < localStorage.length; i++){
          var previousCityButton = document.createElement('button');
          $(previousCityButton).text(localStorage.getItem(localStorage.key(i)));
        }
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
