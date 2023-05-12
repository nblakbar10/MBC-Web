<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
// use Illuminate\Database\Eloquent\SoftDeletes;

class Transaction extends Model
{
    use HasFactory;
    public $table = "transaction";
    protected $guarded = ['id'];
    protected $fillable = [
        // 'user_id',
        'external_id',
        'promo_id',
        'name',
        'email',
        'phone_number',
        'total_tickets',
        'tickets_category',
        'total_amount',
        'payment_method',
        'payment_status',
        'payment_link',
        'ticket_id',
        'ticket_status',
        'ticket_barcode',
        'redeem_amount'
    ];

    protected $casts = [
        'created_at' => 'datetime:Y-m-d H:i', //keterangan waktu
        'updated_at' => 'datetime:Y-m-d H:i'
    ];
}
