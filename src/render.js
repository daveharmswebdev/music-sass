'use strict';

// views
var $ = require('jQuery');
const Handlebars = require('hbsfy/runtime');
// handlebar templates
const nav = require('../src/templates/nav.hbs');
const body = require('../src/templates/body.hbs');
const filter = require('../src/templates/filter.hbs');
const list = require('../src/templates/list.hbs');
const addForm = require('../src/templates/addForm.hbs');
//register partials
Handlebars.registerPartial('nav', nav);
Handlebars.registerPartial('list', list);

var render = {};
render.renderBody = () => $('body').append(body);
render.renderFilter = (data) => {
	$('.addFilter').append(filter({
		albums: data.albums,
		artists: data.artists
	}));
};
render.filter = (albums, artists) => $('.addFilter').html(filter({albums: albums, artists: artists}));
render.addForm = (song) => $('.addFilter').html(addForm(song));
render.renderList = (data) => $('.list').append(list({songs: data}));
render.displaySongs= (data, heading) => {
	let songs = data.val();
	let songsArray = [];
	for (let song in songs) {
		songs[song].id = song;
		songsArray.push(songs[song]);
	}
	console.log(songsArray);
	$('.list').html(list({songs:songsArray, heading: heading}));
};

module.exports = render;
