<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Event;
use App\Models\Transaction;
use App\Models\UserActivity;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class EventController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $events = Event::all();
        return Inertia::render('Admin/Event/Index', [
            'events' => $events,
        ]);
    }

    public function getData(Request $request){
        $events = Event::visitorFilter($request->all())->paginate($request->get('perPage') ?? 8);
        return response()->json($events);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
        return Inertia::render('Admin/Event/Create', [
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
        // dd($request->all()); 
        $request->validate([
            'name'         => ['required'],
            'description'  => ['required'],
            'start_date'   => ['required'],
            'end_date'     => ['required'],
            "city"         => ['required'],
            'location'     => ['required'],
            'maximum_buy'  => ['required'],
            'poster.file'       => ['required', 'file', 'mimes:jpeg,png,jpg,gif,svg'],
            'event_map.file'    => ['required', 'file', 'mimes:jpeg,png,jpg,gif,svg'],
            'preview.file'      => ['required', 'file', 'mimes:jpeg,png,jpg,gif,svg'],
            'latitude'          => ['required','numeric'],
            'longitude'         => ['required', 'numeric'],
        ]);

        return DB::transaction(function () use ($request) {
            $poster = Storage::disk('public')->put('events/posters',  $request->file('poster.file'));
            $event_map = Storage::disk('public')->put('events/event_maps',  $request->file('event_map.file'));
            $preview = Storage::disk('public')->put('events/previews',  $request->file('preview.file'));

            $event = Event::create([
                'name'          => $request->name,
                'description'   => $request->description,
                'start_date'    => $request->start_date,
                'end_date'      => $request->end_date,
                'city'          => $request->city,
                'location'      => $request->location,
                'maximum_buy'   => $request->maximum_buy,
                'poster_url'        => $poster,
                'event_map_url'     => $event_map,
                'preview_url'       => $preview,
            ]);

            $event->save();
            $user_activity = UserActivity::create([
                'user_id' => Auth::user()->id,
                'activity' => 'Create Event ' . $request->name . ' with id ' . $event->id,
                'latitude' => $request->latitude,
                'longitude' => $request->longitude,
            ]);

            $user_activity->save();

            return redirect()->route('event.index')->with('success', 'Event created.');
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
        $event = Event::with('ticketTypes')->findOrfail($id);
        $transaction = Transaction::select('id', 'ticket_type_id', 'ticket_amount', 'total_price', 'base_price', 'payment_method', 'payment_status')
        ->whereHas('ticketType', function ($query) use ($id) {
            $query->where('event_id', $id)->select('id');
        })->get();
        return Inertia::render('Admin/Event/Show', [
            'event' => $event,
            'transactions' => $transaction,
        ]);
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
            //
            $event = Event::findOrfail($id);
            return Inertia::render('Admin/Event/Edit', [
                'event' => $event,
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
        $request->validate([
            'name'         => ['required'],
            'description'  => ['required'],
            'start_date'   => ['required'],
            'end_date'     => ['required'],
            "city"         => ['required'],
            'location'     => ['required'],
            'maximum_buy'  => ['required'],
            'poster.file'       => ['image', 'mimes:jpeg,png,jpg,gif,svg'],
            'event_map.file'    => ['image', 'mimes:jpeg,png,jpg,gif,svg'],
            'preview.file'      => ['image', 'mimes:jpeg,png,jpg,gif,svg'],
            'latitude'          => ['required', 'numeric'],
            'longitude'         => ['required', 'numeric'],

        ]);

        return DB::transaction(function () use ($request, $id) {
            $event = Event::findOrfail($id);
            $poster = $event->poster_url;
            $event_map = $event->event_map_url;
            $preview = $event->preview_url;

            if ($request->hasFile('poster.file')) {
                Storage::disk('public')->delete($poster);
                $poster = Storage::disk('public')->put('events/posters',  $request->file('poster.file'));
            }

            if ($request->hasFile('event_map.file')) {
                Storage::disk('public')->delete($event_map);
                $event_map = Storage::disk('public')->put('events/event_maps',  $request->file('event_map.file'));
            }

            if ($request->hasFile('preview.file')) {
                Storage::disk('public')->delete($preview);
                $preview = Storage::disk('public')->put('events/previews',  $request->file('preview.file'));
            }

            $event->update([
                'name'          => $request->name,
                'description'   => $request->description,
                'start_date'    => $request->start_date,
                'end_date'      => $request->end_date,
                'city'          => $request->city,
                'location'      => $request->location,
                'maximum_buy'   => $request->maximum_buy,
                'poster_url'        => $poster,
                'event_map_url'     => $event_map,
                'preview_url'       => $preview,
            ]);

            $event->save();
            $user_activity = UserActivity::create([
                'user_id' => Auth::user()->id,
                'activity' => 'Update Event ' . $request->name . ' with id ' . $event->id,
                'latitude' => $request->latitude,
                'longitude' => $request->longitude,
            ]);

            $user_activity->save();

            return redirect()->route('event.index')->with('success', 'Event updated.');
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
                //
                $event = Event::findOrfail($id);
                $event->delete();
                $user_activity = UserActivity::create([
                    'user_id' => Auth::user()->id,
                    'activity' => 'Delete Event ' . $event->name . ' with id ' . $event->id,
                    'latitude' => 0,
                    'longitude' => 0,
                ]);
    
                $user_activity->save();
    
                return redirect()->route('event.index')->with('success', 'Event deleted.');
    }
}
