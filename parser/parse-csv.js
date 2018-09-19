const fs = require('fs');
const { sensor_lut } = require('./parser.json');
const cleanTime = require('../shared/cleanTime');
const csv = require('csv-parser');
const deleteFile = require('./delete-file');


/**
 * Proccess the csv file to json data.
 * @param {String} fullFilename path to the file.
 * @param {function} callback for the data exported to json.
 */
module.exports = function (fullFileName, callback) {
  let output = {
    buildingcode: null,
    datetime: Math.trunc(Date.now() / 1000 / 60) * 60 * 1000 //round to nearest minute.
    //datetime: cleanTime(Date.now())
  };

  fs.createReadStream(fullFileName)
  .pipe(csv({headers: ['name', 'x', 'x', 'x', 'value', 'x', 'x']}))
  .on('data', (data) => {

    if(!output.buildingcode){
      output.buildingcode = data.name.split('.',1)[0];
    }

    const index = findLookupIndex(data.name)
    if(index > -1 ){
      let number = Number.parseFloat(data.value);

      if(number !== NaN && number > 0){
        output[sensor_lut[index].senor_name] =  number;
      }
    }
  })
  .on('end', ()=>{
    //delete the file
    deleteFile(fullFileName, (err)=> {
      if(err){
        console.log(err);
      }
    });
    callback(null, output);
  })
  .on('error', (err) => {
    callback({code: err.code, message: "Error on createReadStream in parse-file.js. "}, null);
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

