//************************* Cattle Component for saving default genetic data *******//
var genome_default_data = {
	Cattle : {
		'Chromosomes of Equal Length': 'Yes',
		'Number of Chromosomes' : 29,
		'Chromosomes Info' : [
			{Length: 100, MD: 500, Recombination: 1},
		],
		'Default Traits' : [
			{
				'Trait Name' : "Milk",
				'Trait Unit' : "liters",
				'Trait Mean' : 9300,
				'Trait Std Deviation' : 900,
				'Trait Heritability' : 0.35,
				'Trait Number of Polygenic Loci' : 1000,
				'Trait Major QTL' : 1,
				'Trait Value per Unit' : 0,
				'Trait QTL Info' : [
					{
						'QTL SNP Number' : 'DGAT1',
						'QTL ID' : 'QTL DGAT1',
						'QTL BP' : 545,
						'QTL Chromosome' : 14,
						'QTL Effect AA' : 0,
						'QTL Effect AB' : -400,
						'QTL Effect BB' : -800,
						'QTL Allele Frequency' : 0.2,
						'QTL Optional Info' : 'DGAT1'
					}
				]
			},
			{
				'Trait Name' : "Fat",
				'Trait Unit' : "%",
				'Trait Mean' : 3.9,
				'Trait Std Deviation' : 0.4,
				'Trait Heritability' : 0.4,
				'Trait Number of Polygenic Loci' : 1000,
				'Trait Major QTL' : 1,
				'Trait Value per Unit' : 0,
				'Trait QTL Info' :[
					{
						'QTL SNP Number' : 'DGAT1',
						'QTL ID' : 'QTL DGAT1',
						'QTL BP' : 545,
						'QTL Chromosome' : 14,
						'QTL Effect AA' : 0,
						'QTL Effect AB' : 0.5,
						'QTL Effect BB' : 1,
						'QTL Allele Frequency' : 0.2,
						'QTL Optional Info' : 'DGAT1'
					}
				]
			},
			{
				'Trait Name' : "Protein",
				'Trait Unit' : "%",
				'Trait Mean' : 3.4,
				'Trait Std Deviation' : 0.3,
				'Trait Heritability' : 0.38,
				'Trait Number of Polygenic Loci' : 100,
				'Trait Major QTL' : 0,
				'Trait Value per Unit' : 0,
				'Trait QTL Info' : ''
			},
		],
		'Phenotypic Correlation': [
			{row: [ //1
				{val: 1}
			]},
			{row: [ //2
				{val: 0.1}, {val:1}
			]},
			{row: [ //3
				{val: 0.3}, {val:-0.2}, {val:1}
			]},
		],
		'Genetic Correlation': [
			{row: [ //1
				{val: 1}
			]},
			{row: [ //2
				{val: 0.3}, {val:1}
			]},
			{row: [ //3
				{val: 0.4}, {val:0.1}, {val:1}
			]},
		]
	},
	Sheep : {
		'Chromosomes of Equal Length' : 'Yes',
		'Number of Chromosomes' : 26,
		'Chromosomes Info' : [
			{Length: 100, MD: 500, Recombination: 1}, 
		],
		'Default Traits' : [],
		'Phenotypic Correlation': [],
		'Genetic Correlation': [],
	},
	Maize : {
		'Chromosomes of Equal Length' : 'Yes',
		'Number of Chromosomes' : 10,
		'Chromosomes Info': [
			{Length: 100, MD: 500, Recombination: 1}, 
		],
		'Default Traits' : [],
		'Phenotypic Correlation': [],
		'Genetic Correlation': [],
	},
	Pig : {
		'Chromosomes of Equal Length': 'Yes',
		'Number of Chromosomes' : 18,
		'Chromosomes Info': [
			{Length: 100, MD: 500, Recombination: 1}, // 
		],
		'Default Traits' : [],
		'Phenotypic Correlation': [],
		'Genetic Correlation': [],
	},
	Chicken : {
		'Chromosomes of Equal Length': 'Yes',
		'Number of Chromosomes' : 36,
		'Chromosomes Info': [
			{Length: 100, MD: 500, Recombination: 1}, // Chrom 1   
		],
		'Default Traits' : [],
		'Phenotypic Correlation': [],
		'Genetic Correlation': [],
	},
	Other : {
		'Chromosomes of Equal Length': 'Yes',
		'Number of Chromosomes' : 1,
		'Chromosomes Info': [
			{Length: 100, MD: 500, Recombination: 1}, // Chrom 1   
		],
		'Default Traits' : [],
		'Phenotypic Correlation': [],
		'Genetic Correlation': [],
	},
}
