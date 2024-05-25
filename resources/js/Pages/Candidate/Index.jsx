import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Datagrid from "@/Components/Datagrid";
import Modal from "@/Components/Modal";
import { EnvelopeIcon,
    EyeIcon,
    PencilIcon,
    PhoneIcon,
    TrashIcon, } from "@heroicons/react/24/outline";
import Form from "./Form";
import { Head, Link, useForm } from "@inertiajs/react";
import { useEffect, useMemo, useState } from "react";
import Avatar from "@/Components/Avatar";
import ImportExcel from "./ImportExcel";
import { Transition } from "@headlessui/react";

export default function Index({ auth, candidates, posts}) {
    console.log(candidates);

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
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        address: "",
        gender: "masculine",
        post_id: "",
        role: "candidate",
        password: "", 
        password_confirmation: "",
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
            reset("name");
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
        post(route("students.store"));
    };

    const handleEditionSubmit = (e) => {a
        e.preventDefault();
        put(route("students.update", selectedData.id));
    };

    const handleDeletionSubmit = (e) => {
        e.preventDefault();
        destroy(route("students.destroy", selectedData));
        setSelectedData(null);
        setShowDeletionModal(false);
    };
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 light:text-gray-200  leading-tight">
                     Etudiants
                </h2>
            }
        >
            <Head title="Etudiant" />

            <div className="py-12">
                 <ImportExcel />
                   <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <Datagrid
                            columns={columns}
                            rows={candidates}
                            onCreate={() => setShowCreationModal(true)}
                        />
                    </div>
                    <Modal
                        show={showCreationModal}
                        title="Ajouter un étudiant"
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
                            mode={showEditionModal ? "edition" : ("creation")}
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
                        />
            </Modal>
            </div>
        </AuthenticatedLayout>
    );
}

const useColumns = (
    props,
)=> {
    return useMemo(() => {
        return [
            {
                accessorFn: (row) => row.user,
                id: "last_name",
                cell: (info) => {
                    const { email, phone, first_name, last_name } =
                        info.getValue();
                    const name = `${first_name} ${last_name}`;

                    return (
                        <div className="flex items-center gap-2">
                            <Avatar size="lg" src="" alt={name} />
                            <div className="space-y-2">
                                <h2 className="text-[16px] font-semibold">
                                    {name}
                                </h2>
                                <div className="flex items-center gap-4">
                                    <span className="flex items-center gap-1 text-xs font-thin italic">
                                        <EnvelopeIcon className="w-3 h-3" />
                                        {email}
                                    </span>
                                    {phone && (
                                        <span className="flex items-center gap-1 text-xs font-thin italic">
                                            <PhoneIcon className="w-3 h-3" />
                                            {phone}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                },
                header: () => "Courtier",
            },
            {
                accessorKey: "gender",
                cell: (info) =>
                    `${(info.getValue())}`,
                header: () => "Genre",
            },
            {
                accessorKey: "post.name",
                cell: (info) =>
                    `${(info.getValue())}`,
                header: () => "Classe",
            },
            {
                accessorKey: "user.address",
                cell: (info) =>
                    `${(info.getValue())}`,
                header: () => "Adresse",
            },
    
           {
                accessorFn: (row) => row,
                id: "id",
                cell: (info) => (
                    <div className="flex space-x-2">
                    <Link
                         href={`/departments/${(info.getValue()).id}`}
                         className={
                            "p-1 border border-transparent rounded-md"
                        }
                        
                    >
                        <EyeIcon className="w-5 h-5 text-gray600"  />
                     
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
                            <TrashIcon className="w-5 h-5 text-red-600" />
                          
                        </button>

                </div>
                
                ),
                header: () => "Action",
            },
        ];
    }, [props]);
};
