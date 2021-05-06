////////////////
// define timer
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
////////////////
// provides random integer between min and max (inclusive)
function getRandomInt(min, max) {
	// inclusive
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
////////////////
// gets random entry from array
function getRandomArrayItem(array) {
	return array[getRandomInt(0, array.length - 1)];
}
////////////////
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
////////////////
// flag the object with the highest value for a prop given
// the prop, the flag prop (what to set to "true"), and the array of objects
function flagHighestProp(prop, flagProp, array) {
	var leader = array.reduce((max, obj) => max[prop] > obj[prop] ? max : obj);

	$.each(array, function() {
		this[flagProp] = false;
	});
	leader[flagProp] = true;

	console.log('flagging highest ' + prop + '...');
	console.dir(leader);
}
////////////////
// jobData
// defines properties for jobs as they are created, stores static job-related data
var jobList = [],
	activeJobList = [],
	archivedJobList = [],
	totalJobCount = 0,
	jobTypes = [
	'Hub Delivery',
	'Delivery',
	'Multi-Point Delivery',
	'Source and Return',
	// 'Delay / Prevention'
	],
	hubList = [
		{
			id : 0,
			name : "Player Hub 1",
			location : '101 Center City',
			distance : 0,
			duration : 0
		}
	],
	clientList = [
		{
			id : 0,
			name : "Bob's Construction",
			location : '123 Main Street',
			distance : 5,
			duration : 5
		},
		{
			id : 1,
			name : "Mega Bites Burger Co.",
			location : '456 Market Street',
			distance : 5,
			duration : 5
		},
		{
			id : 2,
			name : "SuperSlick Oil Filters Inc",
			location : '2001 Frost Street',
			distance : 10,
			duration : 10
		},
		{
			id : 3,
			name : "Botanicorp Industries",
			location : '88 West End Ave',
			distance : 10,
			duration : 10
		},
		{
			id :4,
			name : "MaxTrax Vinyl",
			location : '22 Cherry Boulevard',
			distance : 15,
			duration : 15
		},
		{
			id : 5,
			name : "Diesel Bros Auto Detailing",
			location : '4345 Alphabet Circle',
			distance : 15,
			duration : 15
		},
		{
			id : 6,
			name : "Quark's Bar",
			location : '791 West Promenade',
			distance : 20,
			duration : 20
		},
		{
			id : 7,
			name : "Garek's Simple Tailoring Service",
			location : '634 East Promenade',
			distance : 20,
			duration : 20
		},
	];
////////////////
// generates a single job
function createJob(i, jobList) {
	var job = {};

	console.log('creating job, totalJobCount = ' + totalJobCount);
	job.id = totalJobCount;
	totalJobCount++;// increment now so ID stays unchanged, but title gets increment
	job.title = "Job " + totalJobCount;
	job.type = getRandomArrayItem(jobTypes);
	job.client = getRandomArrayItem(clientList);
	job.cargo = getRandomArrayItem(economyData.commodities);
	job.cargoAmount = getRandomInt(50,500);
	job.pickup = [];
	job.dropoff = [];
	job.duration = getRandomInt(5,30);
	job.riskLevel = getRandomInt(1,5);
	job.active = false;
	job.owner = '';
	job.completed = false;
	job.passed = false;

	console.log(job.title + ' is ' + job.type);

	switch (job.type) {
		case 'Hub Delivery':
			console.log('its a hub!');
			job.pickup.push(hubList[0]);
			job.dropoff.push(job.client);
			break;
		case 'Delivery':
		case 'Source and Return':
			// for now, setting S&R missions to have pickup = client so it adds to the duration of the job,
			// but normally this will be blank
			console.log('its a reg!');
			job.pickup.push(getRandomArrayItem(clientList));
			job.dropoff.push(job.client);
			break;
		case 'Multi-Point Delivery':
			var numberOfPickups = getRandomInt(2,4);// limiting possible pickups to 4 for now
			console.log('its a multipoint');
			for (var i = 0; i < numberOfPickups; i++) {
				console.log('i = ' + i + ', numberofpickups = ' + numberOfPickups);
				job.pickup.push(getRandomArrayItem(clientList));
			}
			job.dropoff.push(job.client);
		default:
		console.log('ERROR: Job type unknown');
	}

	// set duration of job based on durations of pickup + dropoff
	var durationSum = 0;
	$.each(job.pickup, function(i, v) {
		durationSum = durationSum + v.duration;
	});
	$.each(job.dropoff, function(i, v) {
		durationSum = durationSum + v.duration;
	});
	job.duration = durationSum;

	// calculate payout based on duration and risk level
	var payout = getRandomInt(1000,3000);// pick random base payout

	payout = payout * job.riskLevel;// multiply by riskLevel
	payout = payout + ((payout/100) * job.duration);// multiply duration in mins by 1% of payout, add to total payout
	payout = payout + (job.cargoAmount * (job.cargo.priceBase * .1));// add 10% commission based on price of goods transported
	if (job.type === 'Source and Return') {
		// add cost of goods plus 10% surcharge for S&R jobs
		var currentWorthOfGoods = job.cargoAmount * job.cargo.priceBase;
		payout = payout + (currentWorthOfGoods * .1) + (currentWorthOfGoods);
	}

	job.payout = Math.floor(payout);// set payout on job
	console.log('Created Job:');
	console.dir(job);
	jobList.push(job);// push job to jobList
}
////////////////
// on load
$(function() {
	///////////////////////////////////////
	// on page load, instantiate new timer
	window.timer = new Timer();
	window.timer.start();
	setInterval(() => {
		const timeInSeconds = Math.round(timer.getTime() / 1000);
		document.getElementById('time').innerText = timeInSeconds;
	}, 100);
	console.log('clients');
	console.dir(clientList);
	///////////////////////////////////////
	// bind controls
	$('#pauseTimer').bind('click', function() {
		let $this = $(this);

		if ($this.hasClass('paused')) {
			window.timer.start();
			$this.removeClass('paused');
		} else {
			window.timer.stop();
			$this.addClass('paused');
		}
	});
	$('#resetTimer').bind('click', function() {
		window.timer.reset();
	});
	///////////////////////////////////////
	// kick timer off
	setInterval(() => {
		if (window.timer.isRunning) {
			// fluctuate prices
			bgsBackgroundFlux(economyData);
			// create jobs (if needed)
			app.populateJobList(jobList);

		}
	}, 5000);
	setInterval(() => {
		if (window.timer.isRunning) {
			// distribute jobs
			app.bgsJobDistribution();
		}
	}, 6000);
	setInterval(() => {
		if (window.timer.isRunning) {
			// flag stats
			flagHighestProp('balance', 'highestBalance', corporationData.corporations);
		}
	}, 1000);
});
/////////////////////////////////////
// define Vue app config and methods
var app = new Vue({
	el: '#app',
	data: {
		economyData : economyData,
		factionData : factionData,
		corporationData : corporationData,
		jobList : jobList,
		activeJobList : activeJobList,
		archivedJobList : archivedJobList,
		totalJobCount : totalJobCount,
		timer : window.timer
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

			// randomize the order in which companies pick their jobs (for fairness)
			var shuffledCorps = this.corporationData.corporations
				.map((a) => ({sort: Math.random(), value: a}))
				.sort((a, b) => a.sort - b.sort)
				.map((a) => a.value);

			console.dir(this.corporationData.corporations);
			console.dir(shuffledCorps);
			console.dir(jobList);
			$.each(shuffledCorps, function(i, v) {
				console.dir(v);
				if (v.driversCount === 0) {
					// if there are no available drivers, skip this turn
					return;
				} else {
					// select a random job from the available list
					var selectedJob = getRandomArrayItem(jobList);
					// activate that job
					selectedJob.active = true;
					// set ownership of job
					selectedJob.owner = v;
					// modify relevant quantities
					v.driversCount--;
					v.driversActive++;
					v.jobsActive++;
					// set a timer for the job to complete
					setInterval(() => {
						if (window.timer.isRunning) {
							// complete job
							app.bgsJobCompletion(selectedJob);
						}
					}, selectedJob.duration * 1000);

					jobList.splice( $.inArray(selectedJob, jobList), 1 );
					activeJobList.push(selectedJob);
				}
			});
			document.getElementById('activeCount').innerText = activeJobList.length;
			document.getElementById('availableCount').innerText = jobList.length;// increment the active job (jobList) counter

		},
		bgsJobCompletion : function(job) {
			// unknown bug is causing duplicates to be pushed to archiveList,
			// trying to subvert here...
			if (job.completed) {
				return;
			}
			// risk levels are 0-5, so we get a random number between 1 and 10
			// and see if that number is higher than the risk level. this means
			// that risk level 5 = ~55% chance of success (we exclude 0)
			var risk = job.riskLevel,
				chance = getRandomInt(1,10),
				owner = job.owner;

			// calculate pass/fail
			if (chance >= risk) {
				// pass!
				// register completion with job
				console.log('job passed!');
				job.completed = true;
				job.passed = true;
				activeJobList.splice( $.inArray(job, activeJobList), 1 );
				archivedJobList.push(job);
				console.log('archived job...');
				document.getElementById('archivedCount').innerText = archivedJobList.length;
				// register completion with company
				owner.driversCount++;
				owner.driversActive--;
				owner.jobsActive--;
				owner.jobsPassed++;
				owner.balance = owner.balance + job.payout;
			} else {
				// failed!
				// register completion with job
				console.log('job failed!');
				job.completed = true;
				job.passed = false;
				activeJobList.splice( $.inArray(job, activeJobList), 1 );
				archivedJobList.push(job);
				console.log('archived job...');
				document.getElementById('archivedCount').innerText = archivedJobList.length;
				// register completion with company
				owner.driversCount++;
				owner.driversActive--;
				owner.jobsActive--;
				owner.jobsFailed++;
			}
		}
	}
});
