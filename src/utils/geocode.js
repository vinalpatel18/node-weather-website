
const request = require('request');

const geocode_callback = (cityname, callback) => {

    const locationurl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + cityname + '.json?access_token=pk.eyJ1IjoidmluYWxwYXRlbDE4IiwiYSI6ImNqdjcyYWZtdDBiZ2Y0ZG50ZTVnYTY5bncifQ.O7LDWixb1kHmxBAzPhR7FQ';

    request({ url: locationurl, json: true }, (error, response) => {

        if (error) {
            //console.log('Fail to connect to api-server' + error)
            callback(error, undefined)
        }
        else if (response.body.features.length===0) {
            //console.log('Unable to find location' + response.body.error[0])
            callback('City not found', undefined)
        }
        else {
            const log = response.body.features[0].center[0]
            const lat = response.body.features[0].center[1]
            const location = response.body.features[0].place_name
            console.log('latitude :' + lat + '\nlongitude : ' + log + '\nlongitude : ' + location )
            callback(undefined, {
                lat,
                log,
                location
            })
        }
    });
}

module.exports = geocode_callback
