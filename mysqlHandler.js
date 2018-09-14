const mysql = require('mysql');
const config = require('./config')

/**
 * setup for the mysql database pool to work with the query function below.
 */
const pool = mysql.createPool({
        connectionLimit: process.env.DB_CONNECT_LIMIT,
        host: process.env.DB_HOST,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE
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
        executeQuery
}
