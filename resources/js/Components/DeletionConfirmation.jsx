import SecondaryButton from "./SecondaryButton";
import SuccessButton from "./SuccessButton";


export default function DeletionConfirmation({
    name,
    onCancel,
    handleDeleteSubmit,
}) {
    return (
        <div className=" space-y-4 py-5 text-white">
            <p className="text-center">
                Voulez-vous vraiment supprimer {name} ?
            </p>
            <div className="text-center space-x-10">
                <SecondaryButton
                    onClick={() => {
                        onCancel();
                    }}
                >
                    Annuler
                </SecondaryButton>
                <SuccessButton onClick={handleDeleteSubmit}>Oui</SuccessButton>
            </div>
        </div>
    );
}