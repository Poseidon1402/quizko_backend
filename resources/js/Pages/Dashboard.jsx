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
import Breadcrumb from "@/Components/Breadcrumbs/Breadcrumb";

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
        <AuthenticatedLayout user={auth.user}>
            <Head title="Dashboard" />
            <Breadcrumb pageName="Dashboard" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                        {count && (
                            <>
                                <div className="rounded-lg bg-green-800 text-white flex items-center justify-center p-6">
                                    <UserIcon className="h-12 w-12" />
                                    <div className="ml-4">
                                        <div className="text-3xl font-semibold">{count.candidates}</div>
                                        <div className="text-sm">Étudiants</div>
                                    </div>
                                </div>
                                <div className="rounded-lg bg-red-800 text-white flex items-center justify-center p-6">
                                    <QuestionMarkCircleIcon className="h-12 w-12" />
                                    <div className="ml-4">
                                        <div className="text-3xl font-semibold">{count.questions}</div>
                                        <div className="text-sm">Questions</div>
                                    </div>
                                </div>
                                <div className="rounded-lg bg-blue-800 text-white flex items-center justify-center p-6">
                                    <AcademicCapIcon className="h-12 w-12" />
                                    <div className="ml-4">
                                        <div className="text-3xl font-semibold">{count.subjects}</div>
                                        <div className="text-sm">Sujets</div>
                                    </div>
                                </div>
                                <div className="rounded-lg bg-yellow-800 text-white flex items-center justify-center p-6">
                                    <BookOpenIcon className="h-12 w-12" />
                                    <div className="ml-4">
                                        <div className="text-3xl font-semibold">{count.interviews}</div>
                                        <div className="text-sm">Tests</div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                    <div className="p-5 shadow-sm rounded-lg">
                        <h3 className="text-lg font-semibold mb-3 relative">
                            Utilisateurs Connectés
                            <span className="absolute top-0 right-0 transform translate-x-2 -translate-y-2 inline-block text-xs bg-red-800 text-white rounded-full px-2 py-0.5">
                                {authenticatedUsers.length > 0 && authenticatedUsers.length}
                            </span>
                        </h3>
                        <div className="overflow-y-auto max-h-80">
                            <ul className="divide-y divide-gray-200">
                                {authenticatedUsers.map((user) => (
                                    <li key={user.id} className="py-4 flex items-center gap-4 hover:bg-gray-100 dark:hover:bg-gray-800 px-3 rounded-lg">
                                        <div className="flex-shrink-0">
                                            <UserIcon className="h-8 w-8 text-gray-600" />
                                        </div>
                                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
