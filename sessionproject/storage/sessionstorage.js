'use strict';

module.exports = class SessionStorage{
  constructor(validityCheckIntervalMs = 10000, maxLife = 10000) {
    this.sessions = {};
    this.maxLife = maxLife;
    setInterval(() => this.validate(), validityCheckIntervalMs);
  }

  validate() {
    let time = new Date();
    for(let key of Object.keys(this.sessions)){
      if(this.sessions[key].session.cookie && this.sessions[key].sessions.cookie.maxAge) {
        if(this.sessions[key].sessions.cookie.maxAge < 0) {
          this.remove[key];
        }
      }
      else {
        if(time - this.sessions[key].timeStamp > this.maxLife) {
          this.remove[key];
        }
      }
    }
  }

  hasSession(sessionID) {
    return typeof this.sessions[sessionID] !== 'undefined';
  }

  addSession(sessionID, user, session) {
    if(this.hasSession(sessionID)) {
      return false;
    }
    else {
      this.removeUser(user);
      this.sessions[sessionID] = {user, session, timeStamp: new Date()};
      return true;
    }
  }

  removeUser(name) {
    for(let key of Object.keys(this.sessions)) {
      if(this.sessions[key].user === name) {
        delete this.sessions[key];
        return;
      }
    }
  }

  remove(sessionID) {
    if(!this.hasSession(sessionID)) {
      return;
    }
    else {
      delete this.sessions[sessionID];
    }
  }

  getUser(sessionID) {
    if(!this.hasSession(sessionID)) {
      return '';
    }
    else {
      this.sessions[sessionID].timeStamp = new Date();
      return this.sessions[sessionID].user;
    }
  }

  toString() {
    let sessionStr = '';
    for(let key of Object.keys(this.sessions)) {
      let tmpSes = this.sessions[key];
      let max = tmpSes.session.cookie.maxAge;
      sessionStr += `ID: ${key}: user:${tmpSes.user}, sessiondata: ${max}\n`;
    }
    return sessionStr;
  }
};
