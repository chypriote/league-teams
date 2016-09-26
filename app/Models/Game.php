<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Game extends Model
{
	protected $fillable = [
		'red_team', 'blue_team', 'date', 'winner', 'is_ranked', 'is_offline', 'event_name',
	];

	public function teams()
	{
		return $this->hasMany('App\Team');
	}
}
