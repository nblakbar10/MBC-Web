<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Transaction;
use App\Models\Ticket;
use Carbon\Carbon;
use Inertia\Inertia;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Mail;
use App\Mail\SuccessMail;

class TicketController extends Controller
{
    public function index() //redeemForm()
    {
        $tickets = Ticket::paginate(10);
        // $transactions = Transaction::all();
        // dd($transactions);  
        return Inertia::render('Admin/Ticket/Index', [
            'tickets' => $tickets,
        ]);
    }

    public function callback() //update data payment, save data ticket, sent email
    {
        $data = request()->all();

        $status = $data['status'];
        $external_id = $data['external_id'];

        Transaction::where('external_id', 'MBC-SmileFest2023-'.'$external_id')->update([
            'payment_status' => $status
        ]);


        // $check_payment_status = Transaction::where('external_id','$external_id')->pluck('payment_status')->first();
        // $source_date = Carbon::now();
        // $parsed_date = Carbon::parse($source_date)->format('d F Y');
        // $mix_ticket = $parsed_date.Str::random(5);
        // $data_trans = Transaction::where($external_id, 'external_id')->get();

        // if ($check_payment_status == 'PAID'){
        //     Ticket::create([
        //         "external_id" => $external_id,
        //         "ticket_id" => $mix_ticket,
        //         "ticket_name" => $data_trans->name,
        //         "email" => $data_trans->email,
        //         "phone_number" => $data_trans->phone_number,
        //         "payment_method" => $data_trans->payment_method,
        //         "ticket_qty" => $data_trans->total_tickets,
        //         "ticket_category" => $data_trans->tickets_category,
        //         "ticket_status" => "Not redeemed"
        //     ]);
        // }

        // //sent email :
        // $mailData = [
        //     'id_tiket' => $mix_ticket,
        //     'nama' => $data_trans->name,
        //     'email' => $data_trans->email,
        //     'no_hp' => $data_trans->phone_number,
        //     'jumlah_tiket' => $data_trans->ticket_amount,
        //     'jenis_tiket' => $data_trans->tickets_category,
        //     'total_pembayaran' => $data_trans->total_amount,
        //     'metode_pembayaran' => $data_trans->payment_method,s
        // ];
        // Mail::to($data_trans->email)->send(new SuccessMail($mailData));
    }


    // public function generate_ticket(){
    // }

    public function redeem_ticket(Request $request)
    {
        $check = Ticket::where('ticket_id', $request->token)->get();
        if($check){
            Ticket::where('external_id', $check->external_id)->update([
                'ticket_status' => 'Reedeemed'
            ]);
            return redirect()->route('ticket.index')->banner('Ticket ID Found!'); 

        }else{
            return redirect()->route('ticket.index')->banner('Ticket ID Not Found!');
        }
    }
}
