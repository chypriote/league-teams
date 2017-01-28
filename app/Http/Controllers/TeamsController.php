<?php

namespace App\Http\Controllers;

use App\Models\Player;
use Illuminate\Http\Request;
use App\Models\Team;
use Symfony\Component\HttpFoundation\JsonResponse;
use Validator;


class TeamsController extends Controller
{
	public function index()
	{
		$teams = Team::orderBy('name', 'asc')->get();
		foreach ($teams as $team) {
			$team->players = Player::where('team_id', $team->id)->orderBy('position', 'asc')->get();
			foreach ($team['players'] as $player) {
				$player->position = $player->positionText($player->position);
				$team[$player['position']] = [ 'name' => $player['name'], 'id' => $player['id']];
			}
			unset($team['players']);
		}
		return new JsonResponse($teams);
	}

	public function show($id)
	{
		if ($team = Team::find($id)) {
			$team->players = Player::where('team_id', $team->id)->orderBy('position', 'asc')->get();
			return new JsonResponse($team);
		}
		return new JsonResponse(null);
	}

	public function store(Request $request)
	{
		$validator = Validator::make($request->all(), [
			'name' => 'required',
			'tag' => 'required'
    ]);

    if ($validator->fails()) {
        return new JsonResponse($validator->errors(), 422);
    }

		try {
			$team = new Team();

			$team->name = $request->name;
			$team->tag = $request->tag;
			$team->logo = $request->logo;

			$team->save();
		} catch (\Exception $e) {
			if ($e->getCode() == 23000)
				return new JsonResponse('Team already exists', 400);
			return new JsonResponse($e->getMessage(), 400);
		}

		return new JsonResponse($team, 201);
	}

	public function update(Request $request)
	{
		$validator = Validator::make($request->all(), [
			'name' => 'required',
			'tag' => 'required'
		]);

		if ($validator->fails()) {
			return new JsonResponse($validator->errors(), 422);
		}

		try {
			$team = Team::findOrFail($request->id);

			$team->name = $request->name;
			$team->tag = $request->tag;
			$team->logo = $request->logo;

			$team->save();
		} catch (\Exception $e) {
			return new JsonResponse($e->getMessage(), 400);
		}

		return new JsonResponse($team, 201);
	}

	public function destroy($id)
	{
		if ($team = Team::find($id))
			return new JsonResponse($team->delete(), 200);
		return new JsonResponse(null, 404);
	}

	public function latest($number)
	{
		$teams = Team::orderBy('created_at', 'desc')->take($number)->get();
		return new JsonResponse($teams);
	}
}
