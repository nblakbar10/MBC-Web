<?php

namespace App\Models\Research;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ResearchType extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
    ];

    public function researches(){
        return $this->hasMany(Research::class, 'research_type_id');
    }
}
