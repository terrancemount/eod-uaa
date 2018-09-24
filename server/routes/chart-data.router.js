const express = require('express');
const executeQuery = require('../database/execute-query');
const mysql = require('mysql');

/**
 * Returns a router for the chart-data route
 */
const routes = () => {
  const router = express.Router();

  //get route /api/chart-data/building/#/ticks/#
  router.get('/building/:id/ticks/:ticks', (req, res) => {
    const query = `
      select *
      from
        (select *
          from sensor_readings
          where buildingid = ${req.params.id}
          order by createddate DESC
          limit ${req.params.ticks}) as sub
      order by createddate ASC;
      `;
    executeQuery(query, res, (rows) => {
      if (rows.length === 0) {
        return res.status(200).json(rows);
      }


      let json = {
        buildingid: req.params.id
      };



      //get the keys from the first row in the rows array
      for (let key in rows[0]) {
        switch (key) {
          case "id":
          case "buildingid":
            //do nothing for id and buildingid
            break;
          case "createddate":
          case "temperature":
            json[key] = rows.map(t => t[key]);
            break;
          default:
            json[key] = { usage: rows.map(x => x[key]) };
        }
      }
        // console.log('key');
        // //temperature does not have a usage or demand so it only uses a simple array.
        // if (key === 'temperature' || key === 'createddate') {
        //   json[key] = rows.map(t => t[key]);

        //   //drop both the id and building id fields to make the data more compact.
        //   //filtering the data here because if I do it on the query then I will have to update every time
        //   // a new column is added.  Output all other columns beside id and buildingid.
        // } else if (key !== 'id' && key !== 'buildingid') {
        //   json[key] = { usage: rows.map(x => x[key]) };
        // }
        // else{
        //   console.log('error');
        // }





      res.status(200).json(json);
    });
  });

  return router;
}

module.exports = routes;

function mapSqlResultsToArrays(results) {
  let remap = [];
  for (let key in results[0]) {

    remap.push(results.map(x => x[key]));
  }
  return remap;
}
