<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TransactionDiscount extends Model
{
    use HasFactory;

    protected $fillable = [
        "transaction_id",
        "ticket_discount_id",

    ];

    public function transaction()
    {
        return $this->belongsTo(Transaction::class);
    }

    public function ticketDiscount()
    {
        return $this->belongsTo(TicketDiscount::class);
    }
}
