<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Event;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TransactionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        //
        $transaction = Transaction::with([
            'ticketType' => function ($query) {
                $query->select('id', 'name');
            },
            'ticketType.event' => function ($query) {
                $query->select('id', 'name');
            },
            'ticketDiscounts' => function ($query) {
                $query->select('id', 'name');
            },
        ])->whereColumns($request->get('filters'))
        ->paginate($request->get('perPage') ?? 10);

        return Inertia::render('Admin/Transaction/Index', [
            'transactions' => $transaction,
        ]);
    }

    public function exportView(Request $request)
    {
        $transaction = Transaction::with([
            'ticketType' => function ($query) {
                $query->select('id', 'name');
            },
            'ticketType.event' => function ($query) {
                $query->select('id', 'name');
            },
            'ticketDiscounts' => function ($query) {
                $query->select('id', 'name');
            },
        ])->whereHas('ticketType.event', function ($query) use ($request) {
            $query->where('id', $request->get('event_id'));
        })->get();
        $events = Event::get(['id', 'name']);
        return Inertia::render('Admin/Transaction/Export', [
            'transactions' => $transaction,
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
    }
}
