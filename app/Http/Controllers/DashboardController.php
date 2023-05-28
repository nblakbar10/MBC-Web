<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
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
     
        return Inertia::render('Home', [

        ]);

    }
}
