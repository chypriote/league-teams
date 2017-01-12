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


Route::get('teams/latest/{number}', 'TeamsController@latest')->name('latest-teams');

Route::resource('teams', 'TeamsController');


Route::get('players/validate-id/{id}', 'PlayersController@idCheck')->name('validate-id');
Route::get('players/teamless', 'PlayersController@teamless')->name('team-less');
Route::get('players/latest/{number}', 'PlayersController@latest')->name('latest-players');
Route::post('players/join-team', 'PlayersController@joinTeam')->name('join-team');

Route::resource('players', 'PlayersController');
