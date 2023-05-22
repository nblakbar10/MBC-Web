<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    use HasFactory;

    protected $fillable = [
        "name",
        "description",
        "start_date",
        "end_date",
        "location",
        "latitude",
        "longitude",
        "banner",
        "user_id",
    ];

    public function ticketTypes()
    {
        return $this->hasMany(TicketType::class);
    }

    public function redeemHistories()
    {
        return $this->hasMany(RedeemHistory::class);
    }

    public function userActivities()
    {
        return $this->hasMany(UserActivity::class);
    }

    public function transactions()
    {
        return $this->hasMany(Transaction::class);
    }
}
