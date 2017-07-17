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
		$this->api = new Api('RGAPI-7848906a-b45a-4796-a866-6937281277f3');
		$this->api->setRegion('euw');

		$this->summoner = $this->api->summoner();
		$this->summoner->selectVersion('v3');

		$this->league = $this->api->league();
		$this->league->selectVersion('v3');
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

	public function getSummonerLeague(int $id)
	{
		if ($infos = $this->league->league($id)) {
			foreach ($infos as $league) {
				$array = [
					'tier' => $league->get('tier'),
					'queue' => $league->get('queue'),
					'entries' => [
						[
							'leaguePoints' => $league->entry($id)->get('leaguePoints'),
							'division' => $league->entry($id)->get('rank'),
						],
					]
				];
				$leagues[] = $array;
			}
			return new JsonResponse($leagues, 200);
		}
		return new JsonResponse(null, 404);
	}

}
