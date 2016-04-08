window.BeetRoot = (function() {
	'use strict';

	var Controls = window.Controls;

	// All these constants are in em's, multiply by 10 pixels
	// for 1024x576px canvas.
	var SPEED = 25.6; // * 10 pixels per second
	var WIDTH = 40;
	var HEIGHT = 50;
	var INITIAL_POSITION_X = 60;
	var INITIAL_POSITION_Y = 25; // between, 18 and 30,

	var BeetRoot = function(el, game) {
		this.el = el;
		this.game = game;
		this.pos = { x: 0, y: 0 };
		this.ys = {1: 18, 2: 19, 3: 20, 4:21, 5:22, 6:26, 7:28};
	};

	/**
	 * Resets the state of the player for a new game.
	 */
	BeetRoot.prototype.reset = function(x) {
		this.started = false;
		this.pos.x = INITIAL_POSITION_X;
		this.pos.y = INITIAL_POSITION_Y;
		this.level = x;
		this.el.css('display', 'block');

	};
//	this.el.css('animation', '0.4s ebbing alternate infinite');

	BeetRoot.prototype.onFrame = function(delta) {
		var self = this;
		// TODO FIX SO ACTS LIKE SPACE BAR

		if(Controls.keys.space && self.started === false) {
			self.started = true;
		}

		else if(self.started){
			self.pos.x -= delta * (SPEED + this.level);
			if(self.pos.x <= -30){
				self.pos.x = 120;
				var newY = Math.round(Math.random() * (7 - 1) + 1);
				console.log('new y ' + self.ys[newY]);
				self.pos.y = self.ys[newY];
			}
		}

		// Update UI
		this.el.css('transform', 'translate(' + this.pos.x + 'em, ' + this.pos.y + 'em)');
		
		//animation: 0.4s flap alternate infinite;
	};

	return BeetRoot;

})();
