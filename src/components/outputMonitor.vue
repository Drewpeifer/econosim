<template>
	<div class="table-wrapper">
		<h2>Output Monitor</h2>
		<table>
			<economy />
			<corporations />
			<factions />
		</table>
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
		methods: {
// assignRandomAlly(id) {
//   console.log('assigning random ally, id = ' + id);
//   console.dir(this.factions);
//   // if (id != undefined) {
//   //   let ally = this.factions.find(faction => faction.id === id);
//   //   return ally;
//   // } else {
//   //   return 'none';
//   // }
// },
},
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
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
table {
	margin: 20px auto;
	border-collapse: collapse;
}
table, td, th {
	border: 1px #000 solid;
}
td, th {
	padding: 10px;
}
tr.header {
	background: #333;
	color: #fff;
}
</style>
