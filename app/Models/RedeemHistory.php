<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RedeemHistory extends Model
{
    use HasFactory;

    protected $fillable = [
        "user_id",
        "transaction_id",
        "amount",
        "latitude",
        "longitude",
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
    
    public function transaction()
    {
        return $this->belongsTo(Transaction::class);
    }

    public function ticketType()
    {
        return $this->hasOneThrough(
            TicketType::class,
            Transaction::class,
            'id', // Foreign key on Transaction table...
            'id', // Foreign key on TicketType table...
            'transaction_id', // Local key on RedeemHistory table...
            'ticket_type_id' // Local key on Transaction table...
        );
    }

    public function scopeWhereColumns($query, $filters){
        if(isset($filters)){
            forEach(json_decode($filters) as $value) {
                $key = explode("_",$value->id);
                if (count($key)>1) {
                    $query->whereHas($key[0], function($query) use ($value, $key) {
                        $query->where($key[1], 'like', '%'. $value->value.'%');
                    });
                }else {
                    $query->where($value->id,'like', '%'. $value->value.'%');
                }
            }
        }
        return $query;
    }
}
