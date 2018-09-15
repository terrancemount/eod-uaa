const mysql = require('mysql');

/**
 * setup for the mysql database pool to work with the query function below.
 */
const pool = mysql.createPool({
	connectionLimit: 10,
	host: process.env.DATABASE_HOST,
	user: process.env.DATABASE_USERNAME,
	password: process.env.DATABASE_PASSWORD,
	database: process.env.DATABASE_NAME
});

/**
 * Executes a query to the mysql pool connection then callback with results.
 * @param {*} pool is the mysql pool to connect to.
 * @param {*} query is a string to query with.
 * @param {*} callback will be called with an err and rows parameters.
 */
function executeQuery(pool, query, callback) {
	pool.getConnection(function (err, connection) {
		if (err) {
			connection.release();
			callback({ status: 500, message: "Error: while connection to database." }, null);
		}
		connection.query(query, function (err, rows) {
			connection.release();
			if (err) {
				callback({ status: 500, message: "Error: while quering the database." }, null);
			}
			callback(null, { rows });
		});
		connection.on('error', function (err) {
			connection.release();
			callback({ status: 500, message: "Error: unknown error happenend when communicating with database." }, null);
			return;
		});
	});
}


module.exports = {
	pool,
	executeQuery,
}
