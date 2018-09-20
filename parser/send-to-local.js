const fs = require('fs');
const path = require('path');
const assert = require('assert');
const VError = require('verror');


/**
 * Store json data locally.
 * @param {string}
 * @param {JSON} data to store in local storage at localstore.json
 * @param {function} callback Upon success, callback(null). Upon failure, callback(err).
 */
module.exports = function (fullFileName ,data, callback) {
  assert.equal(typeof (callback), 'function', 'callback must be a function.');
  assert.ok(Array.isArray(data), 'send-to-local: data must be an array');

  //try to read the file
  fs.readFile(fullFileName, 'utf8', (err, fileData) => {
    if (err) {
      //write a new file
      const obj = {table: data};
      fs.writeFile(fullFileName, JSON.stringify(obj), 'utf8', err => {
        if (err) {
          callback(new VError(err, "send-to-local: Unable to write new file"))
        } else {
          callback(null);
        }
      });
    } else {
      //append to file
      console.log('append: ', data);
      try {
        obj = JSON.parse(fileData);
      } catch (e) {
        throw new VError(e, 'send-to-local: JSON.parse Error');
      }
      obj.table.push(...data);
      json = JSON.stringify(obj);
      fs.writeFile(fullFileName, json, 'utf8', err => {
        if(err){
          callback(new VError(err, "send-to-local: Unable to append json to file."))
        }else {
          callback(null);
        }

      });
    }
  });
}

