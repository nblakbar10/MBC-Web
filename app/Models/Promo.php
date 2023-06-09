<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
// use Illuminate\Database\Eloquent\SoftDeletes;

class Promo extends Model
{
    use HasFactory;
    public $table = "promos";
    protected $guarded = ['id'];
    protected $fillable = [
        'name',
        'stocks',
        'description',
        'price',
    ];

    protected $casts = [
        'created_at' => 'datetime:Y-m-d H:i', //keterangan waktu
        'updated_at' => 'datetime:Y-m-d H:i'
    ];
}
