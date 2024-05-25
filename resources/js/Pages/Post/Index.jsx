import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Datagrid from "@/Components/Datagrid";
import Modal from "@/Components/Modal";
import { PencilIcon, EyeIcon,TrashIcon } from "@heroicons/react/24/outline";
import Form from "./Form";
import { Transition } from "@headlessui/react";
import { Head, Link, useForm } from "@inertiajs/react";
import { useEffect, useMemo, useState } from "react";
import DeletionConfirmation from "@/Components/DeletionConfirmation";


export default function Index({ auth, posts}) {
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
        description: "",  
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
            reset("name","description");
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
        post(route("levels.store"));
    };

    const handleEditionSubmit = (e) => {
        e.preventDefault();
        put(route("levels.update", selectedData.id));
    };

    const handleDeletionSubmit = (e) => {
        e.preventDefault();
        destroy(route("levels.destroy", selectedData));
        setSelectedData(null);
        setShowDeletionModal(false);
    };
    console.log(posts);
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 light:text-gray-200  leading-tight">
                    Classes
                </h2>
            }
        >
            <Head title="Classe" />

            <div className="py-12">
                   <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <Datagrid
                            columns={columns}
                            rows={posts}
                            onCreate={() => setShowCreationModal(true)}
                        />
                    </div>
            </div>

            <Modal
                show={showCreationModal}
                title="Ajouter une classe"
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
                title="Modifier une Classe"
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
                title="Supprimer un un niveau "
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
                cell: (info) =>
                    `${(info.getValue())}`,
                header: () => "Classe",
            },
            {
                accessorKey: "candidates",
                cell: (info) => `${(info.getValue() ).length}`,
                header: () => "Nombre des étudiants",
            },
            {
                accessorKey: "description",
                cell: (info) => `${(info.getValue() )}`,
                header: () => "Description",
            },
           {
                accessorFn: (row) => row,
                id: "id",
                cell: (info) => (
                    <div className="flex space-x-2">
                    <Link
                         href={`/levels/${(info.getValue()).id}`}
                         className={
                            "p-1 border border-transparent rounded-md"
                        }
                        
                    >
                         <EyeIcon className="w-5 h-5 text-gray-600" /> 
                     
                    </Link>
                
                        <button
                           className={
                            "p-1 border border-transparent rounded-md"
                        }
                            onClick={() =>{ 
                                props.onEdit(info.getValue());
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
