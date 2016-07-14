'use strict';

// model
const load = {};
const $ = require('jQuery');
const _ = require('underscore');
const render = require('../src/render.js');
let songs;

load.read = function() {
    $.ajax({
        url: 'data/songs.json'
    }).done(function(response) {
        songs = response.songs;
        // creates data object to send to the renderBody function
        // and dispay initial screen on load
        let data = {};
        data.songs = songs;
        data.artists = load.getArtists();
        data.albums = load.getAlbums();
        console.log(data);
    	render.renderBody(data);
    });
};
load.setSongs = function(song) {
    songs.push(song);
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