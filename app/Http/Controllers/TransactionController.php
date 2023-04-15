<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use App\Models\Promo;
use App\Models\Discount;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Redirect;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Mail;
use App\Mail\NotifyMail;

class TransactionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $transactions = Transaction::all();
        // $transactions = Transaction::all();
        // dd($transactions);  
        return Inertia::render('Admin/Transaction/Index', [
            'transactions' => $transactions
            ,
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
        return DB::transaction(function () use ($request){
            $request->validate([
                'name' => 'required',
                'email' => ['required', 'email'],
                'phone_number' => ['required', 'string', 'max:255', 'regex:(08)'],
                'ticket_amount' => ['required', 'numeric', 'max:5', 'min:1'],
                'promo_id' => ['required' , 'numeric'],
                // 'tickets_category' => 'required',
                // 'total_price' => 'required',
                'payment_method' => 'required',
            ]);

            
            $check_user_ticket_limit = Transaction::where(['phone_number' => $request->phone_number, 'email' => $request->email])->pluck('total_tickets');
            $data = $check_user_ticket_limit->toArray();
            $maximum_ticket = array_sum($data) + $request->ticket_amount; 



            $promo_tiket = Promo::find($request->promo_id);
            if ((int)$request->ticket_amount > (int)$promo_tiket->stocks) {
                throw ValidationException::withMessages(['Tiket yang tersedia tidak cukup dengan jumlah yang ingin anda beli']);
            }

            if ($maximum_ticket >= 5){
                throw ValidationException::withMessages(['Sisa Tiket yang dapat anda beli hanya sebanyak '.$maximum_ticket-5 . ' Tiket lagi!']);
            }

            //count all total transactions (include discount)
            $check_discount = Discount::where('promo_id', $request->promo_id)->where('quota', '>', 0)->get()->first();
            if($check_discount){
                if($check_discount->type == 'Absolute'){
                    $totals = ($promo_tiket->price+2500 * $request->ticket_amount) - $check_discount->deduction;
                }else if($check_discount->type == 'Percentage'){
                    $totals = ($promo_tiket->price+2500 * $request->ticket_amount) - (($promo_tiket->price * $request->ticket_amount) * ($check_discount->deduction / 100));
                }
                $check_discount->decrement('quota');

            }else{
                $totals = $promo_tiket->price+2500 * $request->ticket_amount;
            }

            $check_payment_methods = $request->payment_method;
            $secret_key = 'Basic '.config('xendit.key_auth');
                $transaction_id = Str::random(5);
            // $external_id = Str::random(5); //id transaksi

            if ($check_payment_methods == 'Transfer Bank (VA)')
            {
                $data_request = Http::withHeaders([
                    'Authorization' => $secret_key,
                ])->post('https://api.xendit.co/v2/invoices', [
                    // 'transaction_id' => $transaction_id,
                    'external_id' => 'MBC-SmileFest2023-'.$transaction_id,
                    'amount' => $totals+(4500*$request->ticket_amount), //$request->total_price,
                    'payment_methods' => ['BNI', 'BRI', 'BSI', 'BJB', 'MANDIRI', 'PERMATA']
                ]);
                $response = $data_request->object();

                Transaction::create([
                    'external_id' => 'MBC-SmileFest2023-'.$transaction_id,
                    // 'user_id' => $request->user_id,
                    'name' => $request->name,
                    'email' => $request->email,
                    'phone_number' => $request->phone_number,
                    'total_tickets' => $request->ticket_amount,
                    'tickets_category' => $promo_tiket->name,
                    'total_amount' => $totals+(7000*$request->ticket_amount),
                    'payment_status' => $response->status,
                    'payment_method' => $request->payment_method,
                    'payment_link' => $response->invoice_url,
                ]);

                //sent email :
                $mailData = [
                    'to' => $request->name.' !',
                    'nama' => $request->name,
                    'no_hp' => $request->phone_number,
                    'email' => $request->email,
                    'jumlah_tiket' => $request->ticket_amount,
                    'jenis_tiket' => $request->tickets_category,
                    'total_pembelian' => $totals+(7000*$request->ticket_amount),
                    'metode_pembayaran' => $request->payment_method,
                    'status_pembayaran' => $response->status,
                    'link' => $response->invoice_url
                ];
                Mail::to($request->email)->send(new NotifyMail($mailData));

            }else if ($check_payment_methods == 'DANA'){
                $data_request = Http::withHeaders([
                    'Authorization' => $secret_key,
                ])->post('https://api.xendit.co/v2/invoices', [
                    // 'transaction_id' => $transaction_id,
                    'external_id' => 'MBC-SmileFest2023-'.$transaction_id,
                    'amount' => $totals+($totals * (1.5 / 100)), //$request->total_price, +(2500*$request->ticket_amount)
                    'payment_methods' => ['DANA']
                ]);
                $response = $data_request->object();

                Transaction::create([
                    'external_id' => 'MBC-SmileFest2023-'.$transaction_id,
                    // 'user_id' => $request->user_id,
                    'name' => $request->name,
                    'email' => $request->email,
                    'phone_number' => $request->phone_number,
                    'total_tickets' => $request->ticket_amount,
                    'tickets_category' => $promo_tiket->name,
                    'total_amount' => $totals+($totals * (1.5 / 100)),
                    'payment_status' => $response->status,
                    'payment_method' => $request->payment_method,
                    'payment_link' => $response->invoice_url,
                ]);

                //sent email :
                $mailData = [
                    'to' => $request->name.' !',
                    'nama' => $request->name,
                    'no_hp' => $request->phone_number,
                    'email' => $request->email,
                    'jumlah_tiket' => $request->ticket_amount,
                    'jenis_tiket' => $promo_tiket->name,
                    'total_pembelian' => $totals+($totals * (1.5 / 100)),
                    'metode_pembayaran' => $request->payment_method,
                    'status_pembayaran' => $response->status,
                    'link' => $response->invoice_url
                ];
                Mail::to($request->email)->send(new NotifyMail($mailData));

            }else if ($check_payment_methods == 'QRIS'){
                $data_request = Http::withHeaders([
                    'Authorization' => $secret_key,
                ])->post('https://api.xendit.co/v2/invoices', [
                    // 'transaction_id' => $transaction_id,
                    'external_id' => 'MBC-SmileFest2023-'.$transaction_id,
                    'amount' => $totals+($totals * (0.7 / 100)), //$request->total_price,
                    'payment_methods' => ['QRIS']
                ]);
                $response = $data_request->object();

                Transaction::create([
                    'external_id' => 'MBC-SmileFest2023-'.$transaction_id,
                    // 'user_id' => $request->user_id,
                    'name' => $request->name,
                    'email' => $request->email,
                    'phone_number' => $request->phone_number,
                    'total_tickets' => $request->ticket_amount,
                    'tickets_category' => $promo_tiket->name,
                    'total_amount' => $totals+($totals * (0.7 / 100)),
                    'payment_status' => $response->status,
                    'payment_method' => $request->payment_method,
                    'payment_link' => $response->invoice_url,
                ]);

                //sent email :
                $mailData = [
                    'to' => $request->name.' !',
                    'nama' => $request->name,
                    'no_hp' => $request->phone_number,
                    'email' => $request->email,
                    'jumlah_tiket' => $request->ticket_amount,
                    'jenis_tiket' => $promo_tiket->name,
                    'total_pembelian' => $totals+($totals * (0.7 / 100)),
                    'metode_pembayaran' => $request->payment_method,
                    'status_pembayaran' => $response->status,
                    'link' => $response->invoice_url
                ];
                Mail::to($request->email)->send(new NotifyMail($mailData));
            }
            
            // $response = $data_request->object();

            // Transaction::create([
            //     'external_id' => 'MBC-SmileFest2023-'.$transaction_id,
            //     // 'user_id' => $request->user_id,
            //     'name' => $request->name,
            //     'email' => $request->email,
            //     'phone_number' => $request->phone_number,
            //     'total_tickets' => $request->ticket_amount,
            //     'tickets_category' => $promo_tiket->name,
            //     'total_amount' => $request->total_price,
            //     'payment_status' => $response->status,
            //     'payment_method' => $request->payment_method,
            //     'payment_link' => $response->invoice_url,
            // ]);

            // //sent email :
            // $mailData = [
            //     'to' => $request->name.' !',
            //     'nama' => $request->name,
            //     'no_hp' => $request->phone_number,
            //     'email' => $request->email,
            //     'jumlah_tiket' => $request->ticket_amount,
            //     'jenis_tiket' => $promo_tiket->name,
            //     'total_pembelian' => $request->total_price,
            //     'metode_pembayaran' => $request->payment_method,
            //     'status_pembayaran' => $response->status,
            //     'link' => $response->invoice_url
            // ];
            // Mail::to($request->email)->send(new NotifyMail($mailData));

            $promo_tiket->stocks = (int)$promo_tiket->stocks - (int)$request->ticket_amount;
            $promo_tiket->save();
            
            return response('', 409)
                ->header('X-Inertia-Location', $response->invoice_url);
            // return json_encode($response->invoice_url);
            }
        
        
    );   
    
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\transaction  $transaction
     * @return \Illuminate\Http\Response
     */
    public function show(transaction $transaction)
    {
        //
    }

    
    public function redeemForm()
    {
        return Inertia::render(
            'Admin/Transaction/RedeemForm'
        );
    }

    public function redeem(Request $request)
    {
        // dd("Redeem Tiket");
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\transaction  $transaction
     * @return \Illuminate\Http\Response
     */
    public function edit(transaction $transaction)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\transaction  $transaction
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, transaction $transaction)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\transaction  $transaction
     * @return \Illuminate\Http\Response
     */
    public function destroy(transaction $transaction)
    {
        //
    }

    // public function callback()
    // {
    //     $data = request()->all();

    //     $status = $data['status'];
    //     $external_id = $data['external_id'];

    //     Transaction::where('external_id', 'MBC-SmileFest2023-'.$external_id)->update([
    //         'payment_status' => $status
    //     ]);

    //     return response()->json($data);
    // }
}
