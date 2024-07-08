import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import {
    UserIcon,
    QuestionMarkCircleIcon,
    AcademicCapIcon,
    BookOpenIcon,
} from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard({ auth, count }) {
    const [authenticatedUsers, setAuthenticatedUsers] = useState([]);

    useEffect(() => {
        fetchAuthenticatedUsers();
    }, []);

    const fetchAuthenticatedUsers = async () => {
        try {
            const response = await axios.get('/authenticated-users');
            setAuthenticatedUsers(response.data.users);
        } catch (error) {
            console.error("Error fetching authenticated users:", error);
        }
    };
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 light:text-gray-200  leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="p-5 bg-white text-gray-900 light:bg-gray-800  light:text-gray-100  overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                            {count && (
                                <>
                                    <div className="rounded-lg bg-gray-400  light:bg-gray-600 h-32 flex items-center justify-center">
                                        <UserIcon className="h-16 w-16 text-white" />
                                        <div className="text-4xl text-white ml-4">{count.candidates}</div>
                                        <div className="text-lg text-white ml-2">Étudiants</div>
                                    </div>
                                    <div className="rounded-lg bg-gray-400  light:bg-gray-600 h-32 flex items-center justify-center">
                                        <QuestionMarkCircleIcon className="h-16 w-16 text-white" />
                                        <div className="text-4xl text-white ml-4">{count.questions}</div>
                                        <div className="text-lg text-white ml-2">Questions</div>
                                    </div>
                                    <div className="rounded-lg bg-gray-400  light:bg-gray-600 h-32 flex items-center justify-center">
                                        <AcademicCapIcon className="h-16 w-16 text-white" />
                                        <div className="text-4xl text-white ml-4">{count.subjects}</div>
                                        <div className="text-lg text-white ml-2">Sujets</div>
                                    </div>
                                    <div className="rounded-lg bg-gray-400  light:bg-gray-600 h-32 flex items-center justify-center">
                                        <BookOpenIcon className="h-16 w-16 text-white" />
                                        <div className="text-4xl text-white ml-4">{count.interviews}</div>
                                        <div className="text-lg text-white ml-2">Tests</div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="p-5 bg-white shadow-sm rounded-lg">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3"> {authenticatedUsers.length>0 && authenticatedUsers.length} Utilisateurs Connectés</h3>
                        <ul className="divide-y divide-gray-200">
                            {authenticatedUsers.map(user => (
                                <li key={user.id} className="py-3 flex items-center">
                                    <div className="flex-shrink-0">
                                        <UserIcon className="h-8 w-8 text-gray-600" />
                                    </div>
                                    <div className="ml-3">
                                        <div className="text-sm font-medium text-gray-900 ">{user.name}</div>
                                        {/* <div className="text-xs text-gray-500">Dernière activité : {user.last_active}</div> */}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
        </AuthenticatedLayout>
    );
}
