import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Datagrid from "@/Components/Datagrid";
import Modal from "@/Components/Modal";
import { PencilIcon, EyeIcon,TrashIcon } from "@heroicons/react/24/outline";
import Form from "./Form";
import { Transition } from "@headlessui/react";
import { Head, Link, useForm } from "@inertiajs/react";
import { useEffect, useMemo, useState } from "react";
import DeletionConfirmation from "@/Components/DeletionConfirmation";
import Breadcrumb from "@/Components/Breadcrumbs/Breadcrumb";
import Switcher from "@/Components/Switcher";


export default function Index({ auth, interviews, subjects,  posts}) {
    const [showCreationModal, setShowCreationModal] = useState(false);
    const [showDeletionModal, setShowDeletionModal] = useState(false);
    const [showEditionModal, setShowEditionModal] = useState(false);
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
        name: "",  
        start_date: "",  
        end_date: "",  
        time: "",
        subject_id: "",  
        post_id: "",  
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
    });
    useEffect(() => {
        if (hasErrors) {
            reset("end_date","post_id","subject_id","time");
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
        post(route("tests.store"));
    };

    const handleEditionSubmit = (e) => {
        put(route("tests.update", selectedData.id));
        console.log(data);
    };

    const handleDeletionSubmit = (e) => {
        e.preventDefault();
        destroy(route("tests.destroy", selectedData));
        setSelectedData(null);
        setShowDeletionModal(false);
    };
    console.log("interviews", interviews,"subjects", subjects ,"posts", posts);
    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <Head title="Tests" />
            <Breadcrumb pageName="Tests" />
            <div className="py-12">
                   <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <Datagrid
                            columns={columns}
                            rows={interviews}
                            canCreate={true}
                            onCreate={() => setShowCreationModal(true)}
                        />
                    </div>
            </div>

            <Modal
                show={showCreationModal}
                title="Ajouter une test"
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
                title="Modifier une test"
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
                title="Supprimer une test "
                onClose={() => setShowDeletionModal(false)}
            >
                 <DeletionConfirmation
                    name={
                        selectedData?.name
                    }
                    onCancel={() => {
                        cancel();
                        setShowDeletionModal(false);
                    }}
                    handleDeleteSubmit={handleDeletionSubmit}
                /> 
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
                accessorKey: "name",
                cell: (info) =>(<span className="text-yellow-300">{info.getValue()}</span>),
                header: () => "Nom du test",
            },
            {
                accessorKey: "start_date",
                cell: (info) =>
                    `${(info.getValue())}`,
                header: () => "Début",
            },
            {
                accessorKey: "end_date",
                cell: (info) =>
                    `${(info.getValue())}`,
                header: () => "Fin",
            },
            {
                accessorKey: "time",
                cell: (info) =>(<span className="bg-green-400 p-1 rounded-md text-white">{info.getValue()}</span>),
                header: () => "Durée",
            },
            {
                accessorKey: "post.name",
                cell: (info) =>
                    `${(info.getValue())}`,
                header: () => "Classe",
            },
            {
                accessorKey: "subject.subject",
                cell: (info) =>
                    `${(info.getValue())}`,
                header: () => "Sujet",
            },
            {
                accessorKey: "is_expired",
                cell: (info) => (
                    <span
                        className={`px-2 py-1 inline-flex text-xs font-semibold rounded-md ${
                            info.getValue() ? "text-red-800" : "text-green-400"
                        }`}
                    >
                        {info.getValue() ? "Expiré" : "Non expiré"}
                    </span>
                ),
                header: () => "Status",
            },            
           {
                accessorFn: (row) => row,
                id: "id",
                cell: (info) => (
                    <div className="flex space-x-2">
                    <Link
                         href={`/students-answers/${(info.getValue()).id}`}
                         className={
                            "p-1 border border-transparent rounded-md"
                        }           
                    >
                        <Switcher />
                     
                    </Link>
                
                        <button
                             className={
                                "p-1 border border-transparent rounded-md"
                            }
                            onClick={() =>{ 
                                 props.onEdit(info.getValue() );
                             }}
                        >
                            <PencilIcon className="w-5 h-5 text-green-600"  /> 
                        
                        </button>
                        <button
                            className={
                                "p-1 border border-transparent rounded-md"
                            }
                            onClick={() =>{
                                props.onDelete(info.getValue());
                            }}
                        >
                            <TrashIcon className="w-5 h-5 text-red-600"  />
                          
                        </button>

                </div>
                
                ),
                header: () => "Action",
            },
        ];
    }, [props]);
};
