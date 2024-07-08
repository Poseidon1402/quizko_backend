import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Datagrid from "@/Components/Datagrid";
import { PencilIcon, EyeIcon,TrashIcon } from "@heroicons/react/24/outline";
import { Transition } from "@headlessui/react";
import { Head, Link, useForm } from "@inertiajs/react";
import { useEffect, useMemo, useState } from "react";
import DeletionConfirmation from "@/Components/DeletionConfirmation";


export default function Index({ auth, interviews, subjects,  posts}) {
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
            header={
                <h2 className="font-semibold text-xl text-gray-800 light:text-gray-200  leading-tight">
                     Résultats
                </h2>
            }
        >
            <Head title="Tests" />

            <div className="py-12">
                   <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <Datagrid
                            columns={columns}
                            rows={interviews}
                        />
                    </div>
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
                accessorKey: "name",
                cell: (info) =>
                    `${(info.getValue())}`,
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
                cell: (info) =>(<span>{info.getValue()}</span>),
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
                cell: (info) =>(<span>{info.getValue()?"Expiré":"Non expiré"}</span>),
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
                            "inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150" 
                            }           
                    >
                        Voir 
                     
                    </Link>
                </div>
                
                ),
                header: () => "Action",
            },
        ];
    }, [props]);
};
