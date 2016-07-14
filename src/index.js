'use strict';

const loadSongs = require('../src/loadSongs.js');
var render = require('../src/render.js');

loadSongs.read();


































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
