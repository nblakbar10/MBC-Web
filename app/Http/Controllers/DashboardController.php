<?php

namespace App\Http\Controllers;

use App\Models\Promo;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    //
    public function index()
    {
        return Inertia::render('Admin/Dashboard', [
        ]);
    }

    public function home(){
        $promos = Promo::all();
        dd($promos);
        return Inertia::render('Home', [
            'promos' => $promos,
        ]);
        
    }
}
