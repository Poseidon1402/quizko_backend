import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Datagrid from "@/Components/Datagrid";
import Modal from "@/Components/Modal";
import { EnvelopeIcon, EyeIcon, PencilIcon, PhoneIcon, TrashIcon } from "@heroicons/react/24/outline";
import Form from "../Candidate/Form";
import { Head, Link, useForm } from "@inertiajs/react";
import { useEffect, useMemo, useState } from "react";
import Avatar from "@/Components/Avatar";
import ImportExcel from "../Candidate/ImportExcel";
import { Transition } from "@headlessui/react";
import Breadcrumb from "@/Components/Breadcrumbs/Breadcrumb";
import { generateUniqueColor } from "@/Utils/generateUniqueColor";
import Chip from "@/Components/Chip";
import Edit from "../Candidate/Edit";
import DeletionConfirmation from "@/Components/DeletionConfirmation";

export default function Index({ auth, post, posts }) {
    const [showCreationModal, setShowCreationModal] = useState(false);
    const [showDeletionModal, setShowDeletionModal] = useState(false);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [showEditionModal, setShowEditionModal] = useState(false);
    const [selectedData, setSelectedData] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const { data, setData, post: create, put, delete: destroy, processing, errors, reset, cancel, hasErrors, recentlySuccessful } = useForm({
        name: "", 
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        address: "",
        gender: "masculine",
        post_id: post.id,
        role: "candidate",
        password: "", 
        password_confirmation: "",
    });

    const filteredCandidates = useMemo(() => {
        return post.candidates.filter(candidate => 
            candidate.registration_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
            candidate.user.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [post.candidates, searchTerm]);

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
        onShow: (candidate) => {
            setSelectedData(candidate);
             setShowDetailModal(true);
              //onsole.log(selectedData);
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
        create(route("students.store"));
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
            <Head title="Classes" />
            {/* <Breadcrumb pageName="Classes" /> */}
            <Link
                className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-25 transition ease-in-out duration-150"
                href="/levels"
            >
                Retour
            </Link>
            <div className="">
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
                        rows={filteredCandidates}
                        canCreate={false}
                    />
                </div>
                <Modal
                    show={showCreationModal}
                    title={"Ajouter un étudiant en " + post.name}
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
                        onSubmit={showEditionModal ? handleEditionSubmit : handleCreationSubmit}
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
                        show={showDetailModal}
                        title="Note de l'étudiant"
                        onClose={() => setShowDetailModal(false)}
                    >
                        
                                    <div className="max-h-30 overflow-y-auto">
                                        {selectedData?.candidate_notes.length > 0 ? (
                                            selectedData?.candidate_notes.map((note) => (
                                                <div 
                                                    key={note.id} 
                                                    className="flex bg-gray-2 text-black rounded-md my-2 p-3"
                                                >
                                                     <div className="w-2/3">
                                                             {note.interview.name}
                                                     </div>
                                                    <span className="w-1/3 rounded-md text-white text-end">
                                                        <span className={`rounded-md p-2 ${note.note !== null?`bg-red-800`:`bg-green-800`}`}>
                                                            {note.note !== null ? `${note.note}` : `${note.interim_note}`}
                                                        </span>
                                                        <Link
                                                        href={route("student_answers.studentTestAnswers",[selectedData?.id, note.interview.id])}
                                                        className=" bg-blue-900 ms-3 inline-flex items-center justify-center rounded-md p-3 text-center font-medium text-white hover:bg-opacity-90 lg:px-2 xl:px-3"
                                                        >
                                                            <EyeIcon className="w-3 h-3" />
                                                        </Link>
                                                    </span>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="bg-red-800 text-white rounded-md my-2 p-3">
                                                Aucune note disponible
                                            </div>
                                        )}
                            </div>
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
                accessorFn: (row) => row,
                id: "id",
                cell: (info) => (
                    <div className="flex space-x-1">
                          <button
                            className={
                                "p-1 border border-transparent rounded-md"
                            }
                            onClick={() =>{ 
                                props.onShow(info.getValue());
                             }}
                        >
                          <span className="h-5 w-5 rounded-md text-yellow-800"> 
                             Note
                          </span> 
                        
                        </button>
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
