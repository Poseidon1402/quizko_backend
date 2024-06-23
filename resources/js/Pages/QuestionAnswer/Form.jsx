import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import Select from "@/Components/Select";
import TextInput from "@/Components/TextInput";
import React, { useState, useEffect } from "react";

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

    const [answers, setAnswers] = useState([{ answer: "", is_correct: false }]);
    const [newAnswer, setNewAnswer] = useState("");
  
    const handleAddAnswer = () => {
      setAnswers([...answers, { answer: newAnswer, is_correct: false }]);
      setNewAnswer("");
    };
  
    const handleAnswerChange = (index) => (e) => {
      const newAnswers = [...answers];
      newAnswers[index].answer = e.target.value;
      setAnswers(newAnswers);
      setData("answers",answers);
    };
  
    const handleCheckboxChange = (index) => (e) => {
      const newAnswers = [...answers];
      newAnswers[index].is_correct = e.target.checked;
      setAnswers(newAnswers);
    };
  
    useEffect(() => {
        return () => {
            onReset?.();
        };
    }, []);

    return (
        <form className="p-5" onSubmit={onSubmit}>

            <field className="gap-2">
            <div className="p-6 max-w-xl mx-auto bg-white rounded-lg shadow-md">
                    <fieldset className="gap-2">
                        <div>
                            <InputLabel htmlFor="question" value="Question" />

                            <TextInput
                                id="question"
                                name="question"
                                placeholder="Question ..."
                                value={data.question}
                                className="mt-1 block w-full"
                                autoComplete="question"
                                isFocused={true}
                                onChange={(e) => setData("question", e.target.value)}
                                required
                            />

                            <InputError message={errors.question} className="mt-2" />
                        </div>
                    </fieldset>
                    <fieldset className="gap-2">
                        <div>
                            <InputLabel htmlFor="point" value="Point" />

                            <TextInput
                                type="number"
                                min={0}
                                id="point"
                                name="point"
                                placeholder="Point ..."
                                value={data.point}
                                className="mt-1 block w-full"
                                autoComplete="question"
                            
                                onChange={(e) => setData("point", e.target.value)}
                                required
                            />

                            <InputError message={errors.point} className="mt-2" />
                        </div>
                    </fieldset>
                    <fieldset className="gap-2">
                        <div>
                            <InputLabel htmlFor="questionType" value="Type de question" />

                            <Select
                                id="questionType"
                                name="questionType"
                                className="mt-1 block w-full"
                                value={data.type}
                                onChange={(e) => setData('type',e.target.value)}
                                options={[
                                    { value: "response", label: "Question avec réponse attendue" },
                                    { value: "quiz", label: "Quiz" },
                                ]}
                            />
                        </div>
                  </fieldset>
                        <div className="space-y-2">
                      {mode==='creation' &&<>
                        <span className="text-md">Réponses:</span>
                        {answers.map((answer, index) => (
                            <div key={index} className="flex items-center space-x-2">
                            <input
                                type="text"
                                value={answer.answer}
                                onChange={handleAnswerChange(index)}
                                className="block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-200"
                            />
                            <label className="flex items-center space-x-2">
                                <input
                                type="checkbox"
                                checked={answer.is_correct}
                                onChange={handleCheckboxChange(index)}
                                className="rounded border-gray-300 shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-200"
                                />
                                <span className="text-lg">Correct</span>
                            </label>
                            </div>
                        ))}
                     {data.type === "quiz" && (
                         <div className="flex items-center space-x-2">
                            <PrimaryButton
                            type="button"
                            onClick={handleAddAnswer}
                            >
                            +
                            </PrimaryButton>
                        </div>)}
                        </>}
                        </div>
                
                    </div>
            </field>
            <div className="flex items-center justify-end mt-4">
            <button
                className="block w-full mt-6 px-4 py-2 text-white bg-gray-800 text-center rounded-md shadow-md "
                type="submit"
                disabled={processing}          
            >
                       {mode==="creation"? "Créer" : "Modifier"}
             </button>

                {/* <SecondaryButton
                    className="ms-4"
                    onClick={onCancel}
                    disabled={processing}
                >
                    Annuler
                </SecondaryButton> */}
            </div>
        </form>
    );
}
