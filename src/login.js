"use strict";
let firebase = require("./fireBaseConfig"),
    provider = new firebase.auth.GoogleAuthProvider();

function logInGoogle() {
  return firebase.auth().signInWithPopup(provider);
}

module.exports = logInGoogle;
