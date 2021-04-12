<template>
	<tr class="header">
		<th>Faction</th><th>Focus</th>
	</tr>
	<tr v-for="faction in factions" :key="faction.id">
		<td>{{ faction.name }}</td>
		<td>{{ faction.focus }}</td>
	</tr>
</template>

<script>
	export default {
		name: 'factions',
		data() {
			return {
				factions : [
					{
						id : 0,
						name : 'DriveFaction',
						focus : 'driving'
					},
					{
						id : 1,
						name : 'CombatFaction',
						focus : 'combat'
					},
					{
						id : 2,
						name : 'ManageFaction',
						focus : 'management'
					},
				],
			}
		}
	}
</script>