var APIKey = "192cc9401e835e8072b8c75758d96a29";
var cityInfo;
var forecastInfo;
var forecastArr;
var searchRetrieve = JSON.parse(localStorage.getItem("searchHX"));
// var citySearch ="orlando";

//validation so that if there is already saved data then it will populate the array,
//if no saved data then the array will be empty
if (searchRetrieve) {
  var searchHX = searchRetrieve;
} else {
  var searchHX = [];
}

//initial search button that will begin to store city search into the array.
$(".search-btn").on("click", function (event) {
  event.preventDefault();
  citySearch = $("#searchbar").val();
  //do i need to do a searchHX.push(citySearch) here to try to get rid of my bug where
  //new users get a bunch of errors bc they dont have anything in local storage?
  localStorage.setItem("searchHX", JSON.stringify(searchHX));
  saveCityInfo();
  renderForecastInfo();
  cityValidation(citySearch);
});

//validation to check that the data that is passed into searchHX matches the data that is in there
//prevents multiple buttons from being created?
function cityValidation(city) {
  for (i = 0; i < searchHX.length; i++) {
    if (city === searchHX[i]) {
      return true;
    }
  }
  return false;
}

// function to fetch API info for current city weather data
function saveCityInfo() {
  var queryURL =
    "http://api.openweathermap.org/data/2.5/weather?q=" +
    citySearch +
    "&appid=" +
    APIKey +
    "&current.uvi&units=imperial";

  fetch(queryURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      cityInfo = {
        name: citySearch.trim(),
        temp: data.main.temp,
        wind: data.wind.speed,
        humidity: data.main.humidity,
        lon: data.coord.lon,
        lat: data.coord.lat,
        icon: data.weather[0].icon,
        // uv: data.main.
      };

      localStorage.setItem("cityInfo", JSON.stringify(cityInfo));
      renderInfo();
      fiveDaysave();
    });
}

//function to render the city weather data and display it on the screen
function renderInfo() {
  var date = moment().format("MMMM Do YYYY");
  var populateInfo = JSON.parse(localStorage.getItem("cityInfo"));
  var cityName = populateInfo.name + "    " + date;
  var cityTemp = "The current temp is " + populateInfo.temp + " °F";
  var cityWind = "The current wind speed is " + populateInfo.wind + " MPH";
  var cityHumidity = "The current humidity is " + populateInfo.humidity + "%";
  // var cityUV = "the UV index is " + populateInfo.

  document.getElementById("temp").innerHTML = populateInfo.temp;
  $("#temp").text(cityTemp);
  $("#wind").text(cityWind);
  $("#humidity").text(cityHumidity);
  $("#name").text(cityName);
  // $("#uv").text(cityUV)

  searchHxRender(cityName);
}

//this function creates the buttons.  I might need to go in and change what is pushed into 
//searchHX to only include the value put into the search bar, not the cityName data to help fix
//my bug of new user searches
function searchHxRender(cityName) {
  $(".search-hx").empty();
  searchHX.push(cityName);
  // searchHX.push($("#searchbar").val())
  console.log(searchHX);

  // var search1 = document.createElement('button')
  for (let i = 0; i < searchHX.length; i++) {
    var search1 = document.createElement("button");
    $(search1).text(searchHX[i]);
    $(search1).attr("style", "width: 200px; margin: 5px; border-radius:10px; background-color: rgb(119, 119, 245); color: white; ")
    $(".search-hx").append(search1);
  }
  //trying to set up a click function so that clicking on the searchHX will take that info and put it 
  //back in the search input area
  
  $(search1).on("click", function () {
  
    $("#searchbar").text("yes");
    renderForecastInfo();
    renderInfo;
    console.log("inside the search HX click function");
  });
}

//function to save five day forecast information with lat and lon passed in from saveCityInfo function
function fiveDaysave(saveCityInfo) {
  var forecastURL =
    "http://api.openweathermap.org/data/2.5/forecast?lat=" +
    cityInfo.lat +
    "&lon=" +
    cityInfo.lon +
    "&appid=" +
    APIKey +
    "&current.uvi&units=imperial&cnt=20";

  fetch(forecastURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (forecastData) {
      forecastArr = forecastData.list;

      var icon0 = forecastArr[0].weather[0].icon;
      var icon1 = forecastArr[1].weather[0].icon;
      var icon2 = forecastArr[2].weather[0].icon;
      var icon3 = forecastArr[3].weather[0].icon;
      var icon4 = forecastArr[4].weather[0].icon;
     
      document.getElementById("img0").src =
        "http://openweathermap.org/img/wn/" + icon0 + "@2x.png";
      document.getElementById("img1").src =
        "http://openweathermap.org/img/wn/" + icon1 + "@2x.png";
      document.getElementById("img2").src =
        "http://openweathermap.org/img/wn/" + icon2 + "@2x.png";
      document.getElementById("img3").src =
        "http://openweathermap.org/img/wn/" + icon3 + "@2x.png";
      document.getElementById("img4").src =
        "http://openweathermap.org/img/wn/" + icon4 + "@2x.png";

      forecastInfo = {
        temp0: forecastArr[0].main.temp,
        humidity0: forecastArr[0].main.humidity,
        wind0: forecastArr[0].wind.speed,

        temp1: forecastArr[1].main.temp,
        humidity1: forecastArr[1].main.humidity,
        wind1: forecastArr[1].wind.speed,

        temp2: forecastArr[2].main.temp,
        humidity2: forecastArr[2].main.humidity,
        wind2: forecastArr[2].wind.speed,

        temp3: forecastArr[3].main.temp,
        humidity3: forecastArr[3].main.humidity,
        wind3: forecastArr[3].wind.speed,

        temp4: forecastArr[4].main.temp,
        humidity4: forecastArr[4].main.humidity,
        wind4: forecastArr[4].wind.speed,
      };
     
      localStorage.setItem("forecastInfo", JSON.stringify(forecastInfo));
      renderForecastInfo();
    });
}

//renders the 5 day forecast information on the screen
function renderForecastInfo() {
  var populateInfoF = JSON.parse(localStorage.getItem("forecastInfo"));

  $("#temp0").text("Projected temperature is " + populateInfoF.temp0 + " °F");
  $("#humidity0").text("Projected humidity is " + populateInfoF.humidity0);
  $("#wind0").text("Projected wind speed is " + populateInfoF.wind0 + "MPH");

  $("#temp1").text("Projected temperature is " + populateInfoF.temp1 + " °F");
  $("#humidity1").text("Projected humidity is " + populateInfoF.humidity1);
  $("#wind1").text("Projected wind speed is " + populateInfoF.wind1 + "MPH");

  $("#temp2").text("Projected temperature is " + populateInfoF.temp2 + " °F");
  $("#humidity2").text("Projected humidity is " + populateInfoF.humidity2);
  $("#wind2").text("Projected wind speed is " + populateInfoF.wind2 + "MPH");

  $("#temp3").text("Projected temperature is " + populateInfoF.temp3 + " °F");
  $("#humidity3").text("Projected humidity is " + populateInfoF.humidity3);
  $("#wind3").text("Projected wind speed is " + populateInfoF.wind3 + "MPH");

  $("#temp4").text("Projected temperature is " + populateInfoF.temp4 + " °F");
  $("#humidity4").text("Projected humidity is " + populateInfoF.humidity4);
  $("#wind4").text("Projected wind speed is " + populateInfoF.wind4 + "MPH");
}

//displays the city weather and 5 day info on the screen after refresh
renderInfo();
renderForecastInfo();
