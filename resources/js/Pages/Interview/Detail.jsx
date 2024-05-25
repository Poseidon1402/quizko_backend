import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Datagrid from "@/Components/Datagrid";
import Modal from "@/Components/Modal";
import { PencilIcon, EyeIcon,TrashIcon, CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Form from "./Form";
import { Transition } from "@headlessui/react";
import { Head, Link, useForm } from "@inertiajs/react";
import { useEffect, useMemo, useState } from "react";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import { CSVLink } from "react-csv";


export default function Detail({ auth, candidate_answers, interview, interviewResults}) {
    const [showAnswerModal, setShowAnswerModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedData, setSelectedData] = useState(null);
    const [selectedCandidate, setSelectedCandidate] = useState(null); // État pour stocker les détails du candidat sélectionné
    const [showModal, setShowModal] = useState(false); 
    const {
        data,
        setData,
        post,
        put,
        delete: destroy,
        processing,
        errors,
        reset,
        cancel,
        hasErrors,
        recentlySuccessful,
    } = useForm({
        note: null,  
    });
    const excelResult = interviewResults.map(result => {
        return {
            Matricule: result.candidate.id,
            Nom: result.candidate.user.last_name,
            Prénom: result.candidate.user.first_name,
            Classe: result.candidate.post.name,
            Note: result.note,
        };
    });
    const filename ="Résultat_"+interview.name+".csv";

    // const columns = useColumns({
    //     onEdit: (data) => {
    //         setSelectedData(data);
    //         setData(data);
    //         setShowEditionModal(true);
    //     },
    //     onDelete: (data) => {
    //         setSelectedData(data);
    //         setShowDeletionModal(true);
    //     },
    // });
    useEffect(() => {
        if (hasErrors) {
            reset("note");
        }

        if (recentlySuccessful) {
            reset();

            if (showModal) {
                setShowAnswerModal(false);
            }

        }
    }, [hasErrors, recentlySuccessful]);

    // const handleCreationSubmit = (e) => {
    //     e.preventDefault();
    //     post(route("departments.store"));
    // };

    const handleEditionSubmit = (e) => {
        e.preventDefault();
        put(route("student_note.update", selectedCandidate.note));
        //console.log(data);
        setShowModal(false);
    };

    // const handleDeletionSubmit = (e) => {
    //     e.preventDefault();
    //     destroy(route("departments.destroy", selectedData));
    //     setSelectedData(null);
    //     setShowDeletionModal(false);
    // };
    
  const filteredCandidates = candidate_answers.filter(candidate_answer =>
    candidate_answer.candidate.name.toLowerCase().includes(searchTerm.toLowerCase())||candidate_answer.candidate.last_name.toLowerCase().includes(searchTerm.toLowerCase())||candidate_answer.candidate.first_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };
  const handleViewCandidateDetails = (candidate) => {
    setSelectedCandidate(candidate);
    setShowModal(true);
  };
    console.log(candidate_answers);
    console.log(interview);
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 light:text-gray-200  leading-tight">
                      Réponses du test {interview.name}
                </h2>
            }
        >
            <Head title="Dashboard" />
            <div className="text-end">
                <CSVLink 
                data={excelResult}
                filename={filename}
                    className="inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
                >Exporter en Excel</CSVLink>
            </div>
            <div className="py-5">
                <input
                    type="text"
                    placeholder="Recherche..."
                    value={searchTerm}
                    onChange={handleInputChange}
                    className="w-full p-3 m-2 border border-gray-300 rounded-md shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-200"
                />
              <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {filteredCandidates.length > 0 ? (
                        filteredCandidates.map((candidate_answer) => (
                            <div key={candidate_answer.candidate.id} className="mb-4 p-4 bg-white rounded-md shadow-md flex flex-col items-center justify-center">
                                <div className="text-lg font-semibold">
                                    {candidate_answer.candidate.name}
                                </div>
                                <div className="text-sm text-gray-500">
                                    {candidate_answer.candidate.first_name} {candidate_answer.candidate.last_name}
                                </div>
                                <div className="text-sm m-2 text-gray-500">
                                    {candidate_answer.note.note===null?<span className="text-red-800">Note provisoir: {candidate_answer.note.interim_note}</span>:<span >Note: {candidate_answer.note.note}</span>} 
                                </div>
                                <PrimaryButton
                                    onClick={() => handleViewCandidateDetails(candidate_answer)}
                                > Voir
                                </PrimaryButton>
                              
                            </div>
                        ))
                    ) : (
                        <div className="text-red-500 text-center">Aucun résultat...</div>
                    )}
                </div>
            </div>     
              {/* Modal pour afficher les détails du candidat */}
        {selectedCandidate&&
            <Modal
                show={showModal}
                title={"Réponses de l'étudiant " + selectedCandidate.candidate.name+" :"}
                onClose={() => setShowModal(false)}
            >
                <div className="space-y-2 overflow-y-auto max-h-80">
                    {selectedCandidate.answers.length > 0 ? (
                        selectedCandidate.answers.map(answer => (
                            <div key={answer.id} className="border-b border-gray-200 pb-4">
                                <h1 className="text-lg font-semibold">{answer.question} ({answer.question_point} point(s))</h1>
                                {answer.answer_of_candidate === null ? (
                                    <>
                                        <p className="text-sm text-gray-600">
                                            Réponse de l'étudiant: {answer.answer} {answer.is_correct ? 
                                                <CheckIcon className="w-4 h-4 text-green-500 inline-block align-middle" /> : 
                                                <XMarkIcon className="w-4 h-4 text-red-500 inline-block align-middle" />
                                            }
                                        </p>
                                        <p className="text-sm text-gray-600">Point: {answer.answer_point}</p>
                                    </>
                                ) : (
                                    <>
                                        <p className="text-sm text-gray-600">
                                            Réponse de l'étudiant: {answer.answer_of_candidate} 
                                        </p>
                                        <p className="text-sm text-gray-600">Point: {answer.answer_point}</p>
                                    </>
                                )}
                            </div>
                        ))
                    ) : (
                        <div className="text-red-500">Aucune réponse..</div>
                    )}
                </div>
        <form onSubmit={handleEditionSubmit} className="shadow-lg p-2">
             <div className="flex justify-between items-center m-4">
                 
                    <div> Note provisoire: {selectedCandidate.note.interim_note}</div>
                    <div> Note: {selectedCandidate.note.note===null?(<span className="text-red-400">En attente</span>):selectedCandidate.note.note}</div>
                    <div className="flex items-center">
                        <input
                            value={data.note}
                            onChange={(e)=>{setData('note',e.target.value)}}
                            type="number"
                            placeholder={(selectedCandidate.note.note===null)?selectedCandidate.note.interim_note:"Modifier la note"}
                            className="w-50 px-3 py-1 border border-gray-300 rounded-md shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-200 text-sm"
                        />
                    </div>
                </div>


                <div className="flex items-center justify-end mt-4">
                    <SecondaryButton
                        className="ms-4 text-sm"
                        onClick={() => setShowModal(false)}
                    >
                        Annuler
                    </SecondaryButton>
                    <PrimaryButton
                        className="ms-4 text-sm"
                        type="submit"
                    >
                        Valider
                    </PrimaryButton>
                </div>
             </form>
            </Modal>
        }
        </AuthenticatedLayout>
    );
}
