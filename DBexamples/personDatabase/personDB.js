'use strict';

const Database = require('./database');
const sqlStatements = require('./sqlStatements');
const options = require('./options');

const allSql = sqlStatements.getAllSql.join(' ');
const personSql = sqlStatements.getPersonSql.join(' ');
const insertSql = sqlStatements.insertPersonSql.join(' ');
const deleteSql = sqlStatements.deletePersonSql.join(' ');
const updateSql = sqlStatements.updatePersonSql.join(' ');

class PersonDatabase{
  constructor(options, debug=false) {
    this.personDB = new Database(options, debug);
  }

  getAll() {
    return new Promise(async (resolve, reject) => {
      try {
        let result = await this.personDB.doQuery(allSql);
        resolve(result);
      }
      catch(err) {
        reject(fatalError(err));
      }
    });
  }

  get(personId) {
    return new Promise(async (resolve, reject) => {
      try {
        let result = await this.personDB.doQuery(personSql, +personId);
        if(result.length === 0) {
          reject(new Error('Person unknwon'));
        }
        else {
          resolve(result[0]);
        }
      }
      catch(err) {
        reject(fatalError(err));
      }
    });
  }

  insert(person) {
    return new Promise(async (resolve,reject) => {
      try {
        let result = await this.personDB.doQuery(insertSql,
          +person.personId,
          person.firstname,
          person.lastname,
          person.department,
          +person.salary
        );
        if(result.affectedRows === 0) {
          reject(new Error('No person was added.'));
        }
        else {
          resolve(`Person with id ${person.personId} was added.`);
        }
      }
      catch(err) {
        reject(fatalError(err));
      }
    });
  }

  delete(personId) {
    return new Promise(async (resolve,reject) => {
      try {
        let result = await this.personDB.doQuery(deleteSql, +personId);
        if(result.affectedRows === 0){
          reject(new Error('No such id'));
        }
        else {
          resolve(`Person with id ${personId} was deleted.`);
        }
      }
      catch(err) {
        reject(fatalError(err));
      }
    });
  }

  update(person) {
    return new Promise(async (resolve,reject) => {
      try {
        let result = await this.personDB.doQuery(updateSql, person.firstname, person.lastname, person.department, +person.salary, +person.personId);
        if(result.affectedRows === 0) {
          reject(new Error('No data updated'));
        }
        else {
          resolve(`Person with id ${person.personId} was updated`);
        }
      }
      catch(err) {
        reject(fatalError(err));
      }
    });
  }

} // end of class PersonDataBase

module.exports = function initDataStorage(debug=false) {
  return new PersonDatabase(options, debug);
};

function fatalError(err) {
  return new Error(`Error in application! Fix it! ${err.message}`);
}
