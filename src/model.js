'use strict';

const fireBase = require('../src/fireBaseConfig');
// storing ref('songs') into songsRef
const songsRef = fireBase.database().ref('songs');
// using undersocre for the uniq function
const _ = require('underscore');

var model = {};
// firebase listener
model.getSongs = function(callback) {
  songsRef.on('value', function(data) {
    callback(data);
  });
};
// gets snapshot for edit function
model.getSnapShot = function() {
  return songsRef.once('value', function(snapShot) {
    return snapShot;
  });
};
model.addSong = song => songsRef.push(song);
model.deleteSong = songId => songsRef.child(songId).remove();
model.getSong = function(songId) {
  return songsRef.child(songId).once('value', function(snapShot) {
    return snapShot;
  });
};
model.editSong = (songId,songObj) => songsRef.child(songId).update(songObj);
// value is either album or artist, arg is artist name or album title
model.filterSongs = function(value, arg) {
  return songsRef.orderByChild(value).equalTo(arg).once('value', function(snapShot) {
    return snapShot;
  });
};

module.exports = model;
