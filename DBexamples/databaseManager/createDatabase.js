'use strict';
/*eslint-disable no-console*/
const statements = require('./createStatements.json'); //.json is not necessary

try {
  createDatabase(statements);
}
catch(err) {
  console.log(err.message);
}

async function createDatabase(createStatements) {
  const createOptions = {
    host: createStatements.host,
    port: createStatements.mysqlport,
    user: createStatements.admin,
    password: createStatements.adminpassword
  };

  let dropDatabaseSql = `drop database if exists ${createStatements.database}`;
  let createDatabaseSql = `create database ${createStatements.database}`;
  let dropUserSql = `drop user if exists '${createStatements.user}'@'${createStatements.host}'`;
  let createUserSql = `create user if not exists '${createStatements.user}'` + `@'${createStatements.host}' identified by '${createStatements.password}'`;
  let grantPrivilegesSql = `grant all privileges on ${createStatements.database}.* ` + `to '${createStatements.user}'@'${createStatements.host}'`;

  const Database = require('./databaseDebug.js');

  let database = new Database(createOptions);

  try {
    await database.doQuery(dropDatabaseSql);
    await database.doQuery(createDatabaseSql);
    if(createStatements.dropuser) {
      await database.doQuery(dropUserSql);
    }
    await database.doQuery(createUserSql);
    await database.doQuery(grantPrivilegesSql);

    database.options.database = createStatements.database;

    for(let newTable of createStatements.tables) {
      let createTable = `create table ${newTable.name}(\n${newTable.fields.join(',\n')})`;
      let insertData = `insert into ${newTable.name} values (?)`;
      await database.doQuery(createTable);
      let inserts = [];
      for(let data of newTable.data) {
        inserts.push(database.doQuery(insertData, data));
      }
      await Promise.all(inserts);
    }
  }

  catch(err) {
    console.log(err.message);
  }

}
