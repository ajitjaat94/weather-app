// Globel variable ........................................................................
let searchCity;
let data;



// Data GET to backend server .............................................................
async function getData(searchCity) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=beeb05d0f1d8eb7daf10cfda13ddebdc&units=metric`
    ); // GET is default
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    // Data store in console ..........................................................................
    data = await response.json();
    localStorage.setItem("weather", JSON.stringify(data));

    // // Print data in document web page .................................................................
    let main = data.weather[0].main;

    if (main === 'Haze') {
      document.getElementById("img-fist").innerHTML = "<img src='haze.png' alt='temp icon' width='150'>"
    }
    else if (main === "Mist") {
      document.getElementById("img-fist").innerHTML = "<img src='mist.png' alt='temp icon' width='150'>"
    }
    else if (main === "Clear") {
      document.getElementById("img-fist").innerHTML = "<img src='clear.png' alt='temp icon' width='150'>"
    }
    else if (main === "Smoke") {
      document.getElementById("img-fist").innerHTML = "<img src='smoke.png' alt='temp icon' width='150'>"
    }
    else {
      document.getElementById("img-fist").innerHTML = "<img src='clear.png' alt='temp icon' width='150'>"
    }
    // shhow data ....................................
    document.getElementById("weather_data").innerHTML =
      data.weather[0].description;
    document.getElementById("tempracture").innerHTML = data.main.temp + "°c";
    document.getElementById("city_name").innerHTML = data.name;
    document.getElementById("feels-like").innerHTML = data.main.feels_like + "°c " + "<img src='temperature-feels-like.svg' alt='temp icon' width='24'>";
    document.getElementById("humidity").innerHTML = "<img src='humidity.png' alt='temp icon' width='24'>" + data.main.humidity + "%";
    document.getElementById("wind").innerHTML = "<img src='wind.png' alt='temp icon' width='24'>" + data.wind.speed + "km/h";
    console.log(data); // check error use data......

    return data;
  } catch (error) {
    document.getElementById("error").innerHTML = error;
  }
}

// //Get data in locolstorage and show in document .....................................................
let dataSave = localStorage.getItem("weather");
let weatherData = JSON.parse(dataSave);

//LocalStorage  showing data  null data show massage search city  else  showing data in web page..........
if (!weatherData) {
  document.getElementById("error").innerHTML = "search city ";
} else {
  document.getElementById("weather_data").innerHTML =
    weatherData.weather[0].description;
  document.getElementById("tempracture").innerHTML = weatherData.main.temp + "℃";
  document.getElementById("city_name").innerHTML = weatherData.name;
  document.getElementById("feels-like").innerHTML = weatherData.main.feels_like + "°C " + "<img src='temperature-feels-like.svg' alt='temp icon' width='24'>";
  document.getElementById("humidity").innerHTML = "<img src='humidity.png' alt='temp icon' width='24'>" + weatherData.main.humidity + "%";
  document.getElementById("wind").innerHTML = "<img src='wind.png' alt='temp icon' width='24'>" + weatherData.wind.speed + "km/h";
}

// Button prass time call getData(); 
let btn = document.getElementById("btn-city").addEventListener("click", (e) => {
  //this line resate the error value store null clear 
  document.getElementById("error").innerHTML = " ";
  searchCity = document.getElementById("Search-city").value;
  getData(searchCity);
});
