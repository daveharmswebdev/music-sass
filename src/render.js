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
render.renderAddForm = () => $('.addFilter').append(addForm);
render.renderList = (data) => $('.list').append(list({songs: data}));

module.exports = render;