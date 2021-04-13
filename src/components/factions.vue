<template>
	<table>
		<tr><td colspan="100%"><h2>Factions</h2></td></tr>
		<tr class="header">
			<th>Faction</th><th>Focus</th>
		</tr>
		<tr v-for="faction in factions" :key="faction.id">
			<td>{{ faction.name }}</td>
			<td>{{ faction.focus }}</td>
		</tr>
	</table>
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