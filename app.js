const request = require('request');
const chalk = require('chalk');
const config = require('./config');

const darksky_forecast_url = `https://api.darksky.net/forecast/${config.DARKSKY_SECRET_KEY}/17.387140,78.491684?units=si`;
const mapbox_geocoding_url= `https://api.mapbox.com/geocoding/v5/mapbox.places/hyderabad.json?access_token=${config.MAPBOX_ACCESS_TOKEN}&limit=1`;

// request({url: darksky_forecast_url, json: true},(error, response, body)=>{
//     printForecast(body.currently);
// })

request({url: mapbox_geocoding_url,json:true},(error, response, body)=>{
    console.log(`Latitude: ${getChalkInfoDecoration(body.features[0].center[0])} & Longitude: ${getChalkInfoDecoration(body.features[0].center[1])}`);
})

const printForecast = (currently) =>{
    const forecast = `At ${getChalkInfoDecoration(getTimefromUnixTimestamp(currently.time))},it is currently ${getChalkInfoDecoration(currently.temperature)} degree celcius. There is ${getChalkInfoDecoration(`${currently.precipProbability}%`)} chance of ${chalk.blue.underline(currently.precipType)}.`;
    console.log(forecast);
}

const getTimefromUnixTimestamp = (unixTimestamp) => {    
    let date = new Date(unixTimestamp*1000);
    let hours = date.getHours();
    let minutes = "0" + date.getMinutes();
    let seconds = "0" + date.getSeconds();
    let formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    return formattedTime;
}

const getChalkInfoDecoration = (str) => chalk.blue.underline(str);
