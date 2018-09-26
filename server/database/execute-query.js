const mysql = require('mysql');
const dnsParser = require('dsn-parser');


const dns = new dnsParser(process.env.CLEARDB_DATABASE_URL);

/**
 * setup for the mysql database pool to work with the query function below.
 */
const pool = mysql.createPool({
	connectionLimit: 10,
	host: dns.get('host'),
	user: dns.get('user'),
	password: dns.get('password'),
	database: dns.get('database')
});

/**
 * Executes a query to the mysql pool connection then callback with results.
 * @param {*} pool is the mysql pool connection.
 * @param {*} query is the query string to run on the mysql pool connection.
 * @param {*} res is the response object from express.
 * @param {*} success callback function called on valid query response.
 */
function executeQuery(query, res, success) {
	pool.getConnection(function (err, connection) {
		if (err) {
      connection.release();
      return res.status(500).send("Error while connecting to database.");
    }
    console.log(query);
		connection.query(query, function (err, rows) {
      connection.release();
      if (err) {
        return res.status(500).send("Error while quering the database.");
      }
      success(rows);
		});
	});
}
module.exports = executeQuery;
