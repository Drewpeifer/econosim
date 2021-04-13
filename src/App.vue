<template>
	<h1>EconoSim</h1>
	<outputMonitor />
</template>

<script>
import outputMonitor from './components/outputMonitor.vue'
//import economy from './components/economy.vue'

export default {
	name: 'App',
	components: {
		outputMonitor
	}
}
</script>

<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
}
</style>
