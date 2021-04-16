//////////////
// Page load, counter start, BGS binding
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
$(function() {
		var timer = new Timer();
		timer.start();
		setInterval(() => {
			const timeInSeconds = Math.round(timer.getTime() / 1000);
			document.getElementById('time').innerText = timeInSeconds;
		}, 100);
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
		setInterval(() => {
			if (timer.isRunning) {
				app.counter++;
			}
		}, 3000);
	});

// main Vue app, wraps market component
var app = new Vue({
		el: '#app',
		data: {
			counter : 1
		},
        methods: {

        }
});