<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\File\File;

class DocumentFile extends Model
{
    use HasFactory;

    protected $table = 'document_files';

    protected $fillable = [
        'path',
        'disk',
    ];

    public function deleteResearchDirectory($id){
        Storage::disk($this->disk)->deleteDirectory("/researches/$id");
    }

    public function deleteFile(){
        if($this->exists){
            Storage::disk($this->disk)->delete($this->path);
        }
    }

    function replaceFile(File $file) {
        $path = pathinfo($this->path);
        Storage::disk($this->disk)->putFileAs($path['dirname'], $file, $path['basename']);
        $this->touch();
    }

    static function createFile(string $disk, string $path, File $file): DocumentFile {
        $path = Storage::disk($disk)->put($path, $file);
        return DocumentFile::create([
            'disk' => $disk,
            'path' => $path
        ]);
    }
}
