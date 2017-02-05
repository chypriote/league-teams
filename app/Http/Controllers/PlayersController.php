<?php

namespace App\Http\Controllers;

use App\Exceptions\Error;
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
		$players = Player::orderBy('tier', 'asc')->orderBy('division', 'asc')->orderBy('lps', 'desc')->paginate(15);
		foreach ($players as $player) {
			$player->team;
			$player->tier = Player::tierText($player->tier);
			$player->position = Player::positionText($player->position);
		}
		return new JsonResponse($players);
	}

	/**
	 * @param $id
	 * @return JsonResponse
	 */
	public function show($id)
	{
		$player = Player::find($id);

		if ($player) {
			if ($player->team) {
				$player->team->players = Player::where('team_id', $player->team->id)->orderBy('position', 'asc')->get();
				foreach ($player->team->players as $mate) {
					$mate->tier = Player::tierText($mate->tier);
					$mate->position = Player::positionText($mate->position);
				}
			}
			$player->tier = Player::tierText($player->tier);
			$player->position = Player::positionText($player->position);
			return new JsonResponse($player);
		}
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
			'lps' => 'required|numeric|min:0',
			'comment' => 'text'
		]);

		if ($validator->fails()) {
			return new JsonResponse(new Error('validation', $validator->errors()), 422);
		}

		try {
			$player = new Player($request->all());
			$player->riot_id = $request->riot_id;
			$player->save();
		} catch (\Exception $e) {

			if ($e->getCode() == 23000)
				return new JsonResponse(new Error('exists', 'Le joueur existe déjà'), 400);

			return new JsonResponse(new Error('unknown', 'Une erreur inconnue s\'est produite'), 400);
		}

		$player->tier = Player::tierText($player->tier);
		$player->position = Player::positionText($player->position);
		return new JsonResponse($player, 201);
	}

	public function update(Request $request)
	{
		$validator = Validator::make($request->all(), [
			'id' => 'required',
			'position' => 'nullable|in:' . implode(',', Player::getAvailablePositions()),
			'tier' => 'nullable|in:' . implode(',', Player::getAvailableTiers()),
			'division' => 'nullable|numeric|min:1|max:5',
			'lps' => 'nullable|numeric|min:0',
			'comment' => 'nullable|string'
		]);

		if ($validator->fails()) {
			return new JsonResponse(new Error('validation', $validator->errors()), 422);
		}


		try {
			$newPlayer = new Player($request->all());
			$player = $this->playerManager->updatePlayer(Player::findOrFail($request->id), $newPlayer);

			$player->save();
		} catch (\Exception $e) {
			return new JsonResponse(new Error('unknown', 'Une erreur inconnue s\'est produite'), 400);
		}

		$player->tier = Player::tierText($player->tier);
		$player->position = Player::positionText($player->position);
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
			return new JsonResponse(new Error('not_found', 'Le joueur n\'a pas été trouvé'), 400);

		if ($request->team_id == 0) {
			$player->team_id = 0;
			$player->save();
			return new JsonResponse(null, 201);
		}

		if (!($team = Team::find($request->team_id)))
			return new JsonResponse(new Error('not_found', 'L\'équipe n\'a pas été trouvée'), 400);

		if ($team->players()->save($player)) {
			$team->players = Player::where('team_id', $team->id)->orderBy('position', 'asc')->get();
			foreach ($team->players as $mate) {
				$mate->tier = Player::tierText($mate->tier);
				$mate->position = Player::positionText($mate->position);
			}
			return new JsonResponse($team, 200);
		}

		return new JsonResponse(new Error('unknown', 'Une erreur inconnue s\'est produite'), 400);
	}

	public function idCheck(Request $request)
	{
		$player = Player::where('riot_id', $request->id)->first();

		if ($player) {
			return new JsonResponse(new Error('exists', 'Le joueur existe déjà'), 400);
		}
		return new JsonResponse(null, 201);
	}

	public function teamless()
	{
		$players = Player::where('team_id', 0)->orderBy('tier', 'asc')->orderBy('division', 'asc')->orderBy('lps', 'desc')->get();
		foreach ($players as $player) {
			$player->tier = Player::tierText($player->tier);
			$player->position = Player::positionText($player->position);
		}
		return new JsonResponse($players);
	}

	public function latest($number)
	{
		$players = Player::orderBy('created_at', 'desc')->take($number)->get();
		foreach ($players as $player) {
			$player->team;
			$player->tier = Player::tierText($player->tier);
			$player->position = Player::positionText($player->position);
		}
		return new JsonResponse($players);
	}
}
