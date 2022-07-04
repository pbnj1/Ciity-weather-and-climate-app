var APIKey = "192cc9401e835e8072b8c75758d96a29"
var cityInfo;
var forecastInfo;
var forecastArr;


$(".search-btn").on("click", function(){
    event.preventDefault();
     citySearch = $("#searchbar").val();
     saveCityInfo();
   })


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
                lat: data.coord.lat
                // uv: data.main.
            }
            localStorage.setItem("cityInfo", JSON.stringify(cityInfo));
            renderInfo();
            fiveDaysave();
           
            
        })
    }
        

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
            
           }
   
   

          

     

           function fiveDaysave(saveCityInfo,){

            var forecastURL = "http://api.openweathermap.org/data/2.5/forecast?lat=" + cityInfo.lat + "&lon=" + cityInfo.lon + "&appid=" + APIKey + "&current.uvi&units=imperial&cnt=5";
            fetch(forecastURL)
            .then(function (response) {
             return response.json();
         })
              .then(function (forecastData){
            
             forecastArr = forecastData.list

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



  

renderInfo();
renderForecastInfo();



