<?php

namespace App\Http\Controllers;

use App\Models\Player;
use Symfony\Component\HttpFoundation\JsonResponse;

class PositionsController extends Controller
{
	public function all()
	{
		$players = Player::orderBy('tier', 'asc')->orderBy('division', 'asc')->orderBy('lps', 'desc')->get();
		foreach ($players as $player) {
			$player->team;
			$player->tier = Player::tierText($player->tier);
			$player->position = Player::positionText($player->position);
		}
		return new JsonResponse($players);
	}

	public function top()
	{
		$players = Player::where('position', Player::POSITION_TOP)->orderBy('tier', 'asc')->orderBy('division', 'asc')->orderBy('lps', 'desc')->get();
		foreach ($players as $player) {
			$player->team;
			$player->tier = Player::tierText($player->tier);
			$player->position = Player::positionText($player->position);
		}
		return new JsonResponse($players);
	}

	public function jungle()
	{
		$players = Player::where('position', Player::POSITION_JUNGLE)->orderBy('tier', 'asc')->orderBy('division', 'asc')->orderBy('lps', 'desc')->get();
		foreach ($players as $player) {
			$player->team;
			$player->tier = Player::tierText($player->tier);
			$player->position = Player::positionText($player->position);
		}
		return new JsonResponse($players);
	}

	public function mid()
	{
		$players = Player::where('position', Player::POSITION_MID)->orderBy('tier', 'asc')->orderBy('division', 'asc')->orderBy('lps', 'desc')->get();
		foreach ($players as $player) {
			$player->team;
			$player->tier = Player::tierText($player->tier);
			$player->position = Player::positionText($player->position);
		}
		return new JsonResponse($players);
	}

	public function adc()
	{
		$players = Player::where('position', Player::POSITION_ADC)->orderBy('tier', 'asc')->orderBy('division', 'asc')->orderBy('lps', 'desc')->get();
		foreach ($players as $player) {
			$player->team;
			$player->tier = Player::tierText($player->tier);
			$player->position = Player::positionText($player->position);
		}
		return new JsonResponse($players);
	}

	public function support()
	{
		$players = Player::where('position', Player::POSITION_SUPPORT)->orderBy('tier', 'asc')->orderBy('division', 'asc')->orderBy('lps', 'desc')->get();
		foreach ($players as $player) {
			$player->team;
			$player->tier = Player::tierText($player->tier);
			$player->position = Player::positionText($player->position);
		}
		return new JsonResponse($players);
	}
}
