const express = require('express');
const mysql = require('mysql');

/**
 * Returns a router for the chart-data route
 */
const routes = (executeQuery) => {
  const router = express.Router();

  //get route /api/chart-data/building/#/ticks/#
  router.get('/building/:id/ticks/:ticks', (req, res) => {

    if(req.params.id === NaN){
      return res.status(500).send("The building id is not a valid number");
    }
    if(!req.params.ticks || req.params.ticks === NaN) {
      req.params.ticks = 7 * 24 * 15;
    }
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
      res.status(200).json(json);
    });
  });

  return router;
}

module.exports = routes;
