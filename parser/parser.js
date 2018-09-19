require('dotenv').config({path: __dirname + '/.env'})
const parseDirectory = require('./parse-directory');
const sendToDatabase = require('./send-to-database');
const sendToLocal = require('./send-to-local');
const readLocal = require('./read-local');
const path = require('path');
const fullFileName = path.join(__dirname, `localstore.json`);
const deleteFile = require('./delete-file');

/**
 * Setup an interval to call parseLoop every minute. Look at parseLoop for explanation.
 */
setInterval(()=>{
  parseLoop();
}, 60 * 1000);

/**
 * This will execute the parseLoop immediatly after starting the
 * node project rather than waiting for interval.
 */
parseLoop();

/**
 * Main loop for the parser.  Will be called by an interval on set time.
 *  1) get any store data and try to send it to the server.
 *  2) search all the directories and callback with files.
 *  3) for each file parse it with ether a csv or xlsx parser and callback with data.
 *    3.1) once parser has read data successfully, call delete file.
 *  4) for each data try to store to database, callback with error if it can't.
 *  5) for each error on database, try to local store and write error log.
 * through all the directories listed in parser.json.
 */
function parseLoop(){
  //track if the local storage is bing used
  let deleteLocal = true;
  //proccess local storage
  readLocal((err, data) => {
    if(!err){
      sendToDatabase(data, (err) => {
        if(err){
          deleteLocal = false;
        }
      });
    }
  });

  //parse directory
  parseDirectory((err, data) => {
    if(err){
      handelError(err);
    } else {
      //try to store to database
      sendToDatabase(data, (err, res) => {
        if(err){
          console.log("error with send to database");
          deleteLocal = false;
          handelError(err);
          sendToLocal(data, (err) => {
            if(err){
              handelError(err);
            }
          });
        } else {
          console.log("res:",res);
        }
      });
    }
  });
  if(deleteLocal){
    deleteFile(fullFileName, ()=>{});
  }
}

/**
 * Error handeler for all parser functions.
 * @param {JSON} error message to log to server.
 */
function handelError(error){
  console.log(error);
}

