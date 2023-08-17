import { useDispatch, useSelector } from "react-redux";
import { closeModal, deleteList } from "../store";

function DeleteModal() {
    const dispatch = useDispatch();
    const listId = useSelector((state) => state.modal.listId);

    const handleModalClose = () => {
        dispatch(closeModal());
    }

    const handleListDelete = () => {
        dispatch(deleteList({ listId }));
        dispatch(closeModal());
    }
    return (
        <div>
            <div className="modal 
                        bg-black
                        fixed
                         w-full
                         h-full
                         opacity-30
                         left-0
                         top-0"
            ></div>
            <div className="w-96 
                            h-48
                            rounded-lg
                            bg-slate-700
                            z-100
                            fixed
                            top-[50%]
                            left-[50%]
                            translate-x-[-50%]
                            translate-y-[-50%]
                            p-4
                            "
            >
                <div className="flex items-center justify-center mt-10">
                    <div className="text-white text-lg font-semibold">Are you sure?</div>
                </div>
                <div className="flex space-x-2 mt-11">
                    <button
                        onClick={handleListDelete}
                        className="rounded-md bg-slate-500 p-2 w-1/2 mt-2 text-white"
                    >Delete list</button>
                    <button
                        onClick={handleModalClose}
                        className="rounded-md bg-orange-400 p-2 w-1/2 mt-2 text-white"
                    >Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default DeleteModal; 