<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    use HasFactory;

    protected $fillable=['question, point'];

    public function answers()
    {
        return $this->hasMany(Answer::class);
    }

    public function subjects()
    {
        return $this->belongsToMany(Subject::class, 'question_subjects');
    }
    public function questionSubjects()
    {
        return $this->belongsToMany(QuestionSubject::class, 'question_subjects');
    }

}
