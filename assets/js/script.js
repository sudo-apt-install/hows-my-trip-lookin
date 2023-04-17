$(document).ready(function () {
  var APIkey = "e8835723679dd5fa30210dbd83917a83";

  var searchButton = "hello";

  $(".btn").on("click", function (event) {
    event.preventDefault();
    //   console.log("Form submitted");
    var city = $("#chosen-city").val();
    var queryURL =
      "http://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&appid=" +
      APIkey;

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
