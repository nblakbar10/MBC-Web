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

    public function scopeVisitorFilter($query, $filters){
        if(isset($filters)){
            forEach($filters as $key=>$value) {
                if( $key == "name"){
                    $query->where('name', $value);
                }else if( $key == "year"){
                    $query->whereYear('start_date', $value);
                }else if( $key == "month"){
                    $query->whereMonth('start_date', $value);
                }else if( $key == "city"){
                    $query->where('city', $value);
                }else {
                    continue;
                }
            }
        }
        return $query;
    }
}
