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
        $promos = Promo::all();
        dd($promos);
        return Inertia::render('Admin/Dashboard', [
        ]);
    }

    public function home(){
        $promos = Promo::all();
        return Inertia::render('Home', [
            'promos' => $promos,
        ]);
        
    }
}
