<template>
	<div class="table-wrapper">
		<h2>Output Monitor</h2>
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
.table-wrapper,
table {
	width: 80%;
	margin: 20px auto;
}
.table-wrapper {
	border: 1px #000 solid;
}
table {
	border-collapse: collapse;
}
table, td, th {
	border: 10px #333 solid;
}
td, th {
	padding: 10px;
}
tr.header {
	background: #333;
	color: #fff;
	margin-top: 20px;
	border-top:10px #fff solid;
}
tr td h2 {
	margin: 0;
}
</style>
