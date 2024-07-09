
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import {  useEffect } from "react";
import Select from "@/Components/Select";
import { usePage } from "@inertiajs/react";
import SuccessButton from "@/Components/SuccessButton";

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
    const {posts,subjects}= usePage().props;
    useEffect(() => {
        return () => {
            onReset?.();
        };
    }, []);

    return (
        <form className="p-5" onSubmit={onSubmit}>
             <fieldset className="gap-2 py-2">
                <div>
                    <InputLabel htmlFor="name" value="Nom du test" />

                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full"
                        autoComplete="name"
                        isFocused={true}
                        onChange={(e) => setData("name", e.target.value)}
                        required
                    />

                    <InputError message={errors.name} className="mt-2" />
                </div>
            </fieldset>
            <fieldset className="gap-2">
                <div>
                    <InputLabel htmlFor="start_date" value="Début" />

                    <TextInput
                        type="datetime-local"
                        id="start_date"
                        name="start_date"
                        value={data.start_date}
                        className="mt-1 block w-full"
                        autoComplete="start_date"
                        onChange={(e) => setData("start_date", e.target.value)}
                        required
                    />

                    <InputError message={errors.start_date} className="mt-2" />
                </div>
            </fieldset>

            <fieldset className="gap-2">
                <div>
                    <InputLabel htmlFor="end_date" value="Fin" />

                    <TextInput
                        type="datetime-local"
                        id="end_date"
                        name="end_date"
                        value={data.end_date}
                        className="mt-1 block w-full"
                        autoComplete="end_date"
                        onChange={(e) => setData("end_date", e.target.value)}
                        required
                    />

                    <InputError message={errors.end_date} className="mt-2" />
                </div>
            </fieldset>
            <fieldset className="gap-2">
                <div>
                    <InputLabel htmlFor="time" value="Durée" />

                    <TextInput
                        type="time"
                        min="0"
                        id="time"
                        name="time"
                        value={data.time}
                        className="mt-1 block w-full"
                        autoComplete="time"
                        onChange={(e) => setData("time", e.target.value)}
                        required
                    />

                    <InputError message={errors.time} className="mt-2" />
                </div>
            </fieldset>
            <div className="mt-4">
                <InputLabel htmlFor="subject_id" value="Sujet" />

                <Select
                    id="subject_id"
                    name="zone_id"
                    value={data.subject_id}
                    className="mt-1 block w-full"
                    onChange={(e) => setData("subject_id", e.target.value)}
                    required
                    options={subjects.length>0 ?(subjects.map((subject) => ({
                        value: subject.id,
                        label: subject.subject,
                    }))):([])}
                />

                <InputError message={errors.subject_id} className="mt-2" />
            </div>
            <div className="mt-4">
                <InputLabel htmlFor="post_id" value="Classe" />

                <Select
                    id="post_id"
                    name="post_id"
                    value={data.post_id}
                    className="mt-1 block w-full"
                    onChange={(e) => setData("post_id", e.target.value)}
                    required
                    options={posts.length>0 ? (posts.map((post) => ({
                        value: post.id,
                        label: post.name,
                    }))):([])}
                />

                <InputError message={errors.subject_id} className="mt-2" />
            </div>
            <div className="flex items-center justify-end mt-4">
                <SecondaryButton
                    className="ms-4"
                    onClick={onCancel}
                    disabled={processing}
                >
                    Annuler
                </SecondaryButton>

                <SuccessButton
                    className="ms-4"
                    type="submit"
                    disabled={processing}
                >
                 {mode==="creation"? "Créer" : "Modifier"}
                </SuccessButton>
            </div>
        </form>
    );
}
