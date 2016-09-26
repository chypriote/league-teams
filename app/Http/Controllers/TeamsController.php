<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Models\Team;
use Symfony\Component\HttpFoundation\JsonResponse;
use Validator;


class TeamsController extends Controller
{
	public function index()
	{
		return new JsonResponse(Team::all());
	}

	public function show($id)
	{
		if ($team = Team::find($id))
			return new JsonResponse($team);
		return new JsonResponse(null);
	}

	public function store(Request $request)
	{
		$validator = Validator::make($request->all(), [
        'name' => 'required',
    ]);

    if ($validator->fails()) {
        return new JsonResponse($validator->errors(), 422);
    }

		try {
			$team = new Team();

			$team->name = $request->name;

			$team->save();
		} catch (\Exception $e) {
			if ($e->getCode() == 23000)
				return new JsonResponse('Team already exists', 400);
			return new JsonResponse($e->getMessage(), 400);
		}

		return new JsonResponse($team, 201);
	}

	public function update($id)
	{

	}

	public function destroy($id)
	{
		if ($team = Team::find($id))
			return new JsonResponse($team->delete(), 200);
		return new JsonResponse(null, 404);
	}
}
