<template>
	<table>
		<tr><td colspan="100%"><h2>Economy</h2></td></tr>
		<tr class="header">
			<th v-for="prop in commoditiesProps" :key="prop.index">
				{{ prop }}
			</th>
		</tr>
		<tr v-for="commodity in commodities" :key="commodity.id">
			<td>{{ commodity.niceName }}</td>
			<td>{{ commodity.basePrice }}</td>
			<td>{{ commodity.flux }}</td>
			<td>{{ commodity.unitSize }}</td>
		</tr>
	</table>
</template>

<script>
	export default {
		name: 'economy',
		data() {
			return {
				commoditiesProps : [
					// TODO - find a better way to show props
					'Commodity',
					'Base Price',
					'Flux',
					'Unit Size'
				],
				commodities : [
					{
						id : 0,
						name : 'organicRations',
						niceName : 'Organic Rations',
						basePrice : 100,
						flux : .5,// .5 = 50% = price can be +/-50% + basePrice
						unitSize : 100
					},
					{
						id : 1,
						name : 'chargeCells',
						niceName : 'Charge Cells',
						basePrice : 120,
						flux : .3,
						unitSize : 10
					},
					{
						id : 2,
						name : 'securityRifles',
						niceName : 'Security Rifles',
						basePrice : 280,
						flux : .7,
						unitSize : 100
					},
					{
						id : 3,
						name : 'industrialLubricant',
						niceName : 'Industrial Lubricant',
						basePrice : 90,
						flux : .1,
						unitSize : 50
					}
				],
				constants : {
					startDate : "01.01.3001",
					startTime : "00.00.00"
				}
			}
		}
	}
</script>