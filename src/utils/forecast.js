const request = require('postman-request');

const forecast = (latitude, longitude, callback) => {

  const url = 'http://api.weatherstack.com/current?access_key=13cb625bbfc8bccc65977932da95d9ae&query=' + latitude + ',' + longitude;

  // const url = 'http://api.weatherstack.com/current?access_key=13cb625bbfc8bccc65977932da95d9ae&query=Montreal';

  request({ url, json: true }, (error, {body} = response) => {
    if(error) {
      callback('Unable to connect to location services!', undefined);
    } else if(body.error) {
      callback('Unable to find location, try another search', undefined);
    } else {
      callback(undefined, {
        location: body.location.name,
        temperature: body.current.temperature,
        feelslike: body.current.feelslike
      });
    }
   
  });

}

module.exports = forecast;