require('dotenv').config({ path: __dirname + '/.env' })
const parseDirectory = require('./parse-directory');
const sendToDatabase = require('./send-to-database');
const sendToLocal = require('./send-to-local');
const readLocal = require('./read-local');
const path = require('path');
const fullFileName = path.join(__dirname, `localstore.json`);
const VError = require('verror');
let isServerUp = true;

/**
 * Setup an interval to call parseLoop every minute. Look at parseLoop for explanation.
 */
setInterval(() => {
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
function parseLoop() {

  //parse the new stuff first (should only be one file for each building being tracked.)
  parseDirectory((err, newJson) => {
    if (err) {
      handelError(new VError(err, "parseLoop.parseDirectory =>"));
    } else {
      proccessJson(newJson, (err, res) => {

        //side effect every time send to server is tried, it sets the isServerUp varable.
        if (err) {
          handelError(new VError(err, `parseLoop: parseDirectory: proccessJson: ~ new file ~ => `));
        } else {
          console.log(`New json res:`, res);
        }
      });
    }
  });

  //now check if the is is up from the last call to proccessJson.
  if (isServerUp) {
    readLocal(fullFileName, (err, oldJson) => {
      if (err) {
        handelError(new VError(err, `parserLoop: parseDirectory: readLocal(${fullFileName} => `));
      } else { //make sure there is json.
        proccessJson(oldJson, (err, res) => {
          if (err) {
            handelError(new VError(err, `parserLoop: parseDirectory: readLocal(${fullFileName}: proccesJson: ~ old data after isServerUp = ${isServerUp} => `));
          } else {
            console.log('Old json res: ', res);
          }
        });
      }
    })
  }
}

function proccessJson(json, callback) {
  //try to send it to the server
  sendToDatabase(json, (err, res) => {
    if (err) {
      isServerUp = false; //side effect of calling proccessJson. Uses to know if localread is useful.
      callback(new VError(err, 'Unable to sendToDatabase: '))
      //if unable to save to server then send to the local storage.
      sendToLocal(fullFileName, json, err => {
        if (err) {
          callback(new VError(err, 'sendToLocal unable to save json:'));
        }
      });
    } else {
      isServerUp = true; //server is up then make sure no local storage.
      callback(null, res);
    }
  });
}


/**
 * Error handeler for all parser functions.
 * @param {JSON} error message to log to server.
 */
function handelError(error) {
  console.log(error.message);
}

