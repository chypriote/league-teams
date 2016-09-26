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

Route::get('/user', function (Request $request) {
    return $request->user();
});


Route::resource('teams', 'TeamsController');

Route::resource('players', 'PlayersController');

Route::get('players/validate-id/{id}', 'PlayersController@idCheck')->name('validate-id');
Route::post('players/join-team', 'PlayersController@joinTeam')->name('join-team');
