//var bcrypt = require('bcryptjs');
const  executeQuery = require('../database/execute-query');

function verifyAdmin(req, res, next){
  if(!req.body.username || !req.body.password){
    return res.status(401).json({ auth: false, message: 'Invalid username or password' });
  }

  const query = `
    select ur_id
    from user_tb
    where ur_username = '${req.body.username}'
    and ur_password = '${req.body.password}';
  `;

  executeQuery(query, res, (rows)=>{
    if(rows.length){
      next();
    } else {
      res.status(401).json({auth: false, message: 'Invalid username or password' });
    }
  });
}
module.exports = verifyAdmin;
