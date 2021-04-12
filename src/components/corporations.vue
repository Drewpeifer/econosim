<template>
	<tr class="header">
		<th>Corporation</th><th>Focus</th>
	</tr>
	<tr v-for="corporation in corporations" :key="corporation.id">
		<td>{{ corporation.name }}</td>
		<td>{{ corporation.focus }}</td>
	</tr>
</template>

<script>
export default  {
	name: 'corporations',
	data() {
		return {
			corporations : [
				{
					id : 0,
					name : 'DriveCorp',
					focus : 'driving'
				},
				{
					id : 1,
					name : 'CombatCorp',
					focus : 'combat'
				},
				{
					id : 2,
					name : 'ManageCorp',
					focus : 'management'
				},
				{
					id : 3,
					name : 'IndyCorp',
					focus : 'none'
				}
			],
		}
	}
}
</script>