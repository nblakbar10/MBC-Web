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

            // FOR DEV USE ONLY :
            // Transaction::where('external_id', $external_id)->update([
            //     'payment_status' => $status,
            //     'ticket_id' => "Sucess null",
            //     'ticket_status' => "Success",
            //     'ticket_barcode' => "Success null"
            // ]);

        }else if ($status == 'EXPIRED'){
            // $restore_stocks = Transaction::where('external_id', $external_id)->pluck('total_tickets')->first();
            Transaction::where('external_id', $external_id)->update([
                'payment_status' => $status,
                'ticket_id' => "NULL",
                'ticket_status' => "Failed",
                'ticket_barcode' => "NULL"
            ]);
            $restore_stocks = Transaction::where('external_id', $external_id)->pluck('total_tickets')->first();
            $get_promo_id = Transaction::where('external_id', $external_id)->pluck('promo_id')->first();
            Promo::where('id', $get_promo_id)->update([
                'ticket_barcode' => $restore_stocks
            ]);
            //SISA BIKIN TABEL BARU A.K.A NAMBAH ROW BARU
            // $restore_stocks->stocks = (int)$restore_stocks->stocks - (int)$request->ticket_amount;
            // $restore_stocks->save();
        }
    }

    // public function callback_dev()
    // {
    //     // $mix_ticket = rand ( 00000000000000 , 99999999999999 ); //14digit
    //     // //barcode
    //     // $generator = new Picqer\Barcode\BarcodeGeneratorPNG();
    //     // file_put_contents(public_path('storage/barcode_ticket/').$mix_ticket.'.jpg', $generator->getBarcode($mix_ticket, $generator::TYPE_CODABAR));
    //     // $data_trans = Transaction::where('external_id', $external_id)->get()->first();

    //     //sent email :
    //     $mailData = [
    //         'to' => 'Siti kholifatul marifah',
    //         'id_tiket' => '2202367943223',
    //         'nama' => 'Siti kholifatul marifah',
    //         'email' => 'sitikholifatulmarifah@gmail.com',
    //         'no_hp' => '081250696482',
    //         'jumlah_tiket' => '1',
    //         'jenis_tiket' => 'Smile Fest Vol 2',
    //         'total_pembayaran' => 'Rp.  157.000',
    //         'metode_pembayaran' => 'Transfer Bank (VA)',
    //         'status_pembayaran' => 'Paid',
    //         // "status_tiket" => "Not redeemed yet",
    //         "ticket_barcode" => url('2202367943223'.'.jpg')
    //     ];
    //     // Mail::to('sitikholifatulmarifah@gmail.com')->send(new SuccessMail($mailData));
    //     Mail::to('dian.galleon@gmail.com')->send(new SuccessMail($mailData));
    //     // Transaction::where('external_id', $external_id)->update([
    //     //     'payment_status' => $status,
    //     //     'ticket_id' => $mix_ticket,
    //     //     'ticket_status' => "Not redeemed yet",
    //     //     'ticket_barcode' => url($mix_ticket.'.jpg')
    //     // ]);
    //     // $transaction_id = Str::random(7);
    //     // Transaction::create([
    //     //     'external_id' => 'MBC-SmileFest2023-G5h2Lb2',
    //     //     // 'user_id' => $request->user_id,
    //     //     'name' => 'Siti kholifatul marifah',
    //     //     'email' => 'sitikholifatulmarifah@gmail.com',
    //     //     'phone_number' => '081250696482',
    //     //     'total_tickets' => '1',
    //     //     'tickets_category' => 'Smile Fest Vol 2',
    //     //     'total_amount' => 157000, //($totals*$request->ticket_amount)+(4500*$request->ticket_amount)+$platform_fee,
    //     //     'payment_method' => 'Transfer Bank (VA)',
    //     //     'payment_status' => 'Paid',
    //     //     'payment_link' => 'https://checkout.xendit.co/web/643a8438e54ed644c6167032',
    //     //     'ticket_id' => '2202367943223',
    //     //     'ticket_status' => "Not redeemed yet",
    //     //     'ticket_barcode' => url('2202367943223'.'.jpg')
    //     // ]);
    // }

    public function callback_dev()
    {
        $mix_ticket = rand ( 00000000000000 , 99999999999999 ); //14digit
        //barcode
        $generator = new Picqer\Barcode\BarcodeGeneratorPNG();
        file_put_contents(public_path('storage/barcode_ticket/').$mix_ticket.'.jpg', $generator->getBarcode($mix_ticket, $generator::TYPE_CODABAR));
        // $data_trans = Transaction::where('external_id', $external_id)->get()->first();

        //sent email :
        $mailData = [
            'to' => 'Widya Nurrahmadani',
            'id_tiket' => $mix_ticket,
            'nama' => 'Widya Nurrahmadani',
            'email' => 'wnur6878@gmail.com',
            'no_hp' => '085248027276',
            'jumlah_tiket' => '2',
            'jenis_tiket' => 'Smile Fest Vol 2',
            'total_pembayaran' => 'Rp. 409,500',
            'metode_pembayaran' => 'Transfer Bank (VA)',
            'status_pembayaran' => 'PAID',
            // "status_tiket" => "Not redeemed yet",
            "ticket_barcode" => url($mix_ticket.'.jpg')
        ];
        // Mail::to('wnur6878@gmail.com')->send(new SuccessMail($mailData));
        Mail::to('nabilakbarpratama@gmail.com')->send(new SuccessMail($mailData));
        // Mail::to('dian.galleon@gmail.com')->send(new SuccessMail($mailData));
        Transaction::where('external_id', 'MBC-SmileFest2023-TG6XHMv')->update([
            // 'payment_status' => "PAID",
            'ticket_id' => $mix_ticket,
            'ticket_status' => "Not redeemed yet",
            'ticket_barcode' => url($mix_ticket.'.jpg')
        ]);
        // $transaction_id = Str::random(7);
        // Transaction::create([
        //     'external_id' => 'MBC-SmileFest2023-G5h2Lb2',
        //     // 'user_id' => $request->user_id,
        //     'name' => 'Siti kholifatul marifah',
        //     'email' => 'wnur6878@gmail.com',
        //     'phone_number' => '081250696482',
        //     'total_tickets' => '1',
        //     'tickets_category' => 'Smile Fest Vol 2',
        //     'total_amount' => 157000, //($totals*$request->ticket_amount)+(4500*$request->ticket_amount)+$platform_fee,
        //     'payment_method' => 'Transfer Bank (VA)',
        //     'payment_status' => 'Paid',
        //     'payment_link' => 'https://checkout.xendit.co/web/643a8438e54ed644c6167032',
        //     'ticket_id' => '2202367943223',
        //     'ticket_status' => "Not redeemed yet",
        //     'ticket_barcode' => url('2202367943223'.'.jpg')
        // ]);
    }

    // public function redeem_ticket(Request $request)
    // {
    //     // $check = Ticket::where('ticket_id', $request->token)->get();
    //     $check = Transaction::where('ticket_id', $request->token)->get()->first();
    //     if($check){
    //         if($check->ticket_status = 'Reedeemed!'){
    //             return redirect()->route('ticket.index')->banner('Error! Ticket sudah ditukarkan!');
    //         }
    //         Ticket::where('external_id', $check->external_id)->update([
    //             'ticket_status' => 'Reedeemed!'
    //         ]);
    //         return redirect()->route('ticket.index')->banner('Ticket ID Found! This ticket has redeemed'); 

    //     }else{
    //         return redirect()->route('ticket.index')->banner('Ticket ID Not Found!');
    //     }
    // }

    public function redeem_ticket(Request $request)
    {
        $check = Transaction::where('ticket_id', $request->token)->get()->first();
        if($check){
            if($check->redeem_amount == 0 || $check->redeem_amount == NULL){
                Ticket::where('external_id', $check->external_id)->update([
                    'ticket_status' => 'Reedeemed for '.$request->redeem_amount.' tickets',
                    'redeem_amount' => $request->redeem_amount
                ]);
                return redirect()->route('ticket.index')->banner('Ticket ID Found! '.$request->redeem_amount.' tickets'. 'has redeemed.'); 
            }else if($check->redeem_amount != 0 || $check->redeem_amount != NULL){
                if($request->redeem_amount == $check->total_tickets){
                    Ticket::where('external_id', $check->external_id)->update([
                        'ticket_status' => 'Reedeemed for all tickets',
                        'redeem_amount' => $request->redeem_amount
                    ]);
                    return redirect()->route('ticket.index')->banner('Ticket ID Found! All tickets has redeemed.'); 
                }else if($request->redeem_amount > $check->redeem_amount){
                    return redirect()->route('ticket.index')->banner('Error! Redeem request was out of total purchased tickets'); 
                }else if($request->redeem_amount < $check->redeem_amount){
                    $decrease_redeem_amount = (int)$check->redeem_amount - (int)$request->redeem_amount;
                    Ticket::where('external_id', $check->external_id)->update([
                        'ticket_status' => 'Reedeemed for all tickets',
                        'redeem_amount' => $decrease_redeem_amount
                    ]);
                    return redirect()->route('ticket.index')->banner('Ticket ID Found! '.$request->redeem_amount.' tickets'. 'has redeemed.');
                }
            }
        }else{
            return redirect()->route('ticket.index')->banner('Ticket ID Not Found!');
        }
    }
}
