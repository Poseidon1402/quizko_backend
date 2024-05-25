
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import {  useEffect } from "react";
import React, { useState } from "react";
import { MultiSelect } from "react-multi-select-component";
import { usePage } from "@inertiajs/react";

export default function Form({
    mode = "creation",
    data,
    setData,
    errors,
    processing,
    onReset,
    onSubmit,
    onCancel,
}) {
    const {questions}= usePage().props;
    const [selectedQuestions, setSelectedQuestions] = useState([]);
    const handleQuestionSelect = (selected) => {
        setSelectedQuestions(selected);
        //setData("questions",selectedQuestions);
        setData("questions", selected.map(option => option.value));
    }
    useEffect(() => {
        return () => {
            onReset?.();
        };
    }, []);

    return (
        <form className="p-5" onSubmit={onSubmit}>
            <fieldset className="gap-2">
             
                <div>
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
            {mode==="creation" && <>
            <div className="">
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
                        <div  className="p-5" key={question.value}>{question.label}</div>
                    ))}
                </div>
             </>}            

            <div className="flex items-center justify-end mt-4">
                <SecondaryButton
                    className="ms-4"
                    onClick={onCancel}
                    disabled={processing}
                >
                    Annuler
                </SecondaryButton>

                <PrimaryButton
                    className="ms-4"
                    type="submit"
                    disabled={processing}
                >
                 {mode==="creation"? "Créer" : "Modifier"}
                </PrimaryButton>
            </div>
        </form>
    );
}
