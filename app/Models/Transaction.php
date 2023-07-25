<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    use HasFactory;

    protected $fillable = [
        "ticket_type_id",
        "name",
        "email",
        "phone_number",
        "ticket_amount",
        "total_price",
        "base_price",
        "city",
        "buy_date",
        "pay_date",
        "payment_method",
        "payment_status",
        "payment_link",
        "external_id",
        "ticket_id",
        "ticket_status",
        "ticket_barcode_url",
        "redeemed_amount",
    ];

    public function ticketType()
    {
        return $this->belongsTo(TicketType::class);
    }

    public function transactionDiscounts(){
        return $this->belongsToMany(TicketDiscount::class, 'transaction_discounts', 'transaction_id', 'ticket_discount_id');
    }

    public function redeemHistories()
    {
        return $this->hasMany(RedeemHistory::class);
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
