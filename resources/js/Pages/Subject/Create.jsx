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

// import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
// import { Head, Link, useForm } from "@inertiajs/react";
// import { useState, useEffect } from "react";
// import Breadcrumb from "@/Components/Breadcrumbs/Breadcrumb";
// import InputError from "@/Components/InputError";
// import InputLabel from "@/Components/InputLabel";
// import TextInput from "@/Components/TextInput";
// import { MultiSelect } from "react-multi-select-component";
// import SuccessButton from "@/Components/SuccessButton";
// import PrimaryButton from "@/Components/PrimaryButton";

// export default function Index({ auth, questions, subjectData }) {  // Add subjectData prop
//     const [selectedQuestions, setSelectedQuestions] = useState([]);
//     const [existingQuestions, setExistingQuestions] = useState([]); // State for existing questions

//     const {
//         data,
//         setData,
//         post,
//         put, // Add put for updates
//         processing,
//         errors,
//     } = useForm({
//         subject: subjectData?.subject || "", // Pre-fill subject if editing
//         questions: subjectData?.questions?.map(q => q.id) || [], // Pre-fill questions
//     });

//     useEffect(() => {
//         if (subjectData && subjectData.questions) {
//             setExistingQuestions(subjectData.questions); // Initialize existing questions
//             setSelectedQuestions(subjectData.questions.map(q => ({ value: q.id, label: q.question })));

//         }
//     }, [subjectData]);


//     const handleQuestionSelect = (selected) => {
//         setSelectedQuestions(selected);
//         setData("questions", selected.map(option => option.value));
//     };

//     const handleSubmit = (e) => { // Unified submit handler
//         e.preventDefault();
//         if (subjectData) { // Editing
//             put(route("subjects.update", subjectData.id));
//         } else { // Creating
//             post(route("subjects.store"));
//         }
//     };

//     const handleRemoveExistingQuestion = (questionId) => {
//         setExistingQuestions(existingQuestions.filter(q => q.id !== questionId));
//         setSelectedQuestions(selectedQuestions.filter(q => q.value !== questionId));
//         setData('questions', data.questions.filter(id => id !== questionId))
//     };


//     return (
//         <AuthenticatedLayout user={auth.user}>
//             <Head title={subjectData ? "Modifier un sujet" : "Ajouter un sujet"} /> {/* Dynamic title */}
//             {/* <Breadcrumb pageName={subjectData ? "Modifier un sujet" : "Ajouter un sujet"} /> */}
//             <div className="">
//                 <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
//                     <div className="p-4 sm:p-8 bg-gray-100 shadow sm:rounded-lg">
//                         <form className="p-5" onSubmit={handleSubmit}> {/* Use unified handleSubmit */}
//                             {/* ... (Subject input - no changes needed) */}

//                             <div className="m-2">
//                                 <h2 className="text-black mb-2">Sélectionnez les questions :</h2>
//                                 <MultiSelect
//                                     options={questions.map((question) => ({
//                                         label: question.question,
//                                         value: question.id,
//                                     }))}
//                                     value={selectedQuestions}
//                                     onChange={handleQuestionSelect}
//                                     labelledBy="Sélectionnez les questions"
//                                     className="bg-gray text-sm text-black rounded-md"
//                                     overrideStrings={{
//                                         selectSomeItems: "Sélectionnez les questions...",
//                                         allItemsAreSelected: "Tous les éléments sont sélectionnés",
//                                         selectAll: "Sélectionner tout",
//                                         search: "Recherche",
//                                     }}
//                                     valueRenderer={(selected, _options) =>
//                                         selected.length
//                                             ? selected.map(({ label }) => label).join(", ")
//                                             : "Sélectionnez les questions"
//                                     }
//                                 />

//                                 {/* Existing Questions Display */}
//                                 {existingQuestions.length > 0 && (
//                                     <div className="mt-4">
//                                         <h3 className="text-lg font-medium text-gray-900">Questions existantes:</h3>
//                                         {existingQuestions.map((question) => (
//                                             <div key={question.id} className="flex items-center justify-between p-2 text-gray-800 bg-gray-300 rounded-md mb-1">
//                                                 <span>{question.question}</span>
//                                                 <button
//                                                     type="button"
//                                                     onClick={() => handleRemoveExistingQuestion(question.id)}
//                                                     className="text-red-500 hover:text-red-700"
//                                                 >
//                                                     Supprimer
//                                                 </button>
//                                             </div>
//                                         ))}
//                                     </div>
//                                 )}


//                                 <div className="mt-2">
//                                     {selectedQuestions.map((question) => (
//                                         <div className="p-2 text-gray-800 bg-gray-300 rounded-md mb-1" key={question.value}>
//                                             {question.label}
//                                         </div>
//                                     ))}
//                                 </div>
//                             </div>

//                             <div className="flex items-center justify-end mt-4">
//                                 {/* ... (Cancel and Submit buttons - no changes needed) */}
//                                 <PrimaryButton
//                                     className="ml-4"
//                                     type="submit"
//                                     disabled={processing}
//                                 >
//                                     {subjectData ? "Modifier" : "Créer"} {/* Dynamic button text */}
//                                 </PrimaryButton>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             </div>
//         </AuthenticatedLayout>
//     );
// }