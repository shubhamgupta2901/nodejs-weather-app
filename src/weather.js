const request = require('request');
const utils = require('./utils');
const config = require('../config');


getDarkSkyForecastURL = (longitude, latitude) => {
    return `https://api.darksky.net/forecast/${config.DARKSKY_SECRET_KEY}/${latitude},${longitude}?units=si`;
}

const printForecast = (currently) =>{
    const forecast = `At ${utils.chalkInfo(utils.getTimefromUnixTimestamp(currently.time))},it is currently ${utils.chalkInfo(currently.temperature)} degree celcius. There is ${utils.chalkInfo(`${currently.precipProbability}%`)} chance of ${utils.chalkInfo(currently.precipType)}.`;
    return forecast;
}

const forecast = (longitude, latitude,callback) => {
    request ({url: getDarkSkyForecastURL(longitude,latitude),json: true},(error, response)=>{
        if(error){
            console.log(utils.chalkError('Error connecting to forecast service'));
            callback('');
        }else if(response.statusCode!==200){
            //Bad requests etc
            console.log(utils.chalkError(response.body.message));
            callback('');
        }else{
            callback(printForecast(response.body.currently));
        }
    })
};
module.exports = {
    forecast,
}