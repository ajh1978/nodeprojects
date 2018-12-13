'use strict';

const mysql = require('mysql');

module.exports = class Database {
  constructor(options, debug=false) {
    this.options = options;
    this.debug = debug;
  }

  doQuery(sql, ...parameters) {
    return new Promise((resolve, reject) => {
      let connection = mysql.createConnection(this.options);
      let sqlStatement = connection.query(sql, [...parameters], (err, result) => {
        if(this.debug) {
          /*eslint-disable no-console*/
          console.log(sqlStatement.sql);
          /*eslint-enable no-console*/
        }
        if(err) {
          reject(new Error('Statement error:' + err.message));
        }
        else if(typeof result === 'undefined') {
          reject(new Error('Error in query'));
        }
        else if(typeof result.affectedRows === 'undefined') {
          resolve(result);
        }
        else {
          resolve({affectedCount:result.affectedRows});
        }
      });
      connection.end();
    });
  }
};
