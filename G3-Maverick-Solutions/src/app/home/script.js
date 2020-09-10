getJSON(
    "http://api.openweathermap.org/data/2.5/weather?q=Pretoria,za&APPID=d5d542a5b8d5fc3194d24db5d26529f9", 
function(data){
console.log(data);
var icon = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";

('.icon').attr('src',icon);
});