var express = require('express');
var app = express();

// Imports the Google Cloud client library
const vision = require('@google-cloud/vision');
// Creates a client
const client = new vision.ImageAnnotatorClient();


app.get('detect/:url', (req, res) => {
  client
    .labelDetection('./resources/wakeupcat.jpg')
    .then(results => {
      const labels = results[0].labelAnnotations;
      res.send(labels)
    })
    .catch(err => {
      console.error('ERROR:', err);
    });
})