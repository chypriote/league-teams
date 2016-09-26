<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Models\Player;


class PlayersController extends Controller
{
	public function index()
	{
		return Player::all();
	}

	public function show($id)
	{
		return Player::findOrFail($id);
	}

	public function store()
	{

		$validator = Validator::make($request->all(), [
        'name' => 'required|max:255',
        'position' => 'required|max:10',
    ]);

    if ($validator->fails()) {
        return new JsonResponse($validator->errors(), 422);
    }

		$player = new Player();

		$player->name = $request->name;
		$player->position = $request->position;

		$player->save();
		return new JsonResponse($player, 201);
	}

	public function update($id)
	{

	}

	public function destroy($id)
	{
		if ($player = Player::findOrFail($id))
			return new JsonResponse($player->delete(), 200);
		return new JsonResponse(null, 404);
	}
}
