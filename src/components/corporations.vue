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
				'$',
				'Focus',
				'Jobs (Available)',
				'Jobs (Active)',
				'Jobs (Completed)',
				'Drivers (Total)',
				'Drivers (Active)'
			],
			corporations : [
				{
					id : 0,
					name : 'DriveCorp',
					balance: 50000,
					focus : 'driving',
					jobsAvailable : 0,
					jobsActive : 0,
					jobsCompleted : 0,
					driversCount : 200,
					driversActive : 0
				},
				{
					id : 1,
					name : 'CombatCorp',
					balance: 40000,
					focus : 'combat',
					jobsAvailable : 0,
					jobsActive : 0,
					jobsCompleted : 0,
					driversCount : 100,
					driversActive : 0
				},
				{
					id : 2,
					name : 'ManageCorp',
					balance: 70000,
					focus : 'management',
					jobsAvailable : 0,
					jobsActive : 0,
					jobsCompleted : 0,
					driversCount : 150,
					driversActive : 0
				},
				{
					id : 3,
					name : 'IndyCorp',
					balance: 60000,
					focus : 'none',
					jobsAvailable : 0,
					jobsActive : 0,
					jobsCompleted : 0,
					driversCount : 125,
					driversActive : 0
				}
			],
		}
	}
}
</script>