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
var jobList = [],
	jobProps = [
	'ID',
	'Title',
	'Client',
	'Pickup',
	'Dropoff',
	'Duration',
	'Risk',
	'Payout'
	],
	totalJobCount = 0,
	clients = [
	'Bobs Construction',
	'Mega Bites Burger Co.',
	'SuperSlick Oil Filters Inc',
	'Botanicorp Industries',
	'MaxTrax Vinyl',
	'Diesel Bros Auto Detailing',
	'Quark\'s Bar',
	'Garek\'s Simple Tailoring Service'
	];
// generates a single job
function createJob(i, jobList) {
	var job = {};

	console.log('creating job, totalJobCount = ' + totalJobCount);
	job.id = totalJobCount;
	totalJobCount++;// increment now so ID stays unchanged, but title gets increment
	job.title = "Job " + totalJobCount;
	job.client = clients[getRandomInt(0, clients.length - 1)];
	job.pickup = "Loc. #" + getRandomInt(0,100);
	job.dropoff = "Loc. #" + getRandomInt(0,100);
	job.duration = getRandomInt(5,30);
	job.riskLevel = getRandomInt(1,5);

	// calculate payout based on duration and risk level
	var payout = getRandomInt(1000,3000);// pick random base

	payout = payout * job.riskLevel;// multiply by riskLevel
	payout = Math.floor(payout + ((payout/100) * job.duration));// multiply duration in mins by 1% of payout, add to total payout
	job.payout = payout;// set payout on job
	console.dir(job);
	jobList.push(job);// push job to jobList
}

$(function() {
	///////////////////////////////////////
	// on page load, instantiate new timer
	var timer = new Timer();
	timer.start();
	setInterval(() => {
		const timeInSeconds = Math.round(timer.getTime() / 1000);
		document.getElementById('time').innerText = timeInSeconds;
	}, 100);
	///////////////////////////////////////
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
	///////////////////////////////////////
	// kick timer off
	setInterval(() => {
		if (timer.isRunning) {
			// fluctuate prices
			bgsBackgroundFlux(economyData);
			// create jobs (if needed)
			app.populateJobList(jobList);

		}
	}, 3000);
	setInterval(() => {
		if (timer.isRunning) {
			// distribute jobs
			app.bgsJobDistribution();
		}
	}, 5000);
});

var app = new Vue({
	el: '#app',
	data: {
		economyData : economyData,
		factionData : factionData,
		corporationData : corporationData,
		jobList : jobList,
		jobProps : jobProps,
		totalJobCount : totalJobCount
	},
	methods: {
		populateJobList : function(jobList) {
			// makes sure the jobList always has 10 entries
			console.log('populating job list...');
			var jobs = jobList;

			if (jobs.length < 10) {
				console.log('WARNING: there are ' + jobs.length + ' jobs...');
				console.log('we need more jobs!');
				for (var i = jobs.length; jobs.length < 10; i++) {
					console.log('generating job #' + i);
					createJob(i, jobList);
					console.log('pushed job! jobsList contains ' + jobList.length + ' jobs and totalJobCount = ' + totalJobCount);
					console.dir(jobList);
					document.getElementById('jobCount').innerText = totalJobCount;// increment the totalJob counter
					document.getElementById('availableCount').innerText = jobList.length;// increment the active job (jobList) counter
				}
			} else {
				console.log('Jobs list is full :)');
			}
			return totalJobCount;
		},
		bgsJobDistribution : function() {
			console.log('distributing available jobs...');

			var shuffledCorps = this.corporationData.corporations
				.map((a) => ({sort: Math.random(), value: a}))
				.sort((a, b) => a.sort - b.sort)
				.map((a) => a.value);

			console.dir(this.corporationData.corporations);
			console.dir(shuffledCorps);
		}
	}
});
