import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Datagrid from "@/Components/Datagrid";
import Modal from "@/Components/Modal";
import { PencilIcon, EyeIcon, TrashIcon, CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Form from "./Form";
import { Head, useForm } from "@inertiajs/react";
import { useEffect, useMemo, useState } from "react";
import SecondaryButton from "@/Components/SecondaryButton";
import DeletionConfirmation from "@/Components/DeletionConfirmation";
import PrimaryButton from "@/Components/PrimaryButton";
import Chip from "@/Components/Chip";
import { truncateText } from "@/Utils/truncateText";
export default function Index({ auth, questions }) {
    const [showCreationModal, setShowCreationModal] = useState(false);
    const [showDeletionModal, setShowDeletionModal] = useState(false);
    const [showEditionModal, setShowEditionModal] = useState(false);
    const [showAnswersModal, setShowAnswersModal] = useState(false);
    const [selectedData, setSelectedData] = useState(null);
    const [search, setSearch] = useState("");
    const [selectedType, setSelectedType] = useState("");

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
        question: "",
        point: 0,
        answers: [],
        type: "open",
    });

    const columns = useColumns({
        onEdit: (data) => {
            setSelectedData(data);
            setData(data);
            setShowEditionModal(true);
        },
        onDelete: (data) => {
            setSelectedData(data);
            setShowDeletionModal(true);
        },
        onShow: (data) => {
            setSelectedData(data);
            setShowAnswersModal(true);
        },
    });

    useEffect(() => {
        if (hasErrors) {
            reset("question");
        }

        if (recentlySuccessful) {
            reset();

            if (showCreationModal) {
                setShowCreationModal(false);
            }

            if (showEditionModal) {
                setShowEditionModal(false);
            }
        }
    }, [hasErrors, recentlySuccessful]);

    const handleCreationSubmit = (e) => {
        e.preventDefault();
        post(route("questions.store"));
    };

    const handleEditionSubmit = (e) => {
        e.preventDefault();
        put(route("questions.update", selectedData.id));
    };

    const handleDeletionSubmit = (e) => {
        e.preventDefault();
        destroy(route("questions.destroy", selectedData));
        setSelectedData(null);
        setShowDeletionModal(false);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <Head title="Questions & Réponses" />
            {/* <Breadcrumb pageName="Questions & Réponses" /> */}
            <div className="bg-white py-1">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="mb-4 flex justify-between items-center space-x-4 text-black">
                        <div className="flex items-center space-x-4">
                            <label className="font-semibold">Filtrer par :</label>
                            <input
                                type="text"
                                placeholder="Rechercher par question"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="p-2 border border-gray-300 rounded-md"
                            />
                            <select
                                value={selectedType}
                                onChange={(e) => setSelectedType(e.target.value)}
                                className="p-2 border border-gray-300 rounded-md text-black"
                            >
                                <option value="">Tous les types</option>
                                <option value="open">Question avec réponse attendue</option>
                                <option value="qcm">QCM</option>
                            </select>
                        </div>
                        <PrimaryButton onClick={() => setShowCreationModal(true)}>
                            Ajouter une question
                        </PrimaryButton>
                    </div>
                    <Datagrid
                        columns={columns}
                        rows={questions.filter((question) =>
                            question.question.toLowerCase().includes(search.toLowerCase()) &&
                            (selectedType ? question.type === selectedType : true)
                        )}
                        canCreate={false}
                        onCreate={() => setShowCreationModal(true)}
                    />
                </div>
            </div>

            {/* Modals */}
            {/* Modal de création */}
            <Modal
                show={showCreationModal}
                title="Ajouter une question"
                onClose={() => setShowCreationModal(false)}
            >
                {/* Contenu du formulaire */}
                <Form
                    mode="creation"
                    data={data}
                    setData={setData}
                    errors={errors}
                    processing={processing}
                    onSubmit={handleCreationSubmit}
                    onCancel={() => {
                        cancel();
                        setShowCreationModal(false);
                    }}
                    onReset={() => reset("name")}
                />
            </Modal>

            {/* Modal de modification */}
            <Modal
                show={showEditionModal}
                title="Modifier une question"
                onClose={() => setShowEditionModal(false)}
            >
                {/* Contenu du formulaire */}
                <Form
                    mode="edition"
                    data={data}
                    setData={setData}
                    errors={errors}
                    processing={processing}
                    onSubmit={handleEditionSubmit}
                    onCancel={() => {
                        cancel();
                        setShowEditionModal(false);
                    }}
                    onReset={() => reset()}
                />
            </Modal>

            {/* Modal de suppression */}
            <Modal
                show={showDeletionModal}
                title="Supprimer une question"
                onClose={() => setShowDeletionModal(false)}
            >
                <DeletionConfirmation
                    name={selectedData?.question}
                    onCancel={() => {
                        cancel();
                        setShowDeletionModal(false);
                    }}
                    handleDeleteSubmit={handleDeletionSubmit}
                />
            </Modal>

            {/* Modal d'affichage des réponses */}
            <Modal
                show={showAnswersModal}
                title="Réponse(s) d'une question"
                onClose={() => setShowAnswersModal(false)}
            >
                <div className="p-4 m-5 text-black">
                    <h1 className="text-xl font-semibold mb-2">{selectedData?.question}:</h1>
                    <h2 className="text-lg mb-4">Points : {selectedData?.point}</h2>
                    <ul>
                        {selectedData?.answers.length > 0 &&
                            selectedData.answers.map((answer, index) => (
                                <li key={answer.id} className="flex items-center mb-2">
                                    <div className="m-2 p-2">
                                        {answer.is_correct ? (
                                            <CheckIcon className="w-10 h-5 text-green-500" />
                                        ) : (
                                            <XMarkIcon className="w-10 h-5 text-red-500" />
                                        )}
                                    </div>
                                    <span className="mr-2">{index + 1}-{answer.answer}</span>
                                </li>
                            ))}
                    </ul>
                </div>
                <div className="flex items-center border-t p-2 justify-center m-4">
                    <PrimaryButton className="mx-4" onClick={() => setShowAnswersModal(false)}>
                        Ok
                    </PrimaryButton>
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
}

const useColumns = (props) => {
    return useMemo(() => {
        return [
            {
                accessorKey: "question",
                cell: (info) =>(<div className="text-black bg-blue-200 rounded-md p-2">{truncateText(info.getValue(),40)}</div>),
                header: () => "Question",
            },
            {
                accessorKey: "answers",
                cell: (info) => `${info.getValue().length}`,
                header: () => "Nombre des réponses",
            },
            {
                accessorKey: "point",
                cell: (info) =>(<span className="text-white bg-brown-500 px-2 py-1 rounded">{info.getValue()}</span>),
                header: () => "Point",
            },
            {
                accessorKey: "type",
                header: "Type",
                cell: ({ getValue }) => {
                    return <Chip type={getValue()==='qcm' ? "success" : "error"}>
                    {getValue()==='qcm' ? "QCM" : "OUVERTE"}
                </Chip>;
                 
                },
            },
            {
                accessorFn: (row) => row,
                id: "id",
                cell: (info) => (
                    <div className="flex space-x-2">
                        <button
                            className="p-1 border border-transparent rounded-md"
                            onClick={() => {
                                props.onShow(info.getValue());
                            }}
                        >
                            <EyeIcon className="w-5 h-5 text-gray-600" />
                        </button>
                        <button
                            className="p-1 border border-transparent rounded-md"
                            onClick={() => {
                                props.onEdit(info.getValue());
                            }}
                        >
                            <PencilIcon className="w-5 h-5 text-green-600" />
                        </button>
                        <button
                            className="p-1 border border-transparent rounded-md"
                            onClick={() => {
                                props.onDelete(info.getValue());
                            }}
                        >
                            <TrashIcon className="w-5 h-5 text-red-600" />
                        </button>
                    </div>
                ),
                header: () => "Action",
            },
        ];
    }, [props]);
};
