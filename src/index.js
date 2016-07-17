/* jshint -W079 */
/* jshint -W117 */

'use strict';

const $ = require('jQuery');

$(function() {

	const model = require('../src/model');
	const render = require('../src/render');
	const _ = require('underscore');

	render.renderBody();
	model.getSongs(showList);


	function showList(data) {
		let heading = 'Song List';
		render.displaySongs(data, heading);
		getOptions();
	}

	function getOptions() {
		console.log('getoptions called');
		model.getSnapShot()
		.then(function(snapShot) {
			let artists = [],
			    albums = [];
			for (let key in snapShot.val()) {
				artists.push(snapShot.val()[key].artist);
				albums.push(snapShot.val()[key].album);
			}
			artists = _.uniq(artists).sort();
			albums = _.uniq(albums).sort();
			console.log(albums, artists);
			render.filter(albums, artists);
		});
	}

	$('body').on('click', '#btnFilter', function() {
		let artist = $('#artistFilter').val();
		let album = $('#albumFilter').val();
		let value,
				arg;
		if (artist === 'No Selection' && album === 'No Selection') {
			alert('No filter selection made');
		} else if (artist === 'No Selection') {
			value = 'album';
			arg = album;
		} else {
			value = 'artist';
			arg = artist;
		}
		console.log('click filter', value, arg);
		model.filterSongs(value, arg)
		.then(function(songs) {
			console.log(songs.val());
		});
	});

	$('body').on('click', '#btnClearFilter', function() {
		console.log('click ClearFilter');
		$('#artistFilter').val('No Selection').change();
		$('#albumFilter').val('No Selection').change();
	});

	function buildSongObj() {
		let songObj = {
			title: $("#titleInput").val(),
			artist: $("#artistInput").val(),
			album: $("#albumInput").val(),
			year: $("#yearInput").val()
		};
		return songObj;
	}

	$('body').on('click', '.editSong', function() {
		let songId = $(this).attr('data');
		model.getSong(songId)
		.then(function(song) {
			console.log(song.val());
			render.addForm(song.val());
			$('#addHeading').html('Edit Song');
			$('#addButton').html('Edit');
			$('#addButton').attr('data', songId);
		});
	});

	$('body').on('click', '.deleteSong', function() {
		let songId = $(this).attr('data');
		model.deleteSong(songId)
		.then(function() {
			console.log('deleted ', songId);
		});
	});

	$('body').on('click', '#addButton', function() {
		// need to prevent empty songs from being added
		// need to finish if statement and then add the edit functionality
		if($(this).attr('data') === "add") {
			let songObj = buildSongObj();
			model.addSong(songObj)
			.then(function(data) {
				console.log('saved', data.key);
				$('.add__controls').each(function() {
					$(this).val('');
				});
			});
		} else {
			console.log('we will edit', $(this).attr('data'),buildSongObj());
			let songId = $(this).attr('data');
			let songObj = buildSongObj();
			model.editSong(songId, songObj)
			.then(function() {
				console.log('edited');
				$('#addHeading').html('Add Song');
				$('#addButton').html('Add');
				$('#addButton').attr('data', "add");
				$('.add__controls').each(function() {
					$(this).val('');
				});
			});
		}
	});
});
































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
