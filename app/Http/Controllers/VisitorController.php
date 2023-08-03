<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Event;
use App\Models\UserActivity;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class VisitorController extends Controller{

    public function home(){
        $events = Event::all()->sortByDesc('created_at')->take(8)->toArray();
        // dd($events);
        return Inertia::render('Visitor/Home', [
            'events' => $events,
        ]);
    }

    public function event(Request $request){
        $events = Event::visitorFilter($request->all())->paginate(8);
        return Inertia::render('Visitor/Events', [
            'events' => $events,
        ]);
    }

    public function eventDetail($id){
        $event = Event::with('ticketTypes.ticketDiscounts')->find($id);
        return Inertia::render('Visitor/EventDetail', [
            'event' => $event,
        ]);
    }

}
