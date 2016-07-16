'use strict';

const fireBase = require('../src/fireBaseConfig');
const songsRef = fireBase.database().ref('songs');

function getSongs(callback) {
  songsRef.on('value', function(data) {
    console.log(data.val());
    callback(data);
  });
}

// function getSongs(callback) {
//   firebase.database().ref('song').on('value', function(songData) {
//     console.log('something happened');
//     callback(songData.val());
//   });
// }

module.exports = {
  getSongs
};
