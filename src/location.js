const request = require('request');
const config = require('./config.js');

const getMapBoxGeocodingURL = (placeName) =>{
    return `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(placeName)}.json?access_token=${config.MAPBOX_ACCESS_TOKEN}&limit=1`;
}


/**
 * Takes a place name and returns the most probable latitude and longitude corresponding to it through a callback.
 * returns a callback function which arguments (error, response). Either error will be present or response.
 * error is a string
 * response is an object {latitude, longitude, place}
 * @param {*} placeName 
 * @param {*} callback
 * NOTE on request library: using json: true returns the response as an object instead of a string.
 * Error signifies low level os errors like no internet etc.
 * The callback function has either error or response(one of them is always undefined or null).
 * For other errors like bad request etc, you get a response. Which means error is null but response.code is not 200 and response.body does not have expected response from api but an error object.
 */
const geocode = async (placeName, callback) =>{
    request({url: getMapBoxGeocodingURL(placeName),json: true}, (error, response)=>{
        if(error){
            //Low level os errors, due to which could not connect with the service
            callback('Error connecting location service.',null);
        }else if(response.statusCode !=200){
            //Bad requests etc
            callback(response.body.message,null);
        }else{
            if(response.body.features.length === 0)
                callback(`Could not find latitude and longitude of ${placeName}. Please try another location.`,null);
            else{
                const [longitude, latitude] = response.body.features[0].center;
                const place = response.body.features[0].place_name;
                callback(null,{latitude, longitude, place});
            }
        }
    })
}

module.exports = {
    geocode,
}

