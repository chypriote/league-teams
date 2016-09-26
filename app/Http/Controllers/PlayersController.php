<?php

namespace App\Http\Controllers;

use App\Managers\PlayerManager;
use App\Models\Team;
use Illuminate\Http\Request;
use App\Models\Player;
use Symfony\Component\HttpFoundation\JsonResponse;
use Validator;

class PlayersController extends Controller
{
	private $playerManager;

	function __construct()
	{
		$this->playerManager = new PlayerManager();
	}

	/**
	 * @return JsonResponse
	 */
	public function index()
	{
		return new JsonResponse(Player::all());
	}

	/**
	 * @param $id
	 * @return JsonResponse
	 */
	public function show($id)
	{
		$player = Player::find($id);
		$player->load('teams');

		if ($player)
			return new JsonResponse($player);
		return new JsonResponse(null);
	}

	/**
	 * @param Request $request
	 * @return JsonResponse
	 */
	public function store(Request $request)
	{
		$validator = Validator::make($request->all(), [
			'riot_id' => 'required',
			'name' => 'required',
			'summoner_name' => 'required',
			'position' => 'required|in:' . implode(',', Player::getAvailablePositions()),
			'tier' => 'required|in:' . implode(',', Player::getAvailableTiers()),
			'division' => 'required|numeric|min:1|max:5',
			'comment' => 'text'
		]);

		if ($validator->fails()) {
			return new JsonResponse($validator->errors(), 422);
		}

		try {
			$player = new Player($request->all());
			$player->save();
		} catch (\Exception $e) {
			if ($e->getCode() == 23000)
				return new JsonResponse('Player already exists', 400);
			return new JsonResponse($e->getMessage(), 400);
		}

		return new JsonResponse($player, 201);
	}

	public function update(Request $request)
	{
		$validator = Validator::make($request->all(), [
			'id' => 'required',
			'position' => 'nullable|in:' . implode(',', Player::getAvailablePositions()),
			'tier' => 'nullable|in:' . implode(',', Player::getAvailableTiers()),
			'division' => 'nullable|numeric|min:1|max:5',
			'comment' => 'nullable|string'
		]);

		if ($validator->fails()) {
			return new JsonResponse($validator->errors(), 422);
		}


		try {
			$newPlayer = new Player($request->all());
			$player = $this->playerManager->updatePlayer(Player::findOrFail($request->id), $newPlayer);

			$player->save();
		} catch (\Exception $e) {
			if ($e->getCode() == 23000)
				return new JsonResponse('Player already exists', 400);
			return new JsonResponse($e->getMessage(), 400);
		}

		return new JsonResponse($player, 201);
	}

	/**
	 * @param $id
	 * @return JsonResponse
	 */
	public function destroy($id)
	{
		if ($player = Player::find($id))
			return new JsonResponse($player->delete(), 200);
		return new JsonResponse(null, 404);
	}

	public function joinTeam(Request $request)
	{
		if (!($player = Player::find($request->player_id)))
			return new JsonResponse('Player not found', 400);

		if (!($team = Team::find($request->team_id)))
			return new JsonResponse('Team not found', 400);

		if ($player->teams()->save($team))
			return new JsonResponse($player->teams, 200);

		return new JsonResponse('An error has occured', 400);
	}

	public function idCheck($id)
	{
		$player = Player::where('riot_id', $id)->get();
		if ($player) {
			return new JsonResponse(['error' => "player already exists"], 400);
		}
		return new JsonResponse(null, 201);
	}
}
