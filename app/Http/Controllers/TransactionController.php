<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Event;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Http;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use App\Mail\NotifyMail;
use App\Models\TicketType;
use App\Models\TicketDiscount;

use DateTime;
use App\Mail\SuccessMail;
use Carbon\Carbon;
use App\Models\Ticket;
use Milon\Barcode\Facades\DNS1DFacade;
use Picqer;

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

    public function getData(Request $request)
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
        ])->whereColumns($request->get('filters'))
        ->paginate($request->get('perPage') ?? 10);

        return response()->json($transaction);
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
        return DB::transaction(function () use ($request){
            $request->validate([
                'name' => 'required',
                'email' => ['required', 'email'],
                'phone_number' => ['required', 'string', 'max:255', 'regex:(08)'],
                'city' => ['required', 'string', 'max:255'],
                'ticket_amount' => ['required', 'numeric', 'max:5', 'min:1'],
                // 'ticket_type_id' => ['required' , 'numeric'],
                'payment_method' => 'required',
            ]);

            $check_user_ticket_limit = Transaction::where(['phone_number' => $request->phone_number, 'email' => $request->email])->pluck('ticket_amount');
            $data = array_sum($check_user_ticket_limit->toArray());
            $maximum_ticket = $data + $request->ticket_amount; 

            $ticket_type_data = TicketType::find($request->ticketType_id);
            if ((int)$request->ticket_amount > (int)$ticket_type_data->stock) {
                throw ValidationException::withMessages(['Tiket yang tersedia tidak cukup dengan jumlah yang ingin anda beli']);
            }if ($maximum_ticket > 5){
                throw ValidationException::withMessages(['Sisa Tiket yang dapat anda beli hanya sebanyak '. (5-$data) . ' Tiket lagi!']);
            }

            //count all total transactions (include discount)
            $check_discount = TicketDiscount::where('ticket_type_id', $request->ticketType_id)->where('stock','>', 0)->get()->first();
            $totals = 0;
            if($check_discount){
                $check_minimum_discount = TicketDiscount::where('id', $request->ticketType_id)->pluck('minimum_buy')->first();
                if ($request->ticket_amount == $check_minimum_discount){
                    if($check_discount->type == 'Absolute'){
                        $totals += ($ticket_type_data->price * $request->ticket_amount) - $check_discount->deduction*$request->ticket_amount;
                    }else if($check_discount->type == 'Percentage'){
                        $totals += ($ticket_type_data->price * $request->ticket_amount) - (($ticket_type_data->price * $request->ticket_amount) * ($check_discount->deduction / 100)*$request->ticket_amount);
                        
                    }
                    $check_discount->decrement('stock');
                }else{
                    $totals += $ticket_type_data->price * $request->ticket_amount;
                }
            }else{
                $totals += $ticket_type_data->price * $request->ticket_amount;
            }

            $platform_fee = 2500*$request->ticket_amount;

            $now = new DateTime();

            $check_payment_methods = $request->payment_method;
            $secret_key = 'Basic '.config('xendit.key_auth');
            $transaction_id = Str::random(7);
            $get_event_data_by_id = TicketType::where('id', $request->ticketType_id)->pluck('id')->first();
            $get_event_name = Event::where('id', $get_event_data_by_id)->pluck('name')->first();
            $get_event_city = Event::where('id', $get_event_data_by_id)->pluck('city')->first();

            $external_id = $get_event_name.$transaction_id;

            if ($check_payment_methods == 'Transfer Bank (VA)')
            {
                $data_request = Http::withHeaders([
                    'Authorization' => $secret_key,
                ])->post('https://api.xendit.co/v2/invoices', [
                    'external_id' => $external_id,
                    'name' => $request->name,
                    'amount' => (int)$totals+7500+(int)$platform_fee,
                    'payment_methods' => ['BNI', 'BRI', 'BSI', 'BJB', 'MANDIRI', 'PERMATA']
                ]);
                $response = $data_request->object();
                
                Transaction::create([
                    "ticket_type_id" => $request->ticketType_id,
                    "name" => $request->name,
                    "email" => $request->email,
                    "phone_number" => $request->phone_number,
                    "ticket_amount" => $request->ticket_amount,
                    "total_price" => (int)$totals+7500+(int)$platform_fee, 
                    "city" => $request->city,
                    "buy_date" => $now,
                    "pay_date" => '',
                    "payment_method" => $request->payment_method,
                    "payment_status" => $response->status,
                    "payment_link" => $response->invoice_url,
                    "external_id" => $external_id,
                    "ticket_id" => '',
                    "ticket_status" => 'WAITING FOR PAYMENTS',
                    "ticket_barcode_url" => '',
                    "redeemed_amount" => 0,
                ]);

                $mailData = [
                    'to' => $request->name.' !',
                    'nama' => $request->name,
                    'no_hp' => $request->phone_number,
                    'email' => $request->email,
                    'jumlah_tiket' => $request->ticket_amount,
                    'jenis_tiket' => $request->tickets_category,
                    'total_pembelian' => (int)$totals+7500+(int)$platform_fee,
                    'metode_pembayaran' => $request->payment_method,
                    'status_pembayaran' => $response->status,
                    'link' => $response->invoice_url
                ];
                Mail::to($request->email)->send(new NotifyMail($mailData));

            }else if ($check_payment_methods == 'DANA'){
                $data_request = Http::withHeaders([
                    'Authorization' => $secret_key,
                ])->post('https://api.xendit.co/v2/invoices', [
                    'external_id' => $external_id,
                    'amount' => (int)$totals+ ((int)$totals * (2 / 100))+(int)$platform_fee,
                    'payment_methods' => ['DANA']
                ]);
                $response = $data_request->object();

                Transaction::create([
                    "ticket_type_id" => $request->ticketType_id,
                    "name" => $request->name,
                    "email" => $request->email,
                    "phone_number" => $request->phone_number,
                    "ticket_amount" => $request->ticket_amount,
                    "total_price" => (int)$totals+7500+(int)$platform_fee, 
                    "city" => $request->city,
                    "buy_date" => $now,
                    "pay_date" => '',
                    "payment_method" => $request->payment_method,
                    "payment_status" => $response->status,
                    "payment_link" => $response->invoice_url,
                    "external_id" => $external_id,
                    "ticket_id" => '',
                    "ticket_status" => 'WAITING FOR PAYMENTS',
                    "ticket_barcode_url" => '',
                    "redeemed_amount" => 0,
                ]);

                //sent email :
                $mailData = [
                    'to' => $request->name.' !',
                    'nama' => $request->name,
                    'no_hp' => $request->phone_number,
                    'email' => $request->email,
                    'jumlah_tiket' => $request->ticket_amount,
                    'jenis_tiket' => $ticket_type_data->name,
                    'total_pembelian' => (int)$totals+((int)$totals * (2 / 100))+(int)$platform_fee,
                    'metode_pembayaran' => $request->payment_method,
                    'status_pembayaran' => $response->status,
                    'link' => $response->invoice_url
                ];
                Mail::to($request->email)->send(new NotifyMail($mailData));

            }else if ($check_payment_methods == 'QRIS'){
                $data_request = Http::withHeaders([
                    'Authorization' => $secret_key,
                ])->post('https://api.xendit.co/v2/invoices', [
                    'external_id' => $external_id,
                    'amount' => (int)$totals+((int)$totals * (1 / 100))+(int)$platform_fee,
                    'payment_methods' => ['QRIS']
                ]);
                $response = $data_request->object();

                Transaction::create([
                    "ticket_type_id" => $request->ticketType_id,
                    "name" => $request->name,
                    "email" => $request->email,
                    "phone_number" => $request->phone_number,
                    "ticket_amount" => $request->ticket_amount,
                    "total_price" => (int)$totals+7500+(int)$platform_fee, 
                    "city" => $request->city,
                    "buy_date" => $now,
                    "pay_date" => '',
                    "payment_method" => $request->payment_method,
                    "payment_status" => $response->status,
                    "payment_link" => $response->invoice_url,
                    "external_id" => $external_id,
                    "ticket_id" => '',
                    "ticket_status" => 'WAITING FOR PAYMENTS',
                    "ticket_barcode_url" => '',
                    "redeemed_amount" => 0,
                ]);

                $mailData = [
                    'to' => $request->name.' !',
                    'nama' => $request->name,
                    'no_hp' => $request->phone_number,
                    'email' => $request->email,
                    'jumlah_tiket' => $request->ticket_amount,
                    'jenis_tiket' => $ticket_type_data->name,
                    'total_pembelian' => (int)$totals+((int)$totals * (1 / 100))+(int)$platform_fee,
                    'metode_pembayaran' => $request->payment_method,
                    'status_pembayaran' => $response->status,
                    'link' => $response->invoice_url
                ];
                Mail::to($request->email)->send(new NotifyMail($mailData));
            }
            $ticket_type_data->stock = (int)$ticket_type_data->stock - (int)$request->ticket_amount;
            $ticket_type_data->save();
            
            return response('', 409)
                ->header('X-Inertia-Location', $response->invoice_url);
        
        }
    );
    
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

    public function callback() //update data payment, save data ticket, sent email
    {
        $data = request()->all();

        $status = $data['status'];
        $external_id = $data['external_id'];
        if ($status == 'PAID'){
            $mix_ticket = rand ( 00000000000000 , 99999999999999 ); //14digit

            $now = new DateTime();

            //barcode
            $generator = new Picqer\Barcode\BarcodeGeneratorPNG();
            file_put_contents(public_path('storage/barcode_ticket/').$mix_ticket.'.jpg', $generator->getBarcode($mix_ticket, $generator::TYPE_CODABAR));
            $data_trans = Transaction::where('external_id', $external_id)->get()->first();

            //sent email :
            $mailData = [
                'to' => $data_trans->name,
                'id_tiket' => $mix_ticket,
                'nama' => $data_trans->name,
                'email' => $data_trans->email,
                'no_hp' => $data_trans->phone_number,
                'jumlah_tiket' => $data_trans->total_tickets,
                'jenis_tiket' => $data_trans->tickets_category,
                'total_pembayaran' => $data_trans->total_amount,
                'metode_pembayaran' => $data_trans->payment_method,
                'status_pembayaran' => $status, //direct from xendit
                "status_tiket" => "SUCCESS, READY TO REDEEM",
                "ticket_barcode" => url($mix_ticket.'.jpg')
            ];
            Mail::to($data_trans->email)->send(new SuccessMail($mailData));

            Transaction::where('external_id', $external_id)->update([
                'payment_status' => $status,
                'ticket_id' => $mix_ticket,
                'ticket_status' => "SUCCESS, READY TO REDEEM",
                'ticket_barcode' => url($mix_ticket.'.jpg'),
                'pay_date' => $now,
            ]);

        }else if ($status == 'EXPIRED'){
            Transaction::where('external_id', $external_id)->update([
                'payment_status' => $status,
                'ticket_id' => "",
                'ticket_status' => "Tidak Valid",
                'ticket_barcode' => ""
            ]);
            $restore_stocks = Transaction::where('external_id', $external_id)->pluck('total_tickets')->first();
            $get_ticket_type_id = Transaction::where('external_id', $external_id)->pluck('ticket_type_id')->first();
            TicketType::where('id', $get_ticket_type_id)->update([
                'ticket_barcode' => $restore_stocks
            ]);
        }
    }

    public function getTransactionByTicketTypeBetweenDatesGroupByDay(Request $request)
    {
        $start_date = $request->get('start_date') ?? Carbon::now()->subDays(7)->format('Y-m-d');
        $end_date = $request->get('end_date') ?? Carbon::now()->format('Y-m-d');
        $ticket_type_id = $request->get('ticket_type_id') ?? 1;

        $transaction_count = Transaction::where('ticket_type_id', $ticket_type_id)
            ->whereBetween('pay_date', [$start_date, $end_date])
            ->selectRaw('DATE(pay_date) as date, count(*) as count')
            ->groupBy('date')
            ->get();

        $transaction_total = Transaction::where('ticket_type_id', $ticket_type_id)
            ->whereBetween('pay_date', [$start_date, $end_date])
            ->selectRaw('DATE(pay_date) as date, sum(total_price) as total')
            ->groupBy('date')
            ->get();
        
        $ticket_total = Transaction::where('ticket_type_id', $ticket_type_id)
            ->whereBetween('pay_date', [$start_date, $end_date])
            ->selectRaw('DATE(pay_date) as date, sum(ticket_amount) as total')
            ->groupBy('date')
            ->get();

        return response()->json([
            'transaction_count' => [
                'labels' => $transaction_count->pluck('date'),
                'data' => $transaction_count->pluck('count'),
            ],
            'transaction_total' => [
                'labels' => $transaction_total->pluck('date'),
                'data' => $transaction_total->pluck('total'),
            ],
            'ticket_total' => [
                'labels' => $ticket_total->pluck('date'),
                'data' => $ticket_total->pluck('total'),
            ],
        ]);
    }
}
