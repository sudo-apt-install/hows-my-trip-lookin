$(document).ready(function () {
  var APIkey = "e8835723679dd5fa30210dbd83917a83";

  var todaysDate = dayjs().format('MMMM D, YYYY');

  var c = 1; // c is for "counter" (counts to add a number to each searched city in the local storage)

  function searchCity(city) {
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
        var temperature = parseFloat((tempInKelvin - 273.15) * 9 / 5 + 32); //formula for converting Kelvin to Farenheit
        temperature = temperature.toFixed(2);
        var humidity = (data.main.humidity);
        var wind = (data.wind.speed);

        $("#current-city").text(city + " " + todaysDate);
        $("#temp").text("Temp: " + temperature + "°F");
        $("#wind").text("Wind: " + wind + " MPH");
        $("#humidity").text("Humidity: " + humidity + "%");

        $('#previous-searches').empty();

        for (var i = 0; i < localStorage.length; i++) {
          var previousCityButton = document.createElement('button');
          $('#previous-searches').append(previousCityButton);
          $(previousCityButton).text(localStorage.getItem(localStorage.key(i)));
          previousCityButton.setAttribute("class", 'prev');

          // attach click event listener to the newly created button
          $(previousCityButton).on("click", function (event) {
            var previousCity = $(this).text();
            searchCity(previousCity);
          });
        }
      });

    fetch(queryURL2)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
      });
  }

  function checkLocalStorage(city) {
    // Check if city is already in local storage
    for (var i = 0; i < localStorage.length; i++) {
      if (localStorage.getItem(localStorage.key(i)) === city) {
        return true;
      }
    }
    return false;
  }

  $(".btn").on("click", function (event) {
    event.preventDefault();
    var city = $("#chosen-city").val();
    if (checkLocalStorage(city)) {
      alert("City already searched!");
    } else {
      searchCity(city);
    }
  });
});
