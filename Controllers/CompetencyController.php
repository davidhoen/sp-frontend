<?php

namespace App\Http\Controllers;

use App\Models\Competency;
use Illuminate\Http\Request;

class CompetencyController extends Controller
{
    public function getCompetencies()
    {
        return Competency::all();
    }
}
