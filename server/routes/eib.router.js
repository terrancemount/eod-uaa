const express = require('express');
const executeQuery = require('../db');

/**
 * Build a router to be used with app.js
 */
const routes = function(){
    const router = express.Router();

    //get EIB's sensor readings.
    router.route('/')
    .get((req, res) => {
        const end = req.query.end || floorTimeFifteenMinutes(Date.now());
        const start = req.query.start || oneWeekPrior(end);

        const query = `
        select
          unix_timestamp(sr_dt) * 1000,
          sr_ele_dem,
          sr_ngs_use,
          sr_ots_tmp
        from sensor_reading_tb;`;

        executeQuery(query, res, (rows)=>{
          res.status(200).json(mapSqlResultsToArrays(rows));
        });
    });

    return router;
}

function mapSqlResultsToArrays(results){
    let remap = [];
    for(let key in results[0]){
        remap.push(results.map(x => x[key]));
    }

    return remap;
}

function floorTimeFifteenMinutes(time){
    let dt = new Date(time);
    let minutes = Math.floor(dt.getMinutes()/15) * 15;
    dt.setMinutes(minutes);
    dt.setSeconds(0);
    dt.setMilliseconds(0);
    return dt.getTime();
}

function oneWeekPrior(time){
    const MS_PER_WEEK = 168 * 60 * 60 * 1000;
    return time - MS_PER_WEEK;
  }


//export the routes function
module.exports = routes;
