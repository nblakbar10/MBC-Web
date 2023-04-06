<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ticket extends Model
{
    use HasFactory;
    public $table = "tickets";
    protected $guarded = ['id'];
    protected $fillable = [
        // 'user_id',
        'external_id',
        'ticket_id',
        'ticket_name',
        'email',
        'phone_number',
        'ticket_qty',
        'ticket_category',
        'ticket_status',
    ];

    protected $casts = [
        'created_at' => 'datetime:Y-m-d H:i', //keterangan waktu
        'updated_at' => 'datetime:Y-m-d H:i'
    ];
}
