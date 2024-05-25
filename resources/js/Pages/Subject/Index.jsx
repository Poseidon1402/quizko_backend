import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Datagrid from "@/Components/Datagrid";
import Modal from "@/Components/Modal";
import { PencilIcon, EyeIcon,TrashIcon } from "@heroicons/react/24/outline";
import Form from "./Form";
import { Transition } from "@headlessui/react";
import { Head, Link, useForm } from "@inertiajs/react";
import { useEffect, useMemo, useState } from "react";
import SecondaryButton from "@/Components/SecondaryButton";
import DeletionConfirmation from "@/Components/DeletionConfirmation";


export default function Index({ auth, subjects, questions}) {
    const [showCreationModal, setShowCreationModal] = useState(false);
    const [showDeletionModal, setShowDeletionModal] = useState(false);
    const [showEditionModal, setShowEditionModal] = useState(false);
    const [showQuestionsModal, setShowQuestionsModal] = useState(false);
    const [selectedData, setSelectedData] = useState(null);
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

    const handleCreationSubmit = (e) => {
        e.preventDefault();
        console.log(data);
        post(route("subjects.store"));
    };

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
    console.log(subjects);
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 light:text-gray-200  leading-tight">
                   Sujets
                </h2>
            }
        >
            <Head title="Sujets" />

            <div className="py-12">
                   <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <Datagrid
                            columns={columns}
                            rows={subjects}
    
                            onCreate={() => setShowCreationModal(true)}
                        />
                    </div>
            </div>

            <Modal
                show={showCreationModal}
                title="Ajouter une question"
                onClose={() => setShowCreationModal(false)}
            >
                <Transition
                    show={hasErrors}
                    enter="transition ease-in-out"
                    enterFrom="opacity-0"
                    leave="transition ease-in-out"
                    leaveTo="opacity-0"
                >
                    <p className="text-sm text-center text-red-600 dark:text-red-400">
                        Quelque chose s'est mal passé.
                    </p>
                </Transition>
                <Form
                    mode={showEditionModal ? "editon" : ("creation")}
                    data={data}
                    setData={setData}
                    errors={errors}
                    processing={processing}
                    onSubmit={
                        showEditionModal
                            ? handleEditionSubmit
                            : handleCreationSubmit
                    }
                    onCancel={() => {
                        cancel();
                        setShowCreationModal(false);
                    }}
                    onReset={() => reset("name")}
                />
            </Modal>

            <Modal
                show={showEditionModal}
                title="Modifier un sujet"
                onClose={() => setShowEditionModal(false)}
            >
                <Transition
                    show={hasErrors}
                    enter="transition ease-in-out"
                    enterFrom="opacity-0"
                    leave="transition ease-in-out"
                    leaveTo="opacity-0"
                >
                    <p className="text-sm text-center text-red-600 dark:text-red-400">
                        Quelque chose s'est mal passé.
                    </p>
                </Transition>
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

            <Modal
                show={showDeletionModal}
                title="Supprimer un sujet"
                onClose={() => setShowDeletionModal(false)}
            >
                <DeletionConfirmation
                    name={
                        selectedData?.subject
                    }
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
               <div className="p-4 m-5">
                    <h1 className="text-md text-center text-gray-800 mb-4">
                        Sujet : {selectedData?.subject} <span className="text-red-400">({selectedData?.total_points} points</span>)
                    </h1>
                    <h2 className="text-lg font-bold mb-2">
                        Nombre des questions : <span className="text-gray-700 border-b-2 ">{selectedData?.questions.length}</span >
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
                        <SecondaryButton className="mx-4" onClick={() => setShowQuestionsModal(false)}>
                            Annuler
                        </SecondaryButton>
                    </div>
            </Modal>

        </AuthenticatedLayout>
    );
}

const useColumns = (
    props,
)=> {
    return useMemo(() => {
        return [
            {
                accessorKey: "subject",
                cell: (info) =>
                    `${(info.getValue())}`,
                header: () => "Sujet",
            },
            {
                accessorKey: "questions",
                cell: (info) => `${(info.getValue() ).length}`,
                header: () => "Nombre des questions",
            },
            {
                accessorKey: "total_points",
                cell: (info) => `${(info.getValue())}`,
                header: () => "Total Points",
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
                            onClick={() =>{
                                props.onShow(info.getValue());
    
                            }}
                        >
                            <EyeIcon className='w-5 h-5 text-gray-600' />
                          
                        </button>
                
                        <button
                             className={
                                "p-1 border border-transparent rounded-md"
                            }
                            onClick={() =>{ 
                                props.onEdit(info.getValue() );
                             }}
                        >
                            <PencilIcon className="w-5 h-5 text-green-600" /> 
                        
                        </button>
                        <button
                             className={
                                "p-1 border border-transparent rounded-md"
                            }
                            onClick={() =>{
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
