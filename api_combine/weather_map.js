/**
 * Created by Robin on 3/2/2016.
 */

(function () {

    var forecastContainer = document.getElementById('weather-data'),
        mapProperties = {
            center: new google.maps.LatLng(52.23, 5),
            zoom: 7,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            streetViewControl: false,
            mapTypeControl: false,
            draggable: false,
            zoomControl: false,
            scrollwheel: false,
            disableDoubleClickZoom: true

        },
        map,
        oldMarker;


    // Google Map Initializer
    function init() {

        map = new google.maps.Map(document.getElementById("map"), mapProperties);

        google.maps.event.addListener(map, 'click', function (e) {
            placeMarker(e.latLng);
            showWeatherIcon({
                lat: e.latLng.lat(),
                lon: e.latLng.lng()
            });
        });
    }

    google.maps.event.addDomListener(window, 'load', init);

    var weather = new Weather();

    function placeMarker(location) {
        if (oldMarker) {
            oldMarker.setMap(null);
        }
        var marker = new google.maps.Marker({
            position: location,
            map: map
        });
        oldMarker = marker;
    }

    function showWeatherIcon(latLon) {
        var result = weather.getForecastByLatLon(latLon);
        forecastContainer.style.display = "flex";
        while(forecastContainer.firstChild) {
            forecastContainer.removeChild(forecastContainer.firstChild);
        }
        for (var i in result) {
            console.log(result[i]);
            var element = document.createElement("div"),
                img = document.createElement("img"),
                dateLabel = document.createElement("label"),
                tempLabel = document.createElement("label"),
                humidityLabel = document.createElement("label");
            img.setAttribute("src", "http://openweathermap.org/img/w/" + result[i].icon + ".png");
            dateLabel.innerHTML = "Date: " + result[i].date.split(" ")[0];
            tempLabel.innerHTML = "Temp: " + parseInt(weather.kelvinToCelsius(result[i].temp));
            humidityLabel.innerHTML = "Humidity: " + result[i].hum;
            element.appendChild(img);
            element.appendChild(dateLabel);
            element.appendChild(tempLabel);
            element.appendChild(humidityLabel);
            forecastContainer.appendChild(element);
        }
    }


})();