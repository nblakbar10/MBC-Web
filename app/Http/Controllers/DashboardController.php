<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\Transaction;
use App\Models\User;
use App\Models\UserActivity;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    //
    public function index(Request $request)
    {
        $totalTicket = Transaction::sum('ticket_amount');
        // dont know why sum return string but it must be converted to int
        $totalPrice = Transaction::sum('base_price');
        $totalUser = User::count();
        $totalEvent = Event::count();
        $latestUserActivities = UserActivity::with([
            'user' => function ($query) {
                $query->select('id', 'name', 'email');
            }
        ])->orderBy('created_at', 'desc')->limit(5)->get();
        $transactionCount = Transaction::count();
        return Inertia::render('Admin/Dashboard', [
            'totalTicket' => $totalTicket,
            'totalPrice' => intval($totalPrice),
            'totalUser' => $totalUser,
            'totalEvent' => $totalEvent,
            'latestUserActivities' => $latestUserActivities,
            'transactionCount' => $transactionCount,
        ]);
        // return redirect()->route('event.index');
    }

    public function home()
    {

        return Inertia::render('Home', []);
    }
}
