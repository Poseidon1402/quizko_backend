import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Datagrid from "@/Components/Datagrid";
import Modal from "@/Components/Modal";
import { EyeIcon, CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Head, useForm } from "@inertiajs/react";
import { useEffect, useMemo, useState } from "react";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import { CSVLink } from 'react-csv';

export default function Detail({ auth, candidate_answers, interview }) {
    const [showModal, setShowModal] = useState(false);
    const [selectedCandidate, setSelectedCandidate] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const { data, setData, put, reset, hasErrors, recentlySuccessful } = useForm({
        note: null,
    });

    const sortedCandidates = useMemo(() => {
        const filteredCandidates = candidate_answers.filter(candidate => 
            candidate.candidate.name.toLowerCase().includes(searchTerm.toLowerCase())|| candidate.candidate.matricule.toLowerCase().includes(searchTerm.toLowerCase())
        );
        return filteredCandidates.sort((a, b) => a.candidate.matricule.localeCompare(b.candidate.matricule));
    }, [candidate_answers, searchTerm]);

    const excelResult = sortedCandidates.map(result => ({
        Matricule: result.candidate.matricule,
        Nom: result.candidate.name,
        Classe: interview[0]?.post?.name || '', 
        Note: result.note.note !== null ? result.note.note : result.note.interim_note,
    }));

    const filename = "Résultat_" + (interview[0]?.name || 'Interview') + ".xlsx";

    useEffect(() => {
        if (hasErrors) {
            reset("note");
        }
        if (recentlySuccessful) {
            reset();
            if (showModal) {
                setShowModal(false);
            }
        }
    }, [hasErrors, recentlySuccessful]);

    const handleEditionSubmit = (e) => {
        e.preventDefault();
        put(route("student_note.update", selectedCandidate.note));
        setShowModal(false);
    };

    const handleViewCandidateDetails = (candidate) => {
        setSelectedCandidate(candidate);
        setShowModal(true);
    };

    const columns = useColumns({
        onView: (data) => {
            handleViewCandidateDetails(data);
        },
    });

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-center text-gray-600 light:text-gray-200 leading-tight">
                    Réponses du test : "{interview[0]?.name}" , classe : "{interview[0]?.post?.name}"
                </h2>
            }
        >
            <Head title="Résultat" />
            <div className="text-end">
                <CSVLink
                    data={excelResult}
                    filename={filename}
                    className="inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
                >
                    Exporter en Excel
                </CSVLink>
            </div>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="Rechercher par nom ou matricule"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-200 text-sm"
                        />
                    </div>
                    <Datagrid
                        columns={columns}
                        rows={sortedCandidates}
                        canCreate={false}
                    />
                </div>
            </div>

            {selectedCandidate &&
                <Modal
                    show={showModal}
                    title={"Réponses de l'étudiant " + selectedCandidate.candidate.name + " :"}
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
                                                Réponse de l'étudiant : {answer.answer} {answer.is_correct ?
                                                    <CheckIcon className="w-4 h-4 text-green-500 inline-block align-middle" /> :
                                                    <XMarkIcon className="w-4 h-4 text-red-500 inline-block align-middle" />
                                                }
                                            </p>
                                            <p className="text-sm text-gray-600">Point : {answer.answer_point}</p>
                                        </>
                                    ) : (
                                        <>
                                            <p className="text-sm text-gray-600">
                                                Réponse de l'étudiant : {answer.answer_of_candidate}
                                            </p>
                                            <p className="text-sm text-gray-600">Point : {answer.answer_point}</p>
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
                            <div> Note provisoire : {selectedCandidate.note.interim_note}</div>
                            <div> Note : {selectedCandidate.note.note === null ? (<span className="text-red-400">En attente</span>) : selectedCandidate.note.note}</div>
                            <div className="flex items-center">
                                <input
                                    value={data.note}
                                    onChange={(e) => { setData('note', e.target.value) }}
                                    type="number"
                                    placeholder={(selectedCandidate.note.note === null) ? selectedCandidate.note.interim_note : "Modifier la note"}
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

const useColumns = (props) => {
    return useMemo(() => {
        return [
            {
                accessorKey: "candidate.matricule",
                cell: (info) =>
                    `${info.getValue()}`,  
                header: () => "Matricule",
            },
            {
                accessorKey: "candidate.name",
                cell: (info) =>
                    `${info.getValue()}`,
                header: () => "Nom",
            },
            {
                accessorKey: "note",
                cell: (info) => (
                    <span>{(info.getValue()?.note === null ? "Note provisoire : " + info.getValue()?.interim_note : "Note : " + info.getValue()?.note) || ''}</span>
                ),
                header: () => "Note",
            },
            {
                accessorFn: (row) => row,
                id: "id",
                cell: (info) => (
                    <div className="flex space-x-2">
                        <button
                            className={
                                "p-1 border border-transparent rounded-md"
                            }
                            onClick={() => {
                                props.onView(info.getValue());
                            }}
                        >
                            <EyeIcon className="w-5 h-5 text-gray-600" />
                        </button>
                    </div>
                ),
                header: () => "Action",
            },
        ];
    }, [props]);
};
