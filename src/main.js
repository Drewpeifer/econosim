import { createApp } from 'vue'
import App from './App.vue'
import $ from 'jquery'

createApp(App).mount('#app')

class Timer {
	// shamlessly ripped from https://stackoverflow.com/a/57981688/2302770
	constructor () {
		this.isRunning = false;
		this.startTime = 0;
		this.overallTime = 0;
	}

	_getTimeElapsedSinceLastStart () {
		if (!this.startTime) {
			return 0;
		}

		return Date.now() - this.startTime;
	}

	start () {
		if (this.isRunning) {
			return console.error('Timer is already running');
		}

		this.isRunning = true;

		this.startTime = Date.now();
	}

	stop () {
		if (!this.isRunning) {
			return console.error('Timer is already stopped');
		}

		this.isRunning = false;

		this.overallTime = this.overallTime + this._getTimeElapsedSinceLastStart();
	}

	reset () {
		this.overallTime = 0;

		if (this.isRunning) {
			this.startTime = Date.now();
			return;
		}

		this.startTime = 0;
	}

	getTime () {
		if (!this.startTime) {
			return 0;
		}
		if (this.isRunning) {
			return this.overallTime + this._getTimeElapsedSinceLastStart();
		}
		return this.overallTime;
	}
}

function getRandomInt(min, max) {
	// inclusive
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//////////////
// Page load, counter start, BGS binding
$(function() {
	$('#pauseTimer').bind('click', function() {
		let $this = $(this);

		if ($this.hasClass('paused')) {
			timer.start();
			$this.removeClass('paused');
		} else {
			timer.stop();
			$this.addClass('paused');
		}
	});
	$('#resetTimer').bind('click', function() {
		timer.reset();
	});
	const timer = new Timer();
	timer.start();
	setInterval(() => {
		const timeInSeconds = Math.round(timer.getTime() / 1000);
		document.getElementById('time').innerText = timeInSeconds;
	}, 100)
});