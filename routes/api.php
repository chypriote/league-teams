<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('user', function (Request $request) {
    return $request->user();
});

Route::group(['prefix' => 'players'], function() {
	Route::get('latest/{number}', 'TeamsController@latest')->name('latest-teams');
});
Route::resource('teams', 'TeamsController');

Route::group(['prefix' => 'players'], function() {
	Route::get('validate-id/{id}', 'PlayersController@idCheck')->name('validate-id');
	Route::get('teamless', 'PlayersController@teamless')->name('team-less');
	Route::get('latest/{number}', 'PlayersController@latest')->name('latest-players');
	Route::post('join-team', 'PlayersController@joinTeam')->name('join-team');

	Route::group(['prefix' => 'position'], function() {
		Route::get('all', 'PositionsController@all')->name('all-players');
		Route::get('top', 'PositionsController@top')->name('top-players');
		Route::get('jungle', 'PositionsController@jungle')->name('jungle-players');
		Route::get('mid', 'PositionsController@mid')->name('mid-players');
		Route::get('adc', 'PositionsController@adc')->name('adc-players');
		Route::get('support', 'PositionsController@support')->name('support-players');
	});
});
Route::resource('players', 'PlayersController');

Route::group(['prefix' => 'riot'], function() {
	Route::get('summoner/{id}', 'RiotController@getSummoner')->name('summoner');
	Route::get('summoner/by-name/{name}', 'RiotController@getSummonerName')->name('summoner-name');
	Route::get('summoner/league/{id}', 'RiotController@getSummonerLeague')->name('summoner-league');
});
