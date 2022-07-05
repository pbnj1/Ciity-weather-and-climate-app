var APIKey = "192cc9401e835e8072b8c75758d96a29"
var cityInfo;
var forecastInfo;
var forecastArr;




// function to fetch API info for current city weather data 
   function saveCityInfo(){

    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + citySearch + "&appid=" + APIKey + "&current.uvi&units=imperial";

        fetch(queryURL)
            .then(function (response) {
            return response.json();
        })
        .then(function (data){
            cityInfo ={
                name: citySearch.trim(),
                temp: data.main.temp,
                wind: data.wind.speed,
                humidity: data.main.humidity,
                lon: data.coord.lon,
                lat: data.coord.lat,
                icon: data.weather[0].icon
                // uv: data.main.
            }

            // console.log(data)
            // console.log(cityInfo.icon)
            // var citySearchName = cityInfo.name
            // console.log(citySearchName)
            // localStorage.setItem("citySearchName", citySearchName)
            localStorage.setItem("cityInfo", JSON.stringify(cityInfo));
            renderInfo();
            fiveDaysave();
          })
    }
       
//function to render the city weather data and display it on the screen
           function renderInfo(){
            
            var date = moment().format('MMMM Do YYYY')
            var populateInfo = JSON.parse(localStorage.getItem("cityInfo"));
            var cityName = populateInfo.name + "    " + date
            var cityTemp = "The current temp is " + populateInfo.temp + " °F"
            var cityWind = "The current wind speed is " + populateInfo.wind + " MPH"
            var cityHumidity = "The current humidity is " + populateInfo.humidity + "%"
            // var cityUV = "the UV index is " + populateInfo. 
           
            document.getElementById("temp").innerHTML = populateInfo.temp;
            // $("#temp").text(populateInfo.temp)
            $("#wind").text(cityWind)
            $("#humidity").text(cityHumidity)
            $("#name").text(cityName)
            // $("#uv").text(cityUV)
      

            //trying to create the search hx here...
            // var searchHxInput = localStorage.getItem("citySearchName")
           if(searchHX )
            var searchHX = [];
            searchHX.push($("#searchbar").val())
             localStorage.setItem("searchHX", searchHX)
            var searchRetrieve = localStorage.getItem("searchHX")
console.log(searchRetrieve)
console.log (searchHX)

// console.log(searchStore)
// console.log(searchHX.length)
// console.log(searchHxInput)
// currently creating 2 buttons for a city if it is the second value in the array.  3 if it is the third. 
            
var search1 = document.createElement('button')
                for( i = 0; i < searchHX.length; i++){
               
                $(search1).text(cityName)
                $(".search-hx").append(search1)
            }


            
           
            // searchHX.push(JSON.parse(localStorage.getItem(cityInfo)));
           
            // var search1 = document.createElement('button')
            // $(".search-hx").append(search1)
            // $(search1).text(cityName)
            // // console.log("this is the searchHX " + JSON.stringify(searchHX));
            // localStorage.setItem("searchHX", JSON.stringify(searchHX));
           
        
       
            $(search1).on("click", function(){

                renderForecastInfo();
                renderInfo;
                console.log("inside the search HX click function")
            })
       
        }

            // function imgRender(saveCityInfo){
            //     var imgURL = 
            // }


//function to save five day forecast information with lat and lon passed in from saveCityInfo function
           function fiveDaysave(saveCityInfo){
            // console.log(cityInfo.icon)
            var forecastURL = "http://api.openweathermap.org/data/2.5/forecast?lat=" + cityInfo.lat + "&lon=" + cityInfo.lon + "&appid=" + APIKey + "&current.uvi&units=imperial&cnt=5";
         
            fetch(forecastURL)
            .then(function (response) {
             return response.json();
         })
              .then(function (forecastData){
    
             forecastArr = forecastData.list

             var icon = (forecastArr[0].weather[0].icon)
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
        }

       
      localStorage.setItem("forecastInfo", JSON.stringify(forecastInfo));
     renderForecastInfo();
    })

}

 //renders the 5 day forecast information on the screen 
function renderForecastInfo(){

    var populateInfoF = JSON.parse(localStorage.getItem("forecastInfo"));
   
    $("#temp0").text("Projected temperature is " + populateInfoF.temp0+ " °F")
    $("#humidity0").text("Projected humidity is " + populateInfoF.humidity0 )
    $("#wind0").text("Projected wind speed is " + populateInfoF.wind0 + "MPH" )
 
    $("#temp1").text("Projected temperature is " + populateInfoF.temp1 + " °F")
    $("#humidity1").text("Projected humidity is " + populateInfoF.humidity1  )
    $("#wind1").text("Projected wind speed is " + populateInfoF.wind1 + "MPH" )

    $("#temp2").text("Projected temperature is " + populateInfoF.temp2 + " °F")
    $("#humidity2").text("Projected humidity is " + populateInfoF.humidity2 )
    $("#wind2").text("Projected wind speed is " + populateInfoF.wind2 + "MPH" )

    $("#temp3").text("Projected temperature is " + populateInfoF.temp3 + " °F")
    $("#humidity3").text("Projected humidity is " + populateInfoF.humidity3 )
    $("#wind3").text("Projected wind speed is " + populateInfoF.wind3 + "MPH" )

    $("#temp4").text("Projected temperature is " + populateInfoF.temp4 + " °F")
    $("#humidity4").text("Projected humidity is " + populateInfoF.humidity4 )
    $("#wind4").text("Projected wind speed is " + populateInfoF.wind4+ "MPH")

}

//displays the city weather and 5 day info on the screen after refresh 
renderInfo();
renderForecastInfo();


$(".search-btn").on("click", function(event){
    event.preventDefault();
     citySearch = $("#searchbar").val();


     saveCityInfo();
   })
