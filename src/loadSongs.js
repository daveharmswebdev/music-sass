'use strict';

// model
const load = {};
const $ = require('jQuery');
const _ = require('underscore');
const render = require('../src/render.js');
let songs = [];

function pushToSongs(obj) {
    $.each(obj.songs, (key, val) => {
        songs.push(val);
    });
    console.log(songs);
}

load.read = function() {
    return new Promise((resolve, reject) => {
        $.ajax({
            // url: 'data/songs.json'
            url: 'https://music-history-7af37.firebaseio.com/.json'
        }).done(function(response) {
            console.log(response);
            pushToSongs(response);
            // creates data object to send to the renderBody function
            // and dispay initial screen on load
            let data = {};
            data.songs = songs;
            data.artists = load.getArtists();
            data.albums = load.getAlbums();
            console.log(data);
            resolve(data);
        }).fail(function(error) {
            reject(error);
        });
    });
};
load.setSongs = function(song) {
    songs.push(song);
    console.log(JSON.stringify(song));
    // let param = {
    //     "title": song.title,
    //     "artist": song.artist,
    //     "album": song.album
    // };
    // $.post("https://music-history-7af37.firebaseio.com/songs.json", param, function(data, status){
    //     console.log("Data: " + data + "\nStatus: " + status);
    // });
    $.ajax({
        url : "https://music-history-7af37.firebaseio.com/songs.json",
        type: "POST",
        data : JSON.stringify(song),
        success: function(data, textStatus, jqXHR) {
            console.log(data,textStatus,jqXHR);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR, textStatus, errorThrown);
        }
    });
};
load.getSongs = function() {
    return songs;
};
load.filter = function(artist, album) {
	let filteredSongs = [];
	if (artist !== 'No Selection') filteredSongs = songs.filter((song) => song.artist === artist);
	if (album !== 'No Selection') filteredSongs = songs.filter((song) => song.album === album);
	$('#list__post').remove();
	render.renderSongs(filteredSongs);
};
load.clearFilter = function() {
	$('#artistFilter').val('No Selection');
	$('#albumFilter').val('No Selection');
	$('#list__post').remove();
	render.renderSongs(songs);
};
load.getArtists = function() {
    // sorts and removes duplicates
    var artists = [];
    songs.forEach((song) => artists.push(song.artist));
    return _.uniq(artists).sort();
};
load.getAlbums = function() {
    // sorts and removes duplicates
    var albums = [];
    songs.forEach((song) => albums.push(song.album));
    return _.uniq(albums).sort();
};

module.exports = load;