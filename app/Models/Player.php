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

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	protected $fillable = [
		'name', 'position',
	];

	public function team()
	{
		return $this->hasOne('App\Team');
	}
}
