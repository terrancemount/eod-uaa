
const { sensor_lut } = require('./parser.json');
//const cleanTime = require('../shared/cleanTime');
const readXlsxFile = require('read-excel-file/node');
const deleteFile = require('./delete-file');

/**
 * Proccess the excel file to json data.
 * @param {string} fullFileName including the path if nessicary.
 * @param {function} callback with parameters (error, data)
 */
module.exports = function (fullFileName, callback) {
  readXlsxFile(fullFileName)
  .then((rows) => {
    let output = {
      buildingcode: rows[0][0].split('.', 1)[0],
      datetime: Math.trunc(Date.now() / 1000 / 60) * 60 * 1000 //round to nearest minute.
      //datetime: cleanTime(Date.now())
    };

    rows.forEach(row => {
      let index =findLookupIndex(row[0]);
      if(index > -1){
        let number = Number.parseFloat(row[4]);

        if(number !== NaN && number > 0){
          output[sensor_lut[index].senor_name] = number;
        }
      }
    });

    //delete the file
    deleteFile(fullFileName, (err)=> {
      if(err){
        console.log(err);
      }
    });

    callback(null, output);
  })
  .catch((err) => {
    callback(err, null);
  });
}

/********************************************************************************
 * Private functions of module
 * ******************************************************************************/

/**
 * Find index in the lookup table for the given name.
 * @param {String} name of the sensor in file
 * @returns {number} index for the given name.
 */
function findLookupIndex(name){
  name = name.split('.');
  name.splice(0, 1);
  name = name.join('.');

  return sensor_lut.findIndex((s) => s.siemien_name === name);
}

