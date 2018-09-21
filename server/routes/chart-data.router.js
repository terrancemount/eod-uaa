const express = require('express');
const executeQuery = require('../database/execute-query');

/**
 * Returns a router for the chart-data route
 */
const routes = () => {
  const router = express.Router();

  //get route /api/chart-data/building/#/ticks/#
  router.get('/building/:id/ticks/:ticks', (req, res) => {
    const query = `
      select
        unix_timestamp(sr_dt) * 1000,
        sr_ele_use,
        sr_ngs_use,
        sr_ots_tmp
      from
        (select *
          from sensor_reading_tb
          where sr_bdg_id = ${req.params.id}
          order by sr_dt DESC
          limit ${req.params.ticks}) as sub
      order by sr_dt ASC;
      `;
    executeQuery(query, res, (rows) => {
      res.status(200).json(mapSqlResultsToArrays(rows));
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
