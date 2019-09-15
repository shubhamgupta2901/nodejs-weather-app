const yargs = require('yargs');
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
        location: {
            describe: 'place whose forecast is needed',
            demandOption: true,
            type: 'string',
        }
    },
    handler: (argv)=>getForecast(argv),
})

const getForecast = (argv) => {
    location.geocode(argv.location,(location)=>{
        weather.forecast(location,(forecast)=>{
            console.log(forecast);
        })
    })
}


yargs.parse();