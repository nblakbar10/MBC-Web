<?php

namespace App\Models\Research;

use App\Models\Research\ResearchType;
use App\Models\Research\ResearchDocument;
use App\Models\Research\ResearchContribution;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Research extends Model
{
    use HasFactory;

    protected $table = 'researches';

    protected $fillable = [
        'name',
        'description',
        'research_type_id',
    ];

    public function researchType(): BelongsTo{
        return $this->belongsTo(ResearchType::class, 'research_type_id');
    }

    public function researchDocuments(): HasMany{
        return $this->HasMany(ResearchDocument::class, 'research_id');
    }

    public function researchContributors(): HasMany{
        return $this->hasMany(ResearchContributor::class, 'research_id');
    }

    public function userContributors(): BelongsToMany{
        return $this->BelongsToMany(
            'App\Models\User',
            'research_contributors',
            'research_id',
            'user_id',
        );
    }

    public function researchDocumentFiles(): BelongsToMany{
        return $this->BelongsToMany(
            'App\Models\DocumentFile',
            'App\Models\Research\ResearchDocument',
            'research_id',
            'document_file_id',
        );
    }

    static function allRelation(){
        return [
            'researchType', 
            'researchDocuments.documentFile', 
            'researchDocuments.researchDocumentCategory',
            'researchContributors.user.roles', 
            'userContributors',
        ];
    }

    static public function scopeWithAll($query) {
        return $query->with(static::allRelation());
    }
}
