<?php

namespace App\Models\Research;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ResearchContributor extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'research_id',
        'contributor_type',
    ];

    public function research(){
        return $this->belongsTo(Research::class, 'research_id');
    }

    public function user(){
        return $this->belongsTo('App\Models\User', 'user_id');
    }

}
