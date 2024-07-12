import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { useState } from "react";
import Breadcrumb from "@/Components/Breadcrumbs/Breadcrumb";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { MultiSelect } from "react-multi-select-component";
import SuccessButton from "@/Components/SuccessButton";
import PrimaryButton from "@/Components/PrimaryButton";

export default function Index({ auth, questions }) {
    const [selectedQuestions, setSelectedQuestions] = useState([]);
    const {
        data,
        setData,
        post,
        processing,
        errors,
    } = useForm({
        subject: "",
        questions: [],
    });

    const handleQuestionSelect = (selected) => {
        setSelectedQuestions(selected);
        setData("questions", selected.map(option => option.value));
    };

    const handleCreationSubmit = (e) => {
        e.preventDefault();
        post(route("subjects.store"));
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Ajouter un sujet" />
            {/* <Breadcrumb pageName="Ajouter un sujet" /> */}
            <div className="">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-gray-100 shadow sm:rounded-lg">
                        <form className="p-5" onSubmit={handleCreationSubmit}>
                            <fieldset className="gap-2">
                                <div className="m-2">
                                    <InputLabel htmlFor="subject" value="Sujet" />
                                    <TextInput
                                        id="subject"
                                        name="subject"
                                        placeholder="Nom du sujet ..."
                                        value={data.subject}
                                        className="mt-1 block w-full"
                                        autoComplete="subject"
                                        isFocused={true}
                                        onChange={(e) => setData("subject", e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.name} className="mt-2" />
                                </div>
                            </fieldset>
                            <div className="m-2">
                                <h2 className="text-black mb-2">Sélectionnez les questions :</h2>
                                <MultiSelect
                                    options={questions.map((question) => ({
                                        label: question.question,
                                        value: question.id,
                                    }))}
                                    value={selectedQuestions}
                                    onChange={handleQuestionSelect}
                                    labelledBy="Sélectionnez les questions"
                                    className="bg-gray text-sm text-black rounded-md"
                                    overrideStrings={{
                                        selectSomeItems: "Sélectionnez les questions...",
                                        allItemsAreSelected: "Tous les éléments sont sélectionnés",
                                        selectAll: "Sélectionner tout",
                                        search: "Recherche",
                                    }}
                                    valueRenderer={(selected, _options) =>
                                        selected.length
                                            ? selected.map(({ label }) => label).join(", ")
                                            : "Sélectionnez les questions"
                                    }
                                />
                                <div className="mt-2">
                                    {selectedQuestions.map((question) => (
                                        <div className="p-2 text-gray-800 bg-gray-300 rounded-md mb-1" key={question.value}>
                                            {question.label}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="flex items-center justify-end mt-4">
                                <Link
                                    href={route("subjects.index")}
                                    className="inline-flex items-center justify-center rounded-md bg-white py-2 px-5 text-center font-medium text-black border-black border hover:bg-opacity-90 lg:px-8 xl:px-10"
                                >
                                    Annuler
                                </Link>
                                <PrimaryButton
                                    className="ml-4"
                                    type="submit"
                                    disabled={processing}
                                >
                                    Créer
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
