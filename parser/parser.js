require('dotenv').config({path: __dirname + '/.env'})
const parseDirectory = require('./parse-directory');
const sendToDatabase = require('./send-to-database');
const sendToLocal = require('./send-to-local');

console.log(process.env.ENV);

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
  parseDirectory((err, data) => {
    if(err){
      handelError(err);
    } else {
      //try to store to database
      sendToDatabase(data, (err, res) => {
        if(err){
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
}

/**
 * Error handeler for all parser functions.
 * @param {JSON} error message to log to server.
 */
function handelError(error){
  console.log(error);
}

