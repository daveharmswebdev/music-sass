'use strict';

const $ = require('jQuery');
const test = require('../src/templates/test.hbs');
const Handlebars = require('hbsfy/runtime');
const special = require('../src/templates/special.hbs');
var special2 = require('../src/templates/specialSpecial.hbs');

let cities = ['Nashville', 'San Francisco'];

Handlebars.registerPartial('special', special);
Handlebars.registerPartial('specialSpecial', special2);
Handlebars.registerHelper('bold', function(data, options) {
	console.log(data);
	let result = '<strong>' + data + '</strong>';
	return new Handlebars.SafeString(result);
});
Handlebars.registerHelper('bold2', function(data, options) {
	console.log(data);
	let result = '<strong>' + data.length + '</strong>';
	return new Handlebars.SafeString(result);
});

$('body').append(test({cities: cities, body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero eum ipsa accusantium, id saepe deserunt eligendi quae unde est fuga molestias laborum, sed expedita adipisci repellat dolorum, quidem, fugit iure.', title: 'Dave'}));
