"use strict";

const firebase = require("firebase/app");
const getKey = require("../src/getKey");
const key = getKey();

require("firebase/auth");
require("firebase/database");

var config = {
  apiKey: key.key,
  databaseURL: key.url,
  authDomain: key.authurl,
  storageBucket: key.bucketUrl
};

firebase.initializeApp(config);

module.exports = firebase;
