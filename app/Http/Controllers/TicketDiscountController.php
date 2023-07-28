<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\TicketDiscount;
use App\Models\Event;
use App\Models\TicketType;
use App\Models\UserActivity;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class TicketDiscountController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $ticketDiscounts = TicketDiscount::with([
            'ticketType' => function ($query){
                $query->select('id','name', 'event_id');
            },'ticketType.event' => function ($query){
                $query->select('id','name');
        }])->get();
        return Inertia::render('Admin/TicketDiscount/Index', [
            'ticketDiscounts' => $ticketDiscounts,
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
        $events = Event::select('id','name')->get();
        $ticketTypes = TicketType::select('id','name', 'event_id')->get();
        return Inertia::render('Admin/TicketDiscount/Create', [
            'events' => $events,
            'ticketTypes' => $ticketTypes,
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
                'name' => 'required',
                'stock' => 'required|numeric|min:0',
                'amount' => $request->type == 'percentage' ? 'required|numeric|min:0|max:100' : 'required|numeric|min:0',
                'minimum_buy' => 'required|numeric|min:0',
                'type' => 'required|in:percentage,fixed',
                'ticket_type_id' => 'required',
                // 'latitude' => ['required', 'numeric'],
                // 'longitude' => ['required', 'numeric'],

            ]);
            $ticketDiscounts = TicketDiscount::create($validated);
            UserActivity::create([
                'user_id' => auth()->user()->id,
                'activity' => 'Create Ticket Discount ' . 'with Id ' . $ticketDiscounts->id . '.',
                'latitude' => $request->latitude,
                'longitude' => $request->longitude,
            ]);
            return redirect()->route('ticket-discount.index')->with('success', 'Ticket Discount has been created successfully!');
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
        $events = Event::select('id','name')->get();
        $ticketTypes = TicketType::select('id','name', 'event_id')->get();
        $ticketDiscount = TicketDiscount::find($id);
        return Inertia::render('Admin/TicketDiscount/Edit', [
            'events' => $events,
            'ticketTypes' => $ticketTypes,
            'ticketDiscount' => $ticketDiscount,
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
                'name' => 'required',
                'stock' => 'required|numeric|min:0',
                'amount' => $request->type == 'percentage' ? 'required|numeric|min:0|max:100' : 'required|numeric|min:0',
                'minimum_buy' => 'required|numeric|min:0',
                'type' => 'required|in:percentage,fixed',
                'ticket_type_id' => 'required',
                // 'latitude' => ['required', 'numeric'],
                // 'longitude' => ['required', 'numeric'],

            ]);
            $ticketDiscounts = TicketDiscount::find($id);
            $ticketDiscounts->update($validated);
            UserActivity::create([
                'user_id' => auth()->user()->id,
                'activity' => 'Update Ticket Discount ' . 'with Id ' . $ticketDiscounts->id . '.',
                'latitude' => $request->latitude,
                'longitude' => $request->longitude,
            ]);
            return redirect()->route('ticket-discount.index')->with('success', 'Ticket Discount has been updated successfully!');
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
            $ticketDiscounts = TicketDiscount::find($id);
            $ticketDiscounts->delete();
            UserActivity::create([
                'user_id' => auth()->user()->id,
                'activity' => 'Delete Ticket Discount ' . 'with Id ' . $ticketDiscounts->id . '.',
                'latitude' => 0,
                'longitude' => 0,
            ]);
            return redirect()->route('ticket-discount.index')->with('success', 'Ticket Discount has been deleted successfully!');
        });
    }
}
