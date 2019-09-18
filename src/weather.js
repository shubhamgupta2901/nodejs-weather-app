const request = require('request');
const utils = require('./utils');
const config = require('./config');


getDarkSkyForecastURL = (longitude, latitude) => {
    return `https://api.darksky.net/forecast/${config.DARKSKY_SECRET_KEY}/${latitude},${longitude}?units=si`;
}

/**
 * 
 * Takes a latitude, longitude of a place name and returns the weather forecast through a callback
 * returns a callback function with arguments (error, response). Either error will be present or response.
 * error is a string
 * response is an object 
 * @param {*} location {latitude, longitude, place}
 * @param {*} callback 
*/
const forecast = (location,callback) => {
    request({url: getDarkSkyForecastURL(location.longitude, location.latitude), json: true},(error, response)=>{
       if(error){
           callback('Error connecting weather service',null);
       }else if(response.statusCode!==200){
           callback(`Error in Geocode Service: ${response.body.error}`,null);
       }else{
           const {time, temperature,summary} = response.body.currently;
           callback(null,{ 
               place:location.place, 
               time: utils.getTimefromUnixTimestamp(time),
               temperature,
               summary,
            });
       }
    })
}
module.exports = {
    forecast
}