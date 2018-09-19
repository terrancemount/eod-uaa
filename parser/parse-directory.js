const fs = require('fs');
const path = require('path');
const parseCsv = require('./parse-csv');
const parseXlsx = require('./parse-excel');
const { paths } = require('./parser.json');

/**
 * Proccess all the files from the parser.json config array.
 * @param {function} callback with a (error, data) parameters.
 */
module.exports = function (callback){
  paths.forEach(dir => {
    readDirectory(dir, (err, data) => {
      if(err) {
        readDirectory(path.join(__dirname, dir), callback);
      } else {
        callback(null, data);
      }
    });
  });
}

/********************************************************************************
 * Private functions of module
 * ******************************************************************************/
/**
 * Reads all the files from the directory and procceses the .csv and .xlsx
 * @param {String} dirname that is wanting to be read from.
 * @param {function} callback call back with a (error, data) parameters
 */
function readDirectory(dirname, callback){
  fs.readdir(dirname, (err, filenames) => {
    if(err){
      callback(err, null);
    } else {
      filenames.forEach(filename => {

        let extention = path.extname(filename);

        if(extention === '.xlsx'){
          parseXlsx(path.join(dirname, filename), callback);
        } else if(extention === '.csv'){
          parseCsv(path.join(dirname, filename), callback);
        } else {
          callback(extention + " is an unsupported file extention.", null);
        }
      });
    }
  });
}



