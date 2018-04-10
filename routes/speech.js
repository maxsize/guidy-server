var express = require('express');
var router = express.Router();

const speech = require('@google-cloud/speech');
const client = new speech.v1.SpeechClient();

router.route('/')
  .post(function (req, res, next) {
    let uri = ''
    req.on('data', buffer => {
      uri += buffer
    })
    req.on('end', () => {
      console.log('image uri: ' + uri)
      callApi(uri, res)
    })
  })

module.exports = router;

function callApi(uri, res) {
  var encoding = 'FLAC';
  var sampleRateHertz = 44100;
  var languageCode = 'en-US';
  var config = {
    encoding: encoding,
    sampleRateHertz: sampleRateHertz,
    languageCode: languageCode,
  };
  // var uri = 'gs://guidy-app.appspot.com/audio/forbidden-city.flac';
  var audio = {
    uri: uri,
  };
  var request = {
    config: config,
    audio: audio,
  };
  client.recognize(request)
    .then(responses => {
      var response = responses[0];
      res.send(response)
    })
    .catch(err => {
      // console.error(err);
      res.send(err)
    });
}
