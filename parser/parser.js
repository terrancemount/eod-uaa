require('dotenv').config();
const fs = require('fs');
const path = require('path');
const parseDirectory = require('./parse-directory')(fs, path);
const sendToDatabase = require('./send-to-database');

//create a timer to loop over parser ever 15 minutes
// const timer = setInterval(()=>{
  parseDirectory.processSiemensFiles((err, data) => {
    if(err){
      handelError(err);
    } else {

      //try to store to database
      sendToDatabase(data, (err) => {
        if(err){
          handelError(err);
          sendLocalStorage(data, (err) => {
            if(err){
              handelError(err);
            }
          });
        }
      });

    }
  });
// }, 5000);

let count = -1;

function sendLocalStorage(data, callback){
  console.log("localstore");
  console.log(data);
}

/**
 * Error handeler for all parser functions.
 * @param {*} error message to log to server.
 */
function handelError(error){
  console.error(error);
}

