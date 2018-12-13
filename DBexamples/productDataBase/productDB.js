'use strict';

const Database = require('./database');
const sqlStatements = require('./sqlStatements');
const options = require('./options');

const allSql = sqlStatements.getAllSql.join(' ');
const productSql = sqlStatements.getProductSql.join(' ');
const insertSql = sqlStatements.insertProductSql.join(' ');
const deleteSql = sqlStatements.deleteProductSql.join(' ');
const updateSql = sqlStatements.updateProductSql.join(' ');

class ProductDatabase{
  constructor(options, debug=false) {
    this.productDB = new Database(options, debug);
  }

  getAll() {
    return new Promise(async (resolve, reject) => {
      try {
        let result = await this.productDB.doQuery(allSql);
        resolve(result);
      }
      catch(err) {
        reject(fatalError(err));
      }
    });
  }

  get(productId) {
    return new Promise(async (resolve, reject) => {
      try {
        let result = await this.productDB.doQuery(productSql, +productId);
        if(result.length === 0) {
          reject(new Error('Product unknwon'));
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

  insert(product) {
    return new Promise(async (resolve,reject) => {
      try {
        let result = await this.productDB.doQuery(insertSql,
          +product.productId,
          product.name,
          product.model,
          +product.price,
          product.type
        );
        if(result.affectedRows === 0) {
          reject(new Error('No product was added.'));
        }
        else {
          resolve(`Product with id ${product.productId} was added.`);
        }
      }
      catch(err) {
        reject(fatalError(err));
      }
    });
  }

  delete(productId) {
    return new Promise(async (resolve,reject) => {
      try {
        let result = await this.productDB.doQuery(deleteSql, +productId);
        if(result.affectedRows === 0){
          reject(new Error('No such id'));
        }
        else {
          resolve(`Product with id ${productId} was deleted.`);
        }
      }
      catch(err) {
        reject(fatalError(err));
      }
    });
  }

  update(product) {
    return new Promise(async (resolve,reject) => {
      try {
        let result = await this.productDB.doQuery(updateSql, product.name, product.model, +product.price, product.type, +product.productId);
        if(result.affectedRows === 0) {
          reject(new Error('No data updated'));
        }
        else {
          resolve(`Product with id ${product.productId} was updated`);
        }
      }
      catch(err) {
        reject(fatalError(err));
      }
    });
  }

} // end of class

module.exports = function initDataStorage(debug=false) {
  return new ProductDatabase(options, debug);
};

function fatalError(err) {
  return new Error(`Error in application! Fix it! ${err.message}`);
}
