window.Player = (function() {
	'use strict';

	var Controls	= window.Controls;
	var audioExtra	= document.getElementById('audioExtra');

	// All these constants are in em's, multiply by 10 pixels
	// for 1024x576px canvas.
	var SPEED				= 30; // * 10 pixels per second
	var HEIGHT				= 5;
	var INITIAL_POSITION_X	= 30;
	var INITIAL_POSITION_Y	= 25;

	var raised		= false;
	var movedUpLast	= false;

	var Player = function(el, game) {
		this.el			= el;
		this.game		= game;
		this.pos		= { x: 0, y: 0 };
		this.score		= 0;
		this.starSound	= document.getElementById('flappingAudio');
	};

	/**
	 * Resets the state of the player for a new game.
	 */
	Player.prototype.reset = function(level) {
		audioExtra.src	= '../sounds/gallop.wav';
		this.started	= false;
		this.pos.x		= INITIAL_POSITION_X;
		this.pos.y		= INITIAL_POSITION_Y;
		this.score		= 0;
		SPEED			= level;
		this.el.css('animation', '0.6s ebbing alternate infinite');
	};

	Player.prototype.onFrame = function(delta) {
		var self = this;

		if(Controls.keys.space) {
			self.started = true;
			self.pos.y	-= delta * SPEED;

			this.el.css('animation', 'none');

			if(!movedUpLast) {
				this.starSound.currentTime = 0;
				this.starSound.play();
			}

			movedUpLast = true;
		} else if(self.started) {
			self.pos.y += delta * SPEED;
			movedUpLast = false;
		}

		this.checkCollisionWithBounds();
		this.el.css('transform', 'translate(' + this.pos.x + 'em, ' + this.pos.y + 'em)');
	};

	Player.prototype.checkCollisionWithBounds = function() {
		var beetroot	= (this.game.beetroot);
		var beetX		= beetroot.pos.x;

		if(
			this.pos.y < 0 ||
			this.pos.y + HEIGHT > this.game.WORLD_HEIGHT ||
			(beetX < 22 && beetX > -10 && this.pos.y >= beetroot.pos.y-5)
			) {
			audioExtra.src	= '../sounds/neigh.wav';
			audioExtra.loop	= false;
			audioExtra.play();
			document.getElementById('score').innerHTML = this.score;

			return this.game.gameover();
		} else {
			audioExtra.play();
			audioExtra.loop = true;
			//if you are past half way over the beet you get +1 score
			if(beetX < -10 && beetX > -15) {
				if(!raised) {
					this.score++;
				}
				raised = true;
			} else {
				raised = false;
			}
		}
		document.getElementById('onScreenScore').innerHTML = this.score;
	};

	return Player;
})();
