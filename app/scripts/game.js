window.Game = (function() {
	'use strict';

	var audio		= document.getElementById('audio');
	var highscore	= 0;

	/**
	 * Main game class.
	 * @param {Element} el jQuery element containing the game.
	 * @constructor
	 */
	var Game = function(el) {
		var self		= this;
		this.el			= el;
		this.level		= 30;
		this.beetroot	= new window.BeetRoot(this.el.find('.BeetRoot'), self);
		this.player		= new window.Player(this.el.find('.playerBlock'), this);
		this.isPlaying	= false;
		// Cache a bound onFrame since we need it each frame.
		this.onFrame	= this.onFrame.bind(this);
	};

	/**
	 * Runs every frame. Calculates a delta and allows each game
	 * entity to update itself.
	 */
	Game.prototype.onFrame = function() {
		// Check if the game loop should stop.
		if (!this.isPlaying) {
			return;
		}

		// Calculate how long since last frame in seconds.
		var now = +new Date() / 1000,
		delta			= now - this.lastFrame;
		this.lastFrame	= now;

		// Update game entities.
		this.player.onFrame(delta);
		this.beetroot.onFrame(delta);
		
		if(this.player.started && this.isPlaying) {
			document.getElementById('GameCanvasBackground').style.animation ='bgMove 70s linear infinite';

			this.el.children('.ground').css('animation', 'bgMove2 5s linear infinite');
			this.el.css('animation', 'bgMove2 20s linear infinite');
		}
		else {
			document.getElementById('GameCanvasBackground').style.animation = 'none';
			this.el.css('animation', 'none');
			this.el.children('.ground').css('animation', 'none');
		}

		// Request next frame.
		window.requestAnimationFrame(this.onFrame);
	};

	/**
	 * Starts a new game.
	 */
	Game.prototype.start = function(level) {
		if(level !== undefined){
			this.level = level;
		}
		this.reset();

		// Restart the onFrame loop
		this.lastFrame = +new Date() / 1000;
		window.requestAnimationFrame(this.onFrame);
		this.isPlaying = true;

		audio.src = '/WEPO-PA4/app/sounds/circus_8bit.wav';
		audio.loop = true;
	};

	/**
	 * Resets the state of the game so a new game can be started.
	 */
	Game.prototype.reset = function() {
		this.player.reset(this.level);
		this.beetroot.reset(this.level);
	};

	/**
	 * Signals that the game is over.
	 */
	Game.prototype.gameover = function() {
		this.isPlaying = false;

		var that = this;
		
		if(that.player.score > highscore) {
			highscore = that.player.score;
		}

		document.getElementById('highscore').innerHTML = highscore;
		var scoreboardEl	= this.el.find('.Scoreboard');
		scoreboardEl.addClass('is-visible');

		scoreboardEl.find('.Levels-button-easy').one('click', function() {
			scoreboardEl.removeClass('is-visible');
			that.start(30);
		});

		scoreboardEl.find('.Levels-button-medium').one('click', function() {
			scoreboardEl.removeClass('is-visible');
			that.start(60);
		});
		scoreboardEl.find('.Levels-button-hard').one('click', function() {
			scoreboardEl.removeClass('is-visible');
			that.start(90);
		});

		audio.src	= '/WEPO-PA4/app/sounds/gameover_8bit.wav';
		audio.loop	= false;
	};

	/**
	 * Some shared constants.
	 */
	Game.prototype.WORLD_WIDTH	= 102.4;
	Game.prototype.WORLD_HEIGHT = 57.6;

	return Game;
})();


