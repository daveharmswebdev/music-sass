'use strict';

const $ = require('jQuery');

$(function() {

	const model = require('../src/model');
	const render = require('../src/render');

	render.renderBody();
	render.addForm();
	model.getSongs(showList);

	function showList(data) {
		render.displaySongs(data);
	}

	function buildSongObj() {
		let songObj = {
			title: $("#titleInput").val(),
			artist: $("#artistInput").val(),
			album: $("#albumInput").val(),
			year: $("#yearInput").val()
		};
		console.log(songObj);

		return songObj;
	}

	$('body').on('click', '.editSong', function() {
		let songId = $(this).attr('data');
		console.log('edit', $(this), songId);
	});

	$('body').on('click', '.deleteSong', function() {
		let songId = $(this).attr('data');
		console.log('delete', $(this), songId);
	});

	$('body').on('click', '#addButton', () => {
		let songObj = buildSongObj();
		model.addSong(songObj)
		.then(function(data) {
			console.log('saved', data.key);
			$('.add__controls').each(function() {
				$(this).val('');
			});
		});
	});

});














// const loadSongs = require('../src/loadSongs.js');
// const render = require('../src/render.js');

// let songs;
//
// loadSongs.read().then((data) => {
// 	console.log(data);
// 	render.renderBody(data);
// 	render.renderFilter(data);
// 	console.log('data', data);
// 	render.renderList(data.songs);
// });
// $('body').on('click', '#addMusicLink', () => {
// 	console.log('add music');
// 	$('.filter').remove();
// 	render.renderAddForm();
// });
// $('body').on('click', '#filterMusicLink', () => {
// 	let data = {};
// 	data.artists = loadSongs.getArtists();
// 	data.albums = loadSongs.getAlbums();
// 	console.log(data);
// 	$('.add').remove();
// 	render.renderFilter(data);
// });
// $('body').on('click', '#addButton', () => {
// 	let newSong = {};
// 	newSong.title = $('#titleInput').val();
// 	newSong.artist = $('#artistInput').val();
// 	newSong.album = $('#albumInput').val();
// 	loadSongs.setSongs(newSong);
// 	$('.list--list').remove();
// 	render.renderList(loadSongs.getSongs());
// 	// need to add to songs array
// 	// need to push to firebase
// 	// rerender list
// });

































// enables us to use jQuery and Handlebars
// const $ = require('jQuery');
// const Handlebars = require('hbsfy/runtime');

// js modules

// handlebar templants
// const nav = require('../src/templates/nav.hbs');
// const body = require('../src/templates/body.hbs');
// const filter = require('../src/templates/filter.hbs');
// const list = require('../src/templates/list.hbs');

//test data
// let albums = ['Summerteeth', 'Being There', 'The Whole Love'];
// let artists = ['Wilco', 'The Shins', 'Bob Dylan'];
// let songs = [
// 	{title:'Kingpin', artist:'Wilco', album:'Being There'},
// 	{title:'Walk This Way', artist:'Areosmith', album:'Toys in the Attic'},
// 	{title:'Enter Sandman', artist:'Metallica', album:'Metallica'}
// ];

//register partials
// Handlebars.registerPartial('nav', nav);
// Handlebars.registerPartial('filter', filter);
// Handlebars.registerPartial('list', list);

// $('body').append(body({
// 	albums: albums,
// 	artists: artists,
// 	song: songs
// }));
