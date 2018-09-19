const fs = require('fs');

/**
 * Deletes a file after checking to make sure it exists.
 * @param {string} fullFileName of the file to be deleted
 * @param {function} callback (err) function that will null if successful, err if unsuccessful.
 */
module.exports = (fullFileName, callback) => {
  fs.stat(fullFileName, (err, stats) => {
    if(err){
      callback({code: err.code, message: `Cann't find ${fullFileName} error message = ${err.message}`});
    }

    fs.unlink(fullFileName, (err)=>{
      if(err){
        callback({code: err.code, message: `Cann't unlink ${fullFileName} error message = ${err.message}`});
      } else {
        callback(null);
      }
    });
  });
}

