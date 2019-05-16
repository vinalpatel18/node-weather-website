
const request = require('request');

const forecast_callback = (lati, long, location, callback) => {
    const forecast_url = 'https://api.darksky.net/forecast/429c70751b42a967ffd3c01a3f1cf83e/' + lati + ',' + long+'?units=si';

    request({ url: forecast_url, json: true }, (error, response) => {

        if (error) {
            // console.log('Fail to connect to api-server')
            callback(error, undefined)
        }
        else if (response.body.error) {
            //console.log('Unable to find location' + response.body.error[0])
            callback(error, undefined)
        }
        else {
            //console.log(response.body.currently)
            // console.log('temperature currently is ' + response.body.currently.temperature)
            // console.log('humidity currently is ' + response.body.currently.humidity)
            // console.log('wind currently is ' + response.body.currently.windSpeed)
            // console.log('Overall weather currently is ' + response.body.currently.summary)
            callback(undefined, {
                temperature: response.body.currently.temperature,
                humidity: response.body.currently.humidity,
                wind: response.body.currently.windSpeed,
                Current: response.body.currently.summary,
                Forecast: response.body.daily.summary,
                Location: location
                //response: response
            })
        }

    });

}

module.exports = forecast_callback