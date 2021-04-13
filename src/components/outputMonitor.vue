<template>
	<div class="output-monitor">
		<div>
			<p>Elapsed time: <span id="time">0</span>s</p>
			<button id="pauseTimer">Pause</button><button id="resetTimer">Reset*</button>
			<p><i>*Resets the timer, not the data</i></p>
		</div>
		<economy />
		<corporations />
		<factions />
	</div>
</template>

<script>
import economy from './economy.vue'
import corporations from './corporations.vue'
import factions from './factions.vue'
export default {
	name: 'outputMonitor',
	components: {
		economy,
		corporations,
		factions
	},
	data() {
		return {}
	},
	methods: {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
body {
	background: #f2f2f2;
}
button.paused {
	background: yellow;
}
h3 {
	margin: 40px 0 0;
}
ul {
	list-style-type: none;
	padding: 0;
}
li {
	display: inline-block;
	margin: 0 10px;
}
a {
	color: #42b983;
}
.output-monitor,
table {
	width: 80%;
	margin: 20px auto;
}
table, tr, th, td {
	border-collapse: collapse;
	border: 1px #333 solid;
}
tr td h2 {
	margin: 0;
}
tr.header {
	background: #333;
	color: #fff;
	margin-top: 20px;
}
tr.header th {
	border-right: #888 1px solid;
}
tr.header th:last-child {
	border-right: #000 1px solid;
}
</style>
