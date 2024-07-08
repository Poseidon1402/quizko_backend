import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Datagrid from "@/Components/Datagrid";
import Modal from "@/Components/Modal";
import { EnvelopeIcon, PencilIcon, PhoneIcon, TrashIcon } from "@heroicons/react/24/outline";
import Form from "./Form";
import { Head, useForm } from "@inertiajs/react";
import { useEffect, useMemo, useState } from "react";
import Avatar from "@/Components/Avatar";
import ImportExcel from "./ImportExcel";
import { Transition } from "@headlessui/react";
import DeletionConfirmation from "@/Components/DeletionConfirmation";
import PrimaryButton from "@/Components/PrimaryButton";

export default function Index({ auth, candidates, posts }) {
    const [showCreationModal, setShowCreationModal] = useState(false);
    const [showDeletionModal, setShowDeletionModal] = useState(false);
    const [showEditionModal, setShowEditionModal] = useState(false);
    const [selectedData, setSelectedData] = useState(null);
    const [filterName, setFilterName] = useState("");
    const [filterClass, setFilterClass] = useState("");

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
        registration_number: "",
        email: "",
        phone: "",
        address: "",
        gender: "masculine",
        post_id: "",
        role: "candidate",
        password: "",
        password_confirmation: "",
    });

    const filteredCandidates = candidates.filter(candidate => {
        return (
            candidate.user.name.toLowerCase().includes(filterName.toLowerCase()) &&
            (!filterClass || candidate.post.name === filterClass)
        );
    });

    const columns = useColumns({
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

    const handleEditionSubmit = (e) => {
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
                <h2 className="font-semibold text-xl text-gray-800 light:text-gray-200 leading-tight">
                    Étudiants
                </h2>
            }
        >
            <Head title="Étudiant" />

            <div className="py-12">
                {/* <ImportExcel /> */}
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                 <div className="mb-4 flex justify-between items-center space-x-4">
                     <div className="flex items-center space-x-4">
                         <label className="font-semibold">Filtrer par :</label>
                                <input
                                    type="text"
                                    placeholder="Filtrer par nom"
                                    value={filterName}
                                    onChange={(e) => setFilterName(e.target.value)}
                                    className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <select
                                    value={filterClass}
                                    onChange={(e) => setFilterClass(e.target.value)}
                                    className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">Toutes les classes</option>
                                    {posts.map((post) => (
                                        <option key={post.id} value={post.name}>
                                            {post.name}
                                        </option>
                                    ))}
                                </select>
                        </div>
                        <PrimaryButton onClick={() => setShowCreationModal(true)}>
                            Ajouter un étudiant
                        </PrimaryButton>
                    </div>
                    <Datagrid
                        columns={columns}
                        rows={filteredCandidates}
                        canCreate={false}
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
                        mode={showEditionModal ? "edition" : "creation"}
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
                <Modal
                        show={showDeletionModal}
                        title="Supprimer un étudiant"
                        onClose={() => setShowDeletionModal(false)}
                    >
                        <DeletionConfirmation
                            name={
                                selectedData?.user.name
                            }
                            onCancel={() => {
                                cancel();
                                setShowDeletionModal(false);
                            }}
                            handleDeleteSubmit={handleDeletionSubmit}
                        /> 
                    </Modal>
            </div>
        </AuthenticatedLayout>
    );
}

const useColumns = (props) => {
    return useMemo(() => {
        return [
            {
                accessorFn: (row) => row.user,
                id: "last_name",
                cell: (info) => {
                    const { email, phone, name } = info.getValue();
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
                cell: (info) => `${info.getValue()}`,
                header: () => "Genre",
            },
            {
                accessorKey: "post.name",
                cell: (info) => `${info.getValue()}`,
                header: () => "Classe",
            },
            {
                accessorFn: (row) => row,
                id: "id",
                cell: (info) => (
                    <div className="flex space-x-1">
                        <button
                           className={
                            "p-1 border border-transparent rounded-md"
                            }
                          onClick={() => {
                                props.onDelete(info.getValue());
                            }}
                        >
                            <TrashIcon className="w-4 h-4 text-red-600" />
                        </button>
                    </div>
                ),
                header: () => "Action",
            },
        ];
    }, [props]);
};
