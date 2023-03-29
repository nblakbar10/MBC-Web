<?php

namespace App\Models\Research;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ResearchDocumentCategory extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'type',
    ];

    public function researchDocuments()
    {
        return $this->hasMany(ResearchDocument::class);
    }

    public function researches()
    {
        return $this->belongsToMany(
            'App\Models\Research\Research',
            'research_documents',
            'research_document_categories_id',
            'research_id',
        );
    }
}
