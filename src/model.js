'use strict';

const fireBase = require('../src/fireBaseConfig');
const songsRef = fireBase.database().ref('songs');
const _ = require('underscore');

var model = {};
model.getSongs = function(callback) {
  songsRef.on('value', function(data) {
    callback(data);
  });
};

model.getSnapShot = function() {
  return songsRef.once('value', function(snapShot) {
    return snapShot;
  });
};
model.addSong = function(song) {
  console.log(song);
  return songsRef.push(song);
};
model.deleteSong = function(songId) {
  return songsRef.child(songId).remove();
};
model.getSong = function(songId) {
  return songsRef.child(songId).once('value', function(snapShot) {
    return snapShot;
  });
};
model.editSong = function(songId, songObj) {
  console.log('edit', songId, songObj);
  return songsRef.child(songId).update(songObj);
};
model.filterSongs = function(value, arg) {
  return songsRef.orderByChild(value).equalTo(arg).once('value', function(snapShot) {
    return snapShot;
  });
};

module.exports = model;
