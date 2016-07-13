'use strict';

// enables us to use jQuery and Handlebars
const $ = require('jQuery');
const Handlebars = require('hbsfy/runtime');

// handlebar templants
const nav = require('../src/templates/nav.hbs');
const body = require('../src/templates/body.hbs');
const filter = require('../src/templates/filter.hbs');

//test data
var albums = ['Summerteeth', 'Being There', 'The Whole Love'];
var artists = ['Wilco', 'The Shins', 'Bob Dylan'];

//register partials
Handlebars.registerPartial('nav', nav);
Handlebars.registerPartial('filter', filter);

$('body').append(body({
	albums: albums,
	artists: artists
}));
