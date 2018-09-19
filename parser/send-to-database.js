const request = require('request');
const serverUrl = process.env.ENV === 'develoment' ? process.env.PARSER_DEV_SERVER : process.env.PARSER_SERVER;


module.exports = (data, callback) => {
  let myPost = request.post({ url: serverUrl, form: data }, (err, res, body) => {
    if (err) {
      callback({ code: err.code, message: `Unable to connect to ${serverUrl}` }, null);
    } else {
      if (res.statusCode === 200) {
        callback(null, { id: body });
      } else if (res.statusCode === 404) {
        callback({ code: 404, message: `Unauthized to post data to ${serverUrl}` }, null);
      } else {
        callback({ code: res.statusCode, message: `Post unsucessfull to ${serverUrl}.` }, null);
      }
    }
  });
}
