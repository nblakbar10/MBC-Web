<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Event;
use App\Models\UserActivity;
use App\Models\TicketType;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;    

class TicketTypeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        //
        $events = Event::get(['id', 'name']);
        if($request->has('event')){
            $ticketTypes = TicketType::with('event')->where('event_id', $request->event)->get();
        }else{
            $ticketTypes = TicketType::with(['event' => function ($query){
                $query->select('id','name');
            }])->get();
        }
        return Inertia::render('Admin/TicketType/Index', [
            'ticketTypes' => $ticketTypes,
            'events' => $events,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
        $events = Event::get(['id', 'name']);
        return Inertia::render('Admin/TicketType/Create', [
            'events' => $events,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
        return DB::transaction(function () use ($request) {
            $validated = $request->validate([
                'name' => 'required|max:255|string',
                'price' => 'required|numeric',
                'fee' => 'required|numeric',
                'stock' => 'required|numeric',
                'maximum_buy' => 'required|numeric',
                'event_id' => 'required|numeric|exists:events,id',
            ]);
        
            $ticketType = TicketType::create($validated);

            UserActivity::create([
                'user_id' => Auth::user()->id,
                'activity' => 'Create Ticket Type ' . $validated['name'] . 'with Id '. $ticketType->id. ' for Event ' . Event::find($validated['event_id'])->name,
                'latitude' => 0,
                'longitude' => 0,
            ]);
    
            return redirect()->route('ticket-type.index')->with('success', 'Ticket Type created.');
        });
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
        $events = Event::get(['id', 'name']);
        $ticketType = TicketType::with(['event' => function ($query){
            $query->select('id','name');
        }])->find($id);

        return Inertia::render('Admin/TicketType/Edit', [
            'ticketType' => $ticketType,
            'events' => $events,
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
        return DB::transaction(function () use ($request, $id) {
            $validated = $request->validate([
                'name' => 'required|max:255|string',
                'price' => 'required|numeric',
                'fee' => 'required|numeric',
                'stock' => 'required|numeric',
                'maximum_buy' => 'required|numeric',
                'event_id' => 'required|numeric|exists:events,id',
            ]);
        
            $ticketType = TicketType::find($id);
            $ticketType->update($validated);

            UserActivity::create([
                'user_id' => Auth::user()->id,
                'activity' => 'Update Ticket Type ' . $validated['name'] . 'with Id '. $ticketType->id. ' for Event ' . Event::find($validated['event_id'])->name,
                'latitude' => 0,
                'longitude' => 0,
            ]);
    
            return redirect()->route('ticket-type.index')->with('success', 'Ticket Type updated.');
        });
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
        return DB::transaction(function () use ($id) {
            $ticketType = TicketType::find($id);
            $ticketType->delete();

            UserActivity::create([
                'user_id' => Auth::user()->id,
                'activity' => 'Delete Ticket Type ' . $ticketType->name . 'with Id '. $ticketType->id. ' for Event ' . Event::find($ticketType->event_id)->name,
                'latitude' => 0,
                'longitude' => 0,
            ]);
    
            return redirect()->route('ticket-type.index')->with('success', 'Ticket Type deleted.');
        });
    }
}
