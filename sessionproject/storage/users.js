'use strict';

module.exports = class UserStorage {
  constructor() {
    this.users = new Map();
    //the password hash operation should be done so that passwords are not shown in clea text
    this.users.set('leila', {password:'xyz', role:'admin'});
    this.users.set('aapeli', {password:'123', role:'user'});
  }

  checkUser(name, password) {
    if(name === '') return false;
    if(!this.users.has(name)) return false;
    return password === this.users.get(name).password;
  }

  isAccepted(name, role) {
    if(name === '') return false;
    if(!this.users.has(name)) return false;
    return this.users.get(name).role === role;
  }
};
