<?php

namespace App\Http\Controllers;

use App\Models\Research\Research;
use App\Models\Research\ResearchDocument;
use App\Models\Research\ResearchType;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    //
    public function index()
    {
        return Inertia::render('Dashboard', [
        ]);
    }
}
