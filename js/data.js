var economyData = {
		commoditiesProps : [
			// TODO - find a better way to show props
			'ID',
			'Name',
			'NiceName',
			'Base Price',
			'Current Price',
			'Flux',
			'Unit Size'
		],
		commodities : [
			{
				id : 0,
				name : 'organicRations',
				niceName : 'Organic Rations',
				priceBase : 100,
				priceCurrent : 100,
				flux : .5,// .5 = 50% = price can be +/-50% + priceBase
				unitSize : 100
			},
			{
				id : 1,
				name : 'chargeCells',
				niceName : 'Charge Cells',
				priceBase : 120,
				priceCurrent : 120,
				flux : .3,
				unitSize : 10
			},
			{
				id : 2,
				name : 'securityRifles',
				niceName : 'Security Rifles',
				priceBase : 280,
				priceCurrent : 280,
				flux : .7,
				unitSize : 100
			},
			{
				id : 3,
				name : 'industrialLubricant',
				niceName : 'Industrial Lubricant',
				priceBase : 90,
				priceCurrent : 90,
				flux : .1,
				unitSize : 50
			}
		],
		constants : {
			startDate : "01.01.3001",
			startTime : "00.00.00"
		}
	},
	factionData = {
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
	},
	corporationData = {
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
				driversCount : 5,
				driversActive : 0,
				highestBalance : false
			},
			{
				id : 1,
				name : 'CombatCorp',
				balance: 50000,
				focus : 'combat',
				jobsAvailable : 0,
				jobsActive : 0,
				jobsCompleted : 0,
				driversCount : 4,
				driversActive : 0,
				highestBalance : false
			},
			{
				id : 2,
				name : 'ManageCorp',
				balance: 50000,
				focus : 'management',
				jobsAvailable : 0,
				jobsActive : 0,
				jobsCompleted : 0,
				driversCount : 3,
				driversActive : 0,
				highestBalance : false
			},
			{
				id : 3,
				name : 'IndyCorp',
				balance: 50000,
				focus : 'none',
				jobsAvailable : 0,
				jobsActive : 0,
				jobsCompleted : 0,
				driversCount : 4,
				driversActive : 0,
				highestBalance : false
			}
		],
	};