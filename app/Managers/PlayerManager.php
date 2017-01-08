<?php

namespace App\Managers;

use App\Models\Player;
use App\Models\Team;

class PlayerManager {

	public function createPlayer($object)
    {

        try {
            $player = new Player();

            $player->riot_id = $object->riot_id;
            $player->name = $object->name;
            $player->summoner_name = $object->summoner_name;
            $player->position = $object->position;
            $player->tier = $object->tier;
            $player->division = $object->division;
            $player->lps = $object->lps;
            $player->comment = $object->comment;
        } catch (\Exception $e) {
            return false;
        }

        return $player;
	}

	public function updatePlayer(Player $player, $object)
	{
		$player->name = $object->name ? $object->name : $player->name;
		$player->position = $object->position ? $object->position : $player->position;
		$player->tier = $object->tier ? $object->tier : $player->tier;
		$player->division = $object->division ? $object->division : $player->division;
		$player->lps = $object->lps ? $object->lps : $player->lps;
		$player->comment = $object->comment ? $object->comment : $player->comment;

		return $player;
	}
}
