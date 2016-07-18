/* jshint -W079 */
/* jshint -W117 */

'use strict';

const $ = require('jQuery');

$(function() {

	let login = require('../src/login');
	const model = require('../src/model');
	const render = require('../src/render');
	const _ = require('underscore');

	// initial load of screen
	render.renderBody();
	// uses firebase on, change listener
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
		if ($('.filter').length) getOptions();
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
			// and sort had to use lowercase to sort
			// alphabetically properly
			artists = _.uniq(artists.map(artist => artist.toLowerCase()).sort());
			albums = _.uniq(albums.map(album => album.toLowerCase()).sort());
			// displays the filter form
			render.filter(albums, artists);
		});
	}

	// nav control Handlebars
	$('body').on('click', '#login', function() {
		login()
		.then(function(result) {
			let user = result.user;
			console.log('login', user);
		}).catch(function(error) {
			// Handle Errors here.
			var errorCode = error.code;
			var errorMessage = error.message;
			// The email of the user's account used.
			var email = error.email;
			// The firebase.auth.AuthCredential type that was used.
			var credential = error.credential;
			// ...
		});
	});

	$('body').on('click','.nav__links__items', function() {
		let linkEl = $(this)[0].id;
		 switch (linkEl) {
			 case 'filterMusicLink':
			 	// the getOtpions method has the render.filter() call
			 	getOptions();
			 	break;
			 case 'addMusicLink':
			 	render.addForm();
			 	break;
			 case 'viewMusicLink':
			 	// needs snapShot to pass to showList()
				model.getSnapShot()
				.then(function(snapShot) {
					showList(snapShot);
				})
				.catch(function(error) {
			    // Handle Errors here.
			    var errorCode = error.code;
			    var errorMessage = error.message;
					console.log(errorCode, errorMessage);
			  });
			 	break;
		 }
	});

	$('body').on('click', '#btnFilter', function() {
		let artist = $('#artistFilter').val();
		let album = $('#albumFilter').val();
		let value,
				arg;
		// logic that requires some selection to be made for filtering
		if (artist === 'No Selection') {
			value = 'album';
			arg = album;
		} else {
			value = 'artist';
			arg = artist;
		}
		model.filterSongs(value, arg)
		.then(function(songs) {
			let data = songs;
			// passes data and heading info to render.displaySongs();
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
		// and disables the filter button
		$('.filter__input').val('No Selection').change().prop('disabled', false);
		$('#btnFilter').prop('disabled', 'disabled');
	});


	$('body').on('change', '.filter__input', function() {
		event.preventDefault();
		let selectedId = $(this)[0];
		selectedId = selectedId.id;
		// once another select is chosen the other select is disabled
		// this might be overengineering, but I wanted this knowledge in
		// case I ever need to inverse select mutliple items
		$('.filter__input').filter(`:not(#${selectedId})`).prop('disabled', 'true');
		// enable filter button now that there is a select change
		$('#btnFilter').prop('disabled', '');
	});

	$('body').on('click', '.editSong', function() {
		event.preventDefault();
		let songId = $(this).attr('data');
		// gets song data from firebase
		model.getSong(songId)
		.then(function(song) {
			console.log(song.val());
			// changes the addform to an edit form
			// just displays the data in the text boxes and
			// waits for use to click edit button see logic below
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
				// clears out the text boxes
				$('.add__controls').each(function() {
					$(this).val('');
				});
			});
		} else {
			// if data is not add it is a id,
			// which means we will be editing
			let songId = $(this).attr('data');
			let songObj = buildSongObj();
			model.editSong(songId, songObj)
			.then(function() {
				// resets the add form back to add
				$('#addHeading').html('Add Song');
				$('#addButton').html('Add');
				$('#addButton').attr('data', "add");
				// clears out the text boxes
				$('.add__controls').each(function() {
					$(this).val('');
				});
			});
		}
	});
});
