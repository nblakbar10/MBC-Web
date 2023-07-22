<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

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
                    $query->where(DB::raw('lower(name)'),'like', '%' . strtolower($value) . '%');
                }else if( $key == "year"){
                    $query->whereYear('start_date', $value);
                }else if( $key == "month"){
                    if($value != 0){
                        $query->whereMonth('start_date', $value);
                    }else{
                        continue;
                    }
                }else if( $key == "city"){
                    $query->where('city','like', '%' . $value . '%');
                }else {
                    continue;
                }
            }
        }
        return $query;
    }

    public function scopeWithTicketTypeTransactionBetweenDates($query, $start_date, $end_date){
        return $query->with([
            'ticketTypes' => function($query) use ($start_date, $end_date){
                $query->with([
                    'transactions' => function($query) use ($start_date, $end_date){
                        $query->whereBetween('created_at', [$start_date, $end_date]);
                    }
                ]);
            }
        ]);
    }
}
