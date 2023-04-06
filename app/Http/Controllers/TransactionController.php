<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use App\Models\Promo;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Redirect;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Http;

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
        return Inertia::render('Admin/Transaction/Index', [
            'transactions' => Transaction::all(),
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
        $check_user_ticket_limit = Transaction::where(['phone_number' => $request->phone_number, 'email' => $request->email])->pluck('total_tickets');
        $data = $check_user_ticket_limit->toArray();
        $maximum_ticket = array_sum($data); 

        $check_sisa_tiket = Promo::where('name', $request->tickets_category)->first();
        if ((int)$request->ticket_amount > (int)$check_sisa_tiket->stocks) {
            return redirect()->route('home')->banner('Tiket yang tersedia tidak cukup dengan jumlah yang ingin anda beli');
        }

        if ($maximum_ticket >= 5){
            return redirect()->route('home')->banner('Anda sudah kena limit tiket');

        } else {
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
                    'amount' => $request->total_price,
                    'payment_methods' => ['BCA', 'BNI', 'BRI', 'Mandiri']
                ]);
            }else if ($check_payment_methods == 'DANA'){
                $data_request = Http::withHeaders([
                    'Authorization' => $secret_key,
                ])->post('https://api.xendit.co/v2/invoices', [
                    // 'transaction_id' => $transaction_id,
                    'external_id' => 'MBC-SmileFest2023-'.$transaction_id,
                    'amount' => $request->total_price,
                    'payment_methods' => ['DANA']
                ]);
            }

            $response = $data_request->object();
            dd($response->invoice_url);

            Transaction::create([
                'external_id' => 'MBC-SmileFest2023-'.$transaction_id,
                // 'user_id' => $request->user_id,
                'name' => $request->name,
                'email' => $request->email,
                'phone_number' => $request->phone_number,
                'total_tickets' => $request->ticket_amount,
                'tickets_category' => $request->tickets_category,
                'total_amount' => $request->total_price,
                'payment_status' => $response->status,
                'payment_method' => $request->payment_method,
                'payment_link' => $response->invoice_url,
            ]);
            //promo ticket stocks decrement :
            // $check_if_zero = Promo::get();
            // if ($check_if_zero->stocks == 0){
            

            //sent email :
            $mailData = [
                'to' => 'Hallo '.$request->name.' !',
                // 'p1' => 'Proses booking tiket anda telah berhasil! Anda akan menerima bukti konfirmasi pembelian tiket
                //         ketika pembayaran anda telah kami terima',
                // 'data1' => 'Berikut data diri anda yang kami terima:',
                'nama' => $request->name,
                'no_hp' => $request->phone_number,
                'email' => $request->email,
                'jumlah_tiket' => $request->ticket_amount,
                'jenis_tiket' => $request->tickets_category,
                'total_pembelian' => $request->total_amount,
                'metode_pembayaran' => $request->payment_method,
                'status_pembayaran' => $response->status,
                'link' => $response->invoice_url
            ];
            Mail::to($request->email)->send(new NotifyMail($mailData));

            $promo = Promo::where('name', $request->tickets_category)->get()[0];
            $promo->stocks = (int)$promo->stocks - (int)$request->ticket_amount;
            $promo->save();
            
            return response('', 409)
                ->header('X-Inertia-Location', $response->invoice_url);
            // return json_encode($response->invoice_url);
        }

        
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

    
    // public function redeemForm()
    // {
    //     return Inertia::render(
    //         'Admin/Transaction/RedeemForm'
    //     );
    // }

    // public function redeem(Request $request)
    // {
    //     // dd("Redeem Tiket");
    // }

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
