<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TicketDiscount extends Model
{
    use HasFactory;

    protected $fillable = [
        "name",
        "stock",
        "amount",
        "type",
        "minimum_buy",
        "ticket_type_id",
    ];

    public function ticketType()
    {
        return $this->belongsTo(TicketType::class);
    }

    public function transactions()
    {
        return $this->belongsToMany(Transaction::class, "transaction_discounts");
    }
}
