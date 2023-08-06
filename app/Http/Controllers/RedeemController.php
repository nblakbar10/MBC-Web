<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\RedeemHistory;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class RedeemController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $redeemHistories = RedeemHistory::with([
            'user' => function ($query) {
                $query->select('id', 'name');
            },
            'transaction' => function ($query) {
                $query->select('id', 'ticket_type_id', 'name', 'ticket_id');
            },
            'transaction.ticketType' => function ($query) {
                $query->select('id', 'name');
            },
        ])->get();
        return Inertia::render('Admin/Redeem/RedeemHistory', [
            'redeemHistories' => $redeemHistories,
        ]);
    }

    public function getData(Request $request)
    {
        $redeemHistories = RedeemHistory::with([
            'user' => function ($query) {
                $query->select('id', 'name');
            },
            'transaction' => function ($query) {
                $query->select('id', 'ticket_type_id', 'name', 'ticket_id');
            },
            'transaction.ticketType' => function ($query) {
                $query->select('id', 'name');
            },
        ])->whereColumns($request->get('filters'))
            ->paginate($request->get('perPage') ?? 10);
        return response()->json(
            $redeemHistories,
            200,
            [
                'Content-Type' => 'application/json;charset=UTF-8',
                'Charset' => 'utf-8'
            ],
        );
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
        return Inertia::render(
            'Admin/Redeem/RedeemForm'
        );
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // TODO: need to change as ticket_id, not token
        // TODO: Add UserActivity/RedeemHistory after redeem
        $request->validate([
            'token' => ['required', 'string', 'min:10'], #need to change as ticket_id, not token
            'redeemed_amount' => ['required'],
            // 'latitude' => ['required', 'numeric'],
            // 'longitude' => ['required', 'numeric'],
        ]);
        $check = Transaction::where('ticket_id', $request->token)->get()->first();
        if ($check) {
            if ($check->redeemed_amount == 0 || $check->redeemed_amount == NULL) {
                Transaction::where('external_id', $check->external_id)->update([
                    'ticket_status' => 'Reedeemed for ' . $request->redeemed_amount . ' tickets',
                    'redeemed_amount' => $request->redeemed_amount
                ]);
                $get_transaction_id = Transaction::where('ticket_id', $request->token)->pluck('id')->first();
                RedeemHistory::create([
                    "user_id" => Auth::user()->id,
                    "transaction_id" => $get_transaction_id,
                    "amount" => $request->redeemed_amount,
                    "latitude" => $request->latitude,
                    "longitude" => $request->longitude,
                ]);
                return response()->json([
                    'message' => 'Ticket ID Found! ' . $request->redeemed_amount . ' tickets' . ' has redeemed.',
                    'data' => [
                        'name' => $check->name,
                        'email' => $check->email,
                        'phone' => $check->phone_number,
                    ]
                ], 200);
            } else if ($check->redeemed_amount != 0 || $check->redeemed_amount != NULL) {
                if ($check->total_tickets == $check->redeemed_amount) {
                    return response()->json(['message' => 'Error! All tickets has already reedemed'], 208);
                } else if ($request->redeemed_amount == $check->total_tickets && $check->redeemed_amount == 0) {
                    Transaction::where('external_id', $check->external_id)->update([
                        'ticket_status' => 'Reedeemed for all tickets',
                        'redeemed_amount' => $request->redeemed_amount
                    ]);
                    $get_transaction_id = Transaction::where('ticket_id', $request->token)->pluck('id')->first();
                    RedeemHistory::create([
                        "user_id" => Auth::user()->id,
                        "transaction_id" => $get_transaction_id,
                        "amount" => $request->redeemed_amount,
                        "latitude" => $request->latitude,
                        "longitude" => $request->longitude,
                    ]);
                    return response()->json([
                        'message' => 'Ticket ID Found! All tickets has redeemed.',
                        'data' => [
                            'name' => $check->name,
                            'email' => $check->email,
                            'phone' => $check->phone_number,
                        ]
                    ], 200);
                } else if (((int)$check->redeemed_amount + (int)$request->redeemed_amount) <= $check->total_tickets) {
                    $increase_redeemed_amount = (int)$check->redeemed_amount + (int)$request->redeemed_amount;
                    Transaction::where('external_id', $check->external_id)->update([
                        'ticket_status' => 'Reedeemed for all tickets',
                        'redeemed_amount' => $increase_redeemed_amount
                    ]);
                    $get_transaction_id = Transaction::where('ticket_id', $request->token)->pluck('id')->first();
                    RedeemHistory::create([
                        "user_id" => Auth::user()->id,
                        "transaction_id" => $get_transaction_id,
                        "amount" => $request->redeemed_amount,
                        "latitude" => $request->latitude,
                        "longitude" => $request->longitude,
                    ]);
                    return response()->json([
                        'message' => 'Ticket ID Found! ' . $request->redeemed_amount . ' tickets' . ' has redeemed.',
                        'data' => [
                            'name' => $check->name,
                            'email' => $check->email,
                            'phone' => $check->phone_number,
                        ]
                    ], 200);
                } else if (((int)$check->redeemed_amount + (int)$request->redeemed_amount) == $check->total_tickets) {
                    return response()->json(['message' => 'Error12! All tickets has already reedemed'], 208);
                } else if ($request->redeemed_amount > $check->total_tickets) {
                    return response()->json(['message' => 'Error! Redeem request was out of total purchased tickets'], 208);
                }
            }
        } else {
            return  response()->json(['message' => 'Ticket ID Not Found!'], 208);
        }
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
