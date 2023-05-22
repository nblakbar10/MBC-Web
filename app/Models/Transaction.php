<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    use HasFactory;

    $fillable = [
        "ticket_type_id",
        "name",
        "email",
        "phone_number",
        "ticket_amount",
        "total_price",
        "buy_date",
        "pay_date",
        "payment_method",
        "payment_status",
        "payment_link",
        "external_id",
        "ticket_id",
        "ticket_status",
        "ticket_barcode_url",
    ];

    public function ticketType()
    {
        return $this->belongsTo(TicketType::class);
    }

    public function ticketDiscounts()
    {
        return $this->belongsToMany(TicketDiscount::class, "transaction_discounts");
    }

    public function redeemHistories()
    {
        return $this->hasMany(RedeemHistory::class);
    }
    
    public function event()
    {
        return $this->belongsTo(Event::class);
    }

    
}
