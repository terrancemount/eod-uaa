/**
 * Sensor readings router that handles all crud operations to sensor readings
 */

const express = require('express');
const executeQuery = require('../database/execute-query');
const verifyUser = require('../auth/verify-user');
const mysql = require('mysql');
const convertBuildingCode = require('../database/convert-building-code');

const routes = () => {
  const router = express.Router();

  //get data from the sensor readings table
  router.get('/', (req, res) => {
    const query = `
    select *
    from sensor_readings
    order by buildingid, createddate;`;

    executeQuery(query, res, (rows)=>{
      rows.forEach(row => {
        let date = new Date(row['createddate']);
        row['createddate'] = date.toLocaleDateString() + "  " + date.toLocaleTimeString();
      });
      res.status(200).json(rows);
    });
  });


  //post to the sensor reading table
  router.post('/', [verifyUser, convertBuildingCode], (req, res) => {

    if(!req.body['createddate']){
      return res.status(500).send(`Input error: invalid createddate value = ${createddate}`);
    }

    //assumes date_time is in unix time.  Might need to create middleware to ensure this.
    const query = `
    insert into sensor_readings (
      createddate,
      buildingid,
      electrical,
      naturalgas,
      water,
      temperature)
    values (
      ${mysql.escape(req.body['createddate'])},
      ${mysql.escape(req.body['buildingid'])},
      ${mysql.escape(req.body['electrical'])},
      ${mysql.escape(req.body['naturalgas'])},
      ${mysql.escape(req.body['water'])},
      ${mysql.escape(req.body['temperature'])});
    `;

    executeQuery(query, res, (rows)=>{
      res.status(200).json({id: rows.insertId});
    });
  });

  //get a single log based off id
  router.route('/:id')
  .get((req, res) => {
    const query =`
    select *
    from sensor_readings
    where sr_id = ${mysql.escape(req.params.id)};
    `;

    //excecute query and checks if id was found.
    executeQuery(query, res, (rows)=>{
      if(rows.length){
        res.status(200).json(rows);
      } else {
        res.status(404).send(`Didn't find sensor readings with id = ${mysql.escape(req.params.id)}`);
      }
    });
  });

  //return the created router
  return router;
}

module.exports = routes;

