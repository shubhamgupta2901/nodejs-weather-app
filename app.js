const yargs = require('yargs');
const utils = require('./src/utils');
const location = require('./src/location');
const weather = require('./src/weather');



// location.geocode('hyderabad',(location)=> {
//     weather.forecast(location[0], location[1], (forecast)=>{
//         console.log(forecast);
//     })
// })

yargs.command({
    command: 'forecast',
    describe: 'returns the weather forecast of the place',
    builder: {
        place: {
            describe: 'place whose forecast is needed',
            demandOption: true,
            type: 'string',
        }
    },
    handler: (argv)=>getForecast(argv.place),
})



const getForecast = (place) => {
    location.geocode(place,(geocodeError,geocodeResponse)=>{
        if(geocodeError){
            console.log(utils.chalkError(geocodeError));
            return;
        }
        else {
            weather.forecast(geocodeResponse, (forecastError,forecastResponse)=>{
                if(forecastError){
                    console.log(utils.chalkError(forecastError));
                }
                else utils.printForecast(forecastResponse);
            });
        }
    })
}


yargs.parse();