
const fs = require('fs');
const VError = require('verror');
const assert = require('assert');

/**
 * Reads JSON from file with given full path file name then deletes the file. If file is not found then nothing is callback / thrown. Arguments:
 *
 * @param {string} fullFileName a string containing the full path file name for the file to read from.
 *
 * @param {function} callback invoked when json read succeeds or fails.  Upon success, callback is invoked with callback(null, json). Upon failure, callback is invoked with callback(err) instead.
 *
 * This function will fail if the json fails to parse with JSON.parse
 *
 *    SyntaxError   JSON fail to parse.
 *
 *  All other failures like file not found errors will be ignorred.  If unable to delete file after parsing then nothing is returned.
 */
module.exports = (fullFileName, callback) => {
  //throw programing errors to crash program.
  assert.equal(typeof (fullFileName), 'string', `${fullFileName} is not a string.`);
  assert.equal(typeof (callback), 'function', 'callback must be a function');

  fs.readFile(fullFileName, (err, data) => {
    //do nothing if err == true;
    if(!err) { //temp file found.

      //try to parse json
      let json;
      try {
        json = JSON.parse(data);
      } catch (err) {
        //parse failed, callback and end function execution.
        return callback(new VError(err, 'read-local: fs.readFile.callback: JSON.parse "%s"', fullFileName));
      }

      //create a new blank list
      const obj = { table: [] };

      //write the new blank list to the file.
      fs.writeFile(fullFileName, JSON.stringify(obj), err => {
        if (err) {
          //try again in one second.
          setInterval(()=>{
            fs.writeFile(fullFileName, obj, err => {
              if(err){ //second error then callback(err)
                callback(new VError(err, `read-local: fs.readFile: fs.write: unable to set new table at ${fullFileName}`));
              } else{
                callback(null, json.table); //successful
              }
            });
          },1000);
        } else {
          //if blanking was successful then callback
          callback(null, json.table); //success
        }
      });
    }
  });
}
