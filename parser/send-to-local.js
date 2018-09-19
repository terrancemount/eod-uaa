const fs = require('fs');
const path = require('path');
const fullFileName = path.join(__dirname, `localstore.json`);

/**
 * Store json data locally.
 * @param {JSON} data to store in local storage at localstore.json
 * @param {function} callback (err) parameter.
 */
module.exports = function (data, callback){
  //try to read the file
  fs.readFile(fullFileName, 'utf8', (err, fileData)=>{
    if(err){
      if (err.code === 'ENOENT'){
        writeNewFile(data, callback);
      } else {
        callback("Error: while trying to open localstore.json, " + err);
      }
    } else {
      appendFile(fileData, data, callback);
    }
  });
}

/********************************************************************************
 * Private functions of module
 * ******************************************************************************/

/**
 * Write a new file to the file system.
 * @param {JSON} data to be stored locally
 * @param {*} callback (err) for any error returned from fs.
 */
function writeNewFile(data, callback){
  let obj = { table: [] };
  obj.table.push(data);
  fs.writeFile(fullFileName, JSON.stringify(obj), 'utf8', callback);
}

/**
 * Append json to a file.
 * @param {object} fileData from a fs.readFile call.
 * @param {JSON} appendData data to store on the local storage.
 * @param {function} callback (err) for any errors returned from fs.
 */
function appendFile(fileData, appendData, callback){
  obj = JSON.parse(fileData);
  obj.table.push(appendData);
  json = JSON.stringify(obj);
  fs.writeFile(path.join(__dirname, 'localstore.json'), json, 'utf8', callback);
}

