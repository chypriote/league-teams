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
		return $this->hasMany('App\Models\Player');
	}

}
