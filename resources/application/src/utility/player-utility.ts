export class PlayerUtility {
	
	static romanToDecimal(roman: string) {
		switch (roman) {
			case "I":
				return 1;
			case "II":
				return 2;
			case "III":
				return 3;
			case "IV":
				return 4;
			case "V":
				return 5;
			default:
				return 0;
		}
	}
	
	static rankToDatabase(rank: string) {
		switch (rank) {
			case 'CHALLENGER':
				return '10_challenger';
			case 'MASTER':
				return '20_master';
			case 'DIAMOND':
				return '30_diamond';
			case 'PLATINUM':
				return '40_platinum';
			default:
				return null;
		}
	}
	
	static rankFromDatabase(rank: string) {
		switch (rank) {
			case '10_challenger':
				return 'CHALLENGER';
			case '20_master':
				return 'MASTER';
			case '30_diamond':
				return 'DIAMOND';
			case '40_platinum':
				return 'PLATINUM';
			default:
				return null;
		}
	}

	static positionToDatabase(position: string) {
		switch (position) {
			case 'top':
				return '10_top';
			case 'jungle':
				return '20_jungle';
			case 'mid':
				return '30_mid';
			case 'adc':
				return '40_adc';
			case 'support':
				return '50_support';
			default:
				return null;
		}
	}
	
	static positionFromDatabase(position: string) {
		switch (position) {
			case '10_top':
				return 'top';
			case '20_jungle':
				return 'jungle';
			case '30_mid':
				return 'mid';
			case '40_adc':
				return 'adc';
			case '50_support':
				return 'support';
			default:
				return null;
		}
	}
}