const request = require('request');
const chalk = require('chalk');
const config = require('./config');

const url = `https://api.darksky.net/forecast/${config.DARKSKY_SECRET_KEY}/17.387140,78.491684?units=si`;

request({url, json: true},(error, response, body)=>{
    printForecast(body.currently);
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