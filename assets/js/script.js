var APIkey = "e8835723679dd5fa30210dbd83917a83";

var city = "austin"
var queryURL ="api.openweathermap.org/data/2.5/weather?q=austin&appid=e8835723679dd5fa30210dbd83917a83"

var queryURL2 = "http://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=e8835723679dd5fa30210dbd83917a83"
var showFetch = fetch(queryURL2);
console.log(showFetch);

