import { createApp } from 'vue'
import App from './App.vue'
import $ from 'jquery'

createApp(App).mount('#app')

$(function() {
	console.log('page loaded!');
});