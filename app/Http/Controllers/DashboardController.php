<?php

namespace App\Http\Controllers;

use App\Models\Promo;
use App\Models\Transaction;
use App\Models\User;
use App\Models\Discount;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    //
    public function index()
    {
        $promos = Promo::all();
        // dd($promos);
        $users_count = User::all()->count();
        // $event_count = Event::all()->count();
        $transaction_count = Transaction::all()->count();
        return Inertia::render('Admin/Dashboard', [
            'users_count' => $users_count,
            // 'event_count' => $event_count,
            'transaction_count' => $transaction_count,
        ]);

    }

    public function home(){
        $promos = Promo::all();
        $discounts = Discount::all();
        return Inertia::render('Home', [
            'promos' => $promos,
            'discounts' => $discounts
        ]);

    }
}
