'use strict';
const mysql = require('mysql');

module.exports = class Database {
  constructor(options) {
    this.options = options;
  }
  doQuery(sql, ...parameters) {
    return new Promise((resolve, reject) => {
      let connection = mysql.createConnection(this.options);
      connection.query(sql, [...parameters], (err, result) => {
        if(err) {
          reject(new Error('SQL ' + err));
        }
        resolve(result);
      });
      connection.end();
    });
  }
};
