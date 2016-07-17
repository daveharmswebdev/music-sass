/* jshint -W079 */
/* jshint -W117 */

'use strict';

const $ = require('jQuery');

$(function() {

	const model = require('../src/model');
	const render = require('../src/render');
	const _ = require('underscore');

	// initial load of screen
	render.renderBody();
	model.getSongs(showList);

	// helper functions
	// used for edit function to pass song back to
	// firebase
	function buildSongObj() {
		let songObj = {
			title: $("#titleInput").val(),
			artist: $("#artistInput").val(),
			album: $("#albumInput").val(),
			year: $("#yearInput").val()
		};
		return songObj;
	}

	// sends firebase data to render module
	// and gives heading to hbs file.
	function showList(data) {
		render.displaySongs(data, "Song List");
		getOptions();
	}

	// used to load the filter selects
	// goal is for the filter options to be updated
	// every time a new song is added to the firebase db
	function getOptions() {
		model.getSnapShot()
		.then(function(snapShot) {
			let artists = [],
			    albums = [];
			for (let key in snapShot.val()) {
				artists.push(snapShot.val()[key].artist);
				albums.push(snapShot.val()[key].album);
			}
			// uses underscore to find unique values
			// and sort
			artists = _.uniq(artists).sort();
			albums = _.uniq(albums).sort();
			// displays the filte form
			render.filter(albums, artists);
		});
	}


	$('body').on('click', '#btnFilter', function() {
		let artist = $('#artistFilter').val();
		let album = $('#albumFilter').val();
		let value,
				arg;
		// logic that requires some selection to be made for filtering
		if (artist === 'No Selection' && album === 'No Selection') {
			alert('No filter selection made');
		} else if (artist === 'No Selection') {
			value = 'album';
			arg = album;
		} else {
			value = 'artist';
			arg = artist;
		}
		model.filterSongs(value, arg)
		.then(function(songs) {
			let data = songs;
			render.displaySongs(data, `Song List - Filterd by ${value}: ${arg}`);
		})
		.catch(function(error) {
	    // Handle Errors here.
	    var errorCode = error.code;
	    var errorMessage = error.message;
	  });
	});

	$('body').on('click', '#btnClearFilter', function() {
		// resets selects back to no selection and enables the selects
		$('.filter__input').val('No Selection').change().prop('disabled', false);
	});


	$('body').on('change', '.filter__input', function() {
		event.preventDefault();
		let selectedId = $(this)[0];
		selectedId = selectedId.id;
		// once another select is chosen the other select is disabled
		// this might be overengineering, but I wanted this knowledge in
		// case I ever need to inverse select mutliple items
		$('.filter__input').filter(`:not(#${selectedId})`).prop('disabled', 'true');
	});

	$('body').on('click', '.editSong', function() {
		event.preventDefault();
		let songId = $(this).attr('data');
		model.getSong(songId)
		.then(function(song) {
			console.log(song.val());
			// changes the addform to an edit form
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
