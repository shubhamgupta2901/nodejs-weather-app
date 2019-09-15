const request = require('request');
const config = require('../config.js');
const utils = require('./utils');

const getMapBoxGeocodingURL = (placeName) =>{
    return `https://api.mapbox.com/geocoding/v5/mapbox.places/${placeName}.json?access_token=${config.MAPBOX_ACCESS_TOKEN}&limit=1`;
}

/**
 * Takes a place name and returns the most probable latitude and longitude corresponding to it.
 * Return value is an array of [longitude,latitude]
 * @param {*} placeName 
 * @param {*} callback
 * NOTE: using json: true returns the response as an object instead of a string.
 * Error signifies low level os errors like no internet etc.
 * The callback function has either error or response(one of them is always undefined or null).
 * For other errors like bad request etc, you get a response. Which means error is null but response.code is not 200 and response.body does not have expected response from api but an error object.
 */
const geocode = async (placeName,callback) =>{
    request({url: getMapBoxGeocodingURL(placeName), json:true},(error,response)=>{
        // Low level os errors, due to which could not connect with the service
        if(error){
            console.log(utils.chalkError('Error connecting to location service'));
            callback([]);
        }else if(response.statusCode!==200){
            //Bad requests etc
            console.log(utils.chalkError(response.body.message));
            callback([]);
        }else{
            const [longitude, latitude] = response.body.features[0].center;
            const place = response.body.features[0].place_name;
            console.log(`Longitude: ${utils.chalkInfo(longitude)} & Latitude: ${utils.chalkInfo(latitude)}`);
            callback({latitude, longitude, place});
        }
    })
}

module.exports = {
    geocode,
}