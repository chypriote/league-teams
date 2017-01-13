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
	
}