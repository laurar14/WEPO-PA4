/**
 * Bootstrap and start the game.
 */
$(function() {
	'use strict';

	var game		= new window.Game($('.GameCanvas'));
	var levels		= game.el.find('.Scoreboard');

	levels.addClass('is-visible');
	levels.find('.Levels-button-easy').one('click', function() {
		levels.removeClass('is-visible');
		game.start(30);
	});
	levels.find('.Levels-button-medium').one('click', function() {
		levels.removeClass('is-visible');
		game.start(60);
	});
	
	levels.find('.Levels-button-hard').one('click', function() {
		levels.removeClass('is-visible');
		game.start(90);
	});
});
