<?php

namespace App\Http\Controllers;

use App\Models\Candidate;
use App\Models\User;
use App\Models\Post;
use Illuminate\Http\Request;
use App\Http\Controllers\Auth\UserController;
use Inertia\Inertia;
use App\Imports\CandidateImport;
use Maatwebsite\Excel\Facades\Excel;
class CandidateController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $posts = Post::all();   
        $candidates = Candidate::with('user', 'post')->get();
       return Inertia::render('Candidate/Index', [
        'candidates' => $candidates,
        'posts' => $posts,
    ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $userController = new UserController();
        $user = $userController->store($request);
        if (!$user) {
            return redirect(route('students.index')); 
        }
        $request->validate([
            'post_id' => 'required|exists:posts,id',
            'gender' => 'required|in:masculine,feminine',
        ]);
        $candidate = new Candidate();
        $candidate->user_id = $user->id;
        $candidate->post_id = $request->input('post_id');
        $candidate->gender = $request->input('gender');  
        $candidate->registration_number = $request->input('registration_number'); 
        $candidate->save();
        redirect(route('students.index')); 
    }
    /* Store a newly created resource in storage (import data).
    */
   public function importExcelData(Request $request)
   {
       $request->validate([
           'import_file' => ['required', 'file', 'mimes:xls,xlsx'],
       ]);
       Excel::import(new CandidateImport, $request->file('import_file'));
       redirect(route('students.index'));
   }
    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Candidate $candidate)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'post_id' => 'required|exists:posts,id',
            'status' => 'required|in:admitted,pending,failed',
            'gender' => 'required|in:masculine,feminine',
        ]);

        $candidate = Candidate::find($id);
        if (!$candidate) {
            return response()->json(['message' => 'Candidate not found'], 404);
        }

        $candidate->post_id = $request->input('post_id');
        $candidate->status = $request->input('status');
        $candidate->gender = $request->input('gender');
        $candidate->save();

        return response()->json($candidate);
    }
    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $candidate = Candidate::find($id);
        if (!$candidate) {
            return response()->json(['message' => 'Candidate not found'], 404);
        }

        $candidate->delete();

        return response()->json(['message' => 'Candidate deleted'], 200);
    }
}
