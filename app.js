
const location = require('./src/location');
const weather = require('./src/weather');


location.geocode('hyderabad',(location)=> {
    weather.forecast(location[0], location[1], (forecast)=>{
        console.log(forecast);
    })
})
