<template>
	<table>
		<tr><td colspan="100%"><h2>Factions</h2></td></tr>
		<tr class="header">
			<th v-for="prop in factionsProps" :key="prop.index">
				{{ prop }}
			</th>		</tr>
		<tr v-for="faction in factions" :key="faction.id">
			<td v-for="(v, k) in faction" :key="k['id']">
				{{ v }}
			</td>
		</tr>
	</table>
</template>

<script>
	export default {
		name: 'factions',
		data() {
			return {
				factionsProps : [
					// TODO - find a better way to show props
					'ID',
					'Name',
					'Focus'
				],
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