
const executeQuery = require('./execute-query');

/**
 * Middleware to convert a building code into an id.
 * @param {object} req request object from express.
 * @param {object} res response object from express.
 * @param {function} next function to be called in the chain.
 */
module.exports = function convertBuildingCode(req, res, next) {
  //building code is not set then set it to the testing building code of 1
  if(!req.body.buildingcode) {
    res.status(500).send('buildingcode was not sent');
  }
  
  const query = `
    select bld_id as id
    from building_tb
    where bld_code = '${req.body.buildingcode}';
  `;
  executeQuery(query, res, (rows) =>{
    if(rows.length){
      req.body.buildingid = rows[0].id;

      next();
    } else {
      res.status(500).send('Invalid building code');
    }
  });
}
