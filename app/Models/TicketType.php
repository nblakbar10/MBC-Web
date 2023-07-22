<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TicketType extends Model
{
    use HasFactory;

    protected $fillable = [
        "name",
        "stock",
        "fee",
        "price",
        "maximum_buy",
        "event_id",
    ];

    public function event()
    {
        return $this->belongsTo(Event::class);
    }

    public function ticketDiscounts()
    {
        return $this->hasMany(TicketDiscount::class);
    }

    public function transactions()
    {
        return $this->hasMany(Transaction::class);
    }

    public function redeemHistories()
    {
        return $this->hasMany(RedeemHistory::class);
    }

    public function userActivities()
    {
        return $this->hasMany(UserActivity::class);
    }
}
