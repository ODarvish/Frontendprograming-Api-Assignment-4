$(function () {
    key = "8ab9eef0fd362774dc2b8508f91068c6";
    let result = $(".message")
    let cityRef = $(".city")
    let errorMsg = $(".error")
    let error

    $(".search-box").click(function(event) {
    event.preventDefault();
    getWeatherInfo();
    })
    
    function getWeatherInfo() {
        let cityValue = cityRef.val();
        if (!cityValue.length) {
            errorMsg.text("Please enter a city name!").show()
            result.hide()
        } else {
            const API_WEATHER = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${key}&units=metric`
            fetch(API_WEATHER)
                .then((response) => {
                    if (!response.ok) {
                        console.log(response.status)
                        error = response.status
                        throw new Error()
                    } else {
                        return response.json()
                    }
                })
                
                .catch(Error => {
                    if (error == 404) errorMsg.text(" Can not find the city, error: " + error);
                    else errorMsg.text("Somthing went wrong, error: " + error);
                    errorMsg.show();
                })

                .then((data) => {
                        console.log(data);
                        errorMsg.hide()
                        result.show()
                        $(".name").text(data.name);
                        $(".weather").text(data.weather[0].description);
                        $(".weather-pic").attr("src", "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png");
                        $(".main-temp").text(data.main.temp + "° C ");
                        $(".title-min").text("min");
                        $(".temp-min").text(data.main.temp_min + "° C ")
                        $(".title-max").text("max");
                        $(".temp-max").text(data.main.temp_max + " ° C ")
                })

                .catch(() => {
                    errorMsg.show()
                    result.hide()
                })
        }
}

getWeatherInfo()
    
});


