let  fs, path, config, parseFile;

/**
 * Module that handles parsing an entire directory.
 * Calls parse-file on each file in the directory.
 * Set up module with the file system and path.
 * @param {object} fs
 * @param {object} path
 */
module.exports = (_fs, _path) => {
  fs = _fs;
  path = _path;
  config = JSON.parse(fs.readFileSync(path.join(__dirname, 'parser.json'), 'utf8'));
  parseFile = require('./parse-file')(fs, path, config);
  return parseDirectory;
};

const parseDirectory ={
  /**
   * Proccess all the files from the parser.json config array.
   * @param errorHandler handler for the errors,
   * @param dataHandler handler for the data (callback),
   */
  processSiemensFiles: (callback) => {
    config.paths.forEach(dir => {
      parseDirectory.readDirectory(dir, (err, data) => {
        if(err) {
          parseDirectory.readDirectory(path.join(__dirname, dir), callback);
        } else {
          callback(null, data);
        }
      });


    });
  },
  /**
   * Reads all the files from the directory and procceses the .csv and .xlsx
   * @param {*} dirname that is wanting to be read from.
   * @param {*} onError handler for any errors.
   * @param {*} dataHandler function to handle success.
   */
  readDirectory: (dirname, callback) => {
    fs.readdir(dirname, (err, filenames) => {
      if(err){
        callback(err, null);
      } else {
        filenames.forEach(filename => {

          let extention = path.extname(filename);

          if(extention === '.xlsx'){
            parseFile.proccessExcelToJson(path.join(dirname, filename), callback);
          } else if(extention === '.csv'){
            parseFile.proccessCsvToJson(path.join(dirname, filename), callback);
          } else {
            callback(extention + " is an unsupported file extention.", null);
          }
        });
      }
    });
  }
}


