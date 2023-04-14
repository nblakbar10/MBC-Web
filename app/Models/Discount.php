<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Discount extends Model
{
    use HasFactory;
    public $table = "discount";
    protected $guarded = ['id'];
    protected $fillable = [
        // 'user_id',
        'promo_id',
        'name',
        'minimum_order',
        'type', //discount type = Percentage or Absolute
        'deduction',
        'quota',
        // 'valid_until'
    ];

    protected $casts = [
        'created_at' => 'datetime:Y-m-d H:i', //keterangan waktu
        'updated_at' => 'datetime:Y-m-d H:i'
    ];
}