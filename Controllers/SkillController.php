<?php

namespace App\Http\Controllers\Base;

use App\Models\Skill;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Http\Controllers\Controller;
use App\Modules\Skills\Resources\Teachers\SkillResource;
use App\Modules\Skills\Requests\Teachers\CreateSkillRequest;
use App\Modules\Skills\Requests\Teachers\UpdateSkillRequest;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class SkillController extends Controller
{
    public function index(Request $request): AnonymousResourceCollection
    {
        $withs = $request->get('with') ? explode(',', $request->get('with')) : [];
        $skills = Skill::withCount('groups')->with($withs)->paginate(10);

        return SkillResource::collection($skills);
    }

    public function show(Skill $skill): JsonResponse
    {
        if (!$skill)
            return response()->json(['message' => 'Skill not found'], 404);

        return response()->json($skill);
    }

    public function store(CreateSkillRequest $request): JsonResponse
    {
        $request->validate([
            'name' => 'required|string'
        ]);

        $skill = new Skill();
        $skill->name = $request->name;
        $skill->save();
        return response()->json($skill, 201);
    }

    public function update(UpdateSkillRequest $request, Skill $skill): JsonResponse
    {
        if (!$skill)
            return response()->json(['message' => 'Skill not found'], 404);

        $skill->update($request->all());

        return response()->json($skill);
    }

    public function destroy(Skill $skill): JsonResponse
    {
        if (!$skill)
            return response()->json(['message' => 'Skill not found'], 404);

        $skill->delete();
        return response()->json($skill);
    }

}
