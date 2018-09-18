const querystring = require('querystring');
const request = require('request');


module.exports = (data, callback) => {
  request.post('http://localhost:8000/api/sensor-readings', {
    'content-type': 'application/json',
    body: data
  }, (err, res, body) => {
    if(err){
      callback(err);
    } else {
      console.log('Status code = ', res.statusCode);
      console.log('data = ', body);
    }
  });
}

