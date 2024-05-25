import Navbar from "@/Components/Navbar";
import Sidebar from "@/Components/Sidebar";
import { PropsWithChildren, ReactNode } from "react";

export default function Authenticated({
    user,
    header,
    children,
}) {
    return (
        <div className="min-h-screen bg-gray-300 ">
            <Navbar user={user} />

            <Sidebar user={user} />

            {header && (
                <header className="bg-gray-250  shadow md:ml-64 pt-16">
                    <div className="max-w-7xl text-green-200 mx-auto py-6 px-4 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            <main className={`p-4 md:ml-64 h-auto${!header ? " pt-20" : ""}`}>
                {children}
            </main>
        </div>
    );
}
