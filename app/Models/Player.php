<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Player extends Model
{
	const POSITION_TOP = 'top';
	const POSITION_JUNGLE = 'jungle';
	const POSITION_MID = 'mid';
	const POSITION_ADC = 'adc';
	const POSITION_SUPPORT = 'support';

	const TIER_CHALLENGER = 'CHALLENGER';
	const TIER_MASTER = 'MASTER';
	const TIER_DIAMOND = 'DIAMOND';
	const TIER_PLATINUM = 'PLATINUM';

	protected $fillable = [
		'name', 'summoner_name', 'position', 'tier', 'division', 'comment'
	];
	protected $guarded = [
		'riot_id'
	];

	public function teams()
	{
		return $this->belongsToMany('App\Models\Team', 'players_teams')->withPivot('team_id', 'player_id', 'is_current');
	}

	static private function tierNumber($tier)
	{
		return array_search($tier, Player::getAvailableTiers());
	}

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

	static public function isValidDivision($division)
	{
		return $division > 0 && $division < 6;
	}

	static public function getAvailableTiers()
	{
		return [
			Player::TIER_CHALLENGER,
			Player::TIER_MASTER,
			Player::TIER_DIAMOND,
			Player::TIER_PLATINUM,
		];
	}

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
}
