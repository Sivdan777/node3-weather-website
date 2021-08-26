const request = require('postman-request');

const geocode = (address, callback) => {
  const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYmFyYWJkYWdhcjU1NSIsImEiOiJja3M5Mm45aW4wdmgxMnpyb3NkbWljazZlIn0.icJyZtSmvx5o5uMXj-UCvg';
  
  request({url, json: true}, (error, {body} = response) => {
    if(error) {
      callback('Unable to connect to location services!', undefined);
    } else if(body.features.length === 0) {
      callback('Unable to find location, try another search', undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name
      });
    }
  });
}

module.exports = geocode;