const express = require('express');
const { executeQuery } = require('../mysqlHandler');

/**
 * Build a router to be used with app.js
 */
const routes = function(pool){
    const router = express.Router();

    //get EIB's sensor readings. 
    router.route('/')
    .get((req, res) => {
        const end = req.query.end || floorTimeFifteenMinutes(Date.now());
        const start = req.query.start || oneWeekPrior(end);
       
        const query = `select unix_timestamp(sr_dt) * 1000 as "Datetime", 
                                sr_ele_dem as "ElectricalDemand", 
                                sr_ngs_use as "NaturalGasUsage", 
                                sr_ots_tmp as "OutsideTemperature"
                        from sensor_reading_tb;`;
                
       executeQuery(pool, query, function(err, rows){
        if(err){
            res.status(err.status).send(err.message);
        } else {
            res.status(200).json(mapSqlResultsToArrays(rows));
        }
       });
    });
    
    return router;
}

function mapSqlResultsToArrays(results){
    let remap = [];
    
    console.log(results);
    for(let key in results.rows[0]){
        remap.push(results.rows.map(x => x[key]));
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
