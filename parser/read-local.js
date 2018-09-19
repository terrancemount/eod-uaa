
const fs = require('fs');
const path = require('path');
const fullFileName = path.join(__dirname, `localstore.json`);


/**
 * Reads all data from localstorage.json, deletes it and ommits it to the callback.
 * @param {function} callback (err, data) err is any errors, data is a single line of data from the file.   
 */
module.exports = (callback) => {
  fs.stat(fullFileName, (err) => {
    if (!err) {
      fs.readFile(fullFileName, (err, data) => {
        if (!err) {
          const json = JSON.parse(data);
          json.table.forEach((row) => {
            callback(null, row);
          });
        }
      });
    }
  });
}
