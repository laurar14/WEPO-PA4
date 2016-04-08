
/**
 * Bootstrap and start the game.
 */
$(function() {
    'use strict';

    var game = new window.Game($('.GameCanvas'));
		var levels = game.el.find('.Levels');
		var beetRoot = game.el.find('.BeetRoot');
		


		levels.addClass('is-visible').find('.Levels-button-easy').one('click', function() {
			levels.removeClass('is-visible');
			game.start(0);
		});

		levels.addClass('is-visible').find('.Levels-button-medium').one('click', function() {
			levels.removeClass('is-visible');
			game.start(30);
		});
			levels.addClass('is-visible').find('.Levels-button-hard').one('click', function() {
			levels.removeClass('is-visible');
			game.start(60);
		});

    
});
