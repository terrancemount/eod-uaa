const request = require('request');
const serverUrl = process.env.ENV == 'development' ? process.env.PARSER_DEV_SERVER : process.env.PARSER_SERVER;
const assert = require('assert');
const VError = require('verror');

/**
 * Send the data to database.
 * @param {JSON} data json to be sent database.
 * @param {function} callback (err, data) err for database, data is the id from the server.
 */
module.exports = (data, callback) => {
 data.forEach(packet => {
  let myPost = request.post({ url: serverUrl, form: packet }, (err, res, body) => {
    if (err) {
      callback(new VError(err, 'send-to-database: request.post error.'));
      return;
    } else {
      if (res.statusCode === 200) {
        callback(null, { id: body });
      } else if (res.statusCode === 404) {
        callback(new VError(err, 'send-to-database: 404: Unauthorized.'));
        return;
      } else {
        callback(new VError(err, 'send-to-database: 500: server error.'));
        return;
      }
    }
  });
});
}
