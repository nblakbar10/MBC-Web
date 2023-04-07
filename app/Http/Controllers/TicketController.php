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

        Transaction::where('external_id', $external_id)->update([
            'payment_status' => $status
        ]);

        // $check_payment_status = Transaction::where('external_id','MBC-SmileFest2023-cC6ps')->pluck('payment_status')->first();
        $check_payment_status = Transaction::where('external_id',$external_id)->pluck('payment_status')->first();
        $mix_ticket = 'ID2023MBC-'.Str::random(11);
        //barcode
        $generator = new Picqer\Barcode\BarcodeGeneratorPNG();
        file_put_contents(public_path('storage/barcode_ticket/').$mix_ticket.'.jpg', $generator->getBarcode('081231723897', $generator::TYPE_CODABAR));
        // $file_bukti = url($mix_ticket.'.jpg');
        // dd($file_bukti);
        // $data_trans = Transaction::where('external_id', 'MBC-SmileFest2023-cC6ps')->get()->first();
        $data_trans = Transaction::where($external_id, 'external_id')->get();
        if ($check_payment_status == 'PAID'){
            Ticket::create([
                "external_id" => $external_id,
                "ticket_id" => $mix_ticket,
                "ticket_name" => $data_trans->name,
                "email" => $data_trans->email,
                "phone_number" => $data_trans->phone_number,
                "payment_method" => $data_trans->payment_method,
                "ticket_qty" => $data_trans->total_tickets,
                "ticket_category" => $data_trans->tickets_category,
                "ticket_status" => "Not redeemed yet",
                "ticket_barcode" => url($mix_ticket.'.jpg')
            ]);
        }

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
            'status_pembayaran' => $data_trans->payment_status,
            "status_tiket" => "Not redeemed yet",
            "ticket_barcode" => url($mix_ticket.'.jpg')
        ];
        Mail::to($data_trans->email)->send(new SuccessMail($mailData));

        // $check_payment_status = Transaction::where('external_id',$external_id)->pluck('payment_status')->first();
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
        //     'metode_pembayaran' => $data_trans->payment_method,
        // ];
        // Mail::to($data_trans->email)->send(new SuccessMail($mailData));
    }


    

    public function redeem_ticket(Request $request)
    {
        $check = Ticket::where('ticket_id', $request->token)->get();
        if($check){
            if($check->ticket_status = 'Reedeemed!'){
                return redirect()->route('ticket.index')->banner('Error! Ticket sudah ditukarkan!');
            }
            Ticket::where('external_id', $check->external_id)->update([
                'ticket_status' => 'Reedeemed!'
            ]);
            return redirect()->route('ticket.index')->banner('Ticket ID Found!'); 

        }else{
            return redirect()->route('ticket.index')->banner('Ticket ID Not Found!');
        }
    }
}
