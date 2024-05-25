<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Answer;
use App\Models\CandidateAnswer;
use App\Models\CandidateNote;
use App\Models\Interview;
use Inertia\Inertia;

class CandidateAnswerController extends Controller
{
    /**
     * Affiche la liste de toutes les réponses des candidats.
     *
     */
    public function index($id)
        {
            $interview= Interview::findOrFail($id);
            $interviewResults= CandidateNote::where('interview_id', $id)->with(['candidate.user','candidate.post'])->get();
            $candidateAnswers = CandidateAnswer::with(['answer.question', 'interview.candidate_notes', 'candidate.user','candidate.candidate_notes.interview'])
                ->where('interview_id', $id)
                ->get();

            $formattedData = [];

            foreach ($candidateAnswers as $candidateAnswer) {
                if (!array_key_exists($candidateAnswer->candidate_id, $formattedData)) {
                    $formattedData[$candidateAnswer->candidate_id] = [
                        'candidate' => [
                            'id' => $candidateAnswer->candidate_id,
                            'name' => $candidateAnswer->candidate->user->name,
                            'first_name' => $candidateAnswer->candidate->user->first_name,
                            'last_name' => $candidateAnswer->candidate->user->last_name,              
                        ],
                        'answers' => [],
                        //'note' => $candidateAnswer->candidate->candidate_notes[0]->note,
                        'note' => CandidateNote::where('candidate_id', $candidateAnswer->candidate_id)->first(),
                    ];
                }

                $formattedData[$candidateAnswer->candidate_id]['answers'][] = [
                    'id' => $candidateAnswer->id,
                    'question' => $candidateAnswer->answer->question->question,
                    'question_point' => $candidateAnswer->answer->question->point,
                    'answer' => $candidateAnswer->answer->answer,
                    'answer_of_candidate' => $candidateAnswer->answer_of_candidate,
                    'answer_point' => $candidateAnswer->point,
                    'is_correct' => $candidateAnswer->answer->is_correct,
                ];
            }
            return Inertia::render('Interview/Detail', [
                'candidate_answers' => array_values($formattedData),
                'interview'=>$interview,
                'interviewResults'=>$interviewResults,
            ]);
        }
        
        public function candidateInterviewAnswers($candidate_id, $interview_id)
        {

           // $candidate= Candidate::findOrFail($candidate_id);
        
            $candidateAnswers = CandidateAnswer::with(['answer.question'])
                ->where('candidate_id', $candidate_id)
                ->where('interview_id', $interview_id)
                ->get();
            $note=CandidateNote::where('interview_id', $interview_id)
                ->where('candidate_id', $candidate_id)
                 ->first();
                 $data = [
                    'answers' => $candidateAnswers,
                    'note' => $note
                ];
                
                return response()->json(["data"=>$data]);
        }
        
         public function store(Request $request)
        {
                $data = $request->validate([
                    'candidate_id' => 'required|exists:candidates,id',
                    'interview_id' => 'required|exists:interviews,id',
                    'candidate_answers' => 'required|array',
                    'candidate_answers.*.answer_id' => 'required|exists:answers,id',
                    'candidate_answers.*.answer_of_candidate' => 'nullable',
                ]);
            
                $totalPoints = 0;
            
                foreach ($data['candidate_answers'] as $candidateAnswer) {
                    $answer = Answer::find($candidateAnswer['answer_id']);
                    $isCandidateAnswer=!empty($candidateAnswer['answer_of_candidate']);
                    // Vérifier si la réponse du candidat est correcte
                    if ($answer->is_correct && !$isCandidateAnswer) {
                        // Si oui, attribuer le nombre de points de la question
                        $totalPoints += $answer->question->point;
                    } elseif ($isCandidateAnswer) {
                       // $point=getPoint($answer->answer, $candidateAnswer['answer_of_candidate'], $answer->question->point);
                       //$totalPoints += $point;
                         $totalPoints += $answer->question->point;
                    }

                    // Enregistrer la réponse du candidat
                    CandidateAnswer::create([
                        'interview_id' => $data['interview_id'],
                        'candidate_id' => $data['candidate_id'],
                        'answer_id' => $candidateAnswer['answer_id'],
                        'answer_of_candidate' => $candidateAnswer['answer_of_candidate'] ?? null,
                        'point' => $answer->is_correct ? $answer->question->point : 0,
                    ]);
                }
                    CandidateNote::create([
                        'interview_id' => $data['interview_id'],
                        'candidate_id' => $data['candidate_id'],
                        'interim_note' => $totalPoints,
                    ]);
            
                return response()->json(['message' => 'Réponses d\'un étudiant enregistrée avec succès.', 'total_points' => $totalPoints]);
        }


    
    public function destroy($id)
    {
        $candidateAnswer = CandidateAnswer::findOrFail($id);
        $candidateAnswer->delete();

        return response()->json(['message' => 'Réponse de candidat supprimée avec succès !']);
    }


}
