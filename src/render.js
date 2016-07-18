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
// data is a list of unique albums and artists
render.filter = (albums, artists) => $('.addFilter').html(filter({albums: albums, artists: artists}));
// when a song is passed to the add form this is edit, no song tis is add
// probably should change name to addEditForm
render.addForm = song => $('.addFilter').html(addForm(song));
// renderLis is not being used, need to test and see if it can be deleted.
render.renderList = data => $('.list').append(list({songs: data}));
// this is what was written to replace render list
render.displaySongs= (data, heading) => {
	let songs = data.val();
	// songsArray is created to be passed to the hbs template
	let songsArray = [];
	for (let song in songs) {
		// passes id into the song object
		// which is passed to the html element
		// as a data attribute
		songs[song].id = song;
		songsArray.push(songs[song]);
	}
	$('.list').html(list({songs:songsArray, heading: heading}));
};

module.exports = render;

// render.renderFilter = data => $('.addFilter').append(filter({ albums: data.albums, artists: data.artists }));
