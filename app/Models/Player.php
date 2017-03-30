<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Player extends Model
{
	const POSITION_TOP = '10_top';
	const POSITION_JUNGLE = '20_jungle';
	const POSITION_MID = '30_mid';
	const POSITION_ADC = '40_adc';
	const POSITION_SUPPORT = '50_support';

	const TIER_CHALLENGER = '10_challenger';
	const TIER_MASTER = '20_master';
	const TIER_DIAMOND = '30_diamond';
	const TIER_PLATINUM = '40_platinum';

	const COUNTRY_FRANCE = 'france';
	const COUNTRY_BELGIUM = 'belgium';
	const COUNTRY_SWISS = 'swiss';
	const COUNTRY_MOROCCO = 'morocco';
	const COUNTRY_LUXEMBOURG = 'luxembourg';

	protected $fillable = [
		'name', 'summoner_name', 'position', 'tier', 'division', 'lps', 'comment', 'country',
	];
	protected $guarded = [
		'riot_id'
	];

	public function team()
	{
			return $this->belongsTo('App\Models\Team');
	}

	public function previousteam()
	{
		return $this->belongsToMany('App\Models\Team', 'players_teams')->withPivot('team_id', 'player_id', 'is_current');
	}

	/**
	 * Returns a formatted tier for the frontend app
	 *
	 * @param $tier
	 * @return null|string
	 */
	static public function tierText($tier)
	{
		switch ($tier) {
			case Player::TIER_CHALLENGER:
				return 'CHALLENGER';
			case Player::TIER_MASTER:
				return 'MASTER';
			case Player::TIER_DIAMOND:
				return 'DIAMOND';
			case Player::TIER_PLATINUM:
				return 'PLATINUM';
			default:
				return null;
		}
	}

	/**
	 * Returns a formatted position for the frontend app
	 *
	 * @param $position
	 * @return null|string
	 */
	static public function positionText($position)
	{
		switch ($position) {
			case Player::POSITION_TOP:
				return 'top';
			case Player::POSITION_JUNGLE:
				return 'jungle';
			case Player::POSITION_MID:
				return 'mid';
			case Player::POSITION_ADC:
				return 'adc';
			case Player::POSITION_SUPPORT:
				return 'support';
			default:
				return null;
		}
	}

	/**
	 * Returns the number corresponding to a tier
	 *
	 * @param $tier
	 * @return mixed
	 */
	static private function tierNumber($tier)
{
	return array_search($tier, Player::getAvailableTiers());
}

	/**
	 * Returns wether the new rank is higher than the previous one
	 *
	 * @param $old_tier
	 * @param $old_division
	 * @param $new_tier
	 * @param $new_division
	 * @return bool
	 * @throws \Exception
	 */
	static public function isHigherRank($old_tier, $old_division, $new_tier, $new_division)
{
	if (!in_array($old_tier, Player::getAvailableTiers()) || !in_array($new_tier, Player::getAvailableTiers())) {
		throw new \Exception('[isHigherRank] invalid tier name');
	}

	if ($old_tier != $new_tier) {
		return Player::tierNumber($old_tier) < Player::tierNumber($new_tier);
	}

	return $old_division < $new_division;
}

	/**
	 * Checks validity of a division
	 *
	 * @param $division
	 * @return bool
	 */
	static public function isValidDivision($division)
{
	return $division > 0 && $division < 6;
}

	/**
	 * Returns existing tiers
	 *
	 * @return array
	 */
	static public function getAvailableTiers()
{
	return [
		Player::TIER_CHALLENGER,
		Player::TIER_MASTER,
		Player::TIER_DIAMOND,
		Player::TIER_PLATINUM,
	];
}

	/**
	 * Returns existing positions
	 *
	 * @return array
	 */
	static public function getAvailablePositions()
	{
		return [
			Player::POSITION_TOP,
			Player::POSITION_JUNGLE,
			Player::POSITION_MID,
			Player::POSITION_ADC,
			Player::POSITION_SUPPORT,
		];
	}

	/**
	 * Returns existing countries
	 *
	 * @return array
	 */
	static public function getAvailableCountries()
	{
		return [
			Player::COUNTRY_FRANCE,
			Player::COUNTRY_BELGIUM,
			Player::COUNTRY_SWISS,
			Player::COUNTRY_MOROCCO,
			Player::COUNTRY_LUXEMBOURG,
		];
	}
}
