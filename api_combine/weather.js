/**
 * Created by Robin on 3/2/2016.
 */


var Weather = function () {
    var key = '269294b98f8ddf935e3c9e0d64cb7898',
        url = 'http://api.openweathermap.org/data/2.5/';

    this.returnKey = function () {
        return key;
    };

    this.returnUrl = function () {
        return url;
    };
};

Weather.prototype.kelvinToCelsius = function (value) {
    return value - 273.15;
};

Weather.prototype.getForecastByName = function (city) {
    var uri = 'http://api.openweathermap.org/data/2.5/forecast?q=' + encodeURIComponent(city) + "&mode=json&APPID=" + this.returnKey(),
        result = this.getJSON(uri);

    var response = [];
    for (var i = 0; i < result.list.length; i++) {
        // Get forecast per day (the response from openweathermap gives the forecast for 5 days, with every 3 hours in it)
        if (i % 8 == 0) {
            var current = result.list[i];
            var element = {
                date: current.dt_txt,
                temp: current.main.temp,
                hum: current.main.humidity,
                icon: current.weather[0].icon
            };
            response.push(element);
        }
    }
    return response;

};

Weather.prototype.getForecastByLatLon = function (latLon) {
    var uri = 'http://api.openweathermap.org/data/2.5/forecast?lat=' + latLon.lat + "&lon=" + latLon.lon + "&mode=json&APPID=" + this.returnKey(),
        result = this.getJSON(uri);

    var response = [];
    for (var i = 0; i < result.list.length; i++) {
        // Get forecast per day (the response from openweathermap gives the forecast for 5 days, with every 3 hours in it)
        if (i % 8 == 0) {
            var current = result.list[i];
            var element = {
                date: current.dt_txt,
                temp: current.main.temp,
                hum: current.main.humidity,
                icon: current.weather[0].icon
            };
            response.push(element);
        }
    }
    return response;

};

Weather.prototype.getByName = function (city) {
    var uri = 'http://api.openweathermap.org/data/2.1/find/city?q=' + encodeURIComponent(city) + "&cnt=1&mode=json&APPID=" + this.returnKey(),
        result = this.getJSON(uri);
    return {
        id: result.list[0].id,
        temp: result.list[0].main.temp,
        hum: result.list[0].main.humidity,
        weather: result.list[0].weather[0]
    }
};

Weather.prototype.getByLatLon = function (latLon) {
    var uri = 'http://api.openweathermap.org/data/2.5/weather?lat=' + latLon.lat + '&lon=' + latLon.lon + '&APPID=' + this.returnKey(),
        result = this.getJSON(uri);
    return {
        id: result.id,
        temp: result.main.temp,
        hum: result.main.humidity,
        weather: result.weather[0]
    }
};

Weather.prototype.getJSON = function (uri) {
    var response;
    $.ajax({
        type: 'GET',
        url: uri,
        async: false,
        dataType: 'json',
        success: function (data) {
            response = data;
        },
        error: function (data) {
            response = data;
        }
    });
    return response;
};