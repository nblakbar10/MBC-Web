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
        "city",
        "location",
        "maximum_buy",
        "start_date",
        "end_date",
        "poster_url",
        "event_map_url",
        "preview_url",
    ];

    public function ticketTypes()
    {
        return $this->hasMany(TicketType::class);
    }

    public function transactions()
    {
        return $this->hasMany(Transaction::class);
    }
}
