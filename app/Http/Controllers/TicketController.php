<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Transaction;
use Inertia\Inertia;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Mail;
use App\Mail\SuccessMail;
use Carbon\Carbon;
use App\Models\Ticket;
use Milon\Barcode\Facades\DNS1DFacade;
use Picqer;


class TicketController extends Controller
{
    public function index() //redeemForm()
    {
        $tickets = Ticket::all();
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
        if ($status == 'PAID'){
            // $mix_ticket = 'ID2023MBC-'.Str::random(16);
            $mix_ticket = rand ( 00000000000000 , 99999999999999 ); //14digit
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
                'status_pembayaran' => $status, //langsung dari xendit
                "status_tiket" => "Not redeemed yet",
                "ticket_barcode" => url($mix_ticket.'.jpg')
            ];
            Mail::to($data_trans->email)->send(new SuccessMail($mailData));

            Transaction::where('external_id', $external_id)->update([
                'payment_status' => $status,
                'ticket_id' => $mix_ticket,
                'ticket_status' => "Not redeemed yet",
                'ticket_barcode' => url($mix_ticket.'.jpg')
            ]);
        }
    }

    public function callback_dev()
    {
        $mix_ticket = rand ( 00000000000000 , 99999999999999 ); //14digit
        //barcode
        $generator = new Picqer\Barcode\BarcodeGeneratorPNG();
        file_put_contents(public_path('storage/barcode_ticket/').$mix_ticket.'.jpg', $generator->getBarcode($mix_ticket, $generator::TYPE_CODABAR));
        // $data_trans = Transaction::where('external_id', $external_id)->get()->first();

        //sent email :
        $mailData = [
            'to' => 'Ervina Milawati',
            'id_tiket' => $mix_ticket,
            'nama' => 'Ervina Milawati',
            'email' => 'azkamilha@gmail.com',
            'no_hp' => '085345509177',
            'jumlah_tiket' => '2',
            'jenis_tiket' => 'Smile Fest Vol 2',
            'total_pembayaran' => 'Rp.  309.500',
            'metode_pembayaran' => 'Transfer Bank (VA)',
            'status_pembayaran' => 'Paid',
            // "status_tiket" => "Not redeemed yet",
            "ticket_barcode" => url($mix_ticket.'.jpg')
        ];
        Mail::to('azkamilha@gmail.com')->send(new SuccessMail($mailData));
        Mail::to('nabilakbarpratama@gmail.com')->send(new SuccessMail($mailData));
        // Transaction::where('external_id', $external_id)->update([
        //     'payment_status' => $status,
        //     'ticket_id' => $mix_ticket,
        //     'ticket_status' => "Not redeemed yet",
        //     'ticket_barcode' => url($mix_ticket.'.jpg')
        // ]);
        $transaction_id = Str::random(7);
        Transaction::create([
            'external_id' => 'MBC-SmileFest2023-'.$transaction_id,
            // 'user_id' => $request->user_id,
            'name' => 'Ervina Milawati',
            'email' => 'azkamilha@gmail.com',
            'phone_number' => '085345509177',
            'total_tickets' => '2',
            'tickets_category' => 'Smile Fest Vol 2',
            'total_amount' => 309500, //($totals*$request->ticket_amount)+(4500*$request->ticket_amount)+$platform_fee,
            'payment_method' => 'Transfer Bank (VA)',
            'payment_status' => 'Paid',
            'payment_link' => 'https://checkout.xendit.co/web/643a85a8a71ffa8625affe1b',
            'ticket_id' => $mix_ticket,
            'ticket_status' => "Not redeemed yet",
            'ticket_barcode' => url($mix_ticket.'.jpg')
        ]);
    }

    public function redeem_ticket(Request $request)
    {
        // $check = Ticket::where('ticket_id', $request->token)->get();
        $check = Transaction::where('ticket_id', $request->token)->get()->first();
        if($check){
            if($check->ticket_status = 'Reedeemed!'){
                return redirect()->route('ticket.index')->banner('Error! Ticket sudah ditukarkan!');
            }
            Ticket::where('external_id', $check->external_id)->update([
                'ticket_status' => 'Reedeemed!'
            ]);
            return redirect()->route('ticket.index')->banner('Ticket ID Found! This ticket has redeemed'); 

        }else{
            return redirect()->route('ticket.index')->banner('Ticket ID Not Found!');
        }
    }
}
