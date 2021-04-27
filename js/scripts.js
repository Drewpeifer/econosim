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
// provides random integer between min and max (inclusive)
function getRandomInt(min, max) {
	// inclusive
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
// oscillates currentPrice value within flux range based on basePrice value and random roll
function bgsBackgroundFlux(economyData) {
	var possibleFlux = 0;

	$.each(economyData.commodities, function() {
		console.log(this.name + ' from ' + this.priceCurrent);
		possibleFlux = this.priceBase * this.flux;
		this.priceCurrent = getRandomInt(this.priceBase - possibleFlux, this.priceBase + possibleFlux);
		Vue.set(this, 'priceCurrent', getRandomInt(this.priceBase - possibleFlux, this.priceBase + possibleFlux));
		console.log('to ' + this.priceCurrent + ' ('+ possibleFlux + ')');
	});

	console.log('prices changed');
}
// jobData
// each job will have the following attributes:
// title, client, payout, cargo, destination, timeLimit
var totalJobCount = 0,
	titles = [
		'Job 1',
		'Job 2',
		'Job 3',
		'Job 4',
		'Job 5',
		'Job 6',
		'Job 7',
		'Job 8',
		'Job 9',
		'Job 10',
		'Job 11',
		'Job 12',
		'Job 13',
		'Job 14',
		'Job 15',
		'Job 16',
		'Job 17',
		'Job 18',
		'Job 19',
		'Job 20',
	],
	clients = [
		'Bobs Construction',
		'Mega Bites Burger Co.',
		'SuperSlick Oil Filters Inc',
		'Botanicorp Industries',
		'MaxTrax Vinyl',
		'Diesel Bros Auto Detailing',
		'Quark\'s Bar',
		'Garek\'s Simple Tailoring Service'
	],
	payouts = [
		1000,
		2000,
		3000,
		5000,
		8000,
		10000,
		15000,
		20000,
		50000
	],
	timeLimits = [
		1,
		3,
		5,
		10,
		20
	],
	destinations = [
		'Location 1',
		'Location 2',
		'Location 3',
		'Location 4',
		'Location 5'
	],
	cargoTypes = [
		'Gold',
		'Beer',
		'Hydrogen Energy Cells',
		'Unrefined Dilithium',
		'Laser Modulation Controllers',
		'Chewing Gum'
	],
	cargoAmounts = [
		1,
		10,
		100,
		500,
		1000,
		2000,
		5000,
		10000
	],
	riskLevels = [
		0,
		1,
		2,
		3
	];
// generates a single job
function createJob(i, jobList) {
	var job = {};

	console.log('creating job, totalJobCount = ' + totalJobCount);
	job.title = "Job " + totalJobCount;
	job.client = clients[getRandomInt(0, clients.length - 1)];
	console.dir(job);
	totalJobCount++;
	jobList.push(job);
}
// makes sure the jobList always has 10 entries
function populateJobList(jobList) {
	console.log('populating job list...');
	var jobs = jobList;

	if (jobs.length < 10) {
		console.log('WARNING: there are ' + jobs.length + ' jobs...');
		console.log('we need more jobs!');
		for (var i = jobs.length; i < (10 - jobs.length); i++) {
			console.log('generating job #' + i);
			createJob(i, jobList);
			console.log('pushed job! totalJobCount = ' + totalJobCount);
			console.dir(jobList);
		}
	} else {
		console.log('Jobs list is full :)');
	}
}

$(function() {
	// create empty list of jobs to be populated by populateJobList
	var jobList = [];
	populateJobList(jobList);
	// on page load, instantiate new timer
	var timer = new Timer();
	timer.start();
	setInterval(() => {
		const timeInSeconds = Math.round(timer.getTime() / 1000);
		document.getElementById('time').innerText = timeInSeconds;
	}, 100);
	// bind controls
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
	// kick timer off
	setInterval(() => {
		if (timer.isRunning) {
			bgsBackgroundFlux(economyData);
		}
	}, 3000);
});

// main Vue app, wraps market component
var app = new Vue({
		el: '#app',
		data: {
			counter : 1,
			economyData : economyData,
			factionData : factionData,
			corporationData : corporationData
		},
        methods: {

        }
});