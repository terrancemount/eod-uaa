const cleanTime = require('../shared/cleanTime');
const readXlsxFile = require('read-excel-file/node');
const csv = require('csv-parser');
let fs, path, config;

/**
 * Module to handle parsing of a file
 * @param {object} _fs required from node.js
 * @param {object} _path required from node.js
 * @param {JSON} _config json with a look up table for the names
 * @return {object} parseFile object with two parsing methods.
 */
module.exports = (_fs, _path, _config) => {
  fs = _fs;
  path = _path;
  config = _config;
  return parseFile;
}

/**
 * parse-file public methods
 * proccessExcelToJson() == proccess a given filepath to json
 */
const parseFile = {
  /**
   * Proccess the excel file to json data.
   * @param {*} filepath path to the file
   * @param {*} callback for the data exported to json.
   */
  proccessExcelToJson: (filepath, callback) => {
    readXlsxFile(filepath)
    .then((rows) => {
      let output = {
        building: rows[0][0].split('.', 1)[0],
        date_time: cleanTime(Date.now())
      };

      rows.forEach(row => {
        let index =findLookupIndex(row[0]);
        if(index > -1){
          let number = Number.parseFloat(row[4]);

          if(number !== NaN && number > 0){
            output[config.sensor_lut[index].senor_name] = number;
          }
        }
      });

      callback(null, output);
    })
    .catch((err) => {
      callback(err, null);
    });
  },

  /**
   * Proccess the csv file to json data.
   * @param {*} filepath path to the file.
   * @param {*} callback for the data exported to json.
   */
  proccessCsvToJson: (filepath, callback) => {
    let output = {
      date_time: cleanTime(Date.now()),
      building: null
    };

    fs.createReadStream(filepath)
    .pipe(csv({headers: ['name', 'x', 'x', 'x', 'value', 'x', 'x']}))
    .on('data', (data) => {
      if(!output.building){
        output.building = data.name.split('.',1)[0];
      }

      const index = findLookupIndex(data.name)
      if(index > -1 ){
        let number = Number.parseFloat(data.value);

        if(number !== NaN && number > 0){
          output[config.sensor_lut[index].senor_name] =  number;
        }
      }
    })
    .on('end', ()=>{
      callback(null, output);
    })
    .on('error', (err) => {
      callback("Error on createReadStream in parse-file.js. " + err, null);
    });
  }
}

/**
 * returns the index of the lut for the given name from csv or excel.
 * @param {*} name of the sensor in file
 */
function findLookupIndex(name){
  name = name.split('.');
  name.splice(0, 1);
  name = name.join('.');

  return config.sensor_lut.findIndex((s) => s.siemien_name === name);
}

