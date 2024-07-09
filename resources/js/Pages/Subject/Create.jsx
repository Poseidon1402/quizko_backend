import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head,  Link,  useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import Breadcrumb from "@/Components/Breadcrumbs/Breadcrumb";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { MultiSelect } from "react-multi-select-component";
import SuccessButton from "@/Components/SuccessButton";


export default function Index({ auth, questions}) {
    const [selectedQuestions, setSelectedQuestions] = useState([]);
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
        subject: "",  
        questions: [],  
    });
    
    const handleQuestionSelect = (selected) => {
        setSelectedQuestions(selected);
        setData("questions", selected.map(option => option.value));
    }
    // const handleEditionSubmit = (e) => {
    //     e.preventDefault();
    //     put(route("subjects.update", selectedData.id));
    // };

    // const handleDeletionSubmit = (e) => {
    //     e.preventDefault();
    //     destroy(route("subjects.destroy", selectedData));
    //     setSelectedData(null);
    //     setShowDeletionModal(false);
    // };
    const handleCreationSubmit = (e) => {
        e.preventDefault();
        post(route("subjects.store"));
    };
    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <Head title="Ajouter un sujet" />
            <Breadcrumb pageName="Ajouter un sujet" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                <div className="p-4 sm:p-8 bg-black shadow sm:rounded-lg">
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
                <h2>Sélectionnez les questions :</h2>
                    <MultiSelect
                        options={questions.map((question) => ({
                            label: question.question,
                            value: question.id, 
                        }))}
                        value={selectedQuestions}
                        onChange={handleQuestionSelect}
                        labelledBy="Sélectionnez les questions"
                    /> 
                    {selectedQuestions.map((question) => (
                        <div  className="p-2 text-black" key={question.value}>{question.label}</div>
                    ))}
                </div>
            <div className="flex items-center justify-end mt-4">
                <Link
                     href={route("subjects.index")}
                    className="inline-flex items-center justify-center rounded-md bg-white py-2 px-5 text-center font-medium text-black border-black border hover:bg-opacity-90 lg:px-8 xl:px-10"
                >
                    Annuler
                </Link>

                <SuccessButton
                    className="ms-4"
                    type="submit"
                    disabled={processing}
                >
                    Créer
                </SuccessButton>
            </div>
            </form>
                    </div>
                    </div>
            </div>
        </AuthenticatedLayout>
    );
}
