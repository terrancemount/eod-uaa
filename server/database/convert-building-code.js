
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
    req.body['buildingcode'] = 1;
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
      addBuildingCode(req, res, next);
    }
  });
}

function addBuildingCode(req, res, next){
  const query = `
    insert into building_tb (
      bld_name,
      bld_code,
      bld_abbr,
      college_code)
    values (
      '${req.body.buildingcode}',
      '${req.body.buildingcode}',
      '${req.body.buildingcode}',
      'UAA'
    );`;

    executeQuery(query, res, () => {
      convertBuildingCode(req, res, next);
    });

}
