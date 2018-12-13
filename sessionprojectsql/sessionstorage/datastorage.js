'use strict';

const Database = require('./database');
const fatalError = err => new Error(`Sorry! Error in application. ${err.message}`);

const checkPasswordSql = 'select role from User where username=? and userpassword=?';
const isAllowedSql = 'select username from User where username=(select username ' + 'from UserSession where sessionIde=?) and role=?';
const insertSessionSql = 'insert into UserSession (sessionId, username) values(?,?)';
const deleteSessionSql = 'delete from UserSession where sessionId=?';
const hasSessionIdSql = 'select sessionId from UserSession where sessionId=?';
const getUsernameSql = 'select username from UserSession where sessionId=?';
const deleteUserSql = 'delete from UserSession where username=?';

module.exports = class SessionStorage {
  constructor(debug=false) {
    this.sessionDb = new Database({
      'host': 'localhost',
      'port': 3306,
      'user': 'server',
      'password': 'secret',
      'database': 'sessionDB'
    }, debug);
  }

  checkPassword(username, userpassword) {
    return new Promise(async (resolve, reject) => {
      try {
        let result = await this.sessionDb.doQuery(checkPasswordSql, username, userpassword);
        resolve(result.length > 0);
      }
      catch (err) {
        reject(fatalError(err));
      }
    });
  }

  isAllowed(sessionId, role) {
    return new Promise(async (resolve, reject) => {
      try {
        let result = await this.sessionDb.doQuery(isAllowedSql, sessionId, role);
        resolve(result.length > 0);
      }
      catch (err) {
        reject(fatalError(err));
      }
    });
  }

  hasSessionId(sessionId) {
    return new Promise(async (resolve, reject) => {
      try {
        let result = await this.sessionDb.doQuery(hasSessionIdSql, sessionId);
        resolve(result.length > 0);
      }
      catch (err) {
        reject(fatalError(err));
      }
    });
  }

  addSession(sessionId, username) {
    return new Promise(async (resolve, reject) => {
      try {
        let result = await this.sessionDb.doQuery(insertSessionSql, sessionId, username);
        resolve(result.affectedRows > 0);
      }
      catch (err) {
        reject(fatalError(err));
      }
    });
  }

  removeUser(username) {
    return this.sessionDb.doQuery(deleteUserSql(username));
  }

  remove(sessionId) {
    return this.sessionDb.doQuery(deleteSessionSql, sessionId);
  }

  deleteSession(sessionId) {
    return this.sessionDb.doQuery(deleteSessionSql, sessionId);
  }

  getUser(sessionId) {
    return this.sessionDb.doQuery(getUsernameSql, sessionId);
  }

};
