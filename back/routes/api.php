<?php

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Models\Team;

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

Route::get('/teams', function (Request $request) {
	return Team::all();
});

Route::post('teams', function (Request $request) {

	 $validator = Validator::make($request->all(), [
        'name' => 'required|max:255',
        'tag' => 'required|max:10',
    ]);

    if ($validator->fails()) {
        return new JsonResponse($validator->errors(), 422);
    }

	$team = new Team();

	$team->name = $request->name;
	$team->tag = $request->tag;
	$team->elo = Team::STARTING_ELO;

	$team->save();

	return new JsonResponse($team, 201);
});
