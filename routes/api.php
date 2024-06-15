<?php

use App\Http\Controllers\PasswordResetController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CandidateAnswerController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\CandidateNoteController;
use App\Http\Controllers\InterviewController;
use App\Http\Controllers\SubjectController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
Route::post('/subscribe', [AuthenticatedSessionController::class, 'subscribeCandidate'])->name('subscribe_candidate');

Route::middleware('auth:sanctum')->group(function() {
    
    Route::get('/student-answers/{candidate_id}/{interview_id}', [CandidateAnswerController::class, 'candidateInterviewAnswers'])->name('student_answers.studentTestAnswers');
    
    Route::get('/is-student-passed/{interview_id}/{candidate_id}', [CandidateNoteController::class, 'checkCandidateNotes'])->name('student_note.checkCandidateNotes');
       
    Route::get('tests/{post_id}', [InterviewController::class, 'getPostInterview'])->name('tests.getPostTest');

    Route::get('/is-expired/{interview_id}', [InterviewController::class, 'checkInterviewExpiration'])->name('tests.checkInterviewExpiration');

    Route::get('questions/{id}', [SubjectController::class, 'getQuestionsSubject'])->name('subjects.getQuestionsSubject');

    Route::post('/answer', [CandidateAnswerController::class, 'store'])->name('student_answers.store');

    Route::post('/logout', [AuthenticatedSessionController::class, 'apiDestroy']) ->name('logout');

    Route::post('/send-reset-code', [PasswordResetController::class, 'sendResetCode']);//email

    Route::post('/verify-reset-code', [PasswordResetController::class, 'verifyResetCode']);//email, token

    Route::post('/reset-password', [PasswordResetController::class, 'resetPassword']);//email, token , new_password
    
});