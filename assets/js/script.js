$(document).ready(function () {
  var APIkey = "e8835723679dd5fa30210dbd83917a83";
  var todaysDate = dayjs().format('MMMM D, YYYY');
  var c = 1; // c is for "counter" (counts to add a number to each searched city in the local storage)

  function searchCity() {
    var city = $("#chosen-city").val();
    var key = "City " + c;

    // Check if the city already exists in the local storage
    for (var i = 1; i < c; i++) {
      if (localStorage.getItem("City " + i) === city) {
        // Update the existing key with the new value
        key = "City " + i;
        localStorage.setItem(key, city);
        break;
      }
    }

    // If the city does not exist in the local storage, add a new key-value pair
    if (!localStorage.getItem(key)) {
      localStorage.setItem(key, city);
      c++;
    }

    //This query checks the weather
    var queryURL =
      "http://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&appid=" +
      APIkey;

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

        // Clear previous search buttons
        $("#previous-searches").empty();

        // Add new search buttons for all cities in the local storage
        for (var i = 1; i < c; i++) {
          var previousCityButton = document.createElement('button');
          $('#previous-searches').append(previousCityButton);
          $(previousCityButton).text(localStorage.getItem("City " + i));
          previousCityButton.setAttribute("class", 'prev');
        }

        // Add event listeners to previous search buttons
        $(".prev").on("click", function(event) {
          $("#chosen-city").val($(this).text());
          searchCity();
        })

      });

    fetch(queryURL2)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
      });
  }

  $(".btn").on("click", function (event) {
    event.preventDefault();
    searchCity();
  });
});
