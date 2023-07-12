<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\RedeemHistory;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class RedeemController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        //
        $redeemHistories = RedeemHistory::with([
            'user' => function ($query) {
                $query->select('id', 'name');
            },
            'transaction' => function ($query) {
                $query->select('id', 'ticket_type_id', 'name','ticket_id');
            },
            'transaction.ticketType' => function ($query) {
                $query->select('id', 'name');
            },
        ])->whereColumns($request->get('filters'))
        ->paginate($request->get('perPage') ?? 10);
        return Inertia::render('Admin/Redeem/RedeemHistory', [
            'redeemHistories' => $redeemHistories,
        ]);
    }

    public function getData(Request $request){
        $redeemHistories = RedeemHistory::with([
            'user' => function ($query) {
                $query->select('id', 'name');
            },
            'transaction' => function ($query) {
                $query->select('id', 'ticket_type_id', 'name','ticket_id');
            },
            'transaction.ticketType' => function ($query) {
                $query->select('id', 'name');
            },
        ])->whereColumns($request->get('filters'))
        ->paginate($request->get('perPage') ?? 10);
        return response()->json($redeemHistories);
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
        $request->validate([
            'token' => ['required', 'string', 'min:10'], #need to change as ticket_id, not token
            'redeem_amount' => ['required']
        ]);
        $check = Transaction::where('ticket_id', $request->token)->get()->first();
        if($check){
            if($check->redeem_amount == 0 || $check->redeem_amount == NULL){
                Transaction::where('external_id', $check->external_id)->update([
                    'ticket_status' => 'Reedeemed for '.$request->redeemed_amount.' tickets',
                    'redeem_amount' => $request->redeemed_amount
                ]); 
                return response()->json([
                        'message' => 'Ticket ID Found! '.$request->redeemed_amount.' tickets'. ' has redeemed.',
                        'data' => [
                            'name' => $check->name,
                            'email' => $check->email,
                            'phone' => $check->phone_number,
                        ]
                    ], 200);
            }else if($check->redeem_amount != 0 || $check->redeem_amount != NULL){
                if($check->total_tickets == $check->redeem_amount){
                    return response()->json(['message' => 'Error! All tickets has already reedemed'], 208);
                }else if($request->redeemed_amount == $check->total_tickets && $check->redeem_amount == 0){
                    Transaction::where('external_id', $check->external_id)->update([
                        'ticket_status' => 'Reedeemed for all tickets',
                        'redeem_amount' => $request->redeemed_amount
                    ]);
                    return response()->json([
                        'message' => 'Ticket ID Found! All tickets has redeemed.',
                        'data' => [
                            'name' => $check->name,
                            'email' => $check->email,
                            'phone' => $check->phone_number,
                        ]
                    ], 200);
                }else if(((int)$check->redeem_amount + (int)$request->redeemed_amount) <= $check->total_tickets){
                    $increase_redeem_amount = (int)$check->redeem_amount + (int)$request->redeemed_amount;
                    Transaction::where('external_id', $check->external_id)->update([
                        'ticket_status' => 'Reedeemed for all tickets',
                        'redeem_amount' => $increase_redeem_amount
                    ]);
                    return response()->json([
                        'message' => 'Ticket ID Found! '.$request->redeemed_amount.' tickets'.' has redeemed.',
                        'data' => [
                            'name' => $check->name,
                            'email' => $check->email,
                            'phone' => $check->phone_number,
                        ]
                    ], 200);
                }else if(((int)$check->redeem_amount + (int)$request->redeemed_amount) == $check->total_tickets){
                    return response()->json(['message' => 'Error12! All tickets has already reedemed'], 208);
                }else if($request->redeemed_amount > $check->total_tickets){
                    return response()->json(['message' => 'Error! Redeem request was out of total purchased tickets'], 208);
                }
            }
        }else{
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
