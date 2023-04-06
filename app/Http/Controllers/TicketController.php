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
        return Inertia::render(
            'Admin/Transaction/RedeemForm'
        );
    }

    public function callback() //update data payment, save data ticket, sent email
    {
        $data = request()->all();

        $status = $data['status'];
        $external_id = $data['external_id'];

        Transaction::where('external_id', 'MBC-SmileFest2023-'.$external_id)->update([
            'payment_status' => $status
        ]);

        $check_payment_status = Transaction::where('external_id',$external_id)->pluck('payment_status')->first();
        if ($check_payment_status == 'PAID'){
            $source_date = Carbon::now();
            $parsed_date = Carbon::parse($source_date)->format('d F Y');
            $ticket_id = Str::random(5);
            $data = Transaction::where('external_id', $external_id)->get();
            Ticket::create([
                "external_id" => $external_id,
                "ticket_id" => $parsed_date.$ticket_id,
                "ticket_name" => $data->name,
                "email" => $data->email,
                "phone_number" => $data->phone_number,
                "payment_method" => $data->payment_method,
                "ticket_qty" => $data->total_tickets,
                "ticket_category" => $data->tickets_category,
                "ticket_status" => "Not redeemed"
            ]);
        }

        //sent email :
        $mailData = [
            'id_tiket' => $data->ticket_id,
            'nama' => $data->name,
            'email' => $data->email,
            'no_hp' => $data->phone_number,
            'jumlah_tiket' => $data->ticket_amount,
            'jenis_tiket' => $data->tickets_category,
            'total_pembayaran' => $data->total_amount,
            'metode_pembayaran' => $data->payment_method,
            // 'barcode' => $data->ticket_id, //$response->invoice_url,
        ];
        Mail::to($data->email)->send(new SuccessMail($mailData));
    }

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
