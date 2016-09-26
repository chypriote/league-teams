<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Models\Team;


class TeamsController extends Controller
{
	public function index()
	{
		return Team::all();
	}

	public function show($id)
	{
		return Team::findOrFail($id);
	}

	public function store()
	{

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
	}

	public function update($id)
	{

	}

	public function destroy($id)
	{
		if ($team = Team::findOrFail($id))
			return new JsonResponse($team->delete(), 200);
		return new JsonResponse(null, 404);
	}
}
