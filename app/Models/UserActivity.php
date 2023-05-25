<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserActivity extends Model
{
    use HasFactory;

    protected $fillable = [
        "user_id",
        "activity",
        "latitude",
        "longitude",
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
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
