'use strict';

// views
var $ = require('jQuery');
const Handlebars = require('hbsfy/runtime');
// handlebar templants
const nav = require('../src/templates/nav.hbs');
const body = require('../src/templates/body.hbs');
const filter = require('../src/templates/filter.hbs');
const list = require('../src/templates/list.hbs');
//register partials
Handlebars.registerPartial('nav', nav);
Handlebars.registerPartial('filter', filter);
Handlebars.registerPartial('list', list);

var render = {};
render.renderBody = function(data) {
	console.log('data: ', data)
	$('body').prepend(body({songs: data}));
};

module.exports = render;