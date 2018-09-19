/**
 * Sensor readings router that handles all crud operations to sensor readings
 */

const express = require('express');
const executeQuery = require('../database/execute-query');
const verifyUser = require('../auth/verify-user');
const convertBuildingCode = require('../database/convert-building-code');

const routes = () => {
  const router = express.Router();

  //get data from the sensor readings table
  router.get('/', (req, res) => {
    const query = `
    select
      sr_id as "id",
      sr_bdg_id as "building_id",
      sr_dt as "date_time",
      sr_ele_use as "electrical",
      sr_ngs_use as "natural_gas",
      sr_ots_tmp as "temperature"
    from sensor_reading_tb;`;

    executeQuery(query, res, (rows)=>{
      res.status(200).json(rows);
    });
  });

  //put back in verifyUser


  //post to the sensor reading table
  router.post('/', [convertBuildingCode], (req, res) => {

    //assumes date_time is in unix time.  Might need to create middleware to ensure this.
    const query = `
    insert into sensor_reading_tb (
      sr_bdg_id,
      sr_dt,
      sr_ele_use,
      sr_ngs_use,
      sr_ots_tmp)
    values (
      ${req.body.buildingid},
      from_unixtime(${req.body.datetime / 1000}),
      ${req.body.electrical},
      ${req.body.naturalgas},
      ${req.body.temperature});
    `;
    console.log(req.body.datetime);
    console.log(query);
    executeQuery(query, res, (rows)=>{
      res.status(200).json({id: rows.insertId});
    });
  });

  //get a single log based off id
  router.route('/:id')
  .get((req, res) => {
    const query =`
    select
      sr_id as "id",
      sr_bdg_id as "building_id",
      sr_dt as "date_time",
      sr_ele_use as "electrical",
      sr_ngs_use as "natural_gas",
      sr_ots_tmp as "temperature"
    from sensor_reading_tb
    where sr_id = ${req.params.id};
    `;

    //excecute query and checks if id was found.
    executeQuery(query, res, (rows)=>{
      if(rows.length){
        res.status(200).json(rows);
      } else {
        res.status(404).send(`Didn't find sensor readings with id = ${req.params.id}`);
      }
    });
  });

  //return the created router
  return router;
}

module.exports = routes;

