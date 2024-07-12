import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Datagrid from "@/Components/Datagrid";
import Modal from "@/Components/Modal";
import { PencilIcon, EyeIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Head, Link, useForm } from "@inertiajs/react";
import { useEffect, useMemo, useState } from "react";
import SecondaryButton from "@/Components/SecondaryButton";
import DeletionConfirmation from "@/Components/DeletionConfirmation";
import Breadcrumb from "@/Components/Breadcrumbs/Breadcrumb";
import PrimaryButton from "@/Components/PrimaryButton";

export default function Index({ auth, subjects, questions }) {
    const [showCreationModal, setShowCreationModal] = useState(false);
    const [showDeletionModal, setShowDeletionModal] = useState(false);
    const [showEditionModal, setShowEditionModal] = useState(false);
    const [showQuestionsModal, setShowQuestionsModal] = useState(false);
    const [selectedData, setSelectedData] = useState(null);
    const [search, setSearch] = useState("");
    const [filteredSubjects, setFilteredSubjects] = useState(subjects);

    const {
        data,
        setData,
        put,
        delete: destroy,
        processing,
        errors,
        reset,
        cancel,
        hasErrors,
        recentlySuccessful,
    } = useForm({
        subject: "",
        questions: [],
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
            setShowQuestionsModal(true);
        },
    });

    useEffect(() => {
        if (hasErrors) {
            reset("subject");
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

    useEffect(() => {
        setFilteredSubjects(
            subjects.filter((subject) =>
                subject.subject.toLowerCase().includes(search.toLowerCase())
            )
        );
    }, [search, subjects]);

    const handleEditionSubmit = (e) => {
        e.preventDefault();
        put(route("subjects.update", selectedData.id));
    };

    const handleDeletionSubmit = (e) => {
        e.preventDefault();
        destroy(route("subjects.destroy", selectedData));
        setSelectedData(null);
        setShowDeletionModal(false);
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Sujets" />
            {/* <Breadcrumb pageName="Sujets" /> */}
            <div className="">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="mb-4 flex justify-between items-center space-x-4">
                        <div className="flex items-center space-x-4">
                            <label className="font-semibold">Filtrer par :</label>
                            <input
                                type="text"
                                placeholder="Rechercher un sujet"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="p-2 border border-gray-300 rounded-md"
                            />
                        </div>
                        <Link
                            href={route("subjects.create")}
                            className="inline-flex items-center justify-center rounded-full bg-black py-2 px-5 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                        >
                            Ajouter un sujet
                        </Link>
                    </div>
                    <Datagrid
                        columns={columns}
                        rows={filteredSubjects}
                        canCreate={false}
                    />
                </div>
            </div>

            <Modal
                show={showDeletionModal}
                title="Supprimer un sujet"
                onClose={() => setShowDeletionModal(false)}
            >
                <DeletionConfirmation
                    name={selectedData?.subject}
                    onCancel={() => {
                        cancel();
                        setShowDeletionModal(false);
                    }}
                    handleDeleteSubmit={handleDeletionSubmit}
                />
            </Modal>

            <Modal
                show={showQuestionsModal}
                title="Questions du sujet"
                onClose={() => setShowQuestionsModal(false)}
            >
                <div className="p-4 m-5 text-black">
                    <div className="bg-black text-white rounded-md p-2">
                    <h1 className="text-md text-center">
                        Sujet : {selectedData?.subject}{" "}
                        <span className="text-red-400">({selectedData?.total_points} points</span>)
                    </h1>
                    </div>
                    <h2 className="text-lg font-bold mb-2">
                        Nombre des questions :{" "}
                        <span className="text-gray-700 border-b-2">
                            {selectedData?.questions.length}
                        </span>
                    </h2>
                    <div className="space-y-2 overflow-y-auto max-h-80">
                        {selectedData?.questions.length > 0 &&
                            selectedData.questions.map((question) => (
                                <div key={question.id} className="border p-2 rounded-md">
                                    <p className="font-semibold">{question.question}</p>
                                    <p className="dark:text-gray-800">Point : {question.point}</p>
                                </div>
                            ))}
                    </div>
                </div>
                <div className="flex items-center border-t p-2 dark:border-gray-600 justify-center m-4">
                    <PrimaryButton className="mx-4" onClick={() => setShowQuestionsModal(false)}>
                        Annuler
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
                accessorKey: "subject",
                cell: (info) => (
                    <span className="bg-black p-2 rounded-md text-white">{info.getValue()}</span>
                ),
                header: () => "Sujet",
            },
            {
                accessorKey: "questions",
                cell: (info) => `${info.getValue().length}`,
                header: () => "Nombre des questions",
            },
            {
                accessorKey: "total_points",
                cell: (info) => (
                    <span className="bg-brown-500 p-1 rounded-md text-white">{info.getValue()}</span>
                ),
                header: () => "Total Points",
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

                        {/* <button
                            className="p-1 border border-transparent rounded-md"
                            onClick={() => {
                                props.onEdit(info.getValue());
                            }}
                        >
                            <PencilIcon className="w-5 h-5 text-green-600" />
                        </button> */}
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
