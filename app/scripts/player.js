window.Player = (function() {
	'use strict';

	var Controls = window.Controls;
	var audioExtra = document.getElementById('audioExtra');

	// All these constants are in em's, multiply by 10 pixels
	// for 1024x576px canvas.
	var SPEED = 30; // * 10 pixels per second
	var WIDTH = 5;
	var HEIGHT = 5;
	var INITIAL_POSITION_X = 30;
	var INITIAL_POSITION_Y = 25;

	var raised = false;

	var Player = function(el, game) {
		this.el = el;
		this.game = game;
		this.pos = { x: 0, y: 0 };
		this.score = 0;
		this.starSound = new Audio("../sounds/star.wav");

	};

	/**
	 * Resets the state of the player for a new game.
	 */
	Player.prototype.reset = function() {
		audioExtra.src = '../sounds/gallop.wav';
		this.el.css('animation', '0.6s ebbing alternate infinite');
		this.started = false;
		this.pos.x = INITIAL_POSITION_X;
		this.pos.y = INITIAL_POSITION_Y;
		this.score = 0;

	};
//	this.el.css('animation', '0.4s ebbing alternate infinite');

	Player.prototype.onFrame = function(delta) {
		var self = this;
		// TODO FIX SO ACTS LIKE SPACE BAR

		if(Controls.keys.space) {
			self.started = true;
			self.pos.y -= delta * SPEED;
			this.el.css('animation', 'none');
			this.starSound.currentTime = 0;
			this.starSound.play();
		}

		else if(self.started){
			self.pos.y += delta * SPEED;
		}

		if(Controls.keys.up){
			console.log(this.game.beetroot.pos.x);
		}
		this.checkCollisionWithBounds();

		// Update UI
		this.el.css('transform', 'translate(' + this.pos.x + 'em, ' + this.pos.y + 'em)');
		
		//animation: 0.4s flap alternate infinite;
	};

	Player.prototype.checkCollisionWithBounds = function() {
		// CHECK COLLISSION WITH PIPES AND GROUND
		// Pipes, ground, ceiling??
		
		var beetroot = (this.game.beetroot);
		var beetX = beetroot.pos.x;

		if (
			this.pos.y < 0 ||
			this.pos.y + HEIGHT > this.game.WORLD_HEIGHT ||
			(beetX < 22 && beetX > -10 && this.pos.y >= beetroot.pos.y-5)
			) {
			
			audioExtra.src = '../sounds/neigh.wav';
			audioExtra.loop = false;
			audioExtra.play();

			return this.game.gameover();
		} else {
			audioExtra.play();
			audioExtra.loop = true;

			//if you are past half way over the beet you get +1 score
			if(beetX < 22 && beetX > -10) {
				if(!raised) {
					this.score++;
				}
				raised = true;
			} else {
				raised = false;
			}

		}

		document.getElementById('score').innerHTML = this.score;
	};

	return Player;

})();
