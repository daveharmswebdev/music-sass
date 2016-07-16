'use strict';

const fireBase = require('../src/fireBaseConfig');
const songsRef = fireBase.database().ref('songs');

function getSongs(callback) {
  songsRef.on('value', function(data) {
    console.log(data.val());
    callback(data);
  });
}

function addSong(song) {
  console.log(song);
  return songsRef.push(song);
}

function deleteSong(songId) {
  return songsRef.child(songId).remove();
}

function getSong(songId) {
  return songsRef.child(songId).once('value', function(snapShot) {
    return snapShot;
  });
}

// function editSong(songId, songObj) {
//
// }

module.exports = {
  getSongs,
  addSong,
  deleteSong,
  getSong
};
