 //trying to tie in the search button with the city search text area
 var citySearch;
 
 $(".search-btn").on("click", function(){
   citySearch = $("#searchbar").val();
 console.log(citySearch)


//made a variable with the API ID obtained from openweather app
var APIKey = "192cc9401e835e8072b8c75758d96a29";
//made a variable for the URL that we are going to get data from that combines the search parameters of 
//city typed above and our API key
var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + citySearch + "&appid=" + APIKey + "&current.uvi&units=imperial";
//using the built in browser fetch API
fetch(queryURL)
.then(function (response) {
    return response.json();
  })
  .then(function (data){
   
    console.log(data);
    console.log("the temp is " + data.main.temp + " Farenheight");
    console.log("the wind is " + data.wind.speed + " MPH");
    console.log("the humidity is " + data.main.humidity + "%");
    console.log(" the UV is " +data.uv);
    console.log(citySearch)
// making an object of the city info for local record keeping.  humidity
//is not being added atm because it is not returning from the search above
    var cityInfo ={
        name: citySearch.trim(),
        temp: data.main.temp,
        wind: data.wind.speed,
        humidity: data.main.humidity
        // uv: data.main.
    }
   
//now that the object is built I will add it to local storage:
    localStorage.setItem("cityInfo", JSON.stringify(cityInfo));
    renderInfo();
  })

   function renderInfo(){
    
    var date = moment().format('MMMM Do YYYY')
    var populateInfo = JSON.parse(localStorage.getItem("cityInfo"))
    var cityName = populateInfo.name + "    " + date
    var cityTemp = "The current temp is " + populateInfo.temp + " °F"
    var cityWind = "The current wind speed is " + populateInfo.wind + " MPH"
    var cityHumidity = "The current humidity is " + populateInfo.humidity + "%"
    // var cityUV = "the UV index is " + populateInfo. 
    // console.log(cityName)
    // console.log(populateInfo.name)

    $("#temp").text(cityTemp)
    $("#wind").text(cityWind)
    $("#humidity").text(cityHumidity)
    $("#name").text(cityName)
    // $("#uv").text(cityUV)

    
  
    // document.getElementById("temp").innerHTML =  "HTML"

   }
   
  })
 
 