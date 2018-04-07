var express = require('express');
var router = express.Router();

const vision = require('@google-cloud/vision');
const client = new vision.ImageAnnotatorClient();

/* GET users listing. */
router.route('/')
  .post(function (req, res, next) {
    let value = ''
    req.on('data', buffer => {
      value += buffer
    })
    req.on('end', () => {
      console.log(value)
      const request = {
        image: {source: {imageUri: value}},
        features: [
          {type: 1, maxResults: 3}, // face
          {type: 2, maxResults: 3}, // landmark
          {type: 4, maxResults: 3}, // label
          {type: 10, maxResults: 3}, // web
        ]
      }
      client
        .annotateImage(request)
        .then(results => {
          const labels = results[0];
          res.send(labels)
        })
        .catch(err => {
          res.send(err)
        });
    })
  });

module.exports = router;