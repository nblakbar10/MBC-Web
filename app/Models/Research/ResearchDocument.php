<?php

namespace App\Models\Research;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ResearchDocument extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'research_id',
        'document_file_id',
        'research_document_category_id',
    ];

    public function research(){
        return $this->belongsTo(Research::class, 'research_id');
    }

    public function documentFile(){
        return $this->belongsTo('App\Models\DocumentFile', 'document_file_id');
    }

    public function researchDocumentCategory(){
        return $this->belongsTo(ResearchDocumentCategory::class, 'research_document_category_id');
    }
}
