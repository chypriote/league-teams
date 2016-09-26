<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Team extends Model
{

	const STARTING_ELO = 1200;

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	protected $fillable = [
		'name',
	];

	public function players()
	{
		return $this->belongsToMany('App\Models\Player', 'players_teams')->withPivot('player_id', 'team_id', 'is_current');
	}

}
