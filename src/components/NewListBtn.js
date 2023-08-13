import NewListForm from "./NewListForm";
import { useState } from "react";

function NewListBtn() {
    const [formOpen, setFormOpen] = useState(false);

    const handleFormOpen = () => {
        setFormOpen(true);
    }

    const handleFormClose = () => {
        setFormOpen(false);
    }

    if (!formOpen) {
        return (
            <div
                onClick={() => handleFormOpen()}
                className="w-64 
                        h-12
                        bg-slate-300
                        p-2
                        text-white
                        rounded-lg
                        p-3
                        text-center
                        hover:bg-slate-400
                        cursor-pointer
                        transition
                        ">
                + Add new List
            </div>
        )
    } else {
        return (
            <NewListForm
                onFormClose={handleFormClose}
            />
        );
    }
}

export default NewListBtn;