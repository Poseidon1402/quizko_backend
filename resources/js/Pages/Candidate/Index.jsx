import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Datagrid from "@/Components/Datagrid";
import Modal from "@/Components/Modal";
import { EnvelopeIcon, PencilIcon, PhoneIcon, TrashIcon } from "@heroicons/react/24/outline";
import Form from "./Form";
import { Head, useForm } from "@inertiajs/react";
import { useEffect, useMemo, useState } from "react";
import Avatar from "@/Components/Avatar";
import { Transition } from "@headlessui/react";
import DeletionConfirmation from "@/Components/DeletionConfirmation";
import PrimaryButton from "@/Components/PrimaryButton";
import Chip from "@/Components/Chip";
import { generateUniqueColor } from "@/Utils/generateUniqueColor";
import Edit from "./Edit";

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
            (candidate.user.name.toLowerCase().includes(filterName.toLowerCase()) || candidate.registration_number.toLowerCase().includes(filterName.toLowerCase())) &&
            (!filterClass || candidate.post.name === filterClass)
        );
    });

    const columns = useColumns({
        onDelete: (data) => {
            setSelectedData(data);
            setShowDeletionModal(true);
        },
        onEdit: (candidate) => {
            setSelectedData(candidate);
             setShowEditionModal(true);
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
        >
            <Head title="Étudiant" />
            {/* <Breadcrumb pageName="Étudiant" /> */}
            <div className="bg-white py-1">
                {/* <ImportExcel /> */}
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                 <div className="mb-4 flex justify-between items-center space-x-4">
                     <div className="flex items-center space-x-4 text-black">
                         <label className="font-semibold">Filtrer par :</label>
                                <input
                                    type="text"
                                    placeholder="Filtrer par nom ou matricule"
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
                    title={"Ajouter un étudiant"}
                    onClose={() => {
                        setShowCreationModal(false);
                    }}
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
                        mode={"creation"}
                        data={data}
                        setData={setData}
                        errors={errors}
                        processing={processing}
                        onSubmit={
                             handleCreationSubmit
                        }
                        onCancel={() => {
                            cancel();
                                setShowCreationModal(false);
                        }}
                    />
                </Modal>
                 <Modal
                        show={showEditionModal}
                        title="Modifier un étudiant"
                        onClose={() => setShowEditionModal(false)}
                    >
                        <Edit posts={posts}  onCancel={() => setShowEditionModal(false)} candidate={selectedData}/> 
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
                accessorKey: "registration_number",
                cell: (info) =>
                (<span className="bg-gray p-2 rounded-md text-black">{info.getValue()}</span>),  
                header: () => "Matricule",
            },
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
                header: () => "Candidat",
            },
            {
                accessorKey: "gender",
                cell: (info) => (
                   <Chip type={info.getValue()==='feminine' ? "success" : "error"}>
                        {info.getValue()==='feminine' ? "Féminin" : "Masculin"}
                    </Chip>
                  ),
                header: () => "Genre",
            },
            {
                accessorKey: "post.name",
                cell: (info) => {
                    const color = generateUniqueColor(info.getValue());
                    return (
                        <span
                            className={`text-white rounded-md text-xs p-2`}
                            style={{ backgroundColor: color }}
                        >
                            {info.getValue()}
                        </span>
                    );
                },
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
