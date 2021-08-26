const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');


const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '..', 'public');
const viewsPath = path.join(__dirname, '..', 'templates', 'views');
const partialsPath = path.join(__dirname, '..', 'templates', 'partials');

// Setup Handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));


app.get('/', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Sivdan'
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Sivdan'
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help Page',
    name: 'Sivdan',
    message: 'If you need more help, visit http://api.weatherstack.com/'
  });
});

app.get('/weather', (req, res) => {

  if(!req.query.address) {
    return res.send({
      error: 'You must provide a valid address'
    });
  }

  geocode(req.query.address, (error, {latitude, longitude, location} = data) => {

    if(error) {
      return console.log(error);
    }
  
    forecast(latitude, longitude, (error, forecastData) => {
     
      if(error) {
        return res.send({error});
      }
  
      res.send({
        forecast: forecastData,
        location,
        address: req.query.address
      });
  
    });
  
  });

});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404 Page',
    name: 'Sivdan',
    errorMessage: 'Help article not found'
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404 Page',
    name: 'Sivdan',
    errorMessage: 'Page not found'
  });
});


app.listen(3000, () => {
  console.log('Server started on port 3000');
});