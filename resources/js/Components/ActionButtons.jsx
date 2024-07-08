import { PencilIcon, TrashIcon } from "@heroicons/react/20/solid";

export default function ActionButtons({ onEdit, onDelete, info }) {
    return (
        <div className="flex space-x-2">
        <button
            className={
                "p-1 border border-transparent rounded-md"
            }
            onClick={() =>{ 
                onEdit(info.getValue());
             }}
        >
          <PencilIcon className="w-5 h-5 text-green-600" /> 
        
        </button>
        <button
           className={
            "p-1 border border-transparent rounded-md"
        }
            onClick={() =>{
                onDelete(info.getValue());
            }}
        >
            <TrashIcon className="w-5 h-5 text-red-600" />
          
        </button>

</div>
    );
}
