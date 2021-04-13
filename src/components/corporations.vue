<template>
	<table>
		<tr><td colspan="100%"><h2>Corporations</h2></td></tr>
		<tr class="header">
			<th v-for="prop in corporationsProps" :key="prop.index">
				{{ prop }}
			</th>
		</tr>
		<tr v-for="corporation in corporations" :key="corporation.id">
			<td v-for="(v, k) in corporation" :key="k['id']">
				{{ v }}
			</td>
		</tr>
	</table>
</template>

<script>
export default  {
	name: 'corporations',
	data() {
		return {
			corporationsProps : [
				// TODO - find a better way to show props
				'ID',
				'Name',
				'Focus'
			],
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