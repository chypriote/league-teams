<?php

namespace app\Http\Controllers;

use LeagueWrap\Api;
use Symfony\Component\HttpFoundation\JsonResponse;

class RiotController
{
	protected $api;
	protected $summoner;
	protected $league;

	public function __construct()
	{
		$this->api = new Api('4cc2723d-f13c-41dc-85ce-fe5c89534640');
		$this->api->setRegion('euw');

		$this->summoner = $this->api->summoner();
		$this->summoner->selectVersion('v1.4');

		$this->league = $this->api->league();
		$this->league->selectVersion('v2.5');
	}

	/**
	 * Show the application dashboard.
	 * @param integer $id
	 * @return JsonResponse
	 */
	public function getSummoner($id)
	{
			if ($infos = $this->summoner->info((int)$id)) {
				$player = [
					'name' => $infos->get('name'),
					'id' => $infos->get('id'),
				];
				return new JsonResponse($player, 200);
			}
			return new JsonResponse(null, 404);
	}

	/**
	 * @param string $name
	 * @return JsonResponse
	 */
	public function getSummonerName($name)
	{
		if ($infos = $this->summoner->info($name)) {
			$player = [
				'name' => $infos->get('name'),
				'id' => $infos->get('id'),
			];
			return new JsonResponse($player, 200);
		}
		return new JsonResponse(null, 404);
	}

	public function getSummonerLeague($id)
	{
		if ($leagues = $this->league->league((int)$id, true)) {
			return new JsonResponse($leagues, 200);
		}
		return new JsonResponse(null, 404);
	}

}